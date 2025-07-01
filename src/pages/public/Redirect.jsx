import { useEffect } from "react";
import useLinks from "../../hooks/useLinks";
import { useParams } from "react-router-dom";

function Redirect()
{
    const {redirectToLink} = useLinks();
    const {id} = useParams();
    useEffect( () => {
        const redirect = async() => 
        {
            await redirectToLink(id)
        }
        redirect();
    }, [id])

    return(<>
        <h1>REDIRECT</h1>
    </>)
}

export default Redirect;