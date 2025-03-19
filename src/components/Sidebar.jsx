// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// 아이콘 import (필요에 따라 경로 수정)
import userIcon from '../assets/images/sidebar/profile.png';

function Sidebar() {
  return (
    <div className="w-56 bg-[#0a0d50] flex flex-col h-screen overflow-hidden flex-shrink-0">
      <div className="p-4 flex items-center">
        <span className="text-white font-medium text-xl">coalarm</span>
      </div>
      
      <div className="flex flex-col items-center mt-6 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          <img src={userIcon} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <nav className="flex-1">
        <ul>
          <li className="px-4 py-3 text-white flex items-center bg-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
              <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
              <path d="M3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
            </svg>
            <Link to="/dashboard" className="w-full">대시보드</Link>
          </li>
          <li className="px-4 py-3 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              <path d="M10 4a1 1 0 011 1v5a1 1 0 01-1 1H6a1 1 0 010-2h3V5a1 1 0 011-1z" />
            </svg>
            <Link to="/settings" className="w-full">코알람 설정</Link>
          </li>
          <li className="px-4 py-3 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <Link to="/notifications" className="w-full">알림 설정</Link>
          </li>
          <li className="px-4 py-3 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
              <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
              <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <Link to="/guide" className="w-full">지표 가이드</Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 mt-auto mb-4">
        <button className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-blue-700 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          로그아웃
        </button>
      </div>
      
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center justify-center">
          <button className="flex items-center text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
            </svg>
            슬랙 바로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;