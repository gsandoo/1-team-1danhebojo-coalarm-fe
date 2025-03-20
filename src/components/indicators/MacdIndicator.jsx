// src/components/indicators/MacdIndicator.jsx
import React from 'react';

function MacdIndicator({ macd, signal, histogram }) {
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm">MACD</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-white mt-2">
        <div className="flex justify-between mb-2">
          <span>MACD:</span>
          <span className="text-white">{macd}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Signal:</span>
          <span className="text-white">{signal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Histogram:</span>
          <span className="text-white">{histogram}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>추세:</span>
          <span className="text-white">{Number(macd) > Number(signal) ? '상승' : '하락'}</span>
        </div>
      </div>
    </div>
  );
}

export default MacdIndicator;