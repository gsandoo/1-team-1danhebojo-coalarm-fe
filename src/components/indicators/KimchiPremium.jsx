// src/components/indicators/KimchiPremium.jsx
import React, { useState } from 'react';

function KimchiPremium({ markets = [] }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const marketData = markets.contents || markets;
  
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <div className="flex justify-between w-full items-center">
          <h3 className="text-white text-sm">김치 프리미엄</h3>
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-white opacity-50 cursor-pointer hover:opacity-100" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            
            {showTooltip && (
              <div className="absolute right-0 w-64 bg-gray-800 text-white p-2 rounded-md text-xs z-10 shadow-lg">
                <p><strong>국내 거래소:</strong> 업비트 / <strong>해외 거래소:</strong> 바이낸스</p>
                <p className="mt-1">국내 거래소에서 코인이 해외 거래소보다 비싸게 거래되는 현상</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">(KRW)</th>
            <th className="py-2 text-right">(USDT)</th>
            <th className="py-2 text-right">+</th>
          </tr>
        </thead>
        <tbody>
          {marketData && marketData.length > 0 ? (
            marketData.map((market) => (
              <tr key={market.premiumId} className="border-b border-gray-700">
                <td className="py-2 flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${market.dailyChange >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-white">{market.coin?.symbol || '?'}</span>
                </td>
                <td className={`py-2 text-right ${market.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {market.domesticPrice.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
                </td>
                <td className="py-2 text-right text-gray-400">
                  {market.globalPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </td>
                <td className={`py-2 text-right font-medium ${market.kimchiPremium >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {market.kimchiPremium >= 0 ? '+' : ''}{market.kimchiPremium.toFixed(2)}%
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-400">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default KimchiPremium;