import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./page/Homepage/Homepage";
import Adminpage from "./page/Adminpage/Adminpage";
import Loginpage from "./page/Loginregisterpage/Loginpage";
import Registerpage from "./page/Loginregisterpage/Registerpage";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<Homepage />} path="/"></Route>
            <Route element={<Loginpage />} path="/login"></Route>
            <Route element={<Adminpage />} path="/admin"></Route>
            <Route element={<Registerpage />} path="/register"></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};
// ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
