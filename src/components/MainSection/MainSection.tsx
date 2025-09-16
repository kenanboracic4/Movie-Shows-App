import React, { useState } from "react";
import "./MainSection.css";
import Search from "./Search";

const MainSection = () => {
  interface NavItem {
    id: string;
    name: string;
    href?: string;
  }

  const navItems: NavItem[] = [
    { id: "all", name: "All" },
    { id: "movies", name: "Movies" },
    { id: "tv-shows", name: "TV Shows" },
  ];

  const [active, setActive] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleItemClick = (id: string) => {
    setActive(id);
  };
  return (
    <>
      <div className="main-section">
        <div className="main-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={
                item.id === active ? "active-main-nav" : "main-nav-item"
              }
            >
              {item.name}
            </a>
          ))}
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
      </div>
    </>
  );
};

export default MainSection;
