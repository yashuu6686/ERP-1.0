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

import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Devices from "@mui/icons-material/Devices";
import FactCheck from "@mui/icons-material/FactCheck";
import Inventory2 from "@mui/icons-material/Inventory2";
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

function ViewSOPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchSOP = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/sops/${id}`);
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

    if (loading) return <Loader fullPage message="Fetching SOP Details..." />;
    if (!data) return <Box sx={{ p: 4 }}>SOP Not Found</Box>;

    return (
        <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: "1400px", margin: "0 auto" }}>
            {/* Action Bar */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/sop")}
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
                        onClick={() => router.push(`/sop/create-sop?id=${id}`)}
                        sx={{
                            borderRadius: "10px", textTransform: "none", fontWeight: 700,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                            boxShadow: "0 4px 6px -1px rgba(17, 114, 186, 0.2)"
                        }}
                    >
                        Edit SOP
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
                                    SOP: {data.sopNumber}
                                </Typography>
                                <Typography variant="body1" fontWeight={700} sx={{ color: "#64748b", mt: 0.5 }}>
                                    Standard Operating Procedure Details
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 4 }}>
                            <Box sx={{ bgcolor: "#f1f5f9", p: 2, borderRadius: 3, border: "1px solid #e2e8f0", textAlign: "right" }}>
                                <Typography variant="caption" display="block" color="#64748b" fontWeight={800} textTransform="uppercase">Record Date</Typography>
                                <Typography variant="h6" fontWeight={800} color="#1172ba">{data.date}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Information Sections */}
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Grid container spacing={4}>
                        {/* Device & Company Info */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<Devices />} title="Device & Company Information" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><DetailRow label="Device ID" value={data.deviceId} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Company Name" value={data.companyName} /></Grid>
                                    <Grid item xs={12}><DetailRow label="Company Address" value={data.companyAddress} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Assisted By" value={data.assistedBy} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Done By" value={data.doneBy} /></Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Authorization Info */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<Inventory2 />} title="Authorization Details" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><DetailRow label="Testing By" value={data.testingBy} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Testing Date" value={data.testingDate} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Verified By" value={data.verifiedBy} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Verified Date" value={data.verifiedDate} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Packed By" value={data.packedBy} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Checked By" value={data.checkedBy} /></Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                        </Grid>

                        {/* Testing Results */}
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "white" }}>
                                <SectionHeader icon={<FactCheck />} title="Testing Observations" />
                                <TableContainer sx={{ borderRadius: 2, border: "1px solid #f1f5f9" }}>
                                    <Table size="small">
                                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>TASK</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>STATUS</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>REMARKS</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(data.testingResults || {}).map(([key, res]) => (
                                                <TableRow key={key} hover>
                                                    <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>Task {parseInt(key) + 1}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{
                                                            px: 1.5, py: 0.5, borderRadius: 1.5, display: "inline-block",
                                                            bgcolor: res.status === "Pass" ? "#dcfce7" : "#fee2e2",
                                                            color: res.status === "Pass" ? "#15803d" : "#b91c1c",
                                                            fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase"
                                                        }}>
                                                            {res.status || "N/A"}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{res.remarks || "-"}</TableCell>
                                                </TableRow>
                                            ))}
                                            {(!data.testingResults || Object.keys(data.testingResults).length === 0) && (
                                                <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No testing observations recorded.</TableCell></TableRow>
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

export default function ViewSOP() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewSOPContent />
        </Suspense>
    );
}
