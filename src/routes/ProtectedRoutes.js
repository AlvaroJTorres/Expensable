import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/Login" />;
}

export function ProtectedRegistrationRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/Categories" /> : children;
}
