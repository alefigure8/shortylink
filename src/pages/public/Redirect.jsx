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
        <h1>REDIRECT</h1>
    </>)
}

export default Redirect;