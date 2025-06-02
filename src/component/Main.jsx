import React from "react";
import { useState } from "react";
import createLink from "../service/linkService.js"; // Asegúrate de que la ruta sea correcta

function Main() {
  const [form, setForm] = useState({
    originalurl: "",
    name: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [id]: value, // Utilizar el id del input como clave
    }));
  };

  const handleButtonClick = async () => {
    try {
      const response = await createLink({
        originalurl: form.originalurl,
        name: form.name,
      });
      setResponse(response);
      setError(null);
      setForm({ originalurl: "", name: "" }); // Limpiar el formulario después de enviar
    } catch (error) {
      setError(error);
      setResponse(null);
    }
  };

  return (
    <>
      <main className="container">
        <div className="main-section">
          <div className="main-content">
            <h1>Linky - Shorter Urls</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              iure libero soluta dicta quisquam exercitationem qui!
              Exercitationem nisi neque cupiditate veritatis illo error
              perferendis iste autem? Natus, sed repellat! Eius consectetur
              aliquam veritatis illum sint reprehenderit officia temporibus
              odit! Libero voluptatibus autem, hic nam modi deleniti quod
              reprehenderit ab optio?
            </p>
          </div>
          <div className="input-section">
            <label htmlFor="inputText">Escribe algo:</label>
            <input
              type="text"
              id="originalurl"
              value={form.originalurl}
              onChange={(e) => handleInputChange(e)}
              placeholder="https://ejemplo.com"
            />
            <input
              type="text"
              id="name"
              value={form.name}
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
            {error && (
              <div className="error-section">
                <p>Error al crear el enlace...</p>
              </div>
            )}
          </div>
          <div className="form-wrapper">
            {response && (
              <div className="response-section">
                <p>Respuesta del servidor:</p>
                <p>Nombre: {response.name}</p>
                <p>URL Original: {response.originalUrl}</p>
                <p>
                  Short URL: <a href={response.shortUrl}>{response.shortUrl}</a>
                </p>
                <p>
                  <strong>¡Enlace creado exitosamente!</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
