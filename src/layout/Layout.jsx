import { Outlet, useLocation } from "react-router-dom";
import Footer from "../component/Footer.jsx";
import Nav from "../component/Nav.jsx";
import "../styles/layout/Layout.css";
import { useState } from "react";

function Layout() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="layout">
      <header className="layout-header">
        <Nav scrolled={scrolled} />
      </header>
      <main className="layout-content">
          <Outlet context={{ scrolled, setScrolled }} />
      </main>
      <footer className="layout-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
