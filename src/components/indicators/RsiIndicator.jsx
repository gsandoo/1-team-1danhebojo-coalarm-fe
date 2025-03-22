// src/components/indicators/RsiIndicator.jsx
import React from 'react';

function RsiIndicator({ value }) {
  // 값 포맷팅 (소수점 한 자리까지)
  const formattedValue = parseFloat(value).toFixed(1);
  
  // RSI 상태 결정
  let status = '';
  let statusColor = '';
  
  if (value <= 30) {
    status = '과매도';
    statusColor = 'text-green-500';
  } else if (value >= 70) {
    status = '과매수';
    statusColor = 'text-red-500';
  } else {
    status = '중립';
    statusColor = 'text-yellow-500';
  }
  
  // 진행 바 색상 결정
  let barColor = '';
  if (value <= 30) {
    barColor = 'bg-green-500';
  } else if (value >= 70) {
    barColor = 'bg-red-500';
  } else {
    barColor = 'bg-yellow-500';
  }

  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm">RSI</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      
      <div className="text-white text-5xl font-bold text-center mt-3 mb-2">{formattedValue}</div>
      <div className={`text-center mb-4 ${statusColor} font-semibold`}>{status}</div>
      
      <div className="mt-3">
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-1">
          <div 
            className={`h-full ${barColor}`} 
            style={{ width: `${value}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span className="text-green-500">30 (과매도)</span>
          <span className="text-yellow-500 font-medium">50</span>
          <span className="text-red-500">70 (과매수)</span>
        </div>
      </div>
    </div>
  );
}

export default RsiIndicator;