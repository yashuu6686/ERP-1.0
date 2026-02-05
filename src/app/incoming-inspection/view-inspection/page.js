"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ArrowBack } from "@mui/icons-material";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

// Extracted Components
import InspectionViewHeader from "./components/InspectionViewHeader";
import InspectionMainDetails from "./components/InspectionMainDetails";
import InspectionMaterialIdentity from "./components/InspectionMaterialIdentity";
import InspectionObservationsTable from "./components/InspectionObservationsTable";
import InspectionDecisionSummary from "./components/InspectionDecisionSummary";
import InspectionSidebar from "./components/InspectionSidebar";

function ViewInspectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const fetchInspection = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/incoming-inspection/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching inspection:", error);
                alert("Failed to load inspection data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInspection();
        }
    }, [id]);

    const handleApprove = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/incoming-inspection/${id}`, {
                ...data,
                inspectionStatus: 'Approved'
            });
            setData(prev => ({ ...prev, inspectionStatus: 'Approved' }));
            alert("Inspection report has been approved.");
        } catch (error) {
            console.error("Error approving inspection:", error);
            alert("Failed to approve inspection.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/incoming-inspection/${id}`, {
                ...data,
                inspectionStatus: 'Rejected'
            });
            setData(prev => ({ ...prev, inspectionStatus: 'Rejected' }));
            alert("Inspection report has been rejected.");
        } catch (error) {
            console.error("Error rejecting inspection:", error);
            alert("Failed to reject inspection.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Securely Loading Inspection Details..." />;

    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Inspection Report Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/incoming-inspection")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to List
            </Button>
        </Box>
    );

    const { materialData, observations, summaryData, approvalData, inspectionStatus } = data;

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions */}
                <InspectionViewHeader
                    router={router}
                    id={id}
                    inspectionStatus={inspectionStatus}
                    user={user}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                />

                <Grid container spacing={2}>
                    {/* Main Content Area */}
                    <Grid size={{ xs: 12, lg: 9 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                overflow: "hidden",
                                bgcolor: "#fff",
                                position: 'relative',
                                height: '100%'
                            }}
                        >
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                <InspectionMainDetails
                                    materialData={materialData}
                                    inspectionStatus={inspectionStatus}
                                />

                                <InspectionMaterialIdentity
                                    materialData={materialData}
                                />

                                <InspectionObservationsTable
                                    observations={observations}
                                />

                                <InspectionDecisionSummary
                                    comments={summaryData.comments}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar Area */}
                    <Grid size={{ xs: 12, lg: 3 }}>
                        <InspectionSidebar
                            summaryData={summaryData}
                            materialData={materialData}
                            approvalData={approvalData}
                        />
                    </Grid>
                </Grid>

                {/* Print Context Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; margin: 0; padding: 0; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        
                        /* Layout adjustment for print: stack grid items */
                        .MuiGrid-container { display: block !important; }
                        
                        /* Target both legacy and new MUI grid classes */
                        .MuiGrid-item, [class*="MuiGrid-size"] { 
                            width: 100% !important; 
                            max-width: 100% !important; 
                            flex-basis: 100% !important;
                            margin-bottom: 20px !important;
                        }
                    }
                `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewInspectionContent />
        </Suspense>
    );
}
