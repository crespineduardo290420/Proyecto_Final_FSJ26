import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Editing from "./components/Editing";
import Bienvenida from "./components/Bienvenida";



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Bienvenida />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/update/:id" element={<Editing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
