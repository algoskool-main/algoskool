import React from 'react';
import './Explore.css';
import cardImage1 from './starimage1.png';
import cardImage2 from './starimage2.png';
import cardImage3 from './smallstar.png'; // Assuming the image is in the same folder

const Explore = () => {
  return (
    <section className="explore">
      <h2>Explore</h2>
      <p class="p">We offer a lot of interesting features for algorithm learning.</p>
      <div className="cards">
        <div className="card">
          <div className="card-content">
            <span>Data <br />Science</span>
            <div className="rating">
              <span className="rating-value">4.5</span>
              <span className="tag">AI
              <img src={cardImage3} alt="Stars" className="card-image3" />
              </span>
            </div>
          </div>
          <img src={cardImage1} alt="Stars" className="card-image" />
        </div>
        <div className="card">
          <div className="card-content">
            <span>Web <br />Development</span>
            <div className="rating">
              <span className="rating-value">4.5</span>
              <span className="tag">AI
              <img src={cardImage3} alt="Stars" className="card-image3" /></span>
            </div>
          </div>
          <img src={cardImage2} alt="Stars" className="card-image" />
        </div>
      </div>
    </section>
  );
};

export default Explore;