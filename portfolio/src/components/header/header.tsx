import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../assets/WM I.svg";
import icon from "../../assets/ICON BW M.svg";

const Header: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className={styles.backGround}></div>
      <nav>
        <img src={logo} alt="Logo" className={styles.logo} />

        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>

        <img src={icon} alt="Logo" className={styles.logo} />
      </nav>
    </div>
  );
};

export default Header;
