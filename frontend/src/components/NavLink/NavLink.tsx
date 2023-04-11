import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

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
  const [subLink, setSubLink] = useState("");
  return (
    <div className="border-cyan-100">
      <ul className="flex flex-row gap-x-3">
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
    </div>
  );
}
