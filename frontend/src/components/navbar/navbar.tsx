import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import NavLink from "../NavLink/NavLink";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  let location = useLocation();
  const { user, logout } = useContext(AuthContext);
  console.log({ user });
  return (
    <div className="border-2">
      <nav className="flex flex-row justify-between p-3 items-center container m-auto flex-wrap">
        <div className="logo">
          <Link to="/">
            <img src="/static/img/logo-itera.png" className="" />
          </Link>
        </div>
        <NavLink />
      </nav>
    </div>
  );
};

export default Navbar;
