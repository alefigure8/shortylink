import { useState } from "react";
import "../../styles/pages/Register.css";
import { registerUser } from "../../service/userService.js";
import useSession from "../../hooks/useSession.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { updateSession } = useSession();

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { id, value } = event.target;
    setFormRegister((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var session = await registerUser(formRegister);
    updateSession(session);
    navigate("/account");
  };

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <h1>Registro</h1>
          <form className="register-form">
            <label>Nombre</label>
            <input
              id="firstName"
              type="text"
              placeholder="ingrese su nombre"
              value={formRegister?.firstName}
              onChange={(e) => handleInput(e)}
            />
            <label>Apellido</label>
            <input
              id="lastName"
              type="text"
              placeholder="ingrese su nombre"
              value={formRegister?.lastName}
              onChange={(e) => handleInput(e)}
            />
            <label>Email</label>
            <input
              id="email"
              type="email"
              placeholder="ingrese su nombre"
              value={formRegister?.email}
              onChange={(e) => handleInput(e)}
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              placeholder="ingrese su nombre"
              value={formRegister?.password}
              onChange={(e) => handleInput(e)}
            />
            <button onClick={(e) => handleSubmit(e)} className="btn">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
