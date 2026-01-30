"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Divider,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import { ArrowBack, CheckCircle, Inventory, Science, Assignment } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const DetailRow = ({ label, value }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>
            {value || "-"}
        </Typography>
    </Box>
);

const SectionTitle = ({ icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, mt: 1 }}>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: "rgba(17, 114, 186, 0.1)",
            color: "#1172ba"
        }}>
            {React.cloneElement(icon, { fontSize: "small" })}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", fontSize: "1rem" }}>
            {title}
        </Typography>
    </Box>
);

export default function ViewInspection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            fetchInspection();
        }
    }, [id]);

    const fetchInspection = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/incoming-inspection/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching inspection:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Inspection Details..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center" }}>Inspection not found.</Box>;

    const { materialData, observations, summaryData, approvalData, inspectionStatus } = data;

    return (
        <Box sx={{ pb: 4 }}>
            <CommonCard
                title="View Incoming Inspection"
                onAdd={() => router.push("/incoming-inspection")}
                addText="Back to List"
            >
                <Box sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b", mb: 0.5 }}>
                                {materialData.grnNumber}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Inspection Report: <span style={{ fontWeight: 600, color: "#1172ba" }}>{materialData.inspectionReportNumber}</span>
                            </Typography>
                        </Box>
                        <Chip
                            label={inspectionStatus || "Draft"}
                            color={inspectionStatus === "Approved" ? "success" : "warning"}
                            sx={{ fontWeight: 700, px: 2, height: 32 }}
                        />
                    </Box>

                    {/* Section 1: Material Information */}
                    <SectionTitle icon={<Inventory />} title="Material Information" />
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={3}><DetailRow label="Material Name" value={materialData.materialName} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="PO Number" value={materialData.poNumber} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Supplier" value={materialData.supplierName} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Lot Quantity" value={materialData.lotQuantity} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Received Date" value={materialData.receivedDate} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Invoice Number" value={materialData.invoiceNumber} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Lot Number" value={materialData.lotNumber} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Inspection Date" value={materialData.inspectionDate} /></Grid>
                    </Grid>

                    <Divider sx={{ mb: 4 }} />

                    {/* Section 2: Observations */}
                    <SectionTitle icon={<Science />} title="Inspection Observations" />
                    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", mb: 4, borderRadius: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>Parameter</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Specification</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Observation</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Remarks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {observations.map((obs, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{obs.parameter}</TableCell>
                                        <TableCell>{obs.specification}</TableCell>
                                        <TableCell>{obs.method}</TableCell>
                                        <TableCell>{obs.observation || "-"}</TableCell>
                                        <TableCell>{obs.remarks || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Divider sx={{ mb: 4 }} />

                    {/* Section 3: Summary & Approval */}
                    <SectionTitle icon={<Assignment />} title="Summary & Results" />
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ p: 2, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0" }}>
                                <DetailRow label="Accepted Quantity" value={summaryData.acceptedQuantity} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ p: 2, bgcolor: "#fef2f2", borderRadius: 2, border: "1px solid #fecaca" }}>
                                <DetailRow label="Rejected Quantity" value={summaryData.rejectedQuantity} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Hold/Scrap" value={summaryData.holdScrapQuantity} /></Grid>
                        <Grid item xs={12} md={3}><DetailRow label="Other" value={summaryData.other} /></Grid>
                    </Grid>

                    <Box sx={{ p: 3, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0", mb: 4 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Decision/Comments:</Typography>
                        <Typography variant="body2">{summaryData.comments || "No comments provided."}</Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, border: "1px solid #e2e8f0", borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#64748b" }}>Updated By</Typography>
                                <DetailRow label="Name" value={approvalData.updatedByName} />
                                <DetailRow label="Date" value={approvalData.updatedByDate} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, border: "1px solid #e2e8f0", borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#64748b" }}>Approved By</Typography>
                                <DetailRow label="Name" value={approvalData.approvedByName} />
                                <DetailRow label="Date" value={approvalData.approvedByDate} />
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 6, display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/incoming-inspection")}
                        >
                            Back to List
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => router.push(`/incoming-inspection/add-material-inspection?id=${id}`)}
                            sx={{ bgcolor: "#1172ba", "&:hover": { bgcolor: "#0d5a94" } }}
                        >
                            Edit Inspection
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
        </Box>
    );
}
