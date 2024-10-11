import React from 'react';
import './Footer.css';
import india from './india.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-middle">
          <p className="made">
            Made with <span className="heart">❤</span> by UoA
          </p>
          <p className="description">
            AlgoSkool is an AI-based learning platform that uses machine learning 
            for curating curriculum or study flow of an individual, which makes it 
            more personalized and interactive.
          </p>
          <div className="based-in">
            Based in <img src={india} alt="India flag" className="india-flag"/>
          </div>
        </div>
       
      </div>

     
      
    <nav>
        <p className="copyright">Copyright © Reserved. 2024.</p>
        <a href="/Rooms" className="link">Rooms</a>
        <a href="/Roadmap" className="link">Roadmap</a>
        <a href="/Explore" className="link">Explore</a>
        <a href="/Team" className="link">Team</a>
       
    </nav>

    </footer>
  );
}

export default Footer;

