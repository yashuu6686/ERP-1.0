"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Button,
    Grid,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import {
    Download,
    ArrowBack,
    Edit,
    Print,
    Business,
    LocalShipping,
    AssignmentTurnedIn,
} from "@mui/icons-material";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/Loader";

export default function ViewGRN() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [grn, setGrn] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchGRNDetails();
        }
    }, [id]);

    const fetchGRNDetails = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/grn/${id}`);
            setGrn(response.data);
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Failed to fetch GRN details.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading GRN Details..." />;

    if (!grn) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="error">GRN Not Found</Typography>
                <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 2 }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/grn")}
                    sx={{ color: "#64748b", textTransform: "none" }}
                >
                    Back to List
                </Button>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/grn/create-grn?id=${id}`)}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)"
                        }}
                    >
                        Edit GRN
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
                {/* Header */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight={800} color="primary" sx={{ mb: 1 }}>
                            GOODS RECEIPT NOTE
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#64748b" }}>
                            #{grn.grnNumber}
                        </Typography>
                        <Box
                            sx={{
                                mt: 2,
                                display: "inline-block",
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                bgcolor: "#dcfce7",
                                color: "#15803d",
                            }}
                        >
                            Received
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                ml: 2,
                                display: "inline-block",
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                bgcolor: grn.inspectionStatus === "Completed" ? "#dcfce7" : "#fff7ed",
                                color: grn.inspectionStatus === "Completed" ? "#15803d" : "#c2410c",
                            }}
                        >
                            Inspection: {grn.inspectionStatus || "Pending"}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: { md: "right" } }}>
                        <Typography variant="h6" fontWeight={700}>GRN Details</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Date: {new Date(grn.receivedDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            PO Number: {grn.poNumber}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Invoice No: {grn.invoiceNumber}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 6 }} />

                {/* Info Sections */}
                <Grid container spacing={6} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <Business color="primary" />
                            <Typography variant="subtitle1" fontWeight={700}>Supplier Information</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>{grn.supplierName}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <AssignmentTurnedIn color="primary" />
                            <Typography variant="subtitle1" fontWeight={700}>Received By</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>{grn.receivedBy}</Typography>
                    </Grid>
                </Grid>

                {/* Items Table */}
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2, mb: 6 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Item Description</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>Ordered Qty</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>Received Qty</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>Unit</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Remark</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {grn.items?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="center">{item.orderedQty}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, color: "success.main" }}>{item.receivedQty}</TableCell>
                                    <TableCell align="center">{item.unit || "Nos"}</TableCell>
                                    <TableCell>{item.remark || "-"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
