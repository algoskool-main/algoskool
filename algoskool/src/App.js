import React, { useEffect } from 'react';
import { Route, Routes, useNavigate  } from 'react-router-dom';
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
import ResetPasswordPage from './components/ResetPasswordPage'; 
import { useUser } from './context/UserContext';

function App() {
  const { user,setUser} = useUser();
  const navigate = useNavigate();
  
   
  useEffect(() => {
    // Fetch current user from API on mount
    fetch('http://localhost:5000/api/current_user', {
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            setUser({
                username: data.username,
                email: data.email,
                initials: data.username.charAt(0).toUpperCase(),
            });
            navigate('/'); // Redirect to landing page
          }
          })
    .catch(err => {
        console.error('Error fetching current user:', err);
    });
  }, [setUser, navigate]);



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
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          </Routes>
         
        </main>
        <Footer/> 
      </div>
   
  );
}

export default App;
