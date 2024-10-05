import React from 'react';
import './Navbar.css'; // Optional: separate CSS for Navbar


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">algoskool</div>
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