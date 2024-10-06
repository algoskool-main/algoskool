import React from 'react';
import './Footer.css';
import india from './india.jpg'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-left">
        <div className="logo">
          <a href="/">algoskool</a>
        </div>
      </div>
        <div className="footer-middle">
          <p>
            Made with <span className="heart">❤</span> by UoA
          </p>
          <p className="description">
            AlgoSkool is an AI-based learning platform that uses machine learning 
            for curating curriculum or study flow of an individual, which makes it 
            more personalized and interactive.
          </p>
          <div className="based-in">
            Based in <img src={india} alt="India flag" className="india-flag"/> {/* Ensure this image path is correct */}
          </div>
        </div>
        <div className="footer-signup">
        <a href="/Sign Up" className="arrow">
          Sign Up
        </a>
      </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © Reserved. 2024.</p>
        <nav className="footer-links">
          <a href="/Rooms">Rooms</a>
          <a href="/Roadmap">Roadmap</a>
          <a href="/Explore">Explore</a>
          <a href="/Team">Team</a>
        </nav>
      </div>
    </footer>
  );
}


 
export default Footer;

