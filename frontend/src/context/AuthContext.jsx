// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
    token: null,
    user: null,
    cartCount: 0,
    login: () => {},
    logout: () => {},
    setCartCount: () => {}
});

export const AuthProvider = ({ children }) => {
    // Load token from localStorage
    const [token, setToken] = useState(() => localStorage.getItem("access_token"));

    // Load user from localStorage
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    // Load cart count
    const [cartCount, setCartCount] = useState(() =>
        Number(localStorage.getItem("cart_count") || 0)
    );

    // LOGIN FUNCTION — supports cart_count from backend
    const login = (access, refresh, userData, cartCountValue = 0) => {
        // save tokens + user
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(access);
        setUser(userData);

        // save cart count
        localStorage.setItem("cart_count", cartCountValue);
        setCartCount(cartCountValue);
    };

    // LOGOUT FUNCTION
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart_count");

        setToken(null);
        setUser(null);
        setCartCount(0);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                cartCount,
                setCartCount,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
