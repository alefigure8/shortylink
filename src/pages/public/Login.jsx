import "../../styles/pages/Login.css";
import useLogin from "../../hooks/useLogin.js";
import { useEffect } from "react";

function Login() {
  const { dataForm, loginError, handleSubmit, inputFormHandle } = useLogin();
  
  // Scroll to top when component mounts or when link changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login-main">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="login-input"
            onChange={inputFormHandle}
            value={dataForm.email}
          />
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="login-input"
            onChange={inputFormHandle}
            value={dataForm.password}
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes una cuenta?</p>
          <a href="/register" className="login-register-link">
            Regístrate aquí
          </a>
        </div>

        {loginError && <p className="login-error">{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;
