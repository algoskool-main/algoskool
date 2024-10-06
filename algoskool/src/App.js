import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import LearnAlgorithms from './components/LearnAlgorithms';
import DynamicRoadmap from './components/DynamicRoadmap';
import Explore from './components/Explore';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <Features />
        <LearnAlgorithms /> {/* Newly added component */}
        <DynamicRoadmap /> {/* Newly added component */}
        <Explore /> {/* Newly added component */}
      </main>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}

export default App;
