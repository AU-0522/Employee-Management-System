import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8088/add-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'exampleUser',
            password: 'examplePass',
            role: 'admin'  // Include the role field
        })
    });
    const result = await response.json();
    console.log(result);
};


  return (
    <div className="login-page">
      <video autoPlay loop muted className="background-video">
        <source src="/bgvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <header className="login-header">
        <div className="header-logo">
          <img src="logo.png" alt="Company Logo" />
        </div>
        <div className="company-name">
          <marquee direction="right">Calcon Communication Ptv. Ltd.</marquee>
        </div>
      </header>

      <div className="login-container">
        <div className="login-avatar">
          <img src="admin.jpeg" alt="Avatar" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="emailId"
              placeholder="mohona@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="btn-login">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;