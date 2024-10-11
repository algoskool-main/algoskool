import React, { useState } from 'react';
import './LoginPage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
   
    try {
      const response = await fetch('http://localhost:5000/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      const data = await response.json();
      setLoading(false); // Turn off loading
      
      if (!response.ok) {
       
        setError(data.message || ' Login Failed Please try again '); 
        return;
      }
     
      setUser({
        username: data.username,
        email: data.email,
        initials: data.username.charAt(0).toUpperCase(),
      });
      navigate('/');
    } catch (err) {
      setError('Create an account/Signup First');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <p className="error-text">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <label className="input-label" htmlFor="usernameOrEmail">Username or Email</label>
        <input 
          id="usernameOrEmail"
          type="text"
          placeholder="Username or Email"
          className="login-input"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
        <label className="input-label" htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          placeholder="Enter your password" 
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className="login-btn">LOGIN</button>
      </form>

      <div className="social-login">
        <p>Or Sign Up Using</p>
        <div className="social-icons">
          <a href="http://localhost:5000/api/auth/google">
            <button className="social-btn google-btn">
              <FontAwesomeIcon icon={faGoogle} />
            </button>
          </a>
          <a href="http://localhost:5000/api/auth/github">
            <button className="social-btn github-btn">
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </a>
        </div>
      </div>

      <p className="account-text1">
        Or Sign Up Using <Link to="/signup" className="signup-link">SIGN UP</Link>
      </p>
    </div>
  );
};

export default LoginPage;
