import React, {  useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css'; // Optional: Create a CSS file for styles

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Password reset failed.');
                console.error('Reset password error:', data);
                return;
            }

            setSuccess('Password has been reset successfully. You can now log in.');
            // Optionally, redirect to login after a delay
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Error occurred during reset:', err);
        }
    };

    return (
        <div className="reset-password-container">
            <h1 className="reset-password-title">Reset Password</h1>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
            {!success && (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="reset-password-input"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                        className="reset-password-input"
                    />
                    <button type="submit" className="reset-password-btn">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordPage;