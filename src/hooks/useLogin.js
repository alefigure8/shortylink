import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/sessionContext";
import { saveSession } from "../service/sessionService";
import { loginService } from "../service/loginService";
import { isTokenExpired } from "../util/tokenUtil";

function useLogin() {
  const navigate = useNavigate();

  const { updateSession } = useContext(SessionContext);
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

      if(isTokenExpired(response)) {
        throw new Error("Token expirado, por favor inicia sesión nuevamente.");
      }
      
      saveSession(response);
      updateSession(response);
      navigate("/account");
    } catch (error) {
      setLoginError(error.message || "Error desconocido");
    }
  };

  return {
    loginError,
    dataForm,
    inputFormHandle,
    handleSubmit,
  };
}

export default useLogin;
