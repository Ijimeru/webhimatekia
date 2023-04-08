import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./page/Homepage/Homepage";
import Adminpage from "./page/Adminpage/Adminpage";
import Loginpage from "./page/Loginregisterpage/Loginpage";
import Registerpage from "./page/Loginregisterpage/Registerpage";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Homepage />} path="/"></Route>
          <Route element={<Loginpage />} path="/login"></Route>
          <Route element={<Adminpage />} path="/admin"></Route>
          <Route element={<Registerpage />} path="/register"></Route>
        </Routes>
      </Router>
    </>
  );
};
// ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
