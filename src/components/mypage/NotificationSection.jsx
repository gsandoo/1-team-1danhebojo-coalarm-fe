import React, { useState } from 'react';
import { IconVolume, IconPagination } from '../../assets/images/mypage/Icons';
import AlarmDetailModal from './AlarmDetailModal';

function NotificationSection({ notifications, currentPage, setCurrentPage }) {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock API 응답 데이터
  const mockAlertData = {
    "status": "success",
    "data": {
      "alertHistoryId": 1,
      "userId": 1,
      "alert": {
        "alertId": 1,
        "title": "골든 크로스 알람",
        "coin": {
          "id": 1,
          "name": "비트코인",
          "symbol": "BTC"
        },
        "alertType": "GOLDEN_CROSS",
        "goldenCross": {
          "shortMa": 7,
          "longMa": 20
        }
      },
      "registeredDate": "2025-03-12 12:34:56"
    }
  };

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    
    // 알림 유형을 랜덤하게 선택 (데모 목적)
    const alertTypes = ['GOLDEN_CROSS', 'VOLUME_SPIKE', 'TARGET_PRICE'];
    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    // API 모의 응답 데이터 수정
    const alertData = {
      ...mockAlertData,
      data: {
        ...mockAlertData.data,
        alert: {
          ...mockAlertData.data.alert,
          title: notice.content,
          alertType: randomType
        },
        registeredDate: notice.date
      }
    };
    
    setSelectedNotice(alertData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-[#081159]/70 backdrop-blur-sm rounded-[30px] p-5 w-[922px] h-[276px] flex flex-col mb-[24px]">
        <div>
          <div className="flex items-center mb-3">
            <IconVolume className="mr-2 text-white w-4 h-4" />
            <h2 className="font-medium text-white text-base ml-2">공지사항</h2>
          </div>
          
          {/* 공지사항 테이블 */}
          <div>
            <div className="grid grid-cols-12 py-2.5 px-4 bg-[#2B347A] rounded-t-md text-xs font-medium border-b border-[#2e3a80]">
              <div className="col-span-1 text-center text-gray-200">번호</div>
              <div className="col-span-9 text-gray-200">제목</div>
              <div className="col-span-2 text-center text-gray-200">일시</div>
            </div>
            
            {notifications.map(notice => (
              <div 
                key={notice.id} 
                className="grid grid-cols-12 py-2.5 px-4 border-b border-[#2e3a80] text-xs hover:bg-[#1a2272]/30 cursor-pointer"
                onClick={() => handleNoticeClick(notice)}
              >
                <div className="col-span-1 text-center text-white">{notice.id}</div>
                <div className="col-span-9 text-white">{notice.content}</div>
                <div className="col-span-2 text-center text-white">{notice.date}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 페이지네이션 - 위치 조정 */}
        <div className="flex justify-center items-center space-x-2 mt-auto mb-2">
          <button className="text-gray-300 hover:text-white">
            <IconPagination direction="left" className="w-3 h-3" />
          </button>
          {[1, 2, 3].map(page => (
            <button 
              key={page}
              className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="text-gray-300 hover:text-white">
            <IconPagination direction="right" className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 알람 상세 모달 */}
      {showModal && (
        <AlarmDetailModal 
          onClose={handleCloseModal} 
          alertData={selectedNotice}
        />
      )}
    </>
  );
}

export default NotificationSection;