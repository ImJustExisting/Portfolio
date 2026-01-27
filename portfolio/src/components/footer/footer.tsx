import { useAppSelector } from "../../store/hooks";
import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import logo from "../../assets/WM I.svg";
import GHDark from "../../assets/githubD.svg";
import GHLight from "../../assets/githubL.svg";
import LinkDark from "../../assets/linkedinD.svg";
import LinkLight from "../../assets/linkedinL.svg";

export default function Footer() {

  const mode = useAppSelector((state) => state.theme.mode);
  const github = mode === "dark" ? GHLight : GHDark;
  const linkedin = mode === "dark" ? LinkLight : LinkDark;


  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        {/* LEFT */}
        <div className={styles.footer__left}>
          <img className={styles.logo} src={logo} alt="Kaela Whelen logo" />
        </div>

        {/* CENTER */}
          <div className={styles.footer__center}>
          <p className={styles.footer__copy}>© {new Date().getFullYear()} All rights reserved</p>
        </div>

        {/* RIGHT */}
        <div className={styles.footer__right}>
          {/* internal links if you want */}
          <nav className={styles.footer__nav} aria-label="Footer navigation">
            <NavLink to="/" className={styles.footer__link}>Home</NavLink>
            <NavLink to="/about" className={styles.footer__link}>About</NavLink>
            <NavLink to="/projects" className={styles.footer__link}>Projects</NavLink>
            <NavLink to="/contact" className={styles.footer__link}>Contact</NavLink>
          </nav>

          {/* icon links */}
          <div className={styles.footer__social} aria-label="Social links">
            <a
              className={styles.footer__iconLink}
              href="https://github.com/ImJustExisting"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <img className={styles.footer__icon} src={github} alt="" />
            </a>

            <a
              className={styles.footer__iconLink}
              href="https://linkedin.com/in/kaela-whelen-3790b0397"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <img className={styles.footer__icon} src={linkedin} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

