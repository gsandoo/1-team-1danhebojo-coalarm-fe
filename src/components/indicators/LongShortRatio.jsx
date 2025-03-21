import React from 'react';

function LongShortRatio({ longRatio, shortRatio }) {
  const formattedLongRatio = parseFloat(longRatio).toFixed(1);
  const formattedShortRatio = parseFloat(shortRatio).toFixed(1);
  
  const marketSentiment = longRatio > shortRatio ? '상승 예상' : '하락 예상';
  const sentimentColor = longRatio > shortRatio ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-blue-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm">롱/숏 비율</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      
      <div className="mt-2 mb-2 text-center">
        <span className={`text-sm ${sentimentColor}`}>{marketSentiment}</span>
      </div>
      
      <div className="mt-2">
        {/* 진행 바 */}
        <div className="h-5 w-full bg-gray-700 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-green-500 rounded-l-full" 
            style={{ width: `${formattedLongRatio}%` }}>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-green-500 text-xs font-bold">LONG {formattedLongRatio}%</span>
          </div>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md">
              알림 설정
            </button>
          </div>
          <div>
            <span className="text-red-500 text-xs font-bold">SHORT {formattedShortRatio}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LongShortRatio;