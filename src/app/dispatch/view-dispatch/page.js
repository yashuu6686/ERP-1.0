"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Grid, Fade, Typography, Button, Chip } from "@mui/material";
import { ArrowBack, CheckCircle, LocalShipping, Schedule, Cancel } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

// Import modular components
import DispatchHeaderActions from "./components/DispatchHeaderActions";
import DispatchManifest from "./components/DispatchManifest";
import DispatchSidebar from "./components/DispatchSidebar";

function ViewDispatchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [dispatch, setDispatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchDispatchDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/dispatches/${id}`);
                setDispatch(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                setDispatch(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDispatchDetails();
        }
    }, [id]);

    const handleApprove = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/dispatches/${id}`, {
                ...dispatch,
                status: 'Shipped'
            });
            setDispatch(prev => ({ ...prev, status: 'Shipped' }));
            alert("Dispatch entry has been approved.");
        } catch (error) {
            console.error("Error approving dispatch:", error);
            alert("Failed to approve dispatch.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/dispatches/${id}`, {
                ...dispatch,
                status: 'Rejected'
            });
            setDispatch(prev => ({ ...prev, status: 'Rejected' }));
            alert("Dispatch entry has been rejected.");
        } catch (error) {
            console.error("Error rejecting dispatch:", error);
            alert("Failed to reject dispatch.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Tracking Shipment..." />;

    if (!dispatch) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Dispatch Record Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/dispatch")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Dispatch List
                </Button>
            </Box>
        );
    }

    const { shipmentInfo, customer, items, status } = dispatch;

    const getStatusChip = (currentStatus) => {
        const configs = {
            Shipped: { color: "#0c5460", bg: "#d1ecf1", label: "SHIPPED", icon: <LocalShipping sx={{ fontSize: '16px !important' }} /> },
            Delivered: { color: "#155724", bg: "#d4edda", label: "DELIVERED", icon: <CheckCircle sx={{ fontSize: '16px !important' }} /> },
            Pending: { color: "#856404", bg: "#fff3cd", label: "PENDING", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            Processing: { color: "#383d41", bg: "#e2e3e5", label: "PROCESSING", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            "Pending Approval": { color: "#92400e", bg: "#fef3c7", label: "PENDING APPROVAL", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            Rejected: { color: "#b91c1c", bg: "#fee2e2", label: "REJECTED", icon: <Cancel sx={{ fontSize: '16px !important' }} /> },
        };
        const config = configs[currentStatus] || configs.Pending;

        return (
            <Chip
                icon={config.icon}
                label={config.label}
                sx={{
                    fontWeight: 700,
                    bgcolor: config.bg,
                    color: config.color,
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    height: 28,
                    '& .MuiChip-icon': { color: 'inherit' }
                }}
            />
        );
    };

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    <DispatchHeaderActions
                        user={user}
                        status={status}
                        onBack={() => router.push("/dispatch")}
                        onReject={handleReject}
                        onApprove={handleApprove}
                        onPrint={() => window.print()}
                        onEdit={() => router.push(`/dispatch/create-dispatch-entry?id=${id}`)}
                    />

                    <Grid container spacing={2}>
                        <Grid  size={{ xs: 12, lg: 9 }}>
                            <DispatchManifest
                                shipmentInfo={shipmentInfo}
                                customer={customer}
                                items={items}
                                status={status}
                                getStatusChip={getStatusChip}
                            />
                        </Grid>
                        <Grid  size={{ xs: 12, lg: 3 }}>
                            <DispatchSidebar
                                shipmentInfo={shipmentInfo}
                                items={items}
                            />
                        </Grid>
                    </Grid>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-item.lg-3, .MuiGrid-grid-lg-3 { display: none !important; }
                            .MuiGrid-item.lg-9, .MuiGrid-grid-lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                        }
                    `}} />
                </Container>
            </Box>
        </Fade>
    );
}

export default function ViewDispatchPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Tracking Shipment..." />}>
            <ViewDispatchContent />
        </Suspense>
    );
}
