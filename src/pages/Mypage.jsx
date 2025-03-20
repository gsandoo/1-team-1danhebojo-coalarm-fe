import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileAvatar from '../components/mypage/ProfileAvatar';
import NotificationSection from '../components/mypage/NotificationSection';
import DiscordIntegrationSection from '../components/mypage/DiscordIntegrationSection';

function MyPage() {
  const [currentPage, setCurrentPage] = useState(3);
  const [profileImage, setProfileImage] = useState(null);
  
  // 목업 데이터
  const userInfo = {
    nickname: "김코알람",
    email: "example@naver.com"
  };

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

  const handleProfileImageChange = (newImage) => {
    setProfileImage(newImage);
  };

  return (
    <div className="flex h-screen w-full text-white">
      <Sidebar/>

      {/* 메인 컨텐츠 */}
      <div className="flex-grow p-6 flex flex-col items-center">
        <div className="max-w-2xl w-full flex flex-col items-center">
          {/* 프로필 섹션 */}
          <div className="flex flex-col items-center mb-8 p-6 rounded-xl w-full max-w-md">
            {/* 프로필 아바타 */}
            <div className="mb-6">
              <ProfileAvatar 
                initialImage={profileImage} 
                onImageChange={handleProfileImageChange} 
              />
            </div>
            
            {/* 닉네임 및 이메일 필드 - 이미지에 맞게 정렬 */}
            <div className="w-full space-y-4">
              {/* 닉네임 필드 */}
              <div className="flex">
                <div className="text-sm font-medium w-[60px] pt-2">닉네임</div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    className="w-[284px] h-[43px] bg-[#07093d]/60 rounded-full px-4 py-2 text-sm border border-[#4A4FBA]/40" 
                    defaultValue={userInfo.nickname}
                    placeholder="닉네임을 입력하세요" 
                  />
                  <div className="text-xs text-blue-300 mt-1 ml-4">
                    *슬랙 이미지와 동일해 주세요.
                  </div>
                </div>
              </div>
              
              {/* 이메일 필드 */}
              <div className="flex">
                <div className="text-sm font-medium w-[60px] pt-2">이메일</div>
                <div className="flex-1">
                  <div className="w-[284px] h-[43px] bg-[#07093d]/60 rounded-full px-4 flex items-center text-sm border border-[#4A4FBA]/40 text-gray-400">
                    {userInfo.email}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 프로필 수정 버튼 */}
            <button className="bg-[#1631FE] hover:bg-blue-700 text-white rounded-full py-2 px-8 text-sm mt-8">
              프로필 수정하기
            </button>
          </div>

          {/* 공지사항 섹션 */}
          <NotificationSection 
            notifications={notifications} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* 슬랙 연동 섹션 */}
          <DiscordIntegrationSection />

          {/* 저작권 정보 */}
          <div className="mt-[40px] text-center">
            <span className="text-xs text-blue-300 hover:underline cursor-pointer">회원 탈퇴하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;