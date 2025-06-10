import { Link, Navigate } from "react-router-dom";
import "../styles/component/Nav.css";
import useSession from "../hooks/useSession.js";

function Nav() {
  const { session, logout } = useSession();

  async function handleLogout() {
    logout(null);
    
  }

  return (
    <>
      <nav>
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
              <li>
                <Link to="/account/profile">{session.email}</Link>
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
