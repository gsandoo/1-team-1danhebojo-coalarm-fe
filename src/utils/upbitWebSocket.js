import axios from "axios";

let socketInstance = null;
let subscribers = {};
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

let tickerSubscribers = {};
let marketInfoMap = {};

// 연결 여부 확인 함수
export const getIsConnected = () => isConnected;

// 마켓 정보 초기화
export const initializeMarketInfo = async () => {
  try {
    const response = await axios.get('https://api.upbit.com/v1/market/all', {
      params: { isDetails: false }
    });

    const krwMarkets = response.data.filter(m => m.market.startsWith('KRW-'));
    marketInfoMap = {};
    krwMarkets.forEach(m => {
      marketInfoMap[m.market] = m;
    });

    if (isConnected && Object.keys(tickerSubscribers).length > 0) {
      subscribeTickerSymbols();
    }
  } catch (err) {
    console.error('마켓 정보 초기화 실패:', err);
  }
};

// 웹소켓 연결
export const initializeSocket = () => {
  if (socketInstance !== null) return;

  try {
    socketInstance = new WebSocket('wss://api.upbit.com/websocket/v1');

    socketInstance.onopen = () => {
      console.log('✅ Upbit WebSocket 연결 성공');
      isConnected = true;
      reconnectAttempts = 0;

      resubscribeAll();
      if (Object.keys(tickerSubscribers).length > 0) {
        subscribeTickerSymbols();
      }
    };

    socketInstance.onclose = () => {
      console.log('❌ WebSocket 종료됨');
      isConnected = false;
      socketInstance = null;

      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const delay = Math.pow(2, reconnectAttempts) * 1000;
        reconnectAttempts++;
        console.log(`🔄 ${delay}ms 후 재연결 시도`);
        setTimeout(() => initializeSocket(), delay);
      }
    };

    socketInstance.onerror = (error) => {
      console.error('WebSocket 오류 발생', error);
    };

    socketInstance.onmessage = async (event) => {
      try {
        const buffer = await event.data.arrayBuffer();
        const text = new TextDecoder('utf-8').decode(buffer);
        const data = JSON.parse(text);

        if (data.type === 'ticker') {
          handleTickerMessage(data);
        } else if (data.cd) {
          handleTradeMessage(data);
        } else {
          console.log('알 수 없는 메시지:', data);
        }
      } catch (err) {
        console.error('메시지 파싱 오류:', err);
      }
    };
  } catch (err) {
    console.error('WebSocket 초기화 오류:', err);
  }
};

// ticker 메시지 처리
const handleTickerMessage = (data) => {
  const market = data.code;
  const coinId = market.split('-')[1];

  Object.entries(tickerSubscribers).forEach(([id, callback]) => {
    callback({
      coinId,
      price: data.trade_price,
      volume: Math.round(data.acc_trade_price_24h / 1_000_000),
    });
  });
};

// 거래 메시지 처리
const handleTradeMessage = (data) => {
  Object.keys(subscribers).forEach(key => {
    const { symbol, callback, isWhale } = subscribers[key];

    if (data && data.cd) {
      const coinCode = `KRW-${symbol}`;
      if (data.cd === coinCode) {
        const tradeAmount = data.tp * data.tv;

        if ((isWhale && tradeAmount >= 10000000) || (!isWhale)) {
          callback(data);
        }
      }
    }
  });
};

// 구독자 재구독
const resubscribeAll = () => {
  if (!isConnected || !socketInstance) return;

  const symbols = [...new Set(Object.values(subscribers).map(s => s.symbol))];
  if (symbols.length > 0) {
    const subscribeMsg = [
      { ticket: `trade_all_${Date.now()}` },
      { type: 'trade', codes: symbols.map(s => `KRW-${s}`) },
      { format: 'SIMPLE' }
    ];
    socketInstance.send(JSON.stringify(subscribeMsg));
  }
};

// ticker 구독 심볼 목록 전송
const subscribeTickerSymbols = () => {
  if (!socketInstance || socketInstance.readyState !== WebSocket.OPEN) return;

  const codes = Object.keys(tickerSubscribers).map(id => {
    const coin = marketInfoMap[`KRW-${id}`];
    return coin?.market || `KRW-${id}`;
  });

  const subscribeMsg = [
    { ticket: 'shared-ticker' },
    { type: 'ticker', codes, isOnlyRealtime: true }
  ];

  socketInstance.send(JSON.stringify(subscribeMsg));
};

// 거래 구독
export const subscribe = (id, symbol, callback, isWhale = false) => {
  subscribers[id] = { symbol, callback, isWhale };

  if (isConnected && socketInstance) {
    resubscribeAll();
  } else {
    console.warn(`WebSocket 미연결 상태. [${id}] 구독은 대기 중입니다.`);
  }

  return () => unsubscribe(id);
};

// 거래 구독 해제
export const unsubscribe = (id) => {
  if (subscribers[id]) {
    delete subscribers[id];
    console.log(`UpbitWebSocket: ID ${id} 구독 해제`);
    checkAndCloseConnection();
  }
};

// ticker 구독
export const subscribeTicker = (id, callback) => {
  if (Object.keys(marketInfoMap).length === 0) {
    initializeMarketInfo();
  }

  tickerSubscribers[id] = callback;

  if (isConnected && socketInstance) {
    subscribeTickerSymbols();
  } else {
    console.warn(`[${id}] 구독 대기 중 (WebSocket 미연결 상태)`);
  }

  return () => unsubscribeTicker(id);
};

// ticker 구독 해제
export const unsubscribeTicker = (id) => {
  if (tickerSubscribers[id]) {
    delete tickerSubscribers[id];
    checkAndCloseConnection();
  }
};

// 모든 구독이 없으면 연결 종료
const checkAndCloseConnection = () => {
  const hasTradeSubscribers = Object.keys(subscribers).length > 0;
  const hasTickerSubscribers = Object.keys(tickerSubscribers).length > 0;

  if (!hasTradeSubscribers && !hasTickerSubscribers && socketInstance) {
    if (socketInstance.readyState === WebSocket.CONNECTING) {
      console.log('WebSocket이 아직 연결 중이라 종료하지 않음');
      return;
    }

    socketInstance.close();
    socketInstance = null;
    isConnected = false;
    console.log('UpbitWebSocket: 모든 구독 해제로 연결 종료');
  }
};
