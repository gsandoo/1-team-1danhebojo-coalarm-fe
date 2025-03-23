// src/components/indicators/FearGreedIndex.jsx
import React, { useState } from 'react';

function FearGreedIndex({ label, value }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm">공포탐욕 지수</h3>
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
              <p><strong>0:</strong> 극단적 공포, <strong>100:</strong> 극단적 탐욕</p>
              <p className="mt-1">투자자 심리를 측정하여 시장이 과열(탐욕) 또는 위축(공포) 상태인지 나타내는 지표</p>
            </div>
          )}
        </div>
      </div>
      <h2 className="text-white text-3xl font-bold text-center">{label}</h2>
      <div className="text-white text-5xl font-bold text-center mt-4">{value}</div>
      <div className="mt-3 w-full bg-gray-600 h-1 rounded-full">
        <div className="bg-white h-1 rounded-full" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
}

export default FearGreedIndex;