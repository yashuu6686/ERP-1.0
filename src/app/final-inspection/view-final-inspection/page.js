"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Inventory from "@mui/icons-material/Inventory";
import Assignment from "@mui/icons-material/Assignment";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Print from "@mui/icons-material/Print";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import Schedule from "@mui/icons-material/Schedule";
import FactCheck from "@mui/icons-material/FactCheck";
import Warning from "@mui/icons-material/Warning";
import Person from "@mui/icons-material/Person";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";
import QrCode from "@mui/icons-material/QrCode";
import Description from "@mui/icons-material/Description";
import Rule from "@mui/icons-material/Rule";
import ReportProblem from "@mui/icons-material/ReportProblem";
import Info from "@mui/icons-material/Info";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";

import InspectionHeaderActions from "./components/InspectionHeaderActions";
import InspectionDocument from "./components/InspectionDocument";
import InspectionSidebar from "./components/InspectionSidebar";

function ViewFinalInspectionContent() {
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
                const response = await axiosInstance.get(`/final-inspections/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching inspection:", error);
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
            await axiosInstance.put(`/final-inspections/${id}`, {
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
            await axiosInstance.put(`/final-inspections/${id}`, {
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

    const getResultChip = (result) => {
        if (result === 'Pass' || result === 'Approved') {
            return <Chip icon={<CheckCircle sx={{ fontSize: '18px !important' }} />} label="PASSED" sx={{ fontWeight: 800, bgcolor: "#dcfce7", color: "#166534", borderRadius: '8px' }} />;
        } else if (result === 'Fail' || result === 'Rejected') {
            return <Chip icon={<Cancel sx={{ fontSize: '18px !important' }} />} label="FAILED" sx={{ fontWeight: 800, bgcolor: "#fee2e2", color: "#991b1b", borderRadius: '8px' }} />;
        }
        return <Chip icon={<Warning sx={{ fontSize: '18px !important' }} />} label={result || "PENDING"} sx={{ fontWeight: 800, bgcolor: "#f1f5f9", color: "#64748b", borderRadius: '8px' }} />;
    };

    if (loading) return <Loader fullPage message="Authenticating Quality Records..." />;
    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Inspection Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/final-inspection")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to Registry
            </Button>
        </Box>
    );

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    <InspectionHeaderActions
                        user={user}
                        data={data}
                        onBack={() => router.push("/final-inspection")}
                        onReject={handleReject}
                        onApprove={handleApprove}
                        onPrint={() => window.print()}
                        onEdit={() => router.push(`/final-inspection/create-final-inspection?id=${id}`)}
                    />

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 9 }}>
                            <InspectionDocument
                                data={data}
                                getResultChip={getResultChip}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <InspectionSidebar
                                data={data}
                                id={id}
                            />
                        </Grid>
                    </Grid>
                </Container>

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
            </Box>
        </Fade>
    );
}

export default function ViewFinalInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Authenticating Quality Records..." />}>
            <ViewFinalInspectionContent />
        </Suspense>
    );
}
