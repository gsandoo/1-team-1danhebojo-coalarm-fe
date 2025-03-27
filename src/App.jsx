// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Discord from './pages/Discord';
import Dashboard from './pages/Dashboard';
import Mypage from './pages/Mypage';
import AlertPage from "./pages/alert/AlertPage.jsx";

// 가이드 페이지 임포트
import FearGreedGuide from './pages/guides/FearGreedGuide';
import RsiGuide from './pages/guides/RsiGuide';
import MacdGuide from './pages/guides/MacdGuide';
import LongShortGuide from './pages/guides/LongShortGuide';
import KimchiPremiumGuide from './pages/guides/KimchiPremiumGuide';
import WhaleTransactionsGuide from './pages/guides/WhaleTransactionsGuide';
import Header from "./components/Header.jsx";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="w-screen h-screen bg-gradient-to-br from-[#0A1184] via-[#341684] to-[#0F5BAF]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mypage" element={<Mypage />} />
          
          {/* 알람 라우트*/}
          <Route path="/alert" element={<AlertPage />} />

          {/* 가이드 라우트 */}
          <Route path="/guide/fear-greed" element={<FearGreedGuide />} />
          <Route path="/guide/rsi" element={<RsiGuide />} />
          <Route path="/guide/macd" element={<MacdGuide />} />
          <Route path="/guide/long-short" element={<LongShortGuide />} />
          <Route path="/guide/kimchi-premium" element={<KimchiPremiumGuide />} />
          <Route path="/guide/whale-transactions" element={<WhaleTransactionsGuide />} />
          
          {/* No matching routes - Redirect to "/" */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
