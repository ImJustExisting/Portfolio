import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/footer";
import "./RootLayout.css";

export default function RootLayout() {
  return (
    <>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
