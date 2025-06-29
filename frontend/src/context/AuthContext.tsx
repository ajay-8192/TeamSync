import { createContext, useContext, useState } from "react";
import type { AuthContextTypes, UserTypes } from "../types/contextTypes";

const AuthContext = createContext<AuthContextTypes | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUsers] = useState<UserTypes | null>(null);

    const login = (user: UserTypes) => {
        setUsers(user);
    }

    const logout = () => {
        setUsers(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextTypes => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
