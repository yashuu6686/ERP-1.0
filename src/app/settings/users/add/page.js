"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import UserForm from "../components/UserForm";

export default function AddUser() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            const newUser = {
                ...values,
                id: String(Date.now()), // Replace with real UUID in production if needed
                createdAt: new Date().toISOString()
            };
            await axiosInstance.post("/users", newUser);
            router.push("/settings/users");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ p: '2px' }}>
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 1 }}>
                    <Link underline="hover" color="inherit" href="/" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                        Dashboard
                    </Link>
                    <Link underline="hover" color="inherit" href="/settings/users" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                        User Management
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>
                        Create New User
                    </Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Create New User
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
                    Configure basic details and custom access for a new employee.
                </Typography>
            </Box>

            <UserForm
                onSubmit={handleSubmit}
                buttonText="Create User"
                loadingText={submitting ? "Creating..." : null}
            />
        </Box>
    );
}
