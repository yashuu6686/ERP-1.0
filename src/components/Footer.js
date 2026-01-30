"use client";
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Divider sx={{ mb: 3, borderStyle: "dashed", borderColor: "#e2e8f0" }} />
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2
            }}>
                <Typography variant="caption" color="#94a3b8" fontWeight={500}>
                    © {currentYear} Enterprise ERP Systems. All intellectual property reserved.
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography variant="caption" color="#94a3b8" sx={{ cursor: "pointer", "&:hover": { color: "#475569" } }}>
                        Terms of Service
                    </Typography>
                    <Typography variant="caption" color="#94a3b8" sx={{ cursor: "pointer", "&:hover": { color: "#475569" } }}>
                        Security
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#1172ba", fontWeight: 700 }}>
                        Version 2.4.0
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Footer;
