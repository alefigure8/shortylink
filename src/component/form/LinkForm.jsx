import ErrorAlert from "../alerts/ErrorAlert.jsx";
import { Link } from "react-router-dom";
import useLinkCreate from "../../hooks/useLinkCreate.js";
import useSession from "../../hooks/useSession.js";
import "../../styles/component/LinkForm.css";

function LinkForm() {
  const { form, handleInputChange, handleButtonClick, urlError } = useLinkCreate();
  const { session } = useSession();

  return (
    <div className="input-section">
      <input
        type="text"
        id="originalurl"
        value={form?.originalurl}
        onChange={(e) => handleInputChange(e)}
        placeholder="Source Link (https://ejemplo.com)"
      />
      {urlError && <p style={{ color: 'red', fontSize: '0.8em' }}>{urlError}</p>}
      {session && (

      <input
        type="text"
        id="name"
        value={form?.name}
        onChange={(e) => handleInputChange(e)}
        placeholder="Name"
      />
      )}
      {session && (
        <input
          type="text"
          id="customName"
          value={form?.customName}
          onChange={(e) => handleInputChange(e)}
          placeholder="Custom name"
        />
      )}
      {session && (
        <input
          type="password"
          id="password"
          value={form?.password}
          onChange={(e) => handleInputChange(e)}
          placeholder="Password"
        />
      )}
      <button type="button" onClick={() => handleButtonClick()}>
        Crear Enlace
      </button>
      {!session && (
        <div className="login-link-main">
          <Link to="/register" className="login-link-btn">
            Crear usuario
          </Link>
          <span className="login-link-sep">|</span>
          <Link to="/login" className="login-link-btn">
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export default LinkForm;
