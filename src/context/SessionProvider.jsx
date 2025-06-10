import { useEffect, useState } from "react";
import { SessionContext } from "./sessionContext";
import {
  getSession,
  saveSession,
  clearSession,
  logoutService,
  refreshTokenService,
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

  const logout = async () => {
    clearSession();
    setSession(null);
    setIsAuthenticated(false);
    await logoutService(session);
  };

  const refresh = async () => {
    const currentSession = await refreshTokenService(session);
    if (currentSession) {
      updateSession(currentSession);
    }
    setLoading(false);
  };

  return (
    <SessionContext.Provider
      value={{ session, loading, isAuthenticated, updateSession, logout, refresh }}
    >
      {children}
    </SessionContext.Provider>
  );
}
