// src/components/mypage/DiscordIntegrationSection.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { IconSettings } from '../../assets/images/mypage/Icons';
import DiscordWebhookModal from '../modals/DiscordWebhookModal';
import Toast from '../common/Toast';
import { API_URL, TOKEN } from '../../config/environment';

function DiscordIntegrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };

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
      
      const response = await axios({
        method: 'PATCH',
        url: `${API_URL}/user/discord`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        data: {
          web_hook_url: webhookUrl
        }
      });

      console.log('디스코드 웹훅 연동 성공:', response.data);
      
      // 성공적으로 연동된 경우
      setIsModalOpen(false);
      // 성공 토스트 메시지 표시
      showToast('디스코드 웹훅이 성공적으로 연동되었습니다!', 'success');
      
    } catch (err) {
      console.error('Discord webhook 연동 오류:', err);
      
      // 에러 메시지 처리
      const errorMessage = err.response?.data?.error?.message || 
                          err.message || 
                          '알 수 없는 오류가 발생했습니다.';
      
      setError(errorMessage);
      // 오류 토스트 메시지 표시
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

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
          onClick={handleOpenModal}
        >
          디스코드 연동
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
        duration={1000}
      />
    </div>
  );
}

export default DiscordIntegrationSection;