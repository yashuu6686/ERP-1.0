"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MENU_ITEMS } from "@/config/menuConfig";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Lock } from "@mui/icons-material";

/**
 * Global route protection component
 * Automatically protects all routes based on menuConfig
 */
// Public routes that don't require authentication
const publicRoutes = ['/login', '/register'];

// Routes that don't require permission checks (accessible to all authenticated users)
const openRoutes = ['/', '/profile'];

/**
 * Global route protection component
 * Automatically protects all routes based on menuConfig
 */
export function RouteGuard({ children }) {
    const { user, loading, checkPermission } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // Check if user has permission for current route
    const hasPermission = () => {
        // If route is public or open, allow access
        if (publicRoutes.includes(pathname) || openRoutes.includes(pathname)) {
            return true;
        }

        if (!user) return false;

        // Find the menu item that matches the current path
        // We find the most specific match first (longest path)
        const menuItem = MENU_ITEMS
            .filter(item => pathname.startsWith(item.path) && item.path !== '/')
            .sort((a, b) => b.path.length - a.path.length)[0];

        // If no menu item found, allow access (might be a sub-route not in menu)
        if (!menuItem) {
            return true;
        }

        // Determine required privilege based on sub-path
        let requiredPrivilege = 'view';
        if (pathname.includes('/add') || pathname.includes('/create')) {
            requiredPrivilege = 'create';
        } else if (pathname.includes('/edit') || pathname.includes('/modify')) {
            requiredPrivilege = 'edit';
        } else if (pathname.includes('/view')) {
            requiredPrivilege = 'view';
        }

        // Use unified permission check logic
        return checkPermission(menuItem.key, requiredPrivilege);
    };

    useEffect(() => {
        // Wait for auth to finish loading before making redirect decisions
        if (loading) return;

        // Redirect to login if not authenticated and trying to access protected route
        if (!user && !publicRoutes.includes(pathname)) {
            router.push("/login");
        }
    }, [user, loading, pathname, router]);

    // If still checking authentication, don't render anything to avoid flickering
    if (loading && !publicRoutes.includes(pathname)) {
        return null;
    }

    // If no user yet and not on public route, wait for redirect
    if (!user && !publicRoutes.includes(pathname)) {
        return null;
    }

    // If user doesn't have permission, show access denied
    if (user && !hasPermission()) {
        const menuItem = MENU_ITEMS.find(item => pathname.startsWith(item.path) && item.path !== '/');

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
                        You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Your role: <strong>{user.role}</strong>
                    </Typography>
                    {menuItem && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            Required permission: <strong>{menuItem.key}</strong>
                        </Typography>
                    )}
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

    // User has permission or on public route, render children
    return <>{children}</>;
}
