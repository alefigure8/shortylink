import ErrorAlert from "../alerts/ErrorAlert.jsx";
import { useEffect } from "react";
import { LinkContext } from "../../context/LinkCreateContext.js";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext.js";
import "../../styles/component/LinkForm.css"
function LinkForm() {
  const { form, error, setError, handleInputChange, handleButtonClick } =
    useContext(LinkContext);
  const { session } = useContext(SessionContext);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error, setError]);

  return (
    <>
      <div className="input-section">
        <label htmlFor="inputText">Escribe algo:</label>
        <input
          type="text"
          id="originalurl"
          value={form?.originalurl}
          onChange={(e) => handleInputChange(e)}
          placeholder="https://ejemplo.com"
        />
        <input
          type="text"
          id="name"
          value={form?.name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Nombre del enlace"
        />
        <button type="button" onClick={() => handleButtonClick()}>
          Crear Enlace
        </button>
        {!session && (
          <div className="login-link">
            <Link to="/register" className="text-blue-500 hover:underline">
              Crear usuario
            </Link>
            <span> | </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        )}
        {error && <ErrorAlert error={error} />}
      </div>
    </>
  );
}

export default LinkForm;
