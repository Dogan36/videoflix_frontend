import { Navigate } from "react-router-dom";
import { getAuthToken } from "../services/api";

/**
 * PublicRoute component that checks if the user is not authenticated.
 * If not authenticated, it renders the children components.
 * If authenticated, it redirects to the home page.
 */
export default function PublicRoute({ children }) {
  const token = getAuthToken();
  return !token ? children : <Navigate to="/" />;
}
