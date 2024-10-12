import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Get the root element
const rootElement = document.getElementById('root');

// Create the root
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* BrowserRouter should wrap UserProvider */}
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
