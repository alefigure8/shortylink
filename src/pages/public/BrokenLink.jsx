import { Link } from "react-router-dom";
import "../../styles/pages/error404.css"; // Reutilizamos los estilos de la página 404

const BrokenLink = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <img
          src="/img/NoPizzaNoLink.png" // Imagen para enlace roto
          alt="Enlace roto o no encontrado"
          className="error-image"
        />
        <p className="error-message">
          Parece que el enlace que intentas visitar está roto, ha sido
          eliminado o nunca existió. ¡No te preocupes, no es tu culpa!
        </p>
        <Link to="/" className="error-button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default BrokenLink;