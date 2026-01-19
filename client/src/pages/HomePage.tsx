import { useState } from "react";
import { useAuth } from "../hooks/auth/useAuthHook";
import type { IAuthAPIService } from "../api_services/authApi/IAuthAPIService";
import AuthForm from "../components/authentification/AuthForm";

export default function HomePage({ authApi }: { authApi: IAuthAPIService }) {
  const { user, isAuthenticated } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to TestApp</h1>
      </header>

      {!isAuthenticated ? (
        <>
          <button
            onClick={() => setShowAuthForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mb-4 transition"
          >
            Login / Register
          </button>
        </>
      ) : (
        <p className="text-xl text-gray-700 mb-4">
          Hello, {user?.username}! You are logged in.
        </p>
      )}

      {/* Modal AuthForm */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowAuthForm(false)}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              ×
            </button>
            <AuthForm
              authApi={authApi}
              onLoginSuccess={() => setShowAuthForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
