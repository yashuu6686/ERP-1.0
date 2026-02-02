"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Divider,
    Button,
    Paper
} from "@mui/material";
import {
    ArrowBack,
    Inventory2,
    FactCheck,
    Summarize,
    DateRange,
    Numbers
} from "@mui/icons-material";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "../../../components/Loader";

export default function BatchDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchBatchDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/batches/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching batch details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBatchDetails();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Batch Details..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center" }}>Batch not found</Box>;

    // Destructure for easier access, handling optional fields
    const {
        batchNo,
        requestNo,
        checkNo,
        productSr,
        acceptedQty,
        status,
        date,
        qualityCheck = [],
        summary = {}
    } = data;

    const InfoCard = ({ icon: Icon, title, value, color = "#1e293b" }) => (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 2, bgcolor: "#f8fafc", borderRadius: 2 }}>
            <Box sx={{ p: 1, bgcolor: "rgba(17, 114, 186, 0.1)", borderRadius: 1.5, color: "#1172ba" }}>
                <Icon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600, mb: 0.5 }}>
                    {title}
                </Typography>
                <Typography variant="h6" sx={{ color, fontWeight: 700, fontSize: "1rem" }}>
                    {value || "-"}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.back()}
                        sx={{
                            color: "#64748b",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#f1f5f9" }
                        }}
                    >
                        Back
                    </Button>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
                            Batch Details
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                            Serialized tracking and quality assurance log
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    label={status}
                    color={status === "Ready" ? "success" : "default"}
                    sx={{ fontWeight: 700, borderRadius: 1.5 }}
                />
            </Box>

            <Grid container spacing={3}>
                {/* Core Info */}
                <Grid item xs={12}>
                    <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                        <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                                <Inventory2 sx={{ color: "#1172ba" }} /> Batch Overview
                            </Typography>
                        </Box>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <InfoCard icon={Numbers} title="Batch Number" value={batchNo} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <InfoCard icon={Inventory2} title="Request No." value={requestNo} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <InfoCard icon={FactCheck} title="Check No." value={checkNo} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <InfoCard icon={DateRange} title="Created Date" value={date ? new Date(date).toLocaleDateString() : "-"} />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3, p: 2, bgcolor: "#f0f9ff", borderRadius: 2, border: "1px dashed #bae6fd" }}>
                                <Typography variant="body2" sx={{ color: "#0c4a6e", fontWeight: 600 }}>
                                    Product Serial Range: <span style={{ color: "#0284c7" }}>{productSr}</span>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quality Check Details */}
                <Grid item xs={12} lg={8}>
                    <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3, height: "100%" }}>
                        <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                                <FactCheck sx={{ color: "#1172ba" }} /> Quality Verification Log
                            </Typography>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Parameter</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Specification</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Observation</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Remarks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {qualityCheck.length > 0 ? (
                                        qualityCheck.map((row, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell sx={{ fontWeight: 600 }}>{row.parameters}</TableCell>
                                                <TableCell>{row.specification}</TableCell>
                                                <TableCell sx={{ color: "#1172ba", fontWeight: 500 }}>{row.observation}</TableCell>
                                                <TableCell sx={{ fontStyle: "italic", color: "#64748b" }}>{row.remarks || "-"}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                                                No quality check details recorded.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>

                {/* Summary Side Panel */}
                <Grid item xs={12} lg={4}>
                    <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3, height: "100%" }}>
                        <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                                <Summarize sx={{ color: "#1172ba" }} /> Inspection Summary
                            </Typography>
                        </Box>
                        <CardContent>
                            <Box sx={{ mb: 3, p: 2, bgcolor: "#ecfdf5", borderRadius: 2, border: "1px solid #d1fae5" }}>
                                <Typography variant="caption" sx={{ color: "#059669", fontWeight: 700, textTransform: "uppercase" }}>
                                    Accepted Quantity
                                </Typography>
                                <Typography variant="h4" sx={{ color: "#047857", fontWeight: 800 }}>
                                    {summary.acceptedQuantity || acceptedQty || 0}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{ p: 1.5, bgcolor: "#fef2f2", borderRadius: 2, border: "1px solid #fee2e2" }}>
                                        <Typography variant="caption" sx={{ color: "#b91c1c", fontWeight: 700 }}>
                                            Rejected
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: "#991b1b", fontWeight: 700 }}>
                                            {summary.rejectedQuantity || 0}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ p: 1.5, bgcolor: "#fff7ed", borderRadius: 2, border: "1px solid #ffedd5" }}>
                                        <Typography variant="caption" sx={{ color: "#c2410c", fontWeight: 700 }}>
                                            Hold/Scrap
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: "#9a3412", fontWeight: 700 }}>
                                            {summary.holdScrapQuantity || 0}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {summary.comments && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                        Comments
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#475569", p: 1.5, bgcolor: "#f8fafc", borderRadius: 2 }}>
                                        {summary.comments}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
