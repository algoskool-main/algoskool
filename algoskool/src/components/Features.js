import React, { useEffect, useState } from 'react';
import './Features.css'; // Optional: separate CSS for Features

const Features = () => {
  // State to hold the feature items
  const [features, setFeatures] = useState([
    { name: 'Study Rooms', className: 'feature-item' },
    { name: 'AI-Enabled Learning', className: 'feature-item ai-enabled' },
    { name: 'Error Explanation', className: 'feature-item' },
  ]);

  const [scrollLocked, setScrollLocked] = useState(true); // For controlling scroll lock

  // Function to rotate the feature items
  const rotateFeatures = () => {
    setFeatures((prevFeatures) => {
      const [first, ...rest] = prevFeatures;
      return [...rest, first]; // Rotate the first item to the end
    });
  };

  useEffect(() => {
    // Disable scroll until rotation is done
    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
    };
    const unlockScroll = () => {
      document.body.style.overflow = 'auto';
    };

    lockScroll(); // Disable scroll initially

    const rotationInterval = setInterval(() => {
      rotateFeatures(); // Rotate features every 3 seconds
    }, 3000);

    // Unlock scroll after one full rotation (3 items * 3 seconds = 9 seconds)
    const rotationTime = features.length * 3000; // 9 seconds for 3 features
    const scrollUnlockTimeout = setTimeout(() => {
      unlockScroll();
      clearInterval(rotationInterval); // Stop rotation after one full loop
    }, rotationTime);

    return () => {
      clearInterval(rotationInterval);
      clearTimeout(scrollUnlockTimeout);
      unlockScroll(); // Ensure scroll is re-enabled on component unmount
    };
  }, [features]);

  return (
    <div className="features">
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
