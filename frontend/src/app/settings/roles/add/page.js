"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import RoleForm from "../components/RoleForm";

export default function AddRole() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            await axiosInstance.post("/roles", {
                name: values.name,
                description: values.description,
                permissions: values.permissions,
                status: values.status,
                createdAt: new Date().toISOString()
            });
            router.push("/settings/roles");
        } catch (error) {
            console.error("Error creating role:", error);
            alert("Failed to create role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 'var(--space-sm)' }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Add New Role
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ color: 'var(--text-muted)' }}>
                    <Link underline="hover" color="inherit" onClick={() => router.push("/settings/roles")} sx={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                        Role Management
                    </Link>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-primary)' }}>Add Role</Typography>
                </Breadcrumbs>
            </Box>

            <RoleForm
                onSubmit={handleSubmit}
                loadingText={loading ? "Saving..." : null}
                buttonText="Save Role"
            />
        </Box>
    );
}
