"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Container,
    Paper,
    Fade,
    Button
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";

// Local Components
import SupplierViewHeader from "./components/SupplierViewHeader";
import SupplierDetails from "./components/SupplierDetails";
import SupplierEntityInfo from "./components/SupplierEntityInfo";
import SupplierQuestionnaireTable from "./components/SupplierQuestionnaireTable";
import SupplierApprovalInfo from "./components/SupplierApprovalInfo";

function ViewEvaluationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchEvaluation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchEvaluation = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/evaluation/${id}`);
            const result = Array.isArray(response.data) ? response.data[0] : response.data;

            if (result && result.id) {
                setData(result);
            } else {
                // Fallback: search main list if direct ID lookup fails
                const listResp = await axiosInstance.get('/evaluation');
                const found = listResp.data.find(item => item.id === id);
                if (found) setData(found);
                else setData(null);
            }
        } catch (error) {
            console.error("Error fetching evaluation:", error);
            showNotification("Failed to load evaluation data", "error");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Evaluation..." />;

    if (!data) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Evaluation Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/initial-evaluation")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Initial Evaluation
                </Button>
            </Box>
        );
    }

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                <SupplierViewHeader
                    router={router}
                    id={id}
                    status={data.status}
                />

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        bgcolor: "#fff",
                        position: 'relative',
                        mb: 4
                    }}
                >
                    <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <SupplierDetails evaluation={data} />

                        <SupplierEntityInfo evaluation={data} />

                        <SupplierQuestionnaireTable evaluation={data} />

                        <SupplierApprovalInfo evaluation={data} />
                    </Box>
                </Paper>

                {/* Print Styles */}
                <style jsx global>{`
            @media print {
                .no-print { display: none !important; }
                body { background: white !important; }
                .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                .MuiPaper-root { border: none !important; box-shadow: none !important; }
            }
        `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewEvaluation() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewEvaluationContent />
        </Suspense>
    );
}
