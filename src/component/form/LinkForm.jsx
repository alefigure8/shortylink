import ErrorAlert from "../alerts/ErrorAlert.jsx";
import { useEffect } from "react";
import { LinkContext } from "../../context/LinkCreateContext.js";
import { useContext } from "react";

function LinkForm() {

  const { form, error, setError, handleInputChange, handleButtonClick } = useContext(LinkContext);

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
        <div className="login-link">
          <a href="#">Crear Usuario</a>
          <span> | </span>
          <a href="#">Iniciar Sesión</a>
        </div>
        {error && <ErrorAlert error={error} />}
      </div>
    </>
  );
}

export default LinkForm;
