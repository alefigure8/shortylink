import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext.js";
import "../styles/component/Nav.css"

function Nav() {
  const { session, logout } = useContext(SessionContext);

  function handleLogout()
  {
    logout(null);
  }

  return (
    <>
      <nav>
        <div className="nav-options">
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="#about">Acerca de</a>
            </li>
            <li>
              <a href="#services">Servicios</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </div>
        <div className="nav-user">
          {session?.email ? (
            <ul>
              <li>
                <Link to="/account">
                  {session.email}
                  </Link>
              </li>
              <li><a onClick={() => handleLogout()}>Logout</a></li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
