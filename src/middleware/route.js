import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Общая функция для проверки токена и роли
const getUserFromToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }

  return <Navigate to="/" replace={true} />;
};

export const Admin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const user = getUserFromToken(token);

  if (!user || user.role !== "admin") {
    console.warn("Access denied. User role:", user ? user.role : "unknown");
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
