import React, { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { BsBook, BsShop } from "react-icons/bs";

const DashboardSidebar = () => {
  const { setSidebarActive, sidebarActive } = useContext(DashboardContext);
  const className = "fill-current h-full l-0 t-0 absolute w-full";
  const navLists: { name: string; link: string; icon: React.ReactElement }[] = [
    { name: "Dashboard", link: "/dashboard/", icon: <MdOutlineDashboard className={className} /> },
    { name: "Post Saya", link: "/posts/", icon: <BiNews className={className} /> },
    { name: "Buku", link: "/books/", icon: <BsBook className={className} /> },
    { name: "Barang Jual", link: "/items/", icon: <BsShop className={className} /> },
  ];
  const location = useLocation();
  return (
    <nav className={`bg-[#a33caa] max-h-[100vh] h-[100vh] overflow-x-hidden overflow-y-auto fixed top-0 transition-all ${sidebarActive ? "w-64" : "w-16"} duration-300`}>
      <div className="flex items-center bg-[linear-gradient(225deg,#784a7b_0%,#a33caa_400%)] justify-between transition-all dration-300">
        <Link to="/dashboard" className={`${!sidebarActive && "hidden"} p-4 w-full bg-transparent overflow-clip cursor-pointer`}>
          <span className="text-white font-semibold">HIMATEKIA</span>
        </Link>
        <button className="bg-transparent border-none items-center text-white flex shrink-0 h-16 justify-center p-0 w-16 overflow-visible normal-case m-0 leading-[1.15] cursor-pointer" onClick={() => setSidebarActive((prev) => !prev)}>
          <span className="inline-block h-6 relative align-middle w-6 normal-case leading-[1.15]">
            <GiHamburgerMenu className="fill-current h-full left-0 top-0 absolute w-full" />
          </span>
        </button>
      </div>
      <div>
        <ul>
          {navLists.map((list) => (
            <li className="list-item overflow-hidden w-full" key={list.name}>
              <Link to={list.link} className={`${list.link.includes(location.pathname) ? "bg-[rgba(0,0,0,0.25)] text-[#a33caa]" : null} text-white tracking-widest uppercase items-center flex justify-start w-full cursor-pointer`}>
                <div className="items-center text-current flex shrink-0 h-16 w-16 justify-center">
                  <span className="inline-block h-6 w-6 relative align-middle">{list.icon}</span>
                </div>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap block text-[0.8em] font-normal leading-[1] mb-0 p-4 pl-0 text-left w-full">{list.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
