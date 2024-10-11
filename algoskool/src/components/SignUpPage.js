
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const  navigate = useNavigate();
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }
       
        try {
            const response = await fetch('http://localhost:5000/api/signup', { // Make sure this is the correct endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const data = await response.json(); 
                setError(data.message || 'Signup failed.');
                return;
              }
              
              setSuccess('Account created successfully');
              // Optionally clear the form fields
              setUsername('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            
            } catch (err) {
              setError('Signup failed. Please try again.');
            }
          };
         

    return (
        <div className="signup-container">
            <h1 className="signup-title">Sign up</h1>
            {!success ? (
            <p className="signup-subtitle">Create your account</p>
            ) : (
            <p className="success-text">{success}</p>
            )}

            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    className="signup-input" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="signup-input" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                  <div className="password-container">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Password" 
                        className="signup-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="show-password-btn">
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="password-container">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Confirm Password" 
                        className="signup-input" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="show-password-btn">
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <button type="submit" className="signup-btn">Sign up</button>
            </form>
             
            {!success && (
            <>
            <p className="or-text">Or</p>
            <div className="social-icons">
                  <a href="http://localhost:5000/api/auth/google">
                    <button className="social-btn google-btn">
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                </a>
                <a href="http://localhost:5000/auth/github">
                    <button className="social-btn github-btn">
                        <FontAwesomeIcon icon={faGithub} />
                    </button>
                    </a>
            </div>
            </>
            )}

            <p className="account-text">
                Already have an account? <Link to="/login" className="login-link">Login</Link>
            </p>
           
        </div>
    );
};

export default SignUpPage;