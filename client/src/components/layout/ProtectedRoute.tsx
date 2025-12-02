import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}