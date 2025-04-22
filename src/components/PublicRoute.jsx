import { Navigate } from "react-router-dom";
import { getAuthToken } from "../services/api";

export default function PublicRoute({ children }) {
    console.log("PublicRoute children", children);
  const token = getAuthToken();
  console.log("PublicRoute token", token);
  return !token ? children : <Navigate to="/" />;
}
