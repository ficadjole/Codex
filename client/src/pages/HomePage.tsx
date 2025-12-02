import { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/auth_context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AutentifikacionaForma from "../components/autentifikacija/AutentifikacionaForma";
import type { IAuthAPIService } from "../api_services/authApi/IAuthAPIService";

export default function HomePage({ authApi }: { authApi: IAuthAPIService }) {
    const auth = useContext(AuthContext);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [localUser, setLocalUser] = useState(auth!.user);

    // useEffect(() => {
    //     if (auth?.user) {
    //         setLocalUser(auth.user);
    //     }
    // }, [auth?.user]);

    // useEffect(() => {
    //     const fetchFullUser = async () => {
    //         if (auth?.user && auth?.token) {
    //             const fullUser = await usersApi.getUserById(auth.token, auth.user.id);
    //             setLocalUser(fullUser);
    //         }
    //     };
    //     fetchFullUser();
    // }, [auth?.user, auth?.token]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onLoginClick={() => setShowAuthForm(true)} />

            <main className="flex-1 container mx-auto p-4">
                <h1 className="text-3xl mb-4">Welcome to Dekaton</h1>

                {auth?.isAuthenticated && (
                    <p>Hello, {auth.user?.username}! You can now order books.</p>
                )}

                {/* Ostale sekcije: BooksList, Recommended, Search... */}
            </main>

            <Footer />

            {/* AuthForm modal */}
            {showAuthForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-700"
                            onClick={() => setShowAuthForm(false)}
                        >
                            ×
                        </button>
                        <AutentifikacionaForma
                            authApi={authApi}
                            onLoginSuccess={() => setShowAuthForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
