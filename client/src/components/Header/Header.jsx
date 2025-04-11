// src/components/Header.jsx
import React, { useState } from 'react';
import "./Header.css"
import logo from '../../assets/logo.png'; // Assuming you have a logo image in assets
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login state
  const [username, setUsername] = useState('JohnDoe'); // Example username
  console.log(localStorage.getItem('id_token'))
  return (
    <header>
      <img src={logo} alt="Logo" className="logo" />
      <h1>Job Search</h1>
      {isLoggedIn ? (
        <div>
          <p className="username">Welcome, {username}</p>
          <nav>
            <Link to="/home" className="menu-item">Home</Link>
            <Link to="/saved-jobs" className="menu-item">Saved Jobs</Link>
          </nav>
        </div>
      ) : ''}
    </header>
  );
};

export default Header;
