import React from 'react';
import { FaBell, FaPowerOff } from 'react-icons/fa';
import './header.css';

const Header = () => {
  return (
    <div>
    <header className="header">
      <div className="header-logo">
        <h1>algoskool</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li>Rooms</li>
          <li>Problems</li>
          <li>Contests</li>
          <li>Explore</li>
        </ul>
      </nav>
      <div className="header-icons">
        <FaBell className="icon" />
        <FaPowerOff className="icon" />
      </div>
    </header>
        <div className="horizontal-line">
        </div>
    </div>
  );
};

export default Header;
