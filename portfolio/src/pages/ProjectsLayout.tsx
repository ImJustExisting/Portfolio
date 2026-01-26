import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ProjectsLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 16 }}>
        <h1>Projects</h1>
        <Outlet />
      </main>
    </>
  );
}
