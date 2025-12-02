import { useContext } from "react";
import AuthContext from "../../contexts/auth_context/AuthContext";
import type { AuthContextType } from "../../types/auth/AuthContext";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used in AuthProvider');
    }
    return context;
};