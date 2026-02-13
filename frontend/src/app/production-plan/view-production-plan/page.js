"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Grid, Fade, Typography, Button, Chip } from "@mui/material";
import { CheckCircle, Schedule, Cancel, Assignment, ArrowBack } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

// Import modular components
import ProductionPlanHeader from "./components/ProductionPlanHeader";
import ProductionPlanManifest from "./components/ProductionPlanManifest";
import ProductionPlanSidebar from "./components/ProductionPlanSidebar";

function ViewProductionPlanContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                setLoading(true);
                // The URL was updated to camelCase by the user
                const response = await axiosInstance.get(`/productionPlans/${id}`);
                setPlan(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                setPlan(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPlanDetails();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Securely Loading Production Plan..." />;

    if (!plan) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Production Plan Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/production-plan")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to List
                </Button>
            </Box>
        );
    }

    const getStatusChip = (currentStatus) => {
        const configs = {
            Completed: { color: "#155724", bg: "#d4edda", label: "COMPLETED", icon: <CheckCircle sx={{ fontSize: '16px !important' }} /> },
            Pending: { color: "#856404", bg: "#fff3cd", label: "PENDING", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            InProgress: { color: "#004085", bg: "#cce5ff", label: "IN PROGRESS", icon: <Assignment sx={{ fontSize: '16px !important' }} /> },
            Cancelled: { color: "#721c24", bg: "#f8d7da", label: "CANCELLED", icon: <Cancel sx={{ fontSize: '16px !important' }} /> },
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
                    borderRadius: '10px',
                    fontSize: '0.8rem',
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
                    <ProductionPlanHeader
                        id={id}
                        productName={plan.productName}
                        router={router}
                        onPrint={() => window.print()}
                    />

                    <Grid container spacing={2}>
                        {/* Main Content Area */}
                        <Grid item xs={12} lg={9} size={{ xs: 12, lg: 9 }}>
                            <ProductionPlanManifest plan={plan} />
                        </Grid>

                        {/* Sidebar Area */}
                        <Grid item xs={12} lg={3} size={{ xs: 12, lg: 3 }}>
                            <ProductionPlanSidebar
                                plan={plan}
                                getStatusChip={getStatusChip}
                            />
                        </Grid>
                    </Grid>

                    <style jsx global>{`
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; margin: 0; padding: 0; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-container { display: block !important; }
                            .MuiGrid-item, [class*="MuiGrid-size"] { 
                                width: 100% !important; 
                                max-width: 100% !important; 
                                flex-basis: 100% !important;
                                margin-bottom: 20px !important;
                            }
                        }
                    `}</style>
                </Container>
            </Box>
        </Fade>
    );
}

export default function ViewProductionPlanPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Fetching Production Plan..." />}>
            <ViewProductionPlanContent />
        </Suspense>
    );
}
