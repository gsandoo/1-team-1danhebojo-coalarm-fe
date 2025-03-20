import React from 'react';
import { IconSettings } from '../../pages/Icons';

function SlackIntegrationSection() {
  return (
    <div className="bg-[#081159] backdrop-blur-sm rounded-3xl p-6 w-[922px] h-[124px] flex flex-col justify-between">
      {/* 제목 부분 - 공지사항과 동일한 스타일 */}
      <div className="flex items-center mb-3">
        <div className="bg-[#0a1865] p-1.5 rounded-full mr-2">
          <IconSettings className="text-white w-4 h-4" />
        </div>
        <h2 className="font-medium text-white text-base">디스코드 연동</h2>
      </div>
      
      {/* 내용과 버튼 */}
      <div className="flex justify-between items-center mt-[-20px]">
        <p className="text-sm text-gray-300 ml-10">
          디스코드를 통해 각종 코인 알림을 받을 수 있어요.
        </p>
        <button 
          className="bg-[#0D1D98] hover:bg-[#1147e4]/90 text-white rounded-full w-[183px] h-[48px] text-base font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          디스코드 연동
        </button>
      </div>
    </div>
  );
}

export default SlackIntegrationSection;