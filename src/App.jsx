import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { connectSSE } from './components/toast/AlertContext';
import { initializeMarketInfo, initializeSocket } from './utils/upbitWebSocket';

import { PeriodicToast } from './components/toast/Toast';
import Login from './pages/Login';
import Discord from './pages/Discord';
import Dashboard from './pages/Dashboard';
import Mypage from './pages/Mypage';
import AlertPage from "./pages/alert/AlertPage.jsx";

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

  useEffect(() => {
    console.log('🔌 WebSocket 연결 시도...');
    initializeSocket(); 
    initializeMarketInfo();
  }, []);

  useEffect(() => {
    if (!isLoginPage) {
      console.log('SSE 연결 시도...');
      const eventSource = connectSSE();

      return () => {
        if (eventSource) {
          console.log('SSE 연결 종료');
          eventSource.close();
        }
      };
    }
  }, [isLoginPage]);

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="w-screen h-screen bg-gradient-to-br from-[#0A1184] via-[#341684] to-[#0F5BAF]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/alert" element={<AlertPage />} />
          <Route path="/guide/fear-greed" element={<FearGreedGuide />} />
          <Route path="/guide/rsi" element={<RsiGuide />} />
          <Route path="/guide/macd" element={<MacdGuide />} />
          <Route path="/guide/long-short" element={<LongShortGuide />} />
          <Route path="/guide/kimchi-premium" element={<KimchiPremiumGuide />} />
          <Route path="/guide/whale-transactions" element={<WhaleTransactionsGuide />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <PeriodicToast interval={5000} />
      <Toaster
        position="bottom-right"
        expand={true}
        richColors
        closeButton
        duration={10000}
      />
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
