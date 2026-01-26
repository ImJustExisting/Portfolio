import { NavLink } from "react-router-dom";
import Logo from '../../assets/WM M.svg';

export default function Navbar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? 700 : 400,
    textDecoration: "none",
    marginRight: 12,
  });

  return (
    <>
      <nav style={{ padding: 16 }}>
        <img src={Logo} alt="Logo" style={{ width: 100, height: 100 }} />
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
      </nav>
    </>
  );
}
