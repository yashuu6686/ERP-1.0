"use client";
import React from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { Home, SentimentDissatisfied } from "@mui/icons-material";
import { keyframes } from "@emotion/react";

// Define a floating animation for the 404 text/icon
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

export default function NotFound() {
    const router = useRouter();
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                boxShadow: "none"
            }}
        >
            {/* <Container maxWidth="sm"> */}
            <Box
                sx={{
                    textAlign: "center",
                    p: 5,
                    borderRadius: 8,
                    bgcolor: "background.paper",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative Circle */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        bgcolor: theme.palette.secondary.light,
                        opacity: 0.2,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: -30,
                        left: -30,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        bgcolor: theme.palette.primary.main,
                        opacity: 0.1,
                    }}
                />

                <Box sx={{ animation: `${float} 3s ease-in-out infinite` }}>
                    <SentimentDissatisfied
                        sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
                    />
                    <Typography
                        variant="h1"
                        fontWeight="900"
                        color="primary"
                        sx={{ fontSize: { xs: "5rem", md: "8rem" }, lineHeight: 1 }}
                    >
                        404
                    </Typography>
                </Box>

                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                    Oops! Page Not Found
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '80%' }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<Home />}
                    onClick={() => router.push("/")}
                    sx={{
                        borderRadius: 50,
                        px: 4,
                        py: 1.5,
                        fontWeight: "bold",
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                            transform: "scale(1.05)",
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    Go to Dashboard
                </Button>
            </Box>
            {/* </Container> */}
        </Box>
    );
}
