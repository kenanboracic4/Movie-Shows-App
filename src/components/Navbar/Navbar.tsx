import  { useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="container">
      <div className="main-container">
        <Link to="/"><img src={logo} alt="" /></Link>

        
      </div>
    </header>
  );
}

export default Navbar;
