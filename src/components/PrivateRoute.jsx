import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../services/api";

/**
 * PrivateRoute component that checks if the user is authenticated.
 * If authenticated, it renders the children components.
 * If not authenticated, it redirects to the login page.
 */
export default function PrivateRoute({ children }) {
  const token = getAuthToken();
  return token ? children : <Navigate to="/login" />;
}
