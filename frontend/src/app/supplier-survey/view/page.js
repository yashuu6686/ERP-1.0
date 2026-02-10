"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Typography, Button, Fade, Grid, Paper } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";
import Loader from "@/components/ui/Loader";

import SurveyViewHeader from "./components/SurveyViewHeader";
import SurveyViewContent from "./components/SurveyViewContent";
import SurveySummarySidebar from "./components/SurveySummarySidebar";

function ViewSurveyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();

    useEffect(() => {
        const fetchSurveyDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/supplier-surveys/${id}`);
                setSurvey(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                showNotification("Failed to fetch survey details.", "error");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSurveyDetails();
        }
    }, [id, showNotification]);

    if (loading) return <Loader fullPage message="Loading Survey Details..." />;

    if (!survey) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Survey Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/supplier-survey")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to List
                </Button>
            </Box>
        );
    }

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                <SurveyViewHeader router={router} id={id} status={survey.status} />

                <Grid container spacing={2}>
                    {/* Main Document Area */}
                    <Grid size={{ xs: 12, lg: 9 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                overflow: "hidden",
                                bgcolor: "#fff",
                                position: 'relative'
                            }}
                        >
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                <SurveyViewContent data={survey} />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar Area */}
                    <Grid size={{ xs: 12, lg: 3 }}>
                        <SurveySummarySidebar data={survey} />
                    </Grid>
                </Grid>

                {/* Print Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .MuiGrid-item.lg-3 { display: none !important; }
                        .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                    }
                `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewSurveyPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewSurveyContent />
        </Suspense>
    );
}
