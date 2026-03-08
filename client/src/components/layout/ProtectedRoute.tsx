import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { ProtectedRouteProps } from "../../types/props/protected_route_props/ProtectedRouteProps";

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}