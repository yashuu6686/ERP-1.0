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

import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Inventory from "@mui/icons-material/Inventory";
import Assignment from "@mui/icons-material/Assignment";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Print from "@mui/icons-material/Print";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const DetailRow = ({ label, value }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
            {value || "N/A"}
        </Typography>
    </Box>
);

const SectionHeader = ({ icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box sx={{
            width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff",
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            {React.cloneElement(icon, { sx: { color: "#1172ba", fontSize: 20 } })}
        </Box>
        <Typography variant="subtitle1" fontWeight={800} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
            {title}
        </Typography>
    </Box>
);

function ViewFinalInspectionContent() {
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
            const response = await axiosInstance.get(`/final-inspections/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching inspection:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Fetching Inspection Details..." />;
    if (!data) return <Box sx={{ p: 4 }}>Inspection Not Found</Box>;

    return (
        <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: "1400px", margin: "0 auto" }}>
            {/* Action Bar */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/final-inspection")}
                    sx={{ color: "#64748b", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "transparent", color: "#334155" } }}
                >
                    Back to List
                </Button>

                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, color: "#475569", borderColor: "#e2e8f0", bgcolor: "white" }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/final-inspection/create-final-inspection?id=${id}`)}
                        sx={{
                            borderRadius: "10px", textTransform: "none", fontWeight: 700,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                            boxShadow: "0 4px 6px -1px rgba(17, 114, 186, 0.2)"
                        }}
                    >
                        Edit Inspection
                    </Button>
                </Stack>
            </Stack>

            {/* Main Content glassy Paper */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                }}
            >
                {/* Header Banner */}
                <Box sx={{ p: { xs: 3, md: 4 }, borderBottom: "1px solid #f1f5f9" }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item size={{ xs: 12, md: 8 }}>
                            <Box>
                                <Typography variant="h4" fontWeight={900} sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
                                    {data.inspectionNo}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                    <Typography variant="body1" fontWeight={700} sx={{ color: "#64748b" }}>
                                        Final Quality Verification
                                    </Typography>
                                    <Chip
                                        label={data.result}
                                        size="small"
                                        sx={{
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            bgcolor: data.result === "Pass" ? "#dcfce7" : data.result === "Fail" ? "#fee2e2" : "#fef9c3",
                                            color: data.result === "Pass" ? "#15803d" : data.result === "Fail" ? "#b91c1c" : "#a16207",
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 4 }}>
                            <Box sx={{ bgcolor: "#f1f5f9", p: 2, borderRadius: 3, border: "1px solid #e2e8f0", textAlign: "right" }}>
                                <Typography variant="caption" display="block" color="#64748b" fontWeight={800} textTransform="uppercase">Inspection Date</Typography>
                                <Typography variant="h6" fontWeight={800} color="#1172ba">{data.date}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Information Sections */}
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Grid container spacing={4}>
                        {/* Product Info */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<Inventory />} title="Product Information" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><DetailRow label="Product Name" value={data.productName} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Inspection Std No." value={data.inspectionStdNo} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Quantity" value={data.quantity} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Date" value={data.date} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Serial From" value={data.serialFrom} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Serial To" value={data.serialTo} /></Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Verification Summary */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<VerifiedUser />} title="Verification Summary" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><DetailRow label="Total Checked" value={data.totalChecked} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Approved" value={data.approved} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Rejected" value={data.rejected} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Approved By" value={data.approvedBy} /></Grid>
                                    <Grid item xs={12}><DetailRow label="Approval Date" value={data.approvalDate} /></Grid>
                                    <Grid item xs={12}>
                                        <DetailRow label="Remarks" value={data.remarks} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                        </Grid>

                        {/* Observations */}
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "white" }}>
                                <SectionHeader icon={<Assignment />} title="Inspection Observations" />
                                <TableContainer sx={{ borderRadius: 2, border: "1px solid #f1f5f9" }}>
                                    <Table size="small">
                                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>PARAMETER</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>SPECIFICATION</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>METHOD</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>OBSERVATION</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>REMARKS</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.observations?.map((obs) => (
                                                <TableRow key={obs.id} hover>
                                                    <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{obs.parameter}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{obs.specification}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{obs.method}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{obs.observation}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{obs.remarks || "-"}</TableCell>
                                                </TableRow>
                                            ))}
                                            {(!data.observations || data.observations.length === 0) && (
                                                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No observations recorded.</TableCell></TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default function ViewFinalInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewFinalInspectionContent />
        </Suspense>
    );
}
