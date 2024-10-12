import React, { useState } from 'react';
import './Navbar.css'; // Optional: separate CSS for Navbar
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';



const Navbar = () => {
  const { user,setUser } = useUser(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Clear user from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo1">
      <Link to="/">algoskool</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Rooms</Link></li>
        <li><Link to="/">AI Roadmap</Link></li>
        <li><Link to="/">Explore</Link></li>
      </ul>
      {user ? (
        <div className="profile-section">
          <div className="profile-circle" onClick={handleDropdownToggle}>
            {user.initials} {/* Display initials */}
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="sign-in-btn">Sign in</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;