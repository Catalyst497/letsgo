import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makeorder" element={<MakeOrder />} />
      </Routes>
    </>
  );
}

export default App;
