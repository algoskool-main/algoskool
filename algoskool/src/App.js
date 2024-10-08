import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProblemList from "./components/ProblemList";
import ProblemSidebar from "./components/ProblemSidebar";
import RoomSidebar from "./components/RoomSidebar";
import TrendingSection from "./components/TrendingSection";
import Header from "./components/header";
import Rooms from "./components/Rooms";
import "./App.css";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

// New component to handle routing and sidebar logic
function MainContent() {
  const location = useLocation();

  // Function to determine which Sidebar to display
  const renderSidebar = () => {
    if (location.pathname === "/rooms") {
      return <RoomSidebar />; // Room sidebar
    } else if (location.pathname === "/problems") {
      return <ProblemSidebar />; // Problem sidebar
    }
    return null;
  };

  return (
    <div className="app-container">
      <nav>
        <Header />
      </nav>
      <div className="main-content">
        {renderSidebar()}
        <div className="page-content">
          <Routes>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/" element={<TrendingSection />} />
          </Routes>
        </div>
        <TrendingSection />
      </div>
    </div>
  );
}

export default App;
