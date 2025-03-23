// src/components/modals/DiscordWebhookModal.jsx
import React, { useState } from 'react';

function DiscordWebhookModal({ isOpen, onClose, onSubmit }) {
  const [webhookUrl, setWebhookUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(webhookUrl);
    setWebhookUrl('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E2140] w-[540px] rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-medium">디스코드 웹훅 연동</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 본문 */}
          <div className="mb-6">
            <p className="text-white text-base mb-4">
              디스코드 웹훅 URL을 입력하여 코알람의 실시간 알림을 받아보세요.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              디스코드 채널 설정 &gt; 연동 &gt; 웹훅 &gt; 새 웹훅에서 URL을 복사하여 붙여넣으세요.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="webhook-url" className="block text-white text-sm font-medium mb-2">
                  웹훅 URL
                </label>
                <input
                  type="text"
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="w-full px-4 py-3 bg-[#0E106C] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  연동하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscordWebhookModal;