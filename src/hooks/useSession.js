import { useContext } from "react";
import { SessionContext } from "../context/sessionContext";

function useSession()
{
    return useContext(SessionContext);
}

export default useSession;