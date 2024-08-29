import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'; 
import Registration from './components/Register/Register';
import Dashboard from './components/Dashboard/dashboard'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
         <Route exact path="/" element={<Login />} />
         <Route exact path="/signup" element={<Registration />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
