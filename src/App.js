import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Welcome from './Welcome';  // Make sure the path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route is the login page */}
        <Route path="/Welcome" element={<Welcome />} /> {/* Welcome page */}
      </Routes>
    </Router>
  );
}

export default App;