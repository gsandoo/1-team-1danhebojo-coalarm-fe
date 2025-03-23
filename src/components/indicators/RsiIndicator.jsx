// src/components/indicators/RsiIndicator.jsx
import React, { useState } from 'react';

function RsiIndicator({ value }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm">RSI</h3>
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
              <p><strong>30↓:</strong> 과매도, <strong>70↑:</strong> 과매수</p>
              <p className="mt-1">최근 가격 변동 중 상승과 하락의 상대적 강도를 비교하여 과매수/과매도 상태 판단</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-white text-5xl font-bold text-center mt-3 mb-6">{value}</div>
      
      <div className="mt-3">
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-1">
          <div 
            className="h-full bg-yellow-500" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span className="text-green-500">과매도</span>
          <span className="text-yellow-500 font-medium">중립</span>
          <span className="text-red-500">과매수</span>
        </div>
      </div>
    </div>
  );
}

export default RsiIndicator;