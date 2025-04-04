import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../graphql/mutations'; // Assume you've defined these queries

const AuthPage = ({ setToken, navigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [register] = useMutation(REGISTER_USER);
  const [login] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = isRegistering
        ? await register({ variables: { username, email, password } })
        : await login({ variables: { email, password } });

      const token = isRegistering ? result.data.register.token : result.data.login.token;
      localStorage.setItem('token', token);
      setToken(token); // Save token to context or state
      navigate('/home'); // Redirect to homepage after login/registration
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegistering
          ? 'Already have an account?'
          : 'Don\'t have an account?'}
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? ' Login' : ' Register'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
