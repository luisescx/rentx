import React, { createContext, useState, useContext } from "react";
import {
    AuthContextData,
    ProviderProps,
    AuthState,
    SigInCredentials,
} from "../common/interfaces";
import api from "../services/api";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: ProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);

    async function signIn({ email, password }: SigInCredentials) {
        const response = await api.post("/sessions", {
            email,
            password,
        });

        const { token, user } = response.data;

        api.defaults.headers["authorization"] = `Bearer ${token}`;

        setData({ token, user });
    }

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
