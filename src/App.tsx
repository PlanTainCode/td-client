import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import HomePage from './pages/Home/HomePage';
import TodoPage from './pages/Todo/TodoPage';

const App: React.FC = () => {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path='/todos' element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
