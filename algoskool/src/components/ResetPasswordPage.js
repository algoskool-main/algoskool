import React, {  useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css'; // Optional: Create a CSS file for styles
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }
        setLoading(true); // Start loading

        try {
            const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            setLoading(false); // Stop loading

            if (!response.ok) {
                setError(data.message || 'Password reset failed.');
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
            setLoading(false); 
        }
    };

    return (
        <div className="reset-password-container">
            <h1 className="reset-password-title">Reset Password</h1>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
            {!success && (
                <form onSubmit={handleSubmit}>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="reset-password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-btn"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="reset-password-input"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="show-password-btn"
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button
            type="submit"
            className="reset-password-btn"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;