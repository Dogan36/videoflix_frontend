import { Navigate } from "react-router-dom";
import { getAuthToken } from "../services/api";

export default function PublicRoute({ children }) {
  const token = getAuthToken();
  return !token ? children : <Navigate to="/" />;
}
