import { useCallback, useState } from "react";
import { MessageContext } from "./MessageContext";
import Message from "../component/alerts/Message";

function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [messageId, setMessageId] = useState(1);

  const showMessage = useCallback(
    (text, messageType = "success", duration = 3000) => {
      setMessage(text);
      setType(messageType);
      setMessageId((prevKey) => prevKey + 1);
      setTimeout(() => {
        setMessage(null);
        setType(null);
      }, duration);
    },
    []
  );

  const clearMessage = useCallback(() => {
    setMessage(null);
    setType(null);
  }, []);

  return (
    <MessageContext.Provider
      value={{ showMessage, message, type, clearMessage }}
    >
      {children}
      {message && <Message key={messageId} text={message} type={type} />}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
