import React from 'react';
import './LearnAlgorithms.css';
import imag from './img.jpg';
const LearnAlgorithms = () => {
  return (
    <div className="learn-together-container">
      <div className="text-content">
        <h1>Learn Algorithms Together</h1>
        <p>
          Join virtual study rooms with your friends and colleagues. Learn
          specific topics collaboratively, along with dynamic roadmaps. Share
          and learn together.
        </p>
        <div className="cursor1">
          <div className="cursor-name cursor1-name">Syed</div>
        </div>
        <div className="cursor2">
          <div className="cursor-name cursor2-name">Ali</div>
        </div>
      </div>
      <div className="image-container">
        <img src={imag} alt="Learning Together" />
      </div>
    </div>
  );
};
export default LearnAlgorithms;
