import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your App component
import './pages/index.css'; // Import your global CSS (if any)

const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root div from index.html
root.render(
  <React.StrictMode>
    <App /> {/* Render your App component */}
  </React.StrictMode>
);
