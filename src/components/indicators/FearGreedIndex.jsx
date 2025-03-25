// src/components/indicators/FearGreedIndex.jsx
import React, { useState } from 'react';

function FearGreedIndex({ value }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const getStatusText = () => {
    if (value <= 24) return '극단적 공포';
    if (value <= 39) return '공포';
    if (value <= 60) return '중립';
    if (value <= 74) return '탐욕';
    return '극단적 탐욕';
  };
  const getStatusColorStyle = () => {
    if (value <= 24) return { color: '#EF4444' }; // 매우 공포
    if (value <= 39) return { color: '#DC7E7B' }; // 공포
    if (value <= 60) return { color: '#FFFFFF' }; // 중립
    if (value <= 74) return { color: '#AEE1CE' }; // 탐욕
    return { color: '#10B981' }; // 매우 탐욕
  };

  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-xl font-bold">공포탐욕 지수</h3>
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
              <p><strong>0~24:</strong> 극단적 공포, <strong>75~100:</strong> 극단적 탐욕</p>
              <p className="mt-1">투자자 심리를 측정하여 시장이 과열(탐욕) 또는 위축(공포) 상태인지 나타내는 지표</p>
            </div>
          )}
        </div>
      </div>

      {/* 상태 텍스트 & 값 */}
      <div className="flex flex-col items-center justify-center mb-4">
      <div className="text-center font-bold text-2xl" style={getStatusColorStyle()}>{getStatusText()}</div>
        <div className="text-white text-5xl font-bold text-center mt-1" style={getStatusColorStyle()}>{value}</div>
      </div>

      {/* 상태 바 */}
      <div className="mt-3">
        <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
          <div className="h-full" style={{ width: `${value}%`, backgroundColor: '#B7BFFF' }}></div>
        </div>
      </div>
    </div>
  );
}

export default FearGreedIndex;
