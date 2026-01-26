import React from "react";
import styles from "./footer.module.css";
import logo from "../../assets/WM I.svg";


const Footer: React.FC = () => {
  return (
    <img src={logo} alt="Logo" className={styles.logo} />
  );
};

export default Footer;