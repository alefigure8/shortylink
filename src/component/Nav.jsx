import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/component/Nav.css";
import useSession from "../hooks/useSession.js";
import { useState, useRef, useEffect } from "react";

function Nav({ scrolled }) {
  const { session, logout } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  async function handleLogout() {
    logout(null);
  }

  // Cierra el menú si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={scrolled ? "nav--scrolled" : ""}>
        <div className="nav-options">
          <ul>
            <li>
              <a href="/" className="nav-title">
                LNKY
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-user">
          {session?.email ? (
            <ul>
              <li style={{ position: "relative" }} ref={menuRef}>
                <span
                  className="nav-user-email"
                  tabIndex={0}
                  onClick={() => setMenuOpen((open) => !open)}
                  style={{ cursor: "pointer" }}
                >
                  {session.email}
                </span>
                {menuOpen && (
                  <div className="nav-dropdown-menu">
                    <button type="button" className="nav-dropdown-item" onClick={() => { setMenuOpen(false); navigate("/account"); }}>
                      Home
                    </button>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setMenuOpen(false); navigate("/account/profile"); }}>
                      Profile
                    </button>
                  </div>
                )}
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
