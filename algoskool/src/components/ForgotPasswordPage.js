import React, { useState } from 'react';
import './ForgotPasswordPage.css'; // Optional: Create a CSS file for styles

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to send reset link.');
                return;
            }

            setMessage(data.message || 'Password reset link sent to your email.');
            setEmail('');
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h1 className="forgot-password-title">Forgot Password</h1>
            {!message ? (
                <p>Please enter your email address below to receive a password reset link.</p>
            ) : (
                <p className="success-text">{message}</p>
            )}
            {error && <p className="error-text">{error}</p>}
            {!message && (
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
            )}
        </div>
    );
};

export default ForgotPasswordPage;