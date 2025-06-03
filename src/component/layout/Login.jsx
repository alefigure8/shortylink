import React, { useContext } from "react";
import { useState } from "react";
import { loginService } from "../../service/loginService.js";
import { Link } from "react-router-dom";
import { saveSession } from "../../service/sessionService.js";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext.js";

function Login() {
  const { updateSession } = useContext(SessionContext);

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const inputFormHandle = (event) => {
    const { id, value } = event.target;
    setDataForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);
    try {
      const response = await loginService(dataForm);
      saveSession(response);
      updateSession(response);
      navigate("/account");
    } catch (error) {
      setLoginError(error.message || "Error desconocido");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => inputFormHandle(e)}
          value={dataForm.email}
        />
        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => inputFormHandle(e)}
          value={dataForm.password}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
      <div className="flex flex-col items-center mt-4">
        <p className="text-gray-600">¿No tienes una cuenta?</p>
        <a href="/register" className="text-blue-500 hover:underline">
          Regístrate aquí
        </a>
      </div>
      <div>{loginError && <p className="text-red-500">{loginError}</p>}</div>
    </>
  );
}

export default Login;
