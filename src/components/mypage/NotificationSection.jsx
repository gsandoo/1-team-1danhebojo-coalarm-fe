import React, { useState, useEffect } from 'react';
import { IconVolume, IconPagination } from '../../assets/images/mypage/Icons';
import AlarmDetailModal from './AlarmDetailModal';
import userApi from '../../api/userApi';

function NotificationSection({ currentPage, setCurrentPage }) {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const fetchAlertHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await userApi.getAlertHistory(offset, ITEMS_PER_PAGE);
        console.log('알람 히스토리 조회 결과:', response);
        
        // 응답 구조 확인을 통한 데이터 추출
        const alerts = response.data?.contents || [];
        const totalElements = response.data?.totalElements || 0;
        
        if (alerts.length > 0) {
          // 알림 데이터 변환 및 설정
          setNotifications(alerts.map((alert, index) => ({
            id: alert.alertHistoryId,
            // 실제 번호 대신 페이지 내에서 역순으로 번호 부여 (가장 최근 알람이 1번)
            displayNumber: totalElements - offset - index,
            content: alert.alert?.title || `알림 ${alert.alertHistoryId}`,
            date: new Date(alert.registeredDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          })));
          
          // 총 페이지 수 계산
          setTotalPages(Math.ceil(totalElements / ITEMS_PER_PAGE));
        } else {
          setNotifications([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('알람 히스토리 조회 실패:', err);
        
        // 에러 메시지
        let errorMessage = '알람 내역을 불러오는데 실패했습니다.';
        
        if (err.response && err.response.status === 500) {
          const errorData = err.response.data;
          if (errorData.error && errorData.error.message && 
              errorData.error.message.includes('fromIndex') && 
              errorData.error.message.includes('toIndex')) {
            
            console.log('페이지 범위 초과. 첫 페이지로 이동합니다.');
            setCurrentPage(1);
            setError('요청한 페이지가 범위를 초과했습니다. 첫 페이지로 이동합니다.');
            return; // 함수 종료
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertHistory();
  }, [currentPage, setCurrentPage]);

  
  const handleNoticeClick = async (notice) => {
    try {
      // 알람 상세 조회 API 호출
      setLoading(true);
      const response = await userApi.getAlertDetail(notice.id);
      console.log('알람 상세 조회 결과:', response);
      
      setSelectedNotice(response);
      setShowModal(true);
    } catch (err) {
      console.error('알람 상세 조회 실패:', err);
      // API 실패 시 에러 처리
      setError(`알람 상세 정보를 불러오는데 실패했습니다. (ID: ${notice.id})`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 3;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayPages) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <>
      <div className="bg-[#081159]/70 backdrop-blur-sm rounded-[30px] p-5 w-[922px] h-[276px] flex flex-col mb-[24px]">
        <div>
          <div className="flex items-center mb-3">
            <IconVolume className="mr-2 text-white w-4 h-4" />
            <h2 className="font-medium text-white text-base ml-2">알람 내역</h2>
          </div>
          
          {/* 알람 테이블 */}
          <div>
            <div className="grid grid-cols-12 py-2.5 px-4 bg-[#2B347A] rounded-t-md text-xs font-medium border-b border-[#2e3a80]">
              <div className="col-span-1 text-center text-gray-200">번호</div>
              <div className="col-span-9 text-gray-200">제목</div>
              <div className="col-span-2 text-center text-gray-200">일시</div>
            </div>

            {loading ? (
              <div className="text-center py-10 text-white">로딩 중...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-400">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-10 text-gray-400">알람 내역이 없습니다.</div>
            ) : (
              notifications.map(notice => (
                <div 
                  key={notice.id} 
                  className="grid grid-cols-12 py-2.5 px-4 border-b border-[#2e3a80] text-xs hover:bg-[#1a2272]/30 cursor-pointer"
                  onClick={() => handleNoticeClick(notice)}
                >
                  <div className="col-span-1 text-center text-white">{notice.displayNumber}</div>
                  <div className="col-span-9 text-white">{notice.content}</div>
                  <div className="col-span-2 text-center text-white">{notice.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* 페이지네이션 - 총 페이지가 1보다 클 때만 표시 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-auto mb-2">
            <button 
              className={`text-gray-300 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              <IconPagination direction="left" className="w-3 h-3" />
            </button>
            
            {renderPageNumbers().map(page => (
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
            
            <button 
              className={`text-gray-300 hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              <IconPagination direction="right" className="w-3 h-3" />
            </button>
          </div>
        )}
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