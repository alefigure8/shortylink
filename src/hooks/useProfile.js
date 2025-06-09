import { useContext } from "react";
import { UserContext } from "../context/userContext";

function useProfile()
{
    return useContext(UserContext);
}

export default useProfile;