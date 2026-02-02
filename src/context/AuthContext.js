"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for persisted user in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (loginId, password) => {
        try {
            // Search by email as the login ID
            const response = await axiosInstance.get(`/users?email=${loginId}`);
            const userData = response.data[0];

            if (userData && userData.password === password) {
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                // Set a cookie for the middleware to read
                document.cookie = `user=${userData.id}; path=/; max-age=86400; SameSite=Lax`;
                return { success: true };
            }
            return { success: false, message: "Invalid ID or password" };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Server error" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        // Clear the cookie
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
