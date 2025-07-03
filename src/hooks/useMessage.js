import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function useMessage()
{
    return useContext(MessageContext)
}

export default useMessage;