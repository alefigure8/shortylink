import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";

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
              <a href="#home">Inicio</a>
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
                <p>{session.email}</p>
              </li>
              <li><a onClick={() => handleLogout()}>Logout</a></li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login" className="text-blue-500 hover:underline">
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
