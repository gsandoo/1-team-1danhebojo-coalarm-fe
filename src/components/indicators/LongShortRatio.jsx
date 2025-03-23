// src/components/indicators/LongShortRatio.jsx
import React, { useState } from 'react';

function LongShortRatio({ longRatio, shortRatio }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm">롱/숏 비율</h3>
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
              <p>바이낸스 선물 비트코인 롱/숏 포지션 비율</p>
              <p className="mt-1"><strong>롱 포지션:</strong> 투자자가 가격이 상승할 것이라고 예상하고 매수하는 포지션</p>
              <p className="mt-1"><strong>숏 포지션:</strong> 투자자가 가격이 하락할 것이라고 예상하고 매도하는 포지션</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        {/* 진행 바 */}
        <div className="h-5 w-full bg-gray-700 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-green-500 rounded-l-full" 
            style={{ width: `${longRatio}%` }}>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-green-500 text-xs font-bold">LONG {longRatio}%</span>
          </div>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md">
             
            </button>
          </div>
          <div>
            <span className="text-red-500 text-xs font-bold">SHORT {shortRatio}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LongShortRatio;