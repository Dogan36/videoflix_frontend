import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../services/api";

export default function PrivateRoute({ children }) {
  const token = getAuthToken();
  return token ? children : <Navigate to="/login" />;
}
