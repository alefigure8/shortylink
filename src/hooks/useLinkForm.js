import { useState } from "react";
import createLink from "../service/linkService.js"; 

/**
 * 
 * @returns {Object} Hook que maneja el formulario de creación de enlaces.
 * @property {Object} form - Objeto que contiene los datos del formulario.
 * @property {Function} handleInputChange - Función para manejar los cambios en los inputs del formulario.
 * @property {Function} handleButtonClick - Función para manejar el clic del botón y enviar el formulario.
 * @property {Object|null} response - Respuesta del servidor después de enviar el formulario.
 * @property {Object|null} error - Error al enviar el formulario, si ocurre.
 * @description Este hook se encarga de gestionar el estado del formulario, manejar los cambios en los inputs y enviar los datos al servidor para crear un enlace corto.
 */
function useLinkForm() {
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

  return {
    form,
    response,
    error,
    setError,
    handleInputChange,
    handleButtonClick,
  };
}

export default useLinkForm;
