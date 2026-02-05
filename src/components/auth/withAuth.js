"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MENU_ITEMS } from "@/config/menuConfig";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Lock } from "@mui/icons-material";

/**
 * Higher-order component to protect routes based on user permissions
 * @param {React.Component} Component - The component to protect
 * @param {string} requiredPermission - The permission key required to access this page
 */
export function withAuth(Component, requiredPermission) {
    return function ProtectedRoute(props) {
        const { user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            // If no user, redirect to login
            if (!user) {
                router.push("/login");
            }
        }, [user, router]);

        // Check if user has permission
        const hasPermission = () => {
            if (!user) return false;
            if (user.role === 'admin' || user.permissions?.includes('all')) return true;
            return user.permissions?.includes(requiredPermission);
        };

        // If no user yet, show loading or nothing
        if (!user) {
            return null;
        }

        // If user doesn't have permission, show access denied
        if (!hasPermission()) {
            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "80vh",
                        p: 3
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            textAlign: "center",
                            maxWidth: 500,
                            border: "1px solid #e2e8f0",
                            borderRadius: 3
                        }}
                    >
                        <Lock sx={{ fontSize: 64, color: "#dc2626", mb: 2 }} />
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: "#0f172a" }}>
                            Access Denied
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            Your role: <strong>{user.role}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => router.push("/")}
                            sx={{
                                bgcolor: "#2563eb",
                                "&:hover": { bgcolor: "#1d4ed8" },
                                textTransform: "none",
                                px: 4
                            }}
                        >
                            Go to Dashboard
                        </Button>
                    </Paper>
                </Box>
            );
        }

        // User has permission, render the component
        return <Component {...props} />;
    };
}
