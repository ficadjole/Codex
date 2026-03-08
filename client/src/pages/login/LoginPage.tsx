import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthForm from "../components/authentification/AuthForm";
import type { IAuthAPIService } from "../api_services/authApi/IAuthAPIService";
import AuthContext from "../contexts/auth_context/AuthContext";

interface LoginPageProps {
  authApi: IAuthAPIService;
}

export default function LoginPage({ authApi }: LoginPageProps) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext not found");
  }

  const { login } = authContext;

  const handleLoginSuccess = (token: string) => {
    login(token);
    navigate("/");
  };

  return (
    <AuthForm
      authApi={authApi}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}