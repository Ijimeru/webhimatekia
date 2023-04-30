import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardSidebar from "./components/Sidebar/DashboardSidebar";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import ActivateFail from "./page/ActivateFail/ActivateFail";
import Activated from "./page/Activated/Activated";
import Adminpage from "./page/Adminpage/Adminpage";
import DashboardHome from "./page/Dashboard/DashboardHome";
import DashboardNewPost from "./page/Dashboard/Posts/DashboardNewPost";
import DashboardPosts from "./page/Dashboard/Posts/DashboardPosts";
import Homepage from "./page/Homepage/Homepage";
import Loginpage from "./page/Loginregisterpage/Loginpage";
import Registerpage from "./page/Loginregisterpage/Registerpage";
import Dashboard from "./utils/Dashboard";
import Main from "./utils/Main";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegisterPrivateRoute from "./PrivateRoute/LoginRegisterPrivateRoute";
const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <ToastContainer position="top-center" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true} theme="colored" transition={Slide} />
          <Routes>
            <Route element={<Main component={<Homepage />} />} path="/"></Route>
            {/* Email Route -start */}
            <Route element={<Main component={<Activated />} />} path="/activated"></Route>
            <Route element={<Main component={<ActivateFail />} />} path="/activate-failed"></Route>
            {/* Email Route -end */}
            <Route element={<LoginRegisterPrivateRoute component={<Main component={<Adminpage />} />} />} path="/admin"></Route>
            {/* Auth Route -start */}
            <Route element={<LoginRegisterPrivateRoute component={<Main component={<Loginpage />} />} />} path="/login"></Route>
            <Route element={<Main component={<Registerpage />} />} path="/register"></Route>
            {/* Auth Route -end */}
            {/* Dashboard Route -start */}
            <Route element={<Dashboard component={[<DashboardHome />, <DashboardSidebar />]} />} path="/dashboard"></Route>
            <Route element={<Dashboard component={[<DashboardPosts />, <DashboardSidebar />]} />} path="/posts"></Route>
            <Route element={<Dashboard component={[<DashboardNewPost />, <DashboardSidebar />]} />} path="/posts/create"></Route>
            {/* Dashboard Route -end */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};
// ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
