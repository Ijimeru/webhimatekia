import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./page/Homepage/Homepage";
import Adminpage from "./page/Adminpage/Adminpage";
import Loginpage from "./page/Loginregisterpage/Loginpage";
import Registerpage from "./page/Loginregisterpage/Registerpage";
import { AuthProvider } from "./context/AuthContext";
import Activated from "./page/Activated/Activated";
import ActivateFail from "./page/ActivateFail/ActivateFail";
import Main from "./utils/Main";
import Dashboard from "./utils/Dashboard";
import DashboardHome from "./page/Dashboard/DashboardHome";
import DashboardSidebar from "./components/Sidebar/DashboardSidebar";
import { DashboardProvider } from "./context/DashboardContext";
import DashboardPosts from "./page/Dashboard/Posts/DashboardPosts";
import DashboardNewPost from "./page/Dashboard/Posts/DashboardNewPost";
const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <DashboardProvider>
            <Routes>
              <Route element={<Main component={<Homepage />} />} path="/"></Route>
              {/* Email Route -start */}
              <Route element={<Main component={<Activated />} />} path="/activated"></Route>
              <Route element={<Main component={<ActivateFail />} />} path="/activate-failed"></Route>
              {/* Email Route -end */}
              <Route element={<Main component={<Adminpage />} />} path="/admin"></Route>
              {/* Auth Route -start */}
              <Route element={<Main component={<Loginpage />} />} path="/login"></Route>
              <Route element={<Main component={<Registerpage />} />} path="/register"></Route>
              {/* Auth Route -end */}
              {/* Dashboard Route -start */}
              <Route element={<Dashboard component={[<DashboardHome />, <DashboardSidebar />]} />} path="/dashboard"></Route>
              <Route element={<Dashboard component={[<DashboardPosts />, <DashboardSidebar />]} />} path="/posts"></Route>
              <Route element={<Dashboard component={[<DashboardNewPost />, <DashboardSidebar />]} />} path="/posts/create"></Route>
              {/* Dashboard Route -end */}
            </Routes>
          </DashboardProvider>
        </AuthProvider>
      </Router>
    </>
  );
};
// ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
