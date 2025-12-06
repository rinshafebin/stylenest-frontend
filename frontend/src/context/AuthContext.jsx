import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
    token: null,
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("access_token"));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (access, refresh, userData) => {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(access);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
