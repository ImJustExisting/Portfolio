import { Outlet } from "react-router-dom";

export default function ProjectsLayout() {
  return (
    <>
      <main style={{ padding: 16 }}>
        <h1>Projects</h1>
        <Outlet />
      </main>
    </>
  );
}
