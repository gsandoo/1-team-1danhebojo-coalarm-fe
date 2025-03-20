// src/components/layouts/GuideLayout.jsx
import React from 'react';
import Sidebar from '../Sidebar';

function GuideLayout({ title, children }) {
  return (
    <div className="flex bg-[#0E106C] min-h-screen max-w-screen overflow-hidden">
      {/* 사이드바 컴포넌트 */}
      <Sidebar />
      
      {/* 메인 컨텐츠 */}
      <div className="flex-1 p-6 overflow-y-auto h-screen">
        <div className="bg-blue-900 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default GuideLayout;