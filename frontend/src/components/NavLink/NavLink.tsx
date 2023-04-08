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
  ];
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="border-cyan-100">
      <ul className="flex flex-row gap-x-3">
        {NavList.map((list, index) => (
          <li key={index} className="flex flex-row">
            <Link to={list.url}>{list.name}</Link>
            {list.child && <RiArrowDropDownLine className="self-center" onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setInterval(() => setIsActive(false), 3000)} />}
            {list.child && (
              <div className={`absolute transition-all ${isActive ? "opacity-100" : "opacity-0"}`}>
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
