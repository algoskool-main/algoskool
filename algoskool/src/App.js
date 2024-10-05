import React from "react";
import ProblemList from "./components/ProblemList";
import Sidebar from "./components/Sidebar";
import TrendingSection from "./components/TrendingSection";
import Header from './components/header';
import "./App.css";


function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
      <Sidebar />
      <ProblemList />
      <TrendingSection />
      </div>
      
    </div>
  );
}

export default App;