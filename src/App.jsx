// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Discord from './pages/Discord';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen overflow-hidden bg-[#0E106C]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;