import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    console.log('Token:', token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded?.data?.username || 'User');
        setIsLoggedIn(true);
      } catch (err) {
        console.error('Invalid token:', err);
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <header>
      <img src={logo} alt="Logo" className="logo" />
      <h1>Job Search</h1>
      {isLoggedIn && (
        <div>
          <p className="username">Welcome, {username}</p>
          <nav>
            <Link to="/home" className="menu-item">Home</Link>
            <Link to="/saved-jobs" className="menu-item">Saved Jobs</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

