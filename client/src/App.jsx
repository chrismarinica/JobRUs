import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage'; // Import the AuthPage (login/create account page)
import HomePage from './pages/HomePage'; // Import the HomePage (search jobs page)
import SavedJobsPage from './pages/SavedJobsPage'; // Import the SavedJobsPage (saved jobs page)
import Homeexample from './pages/Homeexample';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Store token in state
  const [savedJobs, setSavedJobs] = useState([]); // State to manage saved jobs

  // Ensure user is logged in (token exists) to navigate properly
  useEffect(() => {
    if (!token) {
      // If no token, redirect to login page (handled by React Router)
      window.location.href = '/';
    }
  }, [token]);

  return (
    // <Router>
    //   <div>
    //     <Routes>
    //       {/* Login/Create Account page */}
    //       <Route path="/" element={<AuthPage setToken={setToken} />} />

    //       {/* Homepage (Search Jobs) - Only accessible if logged in */}
    //       <Route path="/home" element={<HomePage />} />

    //       {/* Saved Jobs page - Only accessible if logged in */}
    //       <Route path="/saved-jobs" element={<SavedJobsPage savedJobs={savedJobs} />} />
    //     </Routes>
    //   </div>
    // </Router>
    <Homeexample/>
  );
};

export default App;

