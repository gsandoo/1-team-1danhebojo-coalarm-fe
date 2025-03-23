import React, { useState, useEffect } from 'react';

const CoinSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Function to handle coin search
  const handleCoinSearch = async (term) => {
    if (!term.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/coins/search?term=${encodeURIComponent(term)}`);
      
      if (!response.ok) {
        throw new Error('코인 검색에 실패했습니다');
      }
      
      const data = await response.json();
      setSearchResult(data);
      
      // Add to recent searches (avoid duplicates)
      setRecentSearches(prev => {
        // Remove if already exists
        const filtered = prev.filter(item => item.coinId !== data.coinId);
        // Add to beginning of array
        return [data, ...filtered].slice(0, 5); // Keep only 5 most recent
      });
      
      // Optionally save recent searches to localStorage
      localStorage.setItem('recentCoinSearches', JSON.stringify([data, ...recentSearches].slice(0, 5)));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentCoinSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Format currency with commas
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  return (
    <div className="w-80">
      <div className="bg-blue-900 rounded-lg p-4 mb-4">
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
          <div className="mt-4 bg-blue-950 rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-black font-bold text-xs">{searchResult.symbol.charAt(0)}</span>
              </div>
              <div>
                <h4 className="text-white font-medium">{searchResult.name}</h4>
                <p className="text-gray-400 text-xs">{searchResult.symbol}/KRW</p>
              </div>
            </div>
            <div className="text-white text-xl font-bold">
              {/* Replace with actual price from API if available */}
              {formatCurrency(Math.floor(Math.random() * 150000000))}
            </div>
          </div>
        )}
        
        {/* Recent Searches */}
        <div className="mt-4">
          <h3 className="text-white text-sm font-medium mb-2">최근 검색 기록</h3>
          {recentSearches.length > 0 ? (
            <div className="space-y-2">
              {recentSearches.map((coin) => (
                <div 
                  key={coin.coinId} 
                  className="bg-blue-950 rounded-md p-3 flex items-center justify-between cursor-pointer hover:bg-blue-800 transition"
                  onClick={() => {
                    setSearchTerm(coin.name);
                    setSearchResult(coin);
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-black font-bold text-xs">{coin.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{coin.name}</h4>
                      <p className="text-gray-400 text-xs">{coin.symbol}/KRW</p>
                    </div>
                  </div>
                  <div className="text-white text-lg font-bold">
                    {/* Replace with actual price from API if available */}
                    {formatCurrency(Math.floor(Math.random() * 150000000))}
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