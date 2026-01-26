import React from "react";
import styles from "./header.module.css";
import logo from "../../assets/WM I.svg";
import icon from "../../assets/ICON BW M.svg";

const Header: React.FC = () => {
  const navItems = ["Home", "About", "Projects", "Contact"];
  return (
    <div className="min-h-screen bg-gray-900">
      <div className={styles.backGround}></div>
      <nav>
        <img src={logo} alt="Logo" className={styles.logo} />
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                className={styles.hexagonLink}
              >
                <span className={styles.hexagonLinkText}>{item}</span>
              </a>
            </li>
          ))}
        </ul>
        <img src={icon} alt="Logo" className={styles.logo} />
      </nav>
    </div>
  );
};

export default Header;
