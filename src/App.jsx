import "./App.css";
import "./scroll.css"
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./assets/components/Home";
import React, { useState } from "react";

import Editing from "./assets/components/Editing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Editing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
