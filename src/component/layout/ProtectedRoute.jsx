import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SessionContext } from "../../context/sessionContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(SessionContext);

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;

}
