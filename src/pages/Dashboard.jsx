import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import dashboardApi from '../api/dashboardApi';

// 지표 컴포넌트 import
import FearGreedIndex from '../components/indicators/FearGreedIndex';
import MacdIndicator from '../components/indicators/MacdIndicator';
import RsiIndicator from '../components/indicators/RsiIndicator';
import LongShortRatio from '../components/indicators/LongShortRatio';
import KimchiPremium from '../components/indicators/KimchiPremium';
import TransactionList from '../components/transactions/TransactionList';

import TradingViewChart from '../components/dashboard/TradingViewChart';

function Dashboard() {
  const { coinId = 1 } = useParams();

  const [coinData, setCoinData] = useState({ symbol: 'BTC', name: '비트코인' });
  const [fearGreedIndex, setFearGreedIndex] = useState({ bull: 55.0, bear: 50.0 });
  const [macdData, setMacdData] = useState({ 
    macd: -987.29, 
    signal: -687.23, 
    histogram: -489.38,
    trend: 'FALL'
  });
  const [rsiData, setRsiData] = useState(45.7);
  const [shortLongData, setShortLongData] = useState({ longRatio: 52.39, shortRatio: 47.61 });
  const [kimchiPremiumData, setKimchiPremiumData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [whaleTransactions, setWhaleTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 통합 대시보드 API 요청
        const dashboardResponse = await dashboardApi.getDashboardIndex(coinId);
        
        // 요청 성공 및 데이터 확인
        if (dashboardResponse.data.status === "success" && dashboardResponse.data.data) {
          const dashboardData = dashboardResponse.data.data;
          
          // 코인 정보 설정
          if (dashboardData.coin) {
            setCoinData({
              coinId: dashboardData.coin.coinId,
              symbol: dashboardData.coin.symbol,
              name: dashboardData.coin.name
            });
          }
          
          // RSI 데이터 설정
          if (dashboardData.rsi !== undefined) {
            setRsiData(dashboardData.rsi);
          }
          
          // MACD 데이터 설정
          if (dashboardData.macd) {
            setMacdData({
              macd: dashboardData.macd.value || -987.29,
              signal: dashboardData.macd.signal || -687.23,
              histogram: dashboardData.macd.histogram || -489.38,
              trend: dashboardData.macd.trend || 'FALL'
            });
          }
          
          // 롱/숏 비율 데이터 설정
          if (dashboardData.ratio) {
            setShortLongData({
              longRatio: dashboardData.ratio.long || 52.39,
              shortRatio: dashboardData.ratio.short || 47.61
            });
          }
        }
        
        // 김치 프리미엄 데이터 가져오기
        const kimchiPremiumResponse = await dashboardApi.getKimchiPremium(0, 5);
        setKimchiPremiumData(kimchiPremiumResponse.contents || mockKimchiPremiumData);
        
        // 최근 거래 내역 가져오기
        //const transactionsResponse = await dashboardApi.getRecentTransactions(coinId, 5);
        //setRecentTransactions(transactionsResponse.data.transactions || mockTransactions);
        setRecentTransactions(mockTransactions);
        
        // 고래 거래 내역 가져오기
        //const whaleResponse = await dashboardApi.getWhaleTransactions(coinId, 5);
        //setWhaleTransactions(whaleResponse.data.transactions || mockWhaleTransactions);
        setWhaleTransactions(mockWhaleTransactions);
        
        
        // 공포&탐욕 지수 가져오기 (API가 있는 경우)
        try {
          const fearGreedResponse = await dashboardApi.getFearGreedIndex();
          if (fearGreedResponse.data && fearGreedResponse.data.data) {
            setFearGreedIndex({
              bull: fearGreedResponse.data.data.bull || 55.0,
              bear: fearGreedResponse.data.data.bear || 50.0
            });
          }
        } catch (fearGreedError) {
          console.error("공포&탐욕 지수 불러오기 실패:", fearGreedError);
          // 기본값 유지
        }
        
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        
        // 에러 발생 시 예시 데이터 사용
        setKimchiPremiumData(mockKimchiPremiumData);
        setRecentTransactions(mockTransactions);
        setWhaleTransactions(mockWhaleTransactions);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // 5초마다 데이터 업데이트 (실제 운영 환경에서는 적절한 간격으로 조정)
    const intervalId = setInterval(fetchData, 15000);
    
    return () => clearInterval(intervalId);
  }, [coinId]); // coinId가 변경될 때마다 데이터 재요청
  
  // 김치 프리미엄 예시 데이터
  const mockKimchiPremiumData = [
    { coin: 'BTC', krwPrice: 128448000, usdtPrice: 86086.82, change: 2.84 },
    { coin: 'ALGO', krwPrice: 377.00, usdtPrice: 0.29, change: 3.12 },
    { coin: 'STMX', krwPrice: 5.82, usdtPrice: 0.00, change: -11.27 }
  ];
  
  // 예시 데이터 (API 연결 전 테스트용)
  const mockTransactions = [
    { id: 1, coin: 'BTC', price: 76894000, amount: 0.258, type: 'buy', time: '09:45:22' },
    { id: 2, coin: 'BTC', price: 76815000, amount: 0.375, type: 'sell', time: '09:45:18' },
    { id: 3, coin: 'BTC', price: 76822000, amount: 0.124, type: 'buy', time: '09:45:15' },
    { id: 4, coin: 'BTC', price: 76789000, amount: 0.553, type: 'buy', time: '09:45:08' },
    { id: 5, coin: 'BTC', price: 76724000, amount: 0.891, type: 'sell', time: '09:44:56' }
  ];
  
  const mockWhaleTransactions = [
    { id: 1, coin: 'BTC', price: 76894000, amount: 12.58, type: 'buy', time: '09:45:22' },
    { id: 2, coin: 'BTC', price: 76815000, amount: 18.75, type: 'sell', time: '09:45:10' },
    { id: 3, coin: 'BTC', price: 76822000, amount: 15.24, type: 'buy', time: '09:44:35' },
    { id: 4, coin: 'BTC', price: 76789000, amount: 10.53, type: 'sell', time: '09:44:12' },
    { id: 5, coin: 'BTC', price: 76724000, amount: 14.91, type: 'buy', time: '09:43:45' }
  ];

  // 코인 검색 핸들러
  const handleCoinSearch = async (query) => {
    if (query.trim().length === 0) return;
    
    try {
      const response = await dashboardApi.searchCoins(query);
      // 검색 결과 처리 로직 추가
      console.log('검색 결과:', response.data);
    } catch (error) {
      console.error('코인 검색 실패:', error);
    }
  };

  return (
    <div className="flex bg-[#0E106C] min-h-screen max-w-screen overflow-hidden">
      {/* 사이드바 컴포넌트 */}
      <Sidebar />
      
      {/* 메인 컨텐츠 */}
      <div className="flex-1 p-5 overflow-y-auto h-screen">
        {/* 알림 배너 */}
        <div className="flex items-center bg-blue-800 rounded-md p-3 mb-5 relative">
          <div className="mr-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white text-sm">현재 투자에 대한 직접적 투자권유를 목적으로 작성되지 않았다는 점 고려바랍니다. 코알람은 투자 판단을 돕기 위한 정보 제공 서비스일 뿐입니다.</p>
          <button className="absolute right-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-white">데이터를 불러오는 중...</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            {/* 지표 카드 그리드 */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {/* 공포 & 탐욕 지수 (Bull) */}
              <FearGreedIndex label="공격" value={fearGreedIndex.bull} />
              
              {/* 공포 & 탐욕 지수 (Bear) */}
              {/* <FearGreedIndex label="방어" value={fearGreedIndex.bear} /> */}
              
              {/* MACD */}
              <MacdIndicator 
                macd={macdData.macd}
                signal={macdData.signal}
                histogram={macdData.histogram}
                trend={macdData.trend}
              />
              
              {/* RSI */}
              <RsiIndicator value={rsiData} />
              
              {/* 공매수/공매도 */}
              <LongShortRatio 
                longRatio={shortLongData.longRatio}
                shortRatio={shortLongData.shortRatio}
              />
            </div>
            
            <div className="flex gap-4 mb-5">
              {/* 비트코인 차트 영역 */}
              <div className="flex-grow">
                <div className="bg-blue-900 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <div className="mr-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-black font-bold text-xs">₿</span>
                      </div>
                      <h3 className="text-white font-medium">{coinData.name}</h3>
                      <span className="text-gray-300 ml-2 text-sm">{coinData.symbol}/KRW</span>
                    </div>
                  </div>
                  {/* TradingView 차트 컴포넌트 추가 */}
                  <div className="bg-blue-950 h-96 rounded-md">
                    <TradingViewChart 
                      symbol={`${coinData.symbol}KRW`} 
                      exchange="UPBIT" 
                      theme="dark"
                      interval="1" // 분봉
                    />
                  </div>
                </div>
              </div>
              
              {/* 오른쪽 검색 영역 */}
              <div className="w-80">
                <div className="bg-blue-900 rounded-lg p-4 mb-4">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="코인명 또는 코드"
                      className="w-full py-2 px-4 pr-10 rounded-md bg-blue-950 text-white border border-blue-800 focus:outline-none focus:border-blue-700"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCoinSearch(e.target.value);
                        }
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute right-3 top-2.5 text-white opacity-60 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="코인명 또는 코드"]');
                        if (input) handleCoinSearch(input.value);
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-white text-sm font-medium mb-2">최근 검색 기록</h3>
                    <div className="bg-blue-950 rounded-md p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-black font-bold text-xs">₿</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">비트코인</h4>
                          <p className="text-gray-400 text-xs">BTC/KRW</p>
                        </div>
                      </div>
                      <div className="text-white text-xl font-bold">
                        145,286,000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mb-5">
              {/* 김치 프리미엄 */}
              <div className="w-80">
                <KimchiPremium markets={kimchiPremiumData} />
              </div>
              
              {/* 실시간 거래 내역 */}
              <div className="flex-grow grid grid-cols-2 gap-4">
                {/* 실시간 체결 내역 */}
                <TransactionList 
                  title="실시간 체결 내역" 
                  transactions={recentTransactions} 
                />
                
                {/* 실시간 고래 체결 내역 */}
                <TransactionList 
                  title="실시간 고래 체결 내역" 
                  transactions={whaleTransactions} 
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;