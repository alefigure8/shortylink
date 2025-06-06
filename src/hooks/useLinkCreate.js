import { useContext } from "react";
import { LinkContext } from "../context/LinkCreateContext";

function useLinkCreate()
{
    return useContext(LinkContext);
}

export default useLinkCreate;