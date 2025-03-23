// src/components/common/Toast.jsx
import React, { useEffect } from 'react';

/**
 * 토스트 메시지 컴포넌트
 * @param {Object} props
 * @param {boolean} props.show - 토스트 메시지 표시 여부
 * @param {string} props.message - 표시할 메시지
 * @param {string} props.type - 토스트 메시지 유형 ('success', 'error', 'info' 중 하나)
 * @param {Function} props.onClose - 토스트 메시지를 닫을 때 호출할 함수
 * @param {number} props.duration - 토스트 메시지 표시 시간 (ms)
 */
function Toast({ show, message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);
  
  if (!show) return null;
  
  // 토스트 메시지 유형에 따른 스타일 설정
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
  
  // 토스트 메시지 아이콘 설정
  const icons = {
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };
  
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center animate-fadeIn">
      <div className={`${typeStyles[type]} text-white px-6 py-4 rounded-lg shadow-md flex items-center space-x-3`}>
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="font-medium">{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-white focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;