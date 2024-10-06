import React from 'react';
import './DynamicRoadmap.css';

const DynamicRoadmap = () => {
  return (
    <section className="dynamic-roadmap">
      <h2>Dynamic AI Roadmaps</h2>
      <p>Our AI model tracks your performance and shifts topics accordingly for effective learning.</p>
      <div className="roadmap-steps">
        <div className="step">Solve Problems</div>
        <div className="step">Track Performance</div>
        <div className="step">Model Evaluation</div>
        <div className="step">Final Decision</div>
        <div className="step">Topic Covered</div>
      </div>
    </section>
  );
};

export default DynamicRoadmap;
