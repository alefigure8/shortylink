import { useCallback, useEffect, useState } from "react";
import { SessionContext } from "./sessionContext";
import {
  getSession,
  saveSession,
  clearSession,
  logoutService,
  refreshTokenService,
} from "../service/sessionService";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const {showMessage} = useMessage();

  const loadSession = useCallback(() => {
    try {
      startLoading();
      const currentSession = getSession();
      if (currentSession) {
        setSession(currentSession);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setSession(null);
        setIsAuthenticating(false);
      }
    } catch (error) {
      showMessage(error.message, 'error')
      setIsAuthenticated(false);
      setSession(null);
    } finally {
      setIsAuthenticating(false);
      stopLoading();
    }
  }, [startLoading, stopLoading, showMessage]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const updateSession = useCallback((newSession) => {
    setSession(newSession);
    saveSession(newSession);
    setIsAuthenticated(true);
  },[setSession, setIsAuthenticated]);

  const logout = useCallback(async () => {
    // ¡Asegúrate de que logout es useCallback!
    clearSession();
    setSession(null);
    setIsAuthenticated(false);
    await logoutService(session);
  }, [session, setSession, setIsAuthenticated]);

  const refresh = useCallback(async () => {
    try {
      startLoading();
      const currentSession = await refreshTokenService(session);
      if (currentSession) {
        updateSession(currentSession);
      }
    } catch (error) {
      showMessage(error.message, 'error');
      setIsAuthenticated(false);
      setSession(null);
    } finally {
      stopLoading();
    }
  },[startLoading, session, stopLoading, updateSession, showMessage]);

  return (
    <SessionContext.Provider
      value={{
        session,
        isAuthenticated,
        isAuthenticating,
        updateSession,
        logout,
        refresh,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
