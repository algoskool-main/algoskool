import React from 'react';
import './Navbar.css'; // Optional: separate CSS for Navbar


const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="color"></div>
      <div className="logo1">
      <a href="/">algoskool</a>
      </div>
      <ul className="nav-links">
        <li>Rooms</li>
        <li>AI Roadmap</li>
        <li>Explore</li>
      </ul>
      <button className="sign-up-btn">Sign Up</button>
    </nav>
  );
};

export default Navbar;