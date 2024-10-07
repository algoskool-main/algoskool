import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaPowerOff } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <h1>algoskool</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <Link className="links" to="/rooms">
                Rooms
              </Link>
            </li>
            <li>
              <Link className="links active" to="/problems">
                Problems
              </Link>
            </li>
            <li>Contests</li>
            <li>Explore</li>
          </ul>
        </nav>
        <div className="header-icons">
          <i class="fi fi-rr-bell icon circle"></i>
          <i class="fi fi-rr-fire-flame-curved icon circle"></i>
          <img src="https://avatars.githubusercontent.com/u/89008579?v=4" alt="Profile" className="profile-picture" />
        </div>
      </header>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Header;
