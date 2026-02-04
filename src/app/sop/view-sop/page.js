"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Grid, Fade, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";

// Import modular components
import SOPHeaderActions from "./components/SOPHeaderActions";
import SOPDocument from "./components/SOPDocument";
import SOPSidebar from "./components/SOPSidebar";

// Constant definitions matching the creation steps
const deviceTestingSteps = [
    { step: 1, task: "Preparation / Physical status" },
    { step: 2, task: "Temperature" },
    { step: 3, task: "Oxygen Saturation" },
    { step: 4, task: "Glucose" },
    { step: 5, task: "Blood Pressure" },
    { step: 6, task: "ECG Functionality" },
    { step: 7, task: "BP Cuffs" },
    { step: 8, task: "Large BP Cuff" },
    { step: 9, task: "Glucose Bottles" },
    { step: 10, task: "Lancet Pouch" },
    { step: 11, task: "USB cables" },
    { step: 12, task: "User Manual" },
    { step: 13, task: "Lancet pen" },
    { step: 14, task: "Plastic shield" },
    { step: 15, task: "Hologram stickers" },
    { step: 16, task: "Validity Stickers" },
    { step: 17, task: "Scanbo Jute bag" },
    { step: 18, task: "Finalize / Report" },
    { step: 19, task: "Final Check" },
];

const packagingSteps = [
    { step: 1, components: "Scanbo D8 Device" },
    { step: 2, components: "BP Cuffs" },
    { step: 3, components: "Large BP Cuff" },
    { step: 4, components: "Glucose Bottles" },
    { step: 5, components: "Lancet Pouch" },
    { step: 6, components: "Lancet Pen" },
    { step: 7, components: "USB Cable" },
    { step: 8, components: "Plastic Shield" },
    { step: 9, components: "Scanbo Jute Bag" },
    { step: 10, components: "All Assemble Component" },
    { step: 11, components: "Seal Package" },
    { step: 12, components: "Validity Stickers" },
    { step: 13, components: "Picture / Video" },
    { step: 14, components: "Final Check" },
];

function ViewSOPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSOP = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/sops/${id}`);
                console.log("SOP Data:", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching SOP:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSOP();
        }
    }, [id]);

    const handleApprove = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/sops/${id}`, {
                ...data,
                status: 'Approved'
            });
            setData(prev => ({ ...prev, status: 'Approved' }));
            alert("SOP has been approved.");
        } catch (error) {
            console.error("Error approving SOP:", error);
            alert("Failed to approve SOP.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/sops/${id}`, {
                ...data,
                status: 'Rejected'
            });
            setData(prev => ({ ...prev, status: 'Rejected' }));
            alert("SOP has been rejected.");
        } catch (error) {
            console.error("Error rejecting SOP:", error);
            alert("Failed to reject SOP.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Accessing SOP Registry..." />;

    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>SOP Record Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/sop")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to Registry
            </Button>
        </Box>
    );

    const getTestingResult = (idx) => data.testingResults && data.testingResults[idx] ? data.testingResults[idx] : {};
    const getPackagingResult = (idx) => data.packagingResults && data.packagingResults[idx] ? data.packagingResults[idx] : {};

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    <SOPHeaderActions
                        user={user}
                        data={data}
                        onBack={() => router.push("/sop")}
                        onReject={handleReject}
                        onApprove={handleApprove}
                        onPrint={() => window.print()}
                        onEdit={() => router.push(`/sop/create-sop?id=${id}`)}
                    />

                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 12, lg: 9 }}>
                            <SOPDocument
                                data={data}
                                deviceTestingSteps={deviceTestingSteps}
                                packagingSteps={packagingSteps}
                                getTestingResult={getTestingResult}
                                getPackagingResult={getPackagingResult}
                            />
                        </Grid>
                        <Grid item size={{ xs: 12, lg: 3 }}>
                            <SOPSidebar data={data} />
                        </Grid>
                    </Grid>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-item.lg-3 { display: none !important; }
                            .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                        }
                    `}} />
                </Container>
            </Box>
        </Fade>
    );
}

export default function ViewSOP() {
    return (
        <Suspense fallback={<Loader fullPage message="Accessing SOP Registry..." />}>
            <ViewSOPContent />
        </Suspense>
    );
}
