import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo image
import LoginForm from '../components/LoginForm'; // Import LoginForm component

const Login = ({ setToken }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode
  const navigate = useNavigate();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark or light mode to body element based on state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="auth-container">
      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode} 
        className="dark-mode-toggle"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? '🌙' : '🌞'}
      </button>

      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" /> {/* Display logo */}
      </div>

      {/* LoginForm */}
      <LoginForm setToken={setToken} />
    </div>
  );
};

export default Login;