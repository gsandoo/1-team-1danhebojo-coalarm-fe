import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import ProfileSection from '../components/mypage/ProfileSection';
import NotificationSection from '../components/mypage/NotificationSection';
import DiscordIntegrationSection from '../components/mypage/DiscordIntegrationSection';
import WithdrawalConfirmationModal from '../components/mypage/WithdrawalConfirmationModal';
import userService from '../components/mypage/userService';

function MyPage() {
  const [currentPage, setCurrentPage] = useState(3);
  const [userInfo, setUserInfo] = useState(null);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  // 사용자 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await userService.getUserInfo();
        
        if (response.status === 'success') {
          setUserInfo(response.data);
        } else {
          setError('사용자 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        let errorMessage = '사용자 정보를 불러오는데 실패했습니다.';
        
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            errorMessage = '로그인이 필요합니다.';
            // 로그인 페이지로 리다이렉트 로직 추가 가능
          } else if (status === 404) {
            errorMessage = '존재하지 않는 회원입니다.';
          } else if (error.response.data?.error?.message) {
            errorMessage = error.response.data.error.message;
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 프로필 업데이트 핸들러
  const handleProfileUpdate = async (updatedUserInfo) => {
    setUserInfo(updatedUserInfo);
    
    // 프로필 업데이트 후 최신 사용자 정보를 다시 가져옴
    try {
      const response = await userService.getUserInfo();
      if (response.status === 'success') {
        setUserInfo(response.data);
        console.log('사용자 정보 갱신 완료');
      }
    } catch (error) {
      console.error('사용자 정보 갱신 실패:', error);
    }
  };

  // 회원 탈퇴 모달
  const handleWithdrawalClick = () => {
    setShowWithdrawalModal(true);
  };

  const handleCloseWithdrawalModal = () => {
    setShowWithdrawalModal(false);
  };

  const handleConfirmWithdrawal = () => {
    // 회원 탈퇴 로직 구현
    console.log("회원 탈퇴 처리");
    setShowWithdrawalModal(false);
    // 회원 탈퇴 후 로그인 페이지로 리다이렉트 등의 로직 추가
  };

  // 공지사항 데이터 (API 연동 가능)
  const notifications = [
    {
      id: 3,
      content: '"베스트파 코리 본사..." 정품이 발생했어요',
      date: '2025-02-28 12:00:13'
    },
    {
      id: 2,
      content: '"벌집양꿀 정품이" 발생했어요',
      date: '2025-02-27 12:23:21'
    },
    {
      id: 1,
      content: '"벌집양꿀 정품이" 발생했어요',
      date: '2025-02-26 12:50:52'
    }
  ];

  return (
    <div className="flex h-screen w-full text-white">
      {/* 사이드바 - 고정 너비 */}
      <div className="w-[228px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-grow p-6 flex flex-col items-center">
        {loading ? (
          null
        ) : error ? (
          <div className="text-red-500 mt-8">{error}</div>
        ) : (
          <div className="max-w-2xl w-full flex flex-col items-center">
            {/* 프로필 섹션 */}
            {userInfo && (
              <ProfileSection 
                userInfo={userInfo} 
                onProfileUpdate={handleProfileUpdate} 
              />
            )}

            {/* 공지사항 섹션 */}
            <NotificationSection
              notifications={notifications}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            {/* 디스코드 연동 섹션 */}
            <DiscordIntegrationSection 
              discordWebhook={userInfo?.discordWebhook} 
            />

            {/* 회원 탈퇴 링크 */}
            <div className="mt-[40px] text-center">
              <span
                className="text-xs text-blue-300 hover:underline cursor-pointer"
                onClick={handleWithdrawalClick}
              >
                회원 탈퇴하기
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 회원 탈퇴 확인 모달 */}
      {showWithdrawalModal && (
        <WithdrawalConfirmationModal
          onClose={handleCloseWithdrawalModal}
          onConfirm={handleConfirmWithdrawal}
        />
      )}
    </div>
  );
}

export default MyPage;