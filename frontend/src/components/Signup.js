import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/auth/signup`, { username, password });

      alert('Signup successful! Please login.');
      window.location = '/login';
    } catch {
      alert('Signup failed. Username may already exist.');
    }
    setLoading(false);
  };

  return (
    <div className="centered-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
          autoComplete="new-password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div style={{ marginTop: 18 }}>
        Already have an account?{' '}
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Signup;

