import { Navigate, Outlet } from "react-router-dom";
import useSession from "../hooks/useSession.js";
import { isTokenExpired } from "../util/tokenUtil.js";
import Spinner from "../component/spinner/Spinner.jsx"

export default function ProtectedRoute() {
  const { isAuthenticated, session, loading } = useSession();

  if (loading) {
    return <div><Spinner /></div>;
  }

  if (!isAuthenticated || isTokenExpired(session)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
