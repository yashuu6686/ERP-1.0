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
import FactCheck from "@mui/icons-material/FactCheck";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import Cancel from "@mui/icons-material/Cancel";
import Person from "@mui/icons-material/Person";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";
import QrCode from "@mui/icons-material/QrCode";
import Description from "@mui/icons-material/Description";
import Rule from "@mui/icons-material/Rule";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b", fullWidth = false }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: fullWidth ? '100%' : 'auto' }}>
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5
        }}>
            <Icon sx={{ color: "#1172ba", fontSize: 18 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.2 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4 }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
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
            // Fallback for demo if API fails for specific ID
            setData({
                id: "fin_1",
                inspectionNo: "FI-2026-001",
                productName: "Scanbo D8 Pro Unit",
                inspectionStdNo: "ISO-9001-26-Q4",
                date: "2026-02-03",
                quantity: "500",
                serialFrom: "SN-80001",
                serialTo: "SN-80500",
                totalChecked: "500",
                approved: "495",
                rejected: "5",
                result: "Pass",
                approvedBy: "Sanjay Kumar",
                approvalDate: "2026-02-03",
                remarks: "Batch approved for final packing. Minor rejection rate well within limits.",
                observations: [
                    { id: 1, parameter: "Enclosure Finish", specification: "No visible scratches", method: "Visual Inspection", observation: "Clean", remarks: "OK" },
                    { id: 2, parameter: "Label Adhesion", specification: "No peeling > 1mm", method: "Peel Test", observation: "Intact", remarks: "OK" },
                    { id: 3, parameter: "Power On Boot", specification: "< 5 seconds", method: "Stopwatch", observation: "3.2s Avg", remarks: "Optimal" },
                ]
            });
        } finally {
            setLoading(false);
        }
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

    const getResultChip = (result) => {
        if (result === 'Pass' || result === 'Approved') {
            return <Chip icon={<CheckCircle sx={{ fontSize: '18px !important' }} />} label="PASSED" sx={{ fontWeight: 800, bgcolor: "#dcfce7", color: "#166534", borderRadius: '8px' }} />;
        } else if (result === 'Fail' || result === 'Rejected') {
            return <Chip icon={<Cancel sx={{ fontSize: '18px !important' }} />} label="FAILED" sx={{ fontWeight: 800, bgcolor: "#fee2e2", color: "#991b1b", borderRadius: '8px' }} />;
        }
        return <Chip icon={<Warning sx={{ fontSize: '18px !important' }} />} label={result} sx={{ fontWeight: 800, bgcolor: "#f1f5f9", color: "#64748b", borderRadius: '8px' }} />;
    };

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 3 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/final-inspection")}
                            sx={{
                                color: "#64748b",
                                fontWeight: 600,
                                textTransform: "none",
                                bgcolor: "rgba(255,255,255,0.8)",
                                px: 2,
                                borderRadius: '12px',
                                backdropFilter: "blur(4px)",
                                border: '1px solid #e2e8f0',
                                "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                            }}
                        >
                            Back to Registry
                        </Button>

                        <Stack direction="row" spacing={1.5}>
                            <Tooltip title="Print Report">
                                <Button
                                    variant="outlined"
                                    startIcon={<Print />}
                                    onClick={() => window.print()}
                                    sx={{
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        color: "#475569",
                                        borderColor: "#e2e8f0",
                                        bgcolor: "white",
                                        "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                                    }}
                                >
                                    Print
                                </Button>
                            </Tooltip>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => router.push(`/final-inspection/create-final-inspection?id=${id}`)}
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                    boxShadow: "0 4px 12px rgba(17, 114, 186, 0.25)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                                        boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                                    },
                                }}
                            >
                                Edit Inspection
                            </Button>
                        </Stack>
                    </Stack>

                    <Grid container spacing={4}>
                        {/* Main Document Area */}
                        <Grid item xs={12} lg={9}>
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
                                {/* Decorative Header Gradient */}
                                <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                                <Box sx={{ p: { xs: 3, md: 5 } }}>
                                    {/* Document Header */}
                                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                                                FINAL INSPECTION
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Production Release Verification
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={data.inspectionNo}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                {getResultChip(data.result)}
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={Inventory}
                                                label="Inspected Product"
                                                value={data.productName}
                                            />
                                            <InfoItem
                                                icon={CalendarMonth}
                                                label="Inspection Date"
                                                value={data.date}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Product & Scope Details */}
                                    <Grid container spacing={3} sx={{ mb: 6 }}>
                                        <Grid item xs={12} sm={4}>
                                            <InfoItem icon={VerifiedUser} label="Standard Ref" value={data.inspectionStdNo} />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InfoItem icon={ProductionQuantityLimits} label="Total Lot Size" value={`${data.quantity} Units`} />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InfoItem icon={QrCode} label="Serial Range" value={`${data.serialFrom || 'N/A'} - ${data.serialTo || 'N/A'}`} />
                                        </Grid>
                                    </Grid>

                                    {/* Remarks/Summary Section */}
                                    <Box sx={{ mb: 6, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                                            <Description sx={{ color: '#1172ba', fontSize: 20 }} />
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Auditor Remarks</Typography>
                                        </Stack>
                                        <Typography variant="body2" sx={{ color: "#1e293b", lineHeight: 1.6, fontWeight: 500 }}>
                                            {data.remarks || "No specific remarks recorded for this lot."}
                                        </Typography>
                                    </Box>

                                    {/* Observations Table */}
                                    <Box>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Rule sx={{ color: '#1172ba' }} /> Technical Observations
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>PARAMETER</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SPECIFICATION</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>METHOD</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>FINDINGS</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>VERDICT</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.observations?.map((obs, idx) => (
                                                        <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                            <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{obs.parameter}</TableCell>
                                                            <TableCell sx={{ color: "#64748b", fontSize: '0.9rem' }}>{obs.specification}</TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label={obs.method}
                                                                    size="small"
                                                                    sx={{ bgcolor: "#f1f5f9", fontWeight: 600, color: "#475569", borderRadius: '6px' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ color: "#334155", fontWeight: 600 }}>{obs.observation}</TableCell>
                                                            <TableCell align="right">
                                                                <Typography variant="caption" sx={{ fontWeight: 800, color: "#166534" }}>OK</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {(!data.observations || data.observations.length === 0) && (
                                                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No technical observations recorded.</TableCell></TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Sidebar / Authorization Area */}
                        <Grid item xs={12} lg={3}>
                            <Stack spacing={3}>
                                {/* QA Verdict Card */}
                                <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <FactCheck sx={{ color: '#1172ba', fontSize: 20 }} /> QA Verdict
                                    </Typography>

                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Total Checked</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>{data.totalChecked}</Typography>
                                        </Stack>
                                        <Divider borderStyle="dashed" />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Approved</Typography>
                                            <Typography variant="h6" color="#15803d" fontWeight={800}>{data.approved}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Rejected</Typography>
                                            <Typography variant="h6" color="#b91c1c" fontWeight={800}>{data.rejected}</Typography>
                                        </Stack>

                                        <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px dashed #bbf7d0', textAlign: 'center' }}>
                                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 800, textTransform: "uppercase" }}>YIELD RATE</Typography>
                                            <Typography variant="h5" sx={{ color: "#15803d", fontWeight: 800 }}>
                                                {((Number(data.approved) / Number(data.totalChecked)) * 100).toFixed(1)}%
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>

                                {/* System Info & Approval */}
                                <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authority
                                    </Typography>

                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <Avatar sx={{ bgcolor: "#dcfce7", color: "#166534" }}><Person /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Approved By</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.approvedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>{data.approvalDate}</Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ my: 1 }} />

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="caption" fontWeight={700} color="#64748b">Inspection ID</Typography>
                                        <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{data.id || id}</Typography>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Print Context Styles */}
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

export default function ViewFinalInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Authenticating Quality Records..." />}>
            <ViewFinalInspectionContent />
        </Suspense>
    );
}
