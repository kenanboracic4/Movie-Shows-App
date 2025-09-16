import  { useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="container">
      <div className="main-container">
        <img src={logo} alt="" />

        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <a href="#">Movies</a>
          <a href="#">TV Shows</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
