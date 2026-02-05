"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch permissions for a given role
    const fetchPermissionsForRole = async (roleName) => {
        try {
            const roleResponse = await axiosInstance.get(`/roles?name=${roleName}`);
            const roleData = roleResponse.data[0];

            if (roleData && roleData.permissions) {
                return roleData.permissions;
            } else if (roleName === 'admin') {
                // Fallback for admin if not in DB yet
                return ['all'];
            }
            return [];
        } catch (error) {
            console.error("Error fetching role permissions:", error);
            return [];
        }
    };

    useEffect(() => {
        // Check for persisted user in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            // Fetch fresh permissions from server based on stored role
            fetchPermissionsForRole(parsedUser.role).then(permissions => {
                setUser({ ...parsedUser, permissions });
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (loginId, password) => {
        try {
            // Search by email as the login ID
            const response = await axiosInstance.get(`/users?email=${loginId}`);
            const userData = response.data[0];

            if (userData && userData.password === password) {
                // Fetch permissions for the user's role from server
                const permissions = await fetchPermissionsForRole(userData.role);

                // Store user with permissions
                const userWithPermissions = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    permissions
                };

                setUser(userWithPermissions);

                // Store only basic user info (without permissions) in localStorage
                // Permissions will be fetched fresh on each session
                localStorage.setItem("user", JSON.stringify({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
                }));

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
