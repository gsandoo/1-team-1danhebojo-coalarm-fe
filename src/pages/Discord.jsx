// src/pages/Discord.jsx
import React from 'react';

// 이미지 임포트
import coalarmLogo from '../assets/images/discord/userIcon.png';
import slackLogo from '../assets/images/discord/slack logo.png';
import dashboardImage from '../assets/images/discord/dashboard.png';

function Discord() {
  return (
    <div className="w-screen h-screen bg-[#0E106C] flex flex-col items-center justify-center p-6 relative">
      {/* 로고 */}
      <div className="absolute top-6 left-10 text-white text-2xl font-medium">
        coalarm
      </div>
      
      {/* 메인 텍스트 */}
      <div className="text-center mb-16">
        <h2 className="text-white text-3xl font-medium">
          코알람과 슬랙을 연동하여 코인별 <span className="text-blue-300">실시간 알림을</span> 받을 수 있어요!
        </h2>
        <p className="text-white text-lg mt-3 opacity-80">
          설정한 알림과 지원내용을 확인해 보세요
        </p>
      </div>
      
      {/* 3단계 카드 */}
      <div className="flex justify-center gap-8 mb-20 w-full max-w-6xl">
        {/* 단계 1 카드 */}
        <div className="bg-blue-950 rounded-lg p-8 flex flex-col items-center w-1/3 flex-1">
          <div className="text-white text-base font-medium mb-5 bg-blue-800 px-4 py-1.5 rounded-full">
            STEP1
          </div>
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <img src={coalarmLogo} alt="Coalarm Logo" className="w-16 h-16" />
          </div>
          <div className="text-center text-white text-base mb-3">
            coalarm
          </div>
          <div className="border-t border-gray-700 w-full my-5"></div>
          <h3 className="text-white text-xl font-medium mb-3 text-center">
            코알람 계정 생성
          </h3>
          <p className="text-white text-base opacity-70 text-center">
            네이버로 자동으로 회원가입.
            <br />
            간편하게 아이디/비밀번호 등록할 수 있어요.
          </p>
        </div>
        
        {/* 단계 2 카드 */}
        <div className="bg-blue-950 rounded-lg p-8 flex flex-col items-center w-1/3 flex-1">
          <div className="text-white text-base font-medium mb-5 bg-blue-800 px-4 py-1.5 rounded-full">
            STEP2
          </div>
          <div className="w-24 h-24 flex items-center justify-center">
            <img src={slackLogo} alt="Slack Logo" className="h-16" />
          </div>
          <div className="invisible text-center text-white text-base mb-3">
            placeholder
          </div>
          <div className="border-t border-gray-700 w-full my-5"></div>
          <h3 className="text-white text-xl font-medium mb-3 text-center">
            알림 범주 슬랙 계정 연동
          </h3>
          <p className="text-white text-base opacity-70 text-center">
            슬랙은 구글 계정이 필요해요.
            <br />
            슬랙 연결이 완료되면 알림을 받을 수 있어요.
          </p>
        </div>
        
        {/* 단계 3 카드 */}
        <div className="bg-blue-950 rounded-lg p-8 flex flex-col items-center w-1/3 flex-1">
          <div className="text-white text-base font-medium mb-5 bg-blue-800 px-4 py-1.5 rounded-full">
            STEP3
          </div>
          <div className="w-24 h-24 flex items-center justify-center">
            <img src={dashboardImage} alt="Dashboard" className="h-16" />
          </div>
          <div className="invisible text-center text-white text-base mb-3">
            placeholder
          </div>
          <div className="border-t border-gray-700 w-full my-5"></div>
          <h3 className="text-white text-xl font-medium mb-3 text-center">
            코알람의 대시보드를 통해
          </h3>
          <p className="text-white text-base opacity-70 text-center">
            투자 전략을 세우세요
          </p>
        </div>
      </div>
      
      {/* 버튼 영역 */}
      <div className="flex gap-6">
        <button className="bg-blue-900 text-white font-medium py-4 px-12 rounded-full hover:bg-blue-800 transition-colors text-lg">
          건너뛰기
        </button>
        <button className="bg-blue-600 text-white font-medium py-4 px-12 rounded-full hover:bg-blue-500 transition-colors text-lg">
          슬랙 연동하기
        </button>
      </div>
    </div>
  );
}

export default Discord;