import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("admin" | "user" | "investigator")[]; // Allowed roles
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect unauthorized users
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
