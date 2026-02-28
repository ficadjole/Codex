import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { DeleteValueByKey, ReadValueByKey, SaveValueByKey } from '../../helpers/local_storage';
import { jwtDecode } from 'jwt-decode';
import type { AuthContextType } from '../../types/auth/AuthContext';
import type { JwtTokenClaims } from '../../types/auth/JwtTokenClaims';
import type { AuthUser } from '../../types/auth/AuthUser';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeJWT = (token: string): JwtTokenClaims | null => {
    try {
        const decoded = jwtDecode<JwtTokenClaims>(token);
        console.log(decoded)
        if (decoded.id && decoded.username && decoded.userRole) {
            return {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                userRole: decoded.userRole
            };
        }

        return null;
    } catch (error) {
        console.error('Error while decoding JWT token:', error);
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp ? decoded.exp < currentTime : false;
    } catch {
        return true;
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = ReadValueByKey("authToken");

        if (savedToken) {
            if (isTokenExpired(savedToken)) {
                DeleteValueByKey("authToken");
                setIsLoading(false);
                return;
            }

            const claims = decodeJWT(savedToken);
            if (claims) {
                setToken(savedToken);
                setUser({
                    userId: claims.id,
                    username: claims.username,
                    email: claims.email,
                    userRole: claims.userRole
                });
            } else {
                DeleteValueByKey("authToken");
            }
        }

        setIsLoading(false);
    }, []);

    const login = (newToken: string) => {
        const claims = decodeJWT(newToken);

        if (claims && !isTokenExpired(newToken)) {
            setToken(newToken);
            setUser({
                userId: claims.id,
                username: claims.username,
                email: claims.email,
                userRole: claims.userRole
            });
            SaveValueByKey("authToken", newToken);
        } else {
            console.error('Invalid or expired token');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        DeleteValueByKey("authToken");
    };

    const isAuthenticated = !!user && !!token;

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;