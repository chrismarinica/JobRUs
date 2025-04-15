import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SavedJobs from './pages/savedJobs.jsx';
import Home from './pages/Home.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import Login from './pages/Login.jsx';
import { setContext } from '@apollo/client/link/context';
import { saveToken, getToken, removeToken } from './utils/token.js';

const httpLink = createHttpLink({
  uri: '/graphql', // Your back-end GraphQL API URL
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Store token in state
  //const [SavedJobs, setSavedJobs] = useState([]); // State to manage saved jobs

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />  
          <Route path="/login" element={<Login setToken={setToken} />} /> {/* Pass setToken to Login */}
          <Route path="/" element={<Login setToken={setToken} />} /> {/* Pass setToken to Login */}
          <Route path="/saved-jobs" element={<SavedJobs />} /> {/* Saved Jobs route */}
        </Routes>

      </Router>
    </ApolloProvider>
  );
};

export default App;

