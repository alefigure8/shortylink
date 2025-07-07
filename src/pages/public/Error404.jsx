import { Link } from "react-router-dom";
import "../../styles/pages/error404.css"; // Importar el CSS

function Error404() {
  return (
    <div className="error-container">
      <div className="error-card">
        <img
          src="/img/404.png" // Ruta a la imagen en la carpeta public
          alt="Página no encontrada"
          className="error-image"
        />
        <h1 className="error-title">¡Oops! Página no encontrada</h1>
        <p className="error-message">
          Parece que te has perdido. La página que buscas no existe o ha sido
          movida.
        </p>
        <Link to="/" className="error-button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default Error404;
