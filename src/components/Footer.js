"use client";
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box sx={{ mt: "var(--space-xl)", pb: "var(--space-md)" }}>
            <Divider sx={{ mb: 3, borderStyle: "solid", borderColor: "var(--border-default)" }} />
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2
            }}>
                <Typography
                    sx={{
                        fontSize: "var(--size-caption)",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        fontFamily: "var(--font-manrope)"
                    }}
                >
                    © {currentYear} Enterprise ERP Systems. All intellectual property reserved.
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                        sx={{
                            fontSize: "var(--size-caption)",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            "&:hover": { color: "var(--text-secondary)" },
                            fontFamily: "var(--font-manrope)"
                        }}
                    >
                        Terms of Service
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "var(--size-caption)",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            "&:hover": { color: "var(--text-secondary)" },
                            fontFamily: "var(--font-manrope)"
                        }}
                    >
                        Security
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "var(--size-caption)",
                            color: "var(--brand-primary)",
                            fontWeight: 700,
                            fontFamily: "var(--font-manrope)"
                        }}
                    >
                        Version 1.0.0
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
