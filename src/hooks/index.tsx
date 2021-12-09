import React from "react";
import { ProviderProps } from "../common/interfaces";

import { AuthProvider } from "./auth";

function AppProvider({ children }: ProviderProps) {
    return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
