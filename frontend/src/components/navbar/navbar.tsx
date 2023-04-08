import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavLink from "../NavLink/NavLink";

const Navbar = () => {
  let location = useLocation();
  return (
    <nav className="flex flex-row justify-between p-3 items-center container m-auto border-2">
      <div className="logo">
        <Link to="/">
          <img src="/static/img/logo-itera.png" className="" />
        </Link>
      </div>
      <NavLink />
      <div className="login-register flex gap-x-2">
        {location.pathname !== "/login" && (
          <Link
            to="/login"
            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </Link>
        )}
        {location.pathname !== "/register" && (
          <Link
            to="/register"
            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
