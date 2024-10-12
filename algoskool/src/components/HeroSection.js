import React, { useState, useEffect } from 'react';
import './HeroSection.css'; // Optional: separate CSS for Hero Section

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState('Collaborate');
  const words = ['Collaborate', 'Learn', 'Innovate'];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="hero-section">
      <h1>{currentWord}.</h1>
    </section>
  );
};

export default HeroSection;