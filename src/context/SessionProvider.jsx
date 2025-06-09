import { useEffect, useState } from "react";
import { SessionContext } from "./sessionContext";
import {
  getSession,
  saveSession,
  clearSession,
} from "../service/sessionService";

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentSession = getSession();

    if (currentSession) {
      setSession(currentSession);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const updateSession = (newSession) => {
    setSession(newSession);
    saveSession(newSession);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearSession();
    setSession(null);
    setIsAuthenticated(false);
  };

  return (
    <SessionContext.Provider
      value={{ session, loading, isAuthenticated, updateSession, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
}
