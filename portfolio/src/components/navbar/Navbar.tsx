import { NavLink } from "react-router-dom";
import { toggleTheme } from "../../store/themeSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Logo from '../../assets/WM M.svg';
import LMODE from '../../assets/lightMode.svg';
import DMODE from '../../assets/darkMode.svg';

import style from './Navbar.module.css';


export default function Navbar() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const iconSrc = mode === "dark" ? LMODE : DMODE;
  const label = mode === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    
    <nav className={style.navbar}>
      <img src={Logo} alt="Logo" className={style.logo} />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>

      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className={style.ThemeIcon}
        aria-label={label}
        title={label}
      >
        <img src={iconSrc} alt="" />
      </button>
    </nav>
  );
}

