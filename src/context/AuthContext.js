"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = React.useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
        // Clear the cookie
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        router.push("/login");
    }, [router]);

    // Fetch permissions for a given role
    const fetchPermissionsForRole = async (roleName) => {
        if (!roleName) return {};
        try {
            // Try searching by name exactly
            const roleResponse = await axiosInstance.get(`/roles?name=${roleName}`);
            let roleData = roleResponse.data.find(r => r.name.toLowerCase() === roleName.toLowerCase());

            if (roleData && roleData.permissions) {
                return roleData.permissions;
            } else if (roleName.toLowerCase() === 'admin') {
                return { all: true };
            }
            return {};
        } catch (error) {
            console.error("Error fetching role permissions:", error);
            return {};
        }
    };

    useEffect(() => {
        // Check for persisted user in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            const fetchFreshAuth = async () => {
                try {
                    // Fetch fresh user data to get latest additionalPermissions
                    const userResponse = await axiosInstance.get(`/users/${parsedUser.id}`);
                    const freshUser = userResponse.data;

                    // Fetch fresh role permissions
                    const roleToFetch = freshUser.role || freshUser.roleName;
                    const rolePermissions = await fetchPermissionsForRole(roleToFetch);

                    // DEEP MERGE inherited role permissions with individual user overrides
                    const additional = freshUser.additionalPermissions || {};
                    const merged = { ...rolePermissions };

                    Object.keys(additional).forEach(mKey => {
                        if (merged[mKey]) {
                            merged[mKey] = { ...merged[mKey], ...additional[mKey] };
                        } else {
                            merged[mKey] = additional[mKey];
                        }
                    });

                    // Update both state and localStorage with fresh data
                    const updatedUser = {
                        id: freshUser.id,
                        name: freshUser.name,
                        email: freshUser.email,
                        role: freshUser.role || freshUser.roleName,
                        roleId: freshUser.roleId,
                        roleName: freshUser.roleName,
                        permissions: merged
                    };

                    setUser(updatedUser);

                    // Update stored basic info if changed
                    localStorage.setItem("user", JSON.stringify({
                        id: freshUser.id,
                        name: freshUser.name,
                        email: freshUser.email,
                        role: freshUser.role || freshUser.roleName,
                        roleId: freshUser.roleId,
                        roleName: freshUser.roleName,
                        additionalPermissions: freshUser.additionalPermissions || {}
                    }));

                    setLoading(false);
                } catch (error) {
                    console.error("Error refreshing auth state:", error);
                    // If fetch fails, we might be offline or user deleted, log out for safety
                    logout();
                    setLoading(false);
                }
            };

            fetchFreshAuth();
        } else {
            setLoading(false);
        }
    }, [logout]);

    const login = async (loginId, password) => {
        try {
            // Search by email as the login ID
            const response = await axiosInstance.get(`/users?email=${loginId}`);
            const userData = response.data[0];

            if (userData && userData.password === password) {
                // Fetch permissions for the user's role from server
                const roleToFetch = userData.role || userData.roleName;
                const rolePermissions = await fetchPermissionsForRole(roleToFetch);

                // DEEP MERGE inherited role permissions with individual user overrides
                const additional = userData.additionalPermissions || {};
                const merged = { ...rolePermissions };

                Object.keys(additional).forEach(mKey => {
                    if (merged[mKey]) {
                        merged[mKey] = { ...merged[mKey], ...additional[mKey] };
                    } else {
                        merged[mKey] = additional[mKey];
                    }
                });

                // Store user with permissions
                const userWithPermissions = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role || userData.roleName,
                    roleId: userData.roleId,
                    roleName: userData.roleName,
                    permissions: merged
                };

                setUser(userWithPermissions);

                // Store only basic user info (without permissions) in localStorage
                // Permissions will be fetched fresh on each session
                localStorage.setItem("user", JSON.stringify({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role || userData.roleName,
                    roleId: userData.roleId,
                    roleName: userData.roleName,
                    additionalPermissions: userData.additionalPermissions || {}
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


    const checkPermission = (moduleKey, privilege = 'view') => {
        if (!user) return false;

        const userRole = (user.role || user.roleName || "").toLowerCase();
        const perms = user.permissions || {};

        // Admin always has access
        if (userRole === 'admin' || perms.all === true || (Array.isArray(perms) && perms.includes('all'))) {
            return true;
        }

        // Handle Array format (Legacy)
        if (Array.isArray(perms)) {
            return perms.includes(moduleKey) || perms.includes(`${moduleKey}:${privilege}`);
        }

        // Handle Object format (New)
        // If they have create/edit, they implicitly have view (already handled in form logic, but good to have here too)
        if (privilege === 'view') {
            return perms[moduleKey]?.view === true || perms[moduleKey]?.create === true || perms[moduleKey]?.edit === true;
        }

        return perms[moduleKey]?.[privilege] === true;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
