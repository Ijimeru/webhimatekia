import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { AuthContext } from "../../context/AuthContext";
export default function NavLink() {
  const NavList: {
    name: string;
    url: string;
    child?: { name: string; url: string }[];
  }[] = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Sejarah Himpunan",
      url: "/sejarah",
    },
    {
      name: "Profil Himpunan",
      url: "/profil",
    },
    {
      name: "Kepengurusan",
      url: "/kepengurusan",
      child: [
        {
          name: "2018",
          url: "/kepengurusan/2018",
        },
        {
          name: "2019",
          url: "/kepengurusan/2019",
        },
        {
          name: "2020",
          url: "/kepengurusan/2020",
        },
      ],
    },
    {
      name: "Perpustakaan",
      url: "/perpustakaan",
      child: [
        {
          name: "Semester 1",
          url: "/perpustakaan/semester 1",
        },
        {
          name: "Semester 2",
          url: "/perpustakaan/semester 2",
        },
      ],
    },
  ];
  const { user, logout } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const [subLink, setSubLink] = useState("");
  return (
    <>
      <div className="border-cyan-100 ">
        <ul className="gap-x-3 hidden md:flex md:flex-row">
          {NavList.map((list, index) => (
            <li key={index} className="flex flex-row relative">
              <Link to={list.url}>{list.name}</Link>
              {list.child && (
                <RiArrowDropDownLine
                  className="self-center cursor-pointer text-lg"
                  onMouseEnter={() => (subLink !== list.name ? setSubLink(list.name) : setSubLink(""))}
                  onMouseLeave={() => {
                    setTimeout(() => (subLink !== list.name ? setSubLink("") : setSubLink("list.name")), 300);
                  }}
                />
              )}
              {list.child && (
                <div
                  className={`absolute transition-all hover:opacity-100 hover:z-10 w-full top-10 bg-white border border-gray-100 ${subLink === list.name ? "opacity-100" : "opacity-0 -z-50"}`}
                  onMouseLeave={() => (subLink !== list.name ? setSubLink("") : setSubLink("list.name"))}
                >
                  <div className="w-3 h-3 rotate-45 absolute right-0 top-[-0.3rem] border-t border-l border-gray-100 z-50"></div>
                  <ul>
                    {list.child.map((i, j) => (
                      <li key={j}>
                        <Link key={j} to={i.url}>
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col fixed z-10 top-0 left-0 right-[55%] md:hidden bg-black text-white bottom-0 overflow-scroll text-xl gap-y-10">
          {NavList.map((list, index) => (
            <li key={index} className="flex relative border-b-2">
              <Link to={list.url}>{list.name}</Link>
              {list.child && (
                <RiArrowDropDownLine
                  className="self-center cursor-pointer text-lg"
                  onMouseEnter={() => (subLink !== list.name ? setSubLink(list.name) : setSubLink(""))}
                  onMouseLeave={() => {
                    setTimeout(() => (subLink !== list.name ? setSubLink("") : setSubLink("list.name")), 300);
                  }}
                />
              )}
              {list.child && (
                <div
                  className={`absolute transition-all hover:opacity-100 hover:z-10 w-full top-10 bg-white border border-gray-100 ${subLink === list.name ? "opacity-100" : "opacity-0 -z-50"}`}
                  onMouseLeave={() => (subLink !== list.name ? setSubLink("") : setSubLink("list.name"))}
                >
                  <div className="w-3 h-3 rotate-45 absolute right-0 top-[-0.3rem] border-t border-l border-gray-100 z-50"></div>
                  <ul>
                    {list.child.map((i, j) => (
                      <li key={j}>
                        <Link key={j} to={i.url}>
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-x-2">
        <div className="login-register flex gap-x-2">
          {!user ? (
            <>
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
            </>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              logout
            </button>
          )}
        </div>
        {active ? (
          <>
            <GrClose className="block md:hidden self-center cursor-pointer" onClick={() => setActive((prev) => !prev)} />{" "}
            <span className="md:hidden self-center cursor-pointer" onClick={() => setActive((prev) => !prev)}>
              Menu
            </span>
          </>
        ) : (
          <>
            <GiHamburgerMenu className="block md:hidden self-center cursor-pointer" onClick={() => setActive((prev) => !prev)} />{" "}
            <span className="md:hidden self-center cursor-pointer" onClick={() => setActive((prev) => !prev)}>
              Menu
            </span>
          </>
        )}
      </div>
    </>
  );
}
