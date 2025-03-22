// src/pages/Discord.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 이미지 임포트
import coalarmLogo from '../assets/images/discord/userIcon.png';
import discordLogo from '../assets/images/discord/discord.png';
import dashboardImage from '../assets/images/discord/dashboard.png';

// 컴포넌트 임포트
import DiscordWebhookModal from '../components/modals/DiscordWebhookModal';
import Toast from '../components/common/Toast';

// 환경 변수 임포트
import { API_URL, TOKEN } from '../config/environment';

function Discord() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 토스트 메시지 상태
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null); // 모달을 열 때 이전 에러 초기화
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  // 토스트 메시지 표시 함수
  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  // 토스트 메시지 닫기 함수
  const closeToast = () => {
    setToast(prev => ({
      ...prev,
      show: false
    }));
  };

  const handleSubmitWebhook = async (webhookUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('디스코드 웹훅 연동 시도:', webhookUrl);
      
      const response = await fetch(`${API_URL}/user/discord`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ web_hook_url: webhookUrl }),
      });

      // 응답이 JSON인지 확인
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        console.log('JSON이 아닌 응답:', await response.text());
        data = { status: 'error', error: { message: '서버에서 올바른 형식의 응답을 받지 못했습니다.' }};
      }

      if (!response.ok) {
        // HTTP 상태 코드가 200대가 아닌 경우
        throw new Error(data.error?.message || '알 수 없는 오류가 발생했습니다.');
      }

      console.log('디스코드 웹훅 연동 성공:', data);
      
      // 성공적으로 연동된 경우
      setIsModalOpen(false);
      // 성공 토스트 메시지 표시
      showToast('디스코드 웹훅이 성공적으로 연동되었습니다!', 'success');

      // 토스트 메시지가 표시된 후 약간의 지연 시간을 두고 대시보드로 이동
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      console.error('Discord webhook 연동 오류:', err);
      setError(err.message);

      // 오류 토스트 메시지 표시
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0E106C] flex flex-col items-center justify-center p-6 relative">
      {/* 로고 */}
      <div className="absolute top-6 left-10 text-white text-2xl font-medium">
        coalarm
      </div>
      
      {/* 메인 텍스트 */}
      <div className="text-center mb-16">
        <h2 className="text-white text-3xl font-medium">
          코알람과 디스코드를 연동하여 코인별 <span className="text-blue-300">실시간 알림을</span> 받을 수 있어요!
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
            카카오로 자동으로 회원가입.
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
            <img src={discordLogo} alt="Discord Logo" className="h-25" />
          </div>
          <div className="invisible text-center text-white text-base mb-3">
            placeholder
          </div>
          <div className="border-t border-gray-700 w-full my-5"></div>
          <h3 className="text-white text-xl font-medium mb-3 text-center">
            알림 범주 디스코드 계정 연동
          </h3>
          <p className="text-white text-base opacity-70 text-center">
            디스코드는 구글 계정이 필요해요.
            <br />
            디스코드 연결이 완료되면 알림을 받을 수 있어요.
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
        <button 
          className="bg-blue-900 text-white font-medium py-4 px-12 rounded-full hover:bg-blue-800 transition-colors text-lg"
          onClick={handleSkip}
        >
          건너뛰기
        </button>
        <button 
          className="bg-blue-600 text-white font-medium py-4 px-12 rounded-full hover:bg-blue-500 transition-colors text-lg"
          onClick={handleOpenModal}
        >
          디스코드 연동하기
        </button>
      </div>

      {/* 디스코드 웹훅 모달 */}
      <DiscordWebhookModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitWebhook}
        isLoading={isLoading}
        error={error}
      />

      {/* 토스트 메시지 */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
        duration={3000}
      />
    </div>
  );
}

export default Discord;