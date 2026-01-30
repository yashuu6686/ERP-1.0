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
                padding: "16px 24px",
                bgcolor: "var(--bg-surface)",
                borderBottom: "1px solid var(--border-default)",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                mb: "var(--space-md)",
            }}
        >
            {/* Search Bar */}
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "var(--bg-page)",
                    padding: "8px 16px",
                    borderRadius: "var(--input-radius)",
                    width: "350px",
                    border: '1px solid var(--border-strong)',
                    "&:hover": { borderColor: 'var(--brand-primary)' }
                }}
            >
                <Search sx={{ color: "var(--text-muted)", fontSize: "20px", mr: 1 }} />
                <InputBase
                    placeholder="Search ERP modules, batches..."
                    sx={{
                        flex: 1,
                        fontSize: "var(--size-body)",
                        fontWeight: 500,
                        fontFamily: "var(--font-manrope)"
                    }}
                />
            </Paper>

            {/* Action Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Tooltip title="Help Center">
                    <IconButton size="small" sx={{ color: "var(--text-secondary)" }}>
                        <HelpOutline fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Global Settings">
                    <IconButton size="small" sx={{ color: "var(--text-secondary)" }}>
                        <Settings fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                    <IconButton size="small" sx={{ color: "var(--text-secondary)" }}>
                        <Badge badgeContent={4} color="error" variant="dot">
                            <Notifications fontSize="small" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Box
                    sx={{
                        width: "1px",
                        height: "24px",
                        bgcolor: "var(--border-default)",
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
                        transition: "background-color 0.2s",
                        "&:hover": { bgcolor: "var(--brand-soft)" },
                    }}
                >
                    <Box sx={{ textAlign: "right" }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                fontSize: "var(--size-body)",
                                lineHeight: 1.2,
                                fontFamily: "var(--font-manrope)"
                            }}
                        >
                            System Admin
                        </Typography>
                        <Typography
                            sx={{
                                color: "var(--text-muted)",
                                fontWeight: 600,
                                fontSize: "var(--size-caption)",
                                fontFamily: "var(--font-manrope)"
                            }}
                        >
                            Superuser
                        </Typography>
                    </Box>
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: "var(--brand-primary)",
                            fontSize: "var(--size-body)",
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
