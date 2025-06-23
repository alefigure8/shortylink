import { useEffect, useRef } from "react";
import "../../styles/component/ErrorMessage.css";

function ErrorAlert({ error, onClose }) {

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  if (!error ) {
    return null;
  }

  const isError = !!error;
  let messagesToDisplay = [];

  if (isError) {
    
    if (Array.isArray(Object.values(error.details))) {
      messagesToDisplay = Object.values(error.details).map(
        (detail) => detail
      );
    } else if (error && error.message) {
      messagesToDisplay = [error.message];
    } else {
      messagesToDisplay = ["Ha ocurrido un error inesperado."];
    }
  } 
  return (
    <>
      <div className="error-alert-overlay">
        <div className="error-alert" ref={alertRef}>
          <button className="close-button" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="error-header">
            <div className="error-icon">
              <i className="fas fa-xmark-circle"></i>
            </div>
            <h3>{error?.title}</h3>
          </div>
          <div className="error-content">
            <label>Detail: </label>
            {messagesToDisplay.length > 1 ? (
              <ul>
                {messagesToDisplay.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p>{messagesToDisplay[0]}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorAlert;
