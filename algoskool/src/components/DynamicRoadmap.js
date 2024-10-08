import React from 'react';
import './DynamicRoadmap.css';
import arc from './archory1.png'

const DynamicRoadmap = () => {
  return (
    <section className="dynamic-roadmap">
      <h2 class="h2">Dynamic AI Roadmaps</h2>
      <p class="para">Stuck in the loop of static questions and not getting confidence on topic? No worries,Our AI model track your performance and will help you to shift topics easily with confidence.</p>
      <div className="roadmap-steps">
        <div className="step" id='circle1'></div>
        <h5 class="text1">Solve<br/>Problems</h5>
        <div className="step" id="circle2"></div>
        <h5 class="text2">Track<br/>Performance</h5>
        <div className="step"  id="circle3"></div>
        <h5 class="text3">Model<br/>Evaluation</h5>
        <div className="step" id="circle4"></div>
        <h5 class="text4">Final<br/>Decision</h5>
        <img src={arc} alt="archory" className="archory"/>
        <h5 class="text5">Topic<br/>Covered</h5> 
         
      </div>
      <svg className="curves" width="100%" height="300">
    <path d="M -2 100 Q 35 10, 100 9 T 300 100 T 560 180 T 700 100" 

          stroke="black" fill="transparent" />
  </svg>
    </section>
  );
};

export default DynamicRoadmap;
