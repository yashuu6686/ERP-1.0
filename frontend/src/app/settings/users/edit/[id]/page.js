"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import UserForm from "../../components/UserForm";
import Loader from "@/components/ui/Loader";

export default function EditUser() {
    const router = useRouter();
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/users/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("Could not load user data.");
                router.push("/settings/users");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id, router]);

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            await axiosInstance.put(`/users/${id}`, values);
            router.push("/settings/users");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loader fullPage message="Fetching User Details..." />;

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
                        Edit User Profile
                    </Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Edit User Profile
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
                    Update account settings and manage custom permission overrides.
                </Typography>
            </Box>

            <UserForm
                initialValues={userData}
                onSubmit={handleSubmit}
                buttonText="Update Profile"
                loadingText={submitting ? "Updating..." : null}
            />
        </Box>
    );
}
