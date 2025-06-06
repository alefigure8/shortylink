import { useContext } from "react";
import { LinksContext } from "../context/LinksContext";

function useLinks()
{
    return useContext(LinksContext) ;
}

export default useLinks;