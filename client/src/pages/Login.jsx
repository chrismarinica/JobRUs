import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER_USER, LOGIN_USER } from '../utils/mutations'; // Make sure these are defined in your GraphQL folder

const Login = ({ setToken }) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const [register] = useMutation(REGISTER_USER);
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password } = formState;
      const { data } = isRegistering
        ? await register({ variables: {
          input: {
            email: email,
            password: password,
            username: username
          }
        } })
        : await login({ variables: { email, password } });

      const token = isRegistering ? data.addUser.token : data.login.token;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/home');
    } catch (err) {
      console.error('Authentication error:', err.message);
      alert('Login or registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {isRegistering && (
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
        <button type="submit">{isRegistering ? 'Sign Up' : 'Login'}</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Login' : 'Register'}
        </span>
      </p>
    </div>
  );
};

export default Login;

