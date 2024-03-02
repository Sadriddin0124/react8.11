"use client";
import React, { useState } from "react";
import "./SideBar.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const [sidebarLinks, setSidebarLinks] = useState([
    { value: "Books", path: "/dashboard" },
    { value: "Authors", path: "/dashboard/authors" },
    { value: "Genres", path: "/dashboard/genres" },
  ]);
  const pathname = usePathname();
  return (
    <div className="sidebar fixed">
      <Image src={"/logo.jpg"} alt="logo" width={300} height={300} />
      <ul className="sidebar__list">
        {sidebarLinks?.map((item, index) => (
          <li
            key={index}
            className={`sidebar__link ${
              pathname === item.path ? " bg-slate-200" : ""
            }`}
          >
            <div
              className={`${
                pathname === item.path ? "opacity-[1]" : "opacity-0"
              } h-[100%] w-[10px] bg-violet-500 absolute top-0 right-[-20px] rounded-s-[10px]`}
            ></div>
            <Link href={item.path}>{item.value}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
