import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import AuthPage from './pages/AuthPage'; // Import the AuthPage (login/create account page)
//import HomePage from './pages/HomePage'; // Import the HomePage (search jobs page)
//import SavedJobsPage from './pages/SavedJobsPage'; // Import the SavedJobsPage (saved jobs page)
import Home from './pages/Home.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import Login from './pages/Login.jsx';

const httpLink = createHttpLink({
  uri: '/graphql', // Your back-end GraphQL API URL
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

console.log(ApolloClient)
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Store token in state
  const [savedJobs, setSavedJobs] = useState([]); // State to manage saved jobs

  // Ensure user is logged in (token exists) to navigate properly
  //   useEffect(() => {
  //     if (!token) {
  //       // If no token, redirect to login page (handled by React Router)
  //       useNavigate = '/';
  //     }
  //   }, [token, navigate]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/saved-jobs" element={<savedJobs />} /> {/* Saved Jobs route */}
        </Routes>

      </Router>
    </ApolloProvider>
  );
};

export default App;

