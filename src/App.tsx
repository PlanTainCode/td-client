import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useUserStore } from './stores/userStore';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import HomePage from './pages/Home/HomePage';

const App: React.FC = () => {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
