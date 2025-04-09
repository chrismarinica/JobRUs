import React, { useState } from 'react';
import { loginUser, signupUser } from '../utils/auth';
import { saveToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
  };
// Looking for the Login.jsx
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { email, password, username } = formState;
//       const {data}= isSignup
//         ? await signupUser({ email, password, username })
//         : await loginUser({ email, password });
// console.log(data)
//       saveToken(data.addUser.token); // Save JWT
//       navigate('/home'); // Redirect after login
//     } catch (error) {
//       console.error('Auth error:', error);
//       alert('Failed to log in or create account.');
//     }
//   };

  return (
    <div className="login-form-container">
      <h2>{isSignup ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formState.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={toggleMode}>
          {isSignup ? 'Log in' : 'Create one'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
