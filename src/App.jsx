import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';


import { GrDashboard } from 'react-icons/gr';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Dashboard" element={< Dashboard />} />
        <Route path="/" element={< Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

