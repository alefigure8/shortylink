import { Navigate, Outlet } from "react-router-dom";
import useSession from "../hooks/useSession.js";
import { isTokenExpired, shouldRefreshToken } from "../util/tokenUtil.js";
import Spinner from "../component/spinner/Spinner.jsx";

export default function ProtectedRoute() {
  const { isAuthenticated, isAuthenticating, session, refresh } = useSession();

  if (isAuthenticating){
    return <Spinner />;
  } 
  
  if (isAuthenticated && session && shouldRefreshToken(session)) {
    refresh();
  }

  if (!isAuthenticated || (session && isTokenExpired(session))) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}
