"use client";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Loading...", fullPage = false, size = 40 }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: fullPage ? "100vh" : "200px",
                height: "100%",
                width: "100%",
                gap: 2,
            }}
        >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) => theme.palette.grey[200],
                    }}
                    size={size}
                    thickness={4}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: "var(--brand-primary, #1172ba)",
                        animationDuration: "550ms",
                        position: "absolute",
                        left: 0,
                        [`& .MuiCircularProgress-circle`]: {
                            strokeLinecap: "round",
                        },
                    }}
                    size={size}
                    thickness={4}
                />
            </Box>
            {message && (
                <Typography
                    sx={{
                        color: "var(--text-secondary, #64748b)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        fontFamily: "var(--font-manrope, 'Manrope', sans-serif)",
                    }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default Loader;
