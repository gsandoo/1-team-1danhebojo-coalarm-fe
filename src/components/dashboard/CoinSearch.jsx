import React, { useState, useEffect, useRef } from 'react';
import dashboardApi from '../../api/dashboardApi';

const CoinSearch = ({ onSelectCoin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const firstRender = useRef(true);

  // Function to handle coin search
  const handleCoinSearch = async (term) => {
    if (!term.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await dashboardApi.searchCoins(term);
      
      if (response && response.status === "success" && response.data) {
        const coinData = response.data;
        setSearchResult(coinData);
        
        // 최근 검색에 추가
        updateRecentSearches(coinData);
        
        // 부모 컴포넌트에 선택된 코인 정보 전달
        if (onSelectCoin) {
          onSelectCoin(coinData);
        }
      } else {
        setError("검색 결과가 없습니다.");
      }
    } catch (err) {
      setError("코인 검색에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  // 최근 검색 기록 업데이트
  const updateRecentSearches = (coinData) => {
    if (!coinData || !coinData.coinId) return; // 유효한 데이터인지 확인
    
    setRecentSearches(prev => {
      // 이미 존재하면 제거
      const filtered = prev.filter(item => item && item.coinId && item.coinId !== coinData.coinId);
      // 배열 시작에 추가
      const updatedSearches = [coinData, ...filtered].slice(0, 5); // 최근 5개만 유지
      // localStorage에 저장
      localStorage.setItem('recentCoinSearches', JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  // 최근 검색 항목 선택 핸들러
  const handleRecentCoinSelect = (coin) => {
    if (!coin) return; // 유효한 데이터인지 확인
    
    setSearchTerm(coin.name);
    setSearchResult(coin);
    
    // 부모 컴포넌트에 선택된 코인 정보 전달
    if (onSelectCoin) {
      onSelectCoin(coin);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      // 화면 새로고침 시 검색 기록 초기화
      localStorage.removeItem('recentCoinSearches');
      setRecentSearches([]);
      firstRender.current = false;
    }
  }, []);

  // 스크롤바 스타일
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.1);
    }
    .custom-scrollbar::-webkit-scrollbar-horizontal {
      display: none;
    }
  `;

  return (
    <div className="bg-blue-900 rounded-lg p-4 h-[464px]">
      <style>{scrollbarStyles}</style>
      <div className="relative mb-2">
        <input
          type="text"
          placeholder="코인명 또는 코드"
          className="w-full py-2 px-4 pr-10 rounded-md bg-blue-950 text-white border border-blue-800 focus:outline-none focus:border-blue-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          onClick={() => handleCoinSearch(searchTerm)}
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      {/* Search Results */}
      {isLoading && (
        <div className="mt-4 bg-blue-950 rounded-md p-3 text-white text-center">
          <p>검색 중...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 bg-red-900 rounded-md p-3 text-white text-center">
          <p>{error}</p>
        </div>
      )}
      
      {searchResult && !isLoading && !error && (
        <div 
          className="mt-4 bg-blue-950 rounded-md p-3 flex items-center justify-between cursor-pointer hover:bg-blue-800 transition"
          onClick={() => handleRecentCoinSelect(searchResult)}
        >
          <div className="flex items-center">
            <div className="mr-2 w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
              <img 
                src={`https://static.upbit.com/logos/${searchResult.symbol}.png`} 
                alt={`${searchResult.symbol} 로고`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentNode.innerHTML = `<div class="bg-yellow-400 w-full h-full flex items-center justify-center"><span class="text-black font-bold text-xs">${searchResult.symbol.charAt(0)}</span></div>`;
                }}
              />
            </div>
            <div>
              <h4 className="text-white font-medium">{searchResult.name}</h4>
              <p className="text-gray-400 text-xs">{searchResult.symbol}/KRW</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Searches */}
      <div className="mt-4 flex-grow flex flex-col">
        <h3 className="text-white text-sm font-medium mb-2">최근 검색 기록</h3>
        <div className="overflow-y-auto overflow-x-hidden flex-grow custom-scrollbar max-h-[250px]">
          {recentSearches.length > 0 ? (
            <div className="space-y-2">
              {recentSearches
                .filter(coin => coin && coin.coinId && coin.symbol && coin.name) // 유효한 데이터만 필터링
                .map((coin) => (
                  <div 
                    key={coin.coinId} 
                    className="bg-blue-950 rounded-md p-3 flex items-center justify-between cursor-pointer hover:bg-blue-800 transition"
                    onClick={() => handleRecentCoinSelect(coin)}
                  >
                    <div className="flex items-center">
                      <div className="mr-2 w-6 h-6 flex items-center justify-center rounded-full overflow-hidden">
                        <img 
                          src={`https://static.upbit.com/logos/${coin.symbol}.png`} 
                          alt={`${coin.symbol} 로고`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentNode.innerHTML = `<div class="bg-yellow-400 w-full h-full flex items-center justify-center"><span class="text-black font-bold text-xs">${coin.symbol.charAt(0)}</span></div>`;
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{coin.name}</h4>
                        <p className="text-gray-400 text-xs">{coin.symbol}/KRW</p>
                      </div>
                    </div>
                    <div className="text-white text-lg font-bold">
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-blue-950 rounded-md p-3 text-gray-400 text-center">
              <p>검색 기록이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinSearch;