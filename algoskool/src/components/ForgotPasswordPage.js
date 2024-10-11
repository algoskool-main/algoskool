import React, { useState } from 'react';
import './ForgotPasswordPage.css'; // Optional: Create a CSS file for styles

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic here (e.g., API call)
        console.log("Password reset link sent to:", email);
    };

    return (
        <div className="forgot-password-container">
            <h1 className="forgot-password-title">Forgot Password</h1>
            <p>Please enter your email address below to receive a password reset link.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Type your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="forgot-password-input"
                />
                <button type="submit" className="forgot-password-btn">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;