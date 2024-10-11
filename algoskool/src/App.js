import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import LearnAlgorithms from './components/LearnAlgorithms';
import DynamicRoadmap from './components/DynamicRoadmap';
import Explore from './components/Explore';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage'; 
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import { useUser } from './context/UserContext';

function App() {
  const { setUser} = useUser();
  
  useEffect(() => {
    fetch('http://localhost:5000/api/current_user', {
        credentials: 'include', // Include credentials to allow the server to access the session
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            setUser({
                username: data.username,
                email: data.email,
                initials: data.username.charAt(0).toUpperCase(),
            });
        }
    })
    .catch(err => {
        console.error('Error fetching current user:', err);
    });
}, [setUser]);
  return (
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <Features />
                <LearnAlgorithms />
                <DynamicRoadmap />
                <Explore />
              </>
            } />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignUpPage />} /> 
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
         
        </main>
        <Footer/> 
      </div>
   
  );
}

export default App;
