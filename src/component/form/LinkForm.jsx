import ErrorAlert from "../alerts/ErrorAlert.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLinkCreate from "../../hooks/useLinkCreate.js";
import useSession from "../../hooks/useSession.js";
import "../../styles/component/LinkForm.css";

function LinkForm() {
  const { form, error, setError, handleInputChange, handleButtonClick } =
    useLinkCreate();
  const { session } = useSession();

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error, setError]);

  return (
    <>
        <input
          type="text"
          id="originalurl"
          value={form?.originalurl}
          onChange={(e) => handleInputChange(e)}
          placeholder="Source Link (https://ejemplo.com)"
        />
        <input
          type="text"
          id="name"
          value={form?.name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Name"
        />
        {session && (        <input
          type="text"
          id="customName"
           value={form?.customName}
          onChange={(e) => handleInputChange(e)}
          placeholder="Custom name"
        />)}
        <button type="button" onClick={() => handleButtonClick()}>
          Crear Enlace
        </button>
        {!session && (
          <div className="login-link">
            <Link to="/register" className="text-blue-500 hover:underline">
              Create user
            </Link>
            <span> | </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Init Session
            </Link>
          </div>
        )}
        {error && <ErrorAlert error={error} />}
    </>
  );
}

export default LinkForm;
