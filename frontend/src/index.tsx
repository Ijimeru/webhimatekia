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
import Activated from "./page/Activated/Activated";
import ActivateFail from "./page/ActivateFail/ActivateFail";
const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<Homepage />} path="/"></Route>
            <Route element={<Loginpage />} path="/login"></Route>
            <Route element={<Activated />} path="/activated"></Route>
            <Route element={<ActivateFail />} path="/activate-failed"></Route>
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
