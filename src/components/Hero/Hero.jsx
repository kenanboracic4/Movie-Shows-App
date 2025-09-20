import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Gateway to the World of<span className="highlight"> Movies & TV</span> </h1>
        <h3>
          Dive into the world of cinema and TV — discover, search, and explore
          without limits.
        </h3>
        <Link to="/main/movies" className="explore-button">Explore Now</Link>
      </div>
    </section>
  );
};

export default Hero;
