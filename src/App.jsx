// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Discord from './pages/Discord';
import Dashboard from './pages/Dashboard';

// 가이드 페이지 임포트
import FearGreedGuide from './pages/guides/FearGreedGuide';
import RsiGuide from './pages/guides/RsiGuide';
import MacdGuide from './pages/guides/MacdGuide';
import LongShortGuide from './pages/guides/LongShortGuide';
import KimchiPremiumGuide from './pages/guides/KimchiPremiumGuide';
import WhaleTransactionsGuide from './pages/guides/WhaleTransactionsGuide';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen overflow-hidden bg-[#0E106C]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 가이드 라우트 */}
          <Route path="/guide/fear-greed" element={<FearGreedGuide />} />
          <Route path="/guide/rsi" element={<RsiGuide />} />
          <Route path="/guide/macd" element={<MacdGuide />} />
          <Route path="/guide/long-short" element={<LongShortGuide />} />
          <Route path="/guide/kimchi-premium" element={<KimchiPremiumGuide />} />
          <Route path="/guide/whale-transactions" element={<WhaleTransactionsGuide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;