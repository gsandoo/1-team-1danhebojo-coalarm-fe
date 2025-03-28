// src/utils/upbitWebSocket.js
let socketInstance = null;
let subscribers = {};
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

// 웹소켓 초기화 함수
export const initializeSocket = () => {
  if (socketInstance !== null) {
    return;
  }
  
  try {
    socketInstance = new WebSocket('wss://api.upbit.com/websocket/v1');
    
    socketInstance.onopen = () => {
      console.log('UpbitWebSocket: 연결 성공');
      isConnected = true;
      reconnectAttempts = 0;
      
      // 현재 등록된 모든 구독자 재구독
      resubscribeAll();
    };
    
    socketInstance.onclose = () => {
      console.log('UpbitWebSocket: 연결 종료');
      isConnected = false;
      socketInstance = null;
      
      // 재연결 시도
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const delay = Math.pow(2, reconnectAttempts) * 1000;
        reconnectAttempts++;
        console.log(`UpbitWebSocket: ${delay}ms 후 재연결 시도 (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
        
        setTimeout(() => {
          initializeSocket();
        }, delay);
      }
    };
    
    socketInstance.onerror = (error) => {
      console.error('UpbitWebSocket: 오류 발생', error);
    };
    
    socketInstance.onmessage = async (event) => {
      try {
        const buffer = await event.data.arrayBuffer();
        const text = new TextDecoder('utf-8').decode(buffer);
        const data = JSON.parse(text);
        
        // 데이터를 받으면 모든 구독자에게 전달
        Object.keys(subscribers).forEach(key => {
          const { symbol, callback, isWhale } = subscribers[key];
          
          // code 필드가 있는 경우만 확인
          if (data && data.cd) {
            const coinCode = `KRW-${symbol}`;
            
            // 해당 코인에 대한 데이터만 필터링
            if (data.cd === coinCode) {
              // 고래 거래 필터링 (1,000만원 이상)
              const tradeAmount = data.tp * data.tv;
              
              if ((isWhale && tradeAmount >= 10000000) || (!isWhale)) {
                callback(data);
              }
            }
          }
        });
      } catch (error) {
        console.error('UpbitWebSocket: 메시지 파싱 오류', error);
      }
    };
  } catch (error) {
    console.error('UpbitWebSocket: 초기화 오류', error);
  }
};

// 모든 구독자 재구독
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
    console.log(`UpbitWebSocket: ${symbols.join(', ')} 재구독 완료`);
  }
};

// 구독 함수
export const subscribe = (id, symbol, callback, isWhale = false) => {
  // 고유 ID로 구독 저장
  subscribers[id] = { symbol, callback, isWhale };
  
  // 웹소켓이 없으면 초기화
  if (!socketInstance) {
    initializeSocket();
    return;
  }
  
  // 이미 연결되어 있으면 바로 구독 요청
  if (isConnected) {
    resubscribeAll();
  }
  
  // 구독 해제 함수 반환
  return () => {
    unsubscribe(id);
  };
};

// 구독 해제 함수
export const unsubscribe = (id) => {
  if (subscribers[id]) {
    delete subscribers[id];
    console.log(`UpbitWebSocket: ID ${id} 구독 해제`);
    
    // 구독자가 없으면 연결 종료
    if (Object.keys(subscribers).length === 0 && socketInstance) {
      socketInstance.close();
      socketInstance = null;
      isConnected = false;
      console.log('UpbitWebSocket: 모든 구독 해제로 연결 종료');
    }
  }
};