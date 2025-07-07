import { useEffect } from "react";
import useLinks from "../../hooks/useLinks";
import { useParams } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import Spinner from "../../component/spinner/Spinner";

function Redirect()
{
    const {isLoading} = useLoading()
    const {redirectToLink} = useLinks();
    const {id} = useParams();

    useEffect( () => {
        const redirect = async() => 
        {
            await redirectToLink(id)
        }
        redirect();
    }, [id, redirectToLink])

    if(isLoading)
    {
        return <Spinner />
    }
        
    return(<>
            <div className="error-container">
      <div className="error-card">
        <img
          src="/img/waitingNarco.png"
          alt="Enlace roto o no encontrado"
          className="error-image"
        />
        <p className="error-message">
          Aguarda mientras la página a la que se está dirigiendo termine de cargarse.
        </p>
      </div>
    </div>
    </>)
}

export default Redirect;