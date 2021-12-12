import React, { createContext, useState, useContext, useEffect } from "react";
import {
    AuthContextData,
    ProviderProps,
    AuthState,
    SigInCredentials,
    User,
} from "../common/interfaces";
import { database } from "../database";
import { User as ModelUser } from "../database/model/User";
import api from "../services/api";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: ProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);

    async function signIn({ email, password }: SigInCredentials) {
        try {
            const response = await api.post("/sessions", {
                email,
                password,
            });

            const { token, user } = response.data;

            api.defaults.headers["authorization"] = `Bearer ${token}`;

            const userCollection = database.get<ModelUser>("users");
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser.user_id = user.id;
                    newUser.name = user.name;
                    newUser.email = user.email;
                    newUser.driver_license = user.driver_license;
                    newUser.avatar = user.avatar;
                    newUser.token = user.token;
                });
            });

            setData({ token, user });
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        const loadUserData = async () => {
            const userCollection = database.get<ModelUser>("users");
            const response = await userCollection.query().fetch();

            if (response.length > 0) {
                const user = response[0]._raw as unknown as User;
                api.defaults.headers["authorization"] = `Bearer ${user.token}`;

                setData({ user, token: user.token });
            }
        };

        loadUserData();
    }, []);

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
