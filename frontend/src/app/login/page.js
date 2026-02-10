"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    LockOutlined,
    PersonOutline,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!id || !password) {
            setError("Please enter both ID and Password");
            setLoading(false);
            return;
        }

        const res = await login(id, password);
        if (res.success) {
            router.push("/");
        } else {
            setError(res.message);
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                p: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 4,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 6,
                            background: "linear-gradient(90deg, #1172ba 0%, #0d5a94 100%)",
                        }
                    }}
                >
                    <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Image src={logo} alt="Scanbo Logo" width={100} height={100} style={{ objectFit: 'contain' }} priority />
                        <Typography variant="h5" fontWeight={800} color="#1e293b" sx={{ mt: 2, letterSpacing: -0.5 }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="#64748b" sx={{ mt: 1 }}>
                            Secure Access to Your Enterprise Portal
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Login ID"
                            placeholder="e.g. S-7890"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline sx={{ color: "#94a3b8" }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 2, bgcolor: "#f8fafc" }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            sx={{ mb: 4 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined sx={{ color: "#94a3b8" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 2, bgcolor: "#f8fafc" }
                            }}
                        />

                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                boxShadow: "0 4px 6px -1px rgba(17, 114, 186, 0.3)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #0d5a94 0%, #1172ba 100%)",
                                    boxShadow: "0 10px 15px -3px rgba(17, 114, 186, 0.4)",
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                        </Button>
                    </Box>

                    <Typography variant="caption" color="#94a3b8" sx={{ mt: 4, display: "block" }}>
                        Powered by Scanbo Technologies 2026
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
