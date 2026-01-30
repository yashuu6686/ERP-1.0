"use client";
import React from "react";
import {
    Box,
    IconButton,
    Badge,
    Avatar,
    Typography,
    Divider,
} from "@mui/material";
import {
    Menu as MenuIcon,
    ShoppingCartOutlined,
    NotificationsNoneOutlined,
    KeyboardArrowDown,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const TopNavbar = ({ onToggleSidebar }) => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 12px",
                bgcolor: "rgba(246, 248, 251, 0.85)",
                backdropFilter: "blur(10px)",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                minHeight: "64px",
                // borderBottom: "1px solid #e2e8f0"
            }}
        >
            {/* Left Side: Menu Icon */}
            <IconButton
                size="medium"
                sx={{ color: "#94a3b8" }}
                onClick={onToggleSidebar}
            >
                <MenuIcon />
            </IconButton>

            {/* Right Side: Actions and Profile */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

                {/* Shopping Cart with circular background */}
                <IconButton
                    size="small"
                    sx={{
                        bgcolor: "#f0f7ff",
                        color: "#1172ba",
                        padding: "10px",
                        "&:hover": { bgcolor: "#e0efff" }
                    }}
                >
                    <ShoppingCartOutlined fontSize="small" />
                </IconButton>

                {/* Notifications Bell */}
                <IconButton size="small" sx={{ color: "#1172ba", padding: "10px" }}>
                    <Badge
                        variant="dot"
                        sx={{
                            "& .MuiBadge-badge": {
                                bgcolor: "#1172ba",
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                border: "2px solid #fff"
                            }
                        }}
                    >
                        <NotificationsNoneOutlined fontSize="small" />
                    </Badge>
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: "24px", alignSelf: "center", borderColor: "#e2e8f0" }} />

                {/* User Profile Section */}
                <Box
                    onClick={() => router.push("/profile")}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        "&:hover": { opacity: 0.8 },
                    }}
                >
                    <Avatar
                        src="/doctor-avatar.png" // Placeholder or actual image path
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            bgcolor: "#f1f5f9"
                        }}
                    >
                        SP
                    </Avatar>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography
                            sx={{
                                color: "#64748b",
                                fontSize: "14px",
                                fontFamily: "var(--font-manrope)",
                                fontWeight: 500
                            }}
                        >
                            Welcome,
                        </Typography>
                        <Typography
                            sx={{
                                color: "#1e293b",
                                fontSize: "14px",
                                fontFamily: "var(--font-manrope)",
                                fontWeight: 700
                            }}
                        >
                            Dr. Shivan Patel
                        </Typography>
                        <KeyboardArrowDown sx={{ color: "#1e293b", fontSize: "18px", ml: 0.5 }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TopNavbar;

