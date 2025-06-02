// LinkProvider.jsx
import { useState } from "react";
import { LinkContext } from "./LinkCreateContext.js";
import createLink from "../service/linkService.js"; 

export function LinkProvider({ children }) {
  // Estado para almacenar los datos del formulario
  const [form, setForm] = useState({
    originalurl: "",
    name: "",
  });

  // Estado para almacenar la respuesta del servidor y errores
  const [response, setResponse] = useState(null);

  // Estado para manejar errores al enviar el formulario
  const [error, setError] = useState(null);

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [id]: value, // Utilizar el id del input como clave
    }));
  };

  // Función para manejar el clic del botón y enviar el formulario
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
    <LinkContext.Provider value={{ form, error, setError, response, handleInputChange, handleButtonClick }}>
      {children}
    </LinkContext.Provider>
  );
}
