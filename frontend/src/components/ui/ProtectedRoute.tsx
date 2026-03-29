import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../utils/auth";

export default function ProtectedRoute() {
  console.log("ProtectedRoute rendered");

  const valid = isTokenValid();
  console.log("Token valid:", valid);

  if (!valid) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
