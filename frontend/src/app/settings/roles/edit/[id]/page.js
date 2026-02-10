"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import RoleForm from "../../components/RoleForm";
import Loader from "@/components/ui/Loader";

export default function EditRole() {
    const router = useRouter();
    const { id } = useParams();
    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axiosInstance.get(`/roles/${id}`);
                const role = response.data;

                const rolePermissions = role.permissions || {};
                let normalizedPermissions = {};
                if (Array.isArray(rolePermissions)) {
                    rolePermissions.forEach(pStr => {
                        const [mKey, pKey] = pStr.split(':');
                        if (!normalizedPermissions[mKey]) normalizedPermissions[mKey] = {};
                        normalizedPermissions[mKey][pKey] = true;
                    });
                } else {
                    normalizedPermissions = rolePermissions;
                }

                setInitialData({
                    name: role.name || "",
                    description: role.description || "",
                    permissions: normalizedPermissions,
                    status: role.status || "active"
                });
            } catch (error) {
                console.error("Error fetching role:", error);
                alert("Role not found");
                router.push("/settings/roles");
            } finally {
                setFetching(false);
            }
        };
        fetchRole();
    }, [id, router]);

    const handleSubmit = async (values) => {
        try {
            setSaving(true);
            await axiosInstance.put(`/roles/${id}`, {
                name: values.name,
                description: values.description,
                permissions: values.permissions,
                status: values.status,
                updatedAt: new Date().toISOString()
            });
            router.push("/settings/roles");
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update role");
        } finally {
            setSaving(false);
        }
    };

    if (fetching) return <Loader fullPage message="Fetching role details..." />;

    return (
        <Box sx={{ p: 'var(--space-sm)' }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Edit Role
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ color: 'var(--text-muted)' }}>
                    <Link underline="hover" color="inherit" href="/settings/roles" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        Role Management
                    </Link>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-primary)' }}>Edit Role</Typography>
                </Breadcrumbs>
            </Box>

            <RoleForm
                initialValues={initialData}
                onSubmit={handleSubmit}
                loadingText={saving ? "Updating..." : null}
                buttonText="Update Role"
            />
        </Box>
    );
}
