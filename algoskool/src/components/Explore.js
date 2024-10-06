import React from 'react';
import './Explore.css';

const Explore = () => {
  return (
    <section className="explore">
      <h2>Explore</h2>
      <p>We offer a lot of interesting features for algorithm learning.</p>
      <div className="cards">
        <div className="card">Data Science</div>
        <div className="card">Web Development</div>
      </div>
    </section>
  );
};

export default Explore;
