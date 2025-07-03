// LinkProvider.jsx
import { useCallback, useContext, useState } from "react";
import { LinkContext } from "./LinkCreateContext.js";
import { createLink } from "../service/linkService.js";
import { SessionContext } from "./sessionContext.js";
import useLoading from "../hooks/useLoading.js";
import useMessage from "../hooks/useMessage.js";

export function LinkProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [urlError, setUrlError] = useState("");

  // Estado para almacenar los datos del formulario
  const [form, setForm] = useState({
    originalurl: "",
    name: "",
    customName: "",
    password: "",
  });

  // Estado para almacenar la respuesta del servidor y errores
  const [response, setResponse] = useState(null);

  // Estado para manejar errores al enviar el formulario
  const [error, setError] = useState(null);
  const { showMessage } = useMessage();
  const { startLoading, stopLoading } = useLoading();

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [id]: value, // Utilizar el id del input como clave
    }));

    if (id == "originalurl") {
      if (value.startsWith("http://")) {
        setUrlError(
          'Por razones de seguridad, solo se permiten URLs HTTPS (deben empezar con "https://").'
        );
      } else {
        setUrlError("");
      }
    }
  };

  // Función para manejar el clic del botón y enviar el formulario
  const handleButtonClick = async () => {
    if (urlError) {
      return;
    }

    try {
      startLoading();
      const response = await createLink({
        originalurl: form.originalurl,
        name: form.name,
        customName: form.customName,
        password: form.password,
        token: session?.token || null,
      });
      setResponse(response);
      setError(null);
      setForm({ originalurl: "", name: "", customName: "" }); // Limpiar el formulario después de enviar
    } catch (error) {
      showMessage(error.message, "error");
      setError(error);
      setResponse(null);
    } finally {
      stopLoading();
    }
  };

  // Función para limpiar la respuesta (cerrar el alert)
  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const closeError = useCallback(() => {
    setError(false);
  }, []);

  return (
    <LinkContext.Provider
      value={{
        form,
        error,
        closeError,
        response,
        handleInputChange,
        handleButtonClick,
        clearResponse,
        urlError,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}
