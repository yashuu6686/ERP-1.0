"use client";
import React from "react";
import {
    Box,
    IconButton,
    InputBase,
    Badge,
    Avatar,
    Typography,
    Tooltip,
    Paper,
} from "@mui/material";
import {
    Search,
    Notifications,
    Settings,
    HelpOutline
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const TopNavbar = () => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 24px",
                bgcolor: "white",
                borderBottom: "1px solid #f1f5f9",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                mb: 2,
                borderRadius: '0 0 16px 16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
        >
            {/* Search Bar */}
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#f8fafc",
                    padding: "6px 16px",
                    borderRadius: "12px",
                    width: "350px",
                    border: '1px solid #f1f5f9',
                    "&:hover": { borderColor: '#e2e8f0' }
                }}
            >
                <Search sx={{ color: "#94a3b8", fontSize: "20px", mr: 1 }} />
                <InputBase
                    placeholder="Search ERP modules, batches..."
                    sx={{ flex: 1, fontSize: "0.875rem", fontWeight: 500 }}
                />
            </Paper>

            {/* Action Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Help Center">
                    <IconButton size="small" sx={{ color: "#64748b" }}>
                        <HelpOutline fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Global Settings">
                    <IconButton size="small" sx={{ color: "#64748b" }}>
                        <Settings fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                    <IconButton size="small" sx={{ color: "#64748b" }}>
                        <Badge badgeContent={4} color="error" variant="dot">
                            <Notifications fontSize="small" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Box
                    sx={{
                        width: "1px",
                        height: "24px",
                        bgcolor: "#e2e8f0",
                        mx: 1,
                    }}
                />

                {/* User Profile */}
                <Box
                    onClick={() => router.push("/profile")}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        padding: "4px 8px 4px 12px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f1f5f9" },
                    }}
                >
                    <Box sx={{ textAlign: "right" }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.8125rem", lineHeight: 1.2 }}
                        >
                            System Admin
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                            Superuser
                        </Typography>
                    </Box>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "#1172ba",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                        }}
                    >
                        AD
                    </Avatar>
                </Box>
            </Box>
        </Box>
    );
};

export default TopNavbar;
