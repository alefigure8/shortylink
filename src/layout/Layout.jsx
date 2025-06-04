import { Outlet } from "react-router-dom";
import Footer from "../component/Footer.jsx";
import Nav from "../component/Nav.jsx";
import "../styles/layout/Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Nav />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
