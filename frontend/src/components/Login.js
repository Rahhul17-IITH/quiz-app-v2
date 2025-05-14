import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      window.location = '/dashboard';
    } catch {
      alert('Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="centered-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          autoComplete="username"
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <div style={{ marginTop: 18 }}>
        Don't have an account?{' '}
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}

export default Login;
