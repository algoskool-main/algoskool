import React, { useEffect, useState } from 'react';
import './Features.css'; // Optional: separate CSS for Features

const Features = () => {
  // State to hold the feature items
  const [features, setFeatures] = useState([
    { name: 'Study Rooms', className: 'feature-item' },
    { name: 'AI-Enabled Learning', className: 'feature-item ai-enabled' },
    { name: 'Error Explanation', className: 'feature-item' },
  ]);
  const [isHovering, setIsHovering] = useState(false); // To track hover state

  // Function to rotate the feature items
  const rotateFeatures = () => {
    setFeatures((prevFeatures) => {
      const [first, ...rest] = prevFeatures;
      return [...rest, first]; // Rotate the first item to the end
    });
  };

  useEffect(() => {
    let rotationInterval;

    if (isHovering) {
      // Start rotation when hovering
      rotationInterval = setInterval(() => {
        rotateFeatures(); // Rotate features every 3 seconds
      }, 3000);
      console.log("Rotation started");
    } else {
      // Stop rotation when not hovering
      if (rotationInterval) {
        clearInterval(rotationInterval);
        console.log("Rotation stopped");
      }
    }

    // Cleanup interval on unmount or when isHovering changes
    return () => {
      if (rotationInterval) {
        clearInterval(rotationInterval);
      }
    };
  }, [isHovering]);

  // Handlers for mouse enter and leave
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className="features" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="background-circle"></div>
      {features.map((feature, index) => (
        <div className={feature.className} key={index}>
          {feature.name}
        </div>
      ))}
    </div>
  );
};

export default Features;
