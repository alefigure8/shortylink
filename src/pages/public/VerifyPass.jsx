import { useState } from "react";
import useLinks from "../../hooks/useLinks";
import { useParams } from "react-router-dom";
import  useLoading  from "../../hooks/useLoading";
import Spinner from "../../component/spinner/Spinner";

function VerifyPass() {
  const [dataForm, setDataForm] = useState({password: ""});
  const { verifyPass } = useLinks();
  const {id} = useParams();
  const {isLoading} = useLoading();


  const handleSubmit = async (event) => {
    event.preventDefault();
    await verifyPass({password: dataForm.password, id});
  };

  const inputFormHandle = (event) => {
    const { id, value } = event.target;
    setDataForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  if(isLoading)
  {
    return <Spinner />
  }

  return (
    <>
      <div className="login-main">
        <div className="login-container">
          <h1 className="login-title">Credenciales</h1>
          <p>El link al que quiere acceder se encuentra protegido. Ingrese la clave para poder ser redirigido.</p>
          <form onSubmit={(e) => handleSubmit(e)} className="login-form">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="login-input"
              onChange={inputFormHandle}
              value={dataForm.password}
            />
            <button type="submit" className="login-button">
              Enviar
            </button>
          </form>

          <div className="login-footer">
            <p>¿No tienes una cuenta?</p>
            <a href="/register" className="login-register-link">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyPass;
