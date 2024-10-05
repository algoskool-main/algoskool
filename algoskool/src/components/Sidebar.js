import React from "react";
import './Sidebar.css';


const Sidebar = () => {
  return (
    <div className="sidebar">
      
        <div className="topics">
            <h2 className="sidebar-heading">TOPICS</h2>
            <ul className="topic-list">
                <li>
                    <i className="icon">🧮</i>
                    <span>Arrays</span>
                </li>
                <li>
                    <i className="icon">🔡</i>
                    <span>Strings</span>
                </li>
                <li>
                    <i className="icon">🔗</i>
                    <span>Linked List</span>
                </li>
                <li>
                    <i className="icon">🌳</i>
                    <span>Binary Tree</span>
                </li>
            </ul>
        </div>
        <div className="horizontal-box"></div> 
          <div className="premium-box">
            <div className ="premium-boxcontent">
              <h3>Get <br></br>Premium</h3>
              <p>Our various<br></br> features are premium.<br></br>Subscribe now to avail <br></br>the premium features.</p>
              <button className="subscribe-button">Subscribe</button>
            </div>

          </div>
    </div>
);
};



export default Sidebar;