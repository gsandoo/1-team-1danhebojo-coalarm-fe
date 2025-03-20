// src/components/indicators/FearGreedIndex.jsx
import React from 'react';

function FearGreedIndex({ label, value }) {
  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm">공포탐욕 지수</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
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
