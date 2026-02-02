"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import ArrowBack from "@mui/icons-material/ArrowBack";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Inventory from "@mui/icons-material/Inventory";
import Science from "@mui/icons-material/Science";
import Assignment from "@mui/icons-material/Assignment";
import Schedule from "@mui/icons-material/Schedule";
import Cancel from "@mui/icons-material/Cancel";
import Print from "@mui/icons-material/Print";
import Download from "@mui/icons-material/Download";
import Edit from "@mui/icons-material/Edit";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const DetailRow = ({ label, value }) => (
    <Box>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.025em" }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
            {value || "-"}
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
        <Typography variant="subtitle1" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
            {title}
        </Typography>
    </Box>
);

function ViewInspectionContent() {
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
    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Inspection Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/incoming-inspection")} sx={{ mt: 3, borderRadius: 2 }}>
                Back to List
            </Button>
        </Box>
    );

    const { materialData, observations, summaryData, approvalData, inspectionStatus } = data;

    const getStatusConfig = (status) => {
        const configs = {
            Approved: {
                color: "#059669",
                bg: "#d1fae5",
                border: "#34d399",
                icon: <CheckCircle sx={{ fontSize: 16 }} />,
                label: "Approved",
            },
            Rejected: {
                color: "#dc2626",
                bg: "#fee2e2",
                border: "#f87171",
                icon: <Cancel sx={{ fontSize: 16 }} />,
                label: "Rejected",
            },
            Pending: {
                color: "#d97706",
                bg: "#fef3c7",
                border: "#fbbf24",
                icon: <Schedule sx={{ fontSize: 16 }} />,
                label: "Pending",
            },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(inspectionStatus);

    return (
        <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: "1400px", margin: "0 auto" }}>
            {/* Action Bar */}
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }} spacing={2} sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/incoming-inspection")}
                    sx={{ color: "#64748b", fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "transparent", color: "#334155" } }}
                >
                    Back to List
                </Button>

                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, color: "#475569", borderColor: "#e2e8f0", bgcolor: "white" }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, color: "#475569", borderColor: "#e2e8f0", bgcolor: "white" }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/incoming-inspection/add-material-inspection?id=${id}`)}
                        sx={{
                            borderRadius: "10px", textTransform: "none", fontWeight: 600,
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
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <Stack direction="row" spacing={2.5} alignItems="center">
                                {/* <Box sx={{
                                    width: 56, height: 56, borderRadius: 3,
                                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                                    display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #bfdbfe"
                                }}>
                                    <Inventory sx={{ color: "#1172ba", fontSize: 28 }} />
                                </Box> */}
                                <Box>
                                    <Typography variant="h4 " fontWeight={800} sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
                                        Incoming Inspection :{materialData.inspectionReportNumber}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 0.5 }}>
                                        <Typography variant="body1" fontWeight={600} sx={{ color: "#64748b" }}>
                                            GRN Number: {materialData.grnNumber}
                                        </Typography>
                                        <Chip
                                            icon={statusConfig.icon}
                                            label={statusConfig.label}
                                            size="small"
                                            sx={{
                                                fontWeight: 700, fontSize: "0.75rem", borderRadius: "6px",
                                                bgcolor: statusConfig.bg, color: statusConfig.color,
                                                border: `1px solid ${statusConfig.border}`, height: 24,
                                                "& .MuiChip-icon": { color: "inherit" }
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <Box sx={{ bgcolor: "#f8fafc", p: 2, borderRadius: 3, border: "1px solid #e2e8f0" }}>
                                <Grid container spacing={2}>
                                    <Grid item size={{ xs: 6, md: 6 }}>
                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={700} textTransform="uppercase" sx={{ mb: 0.5 }}>Received Date</Typography>
                                        <Typography variant="subtitle2" fontWeight={700}>{materialData.receivedDate}</Typography>
                                    </Grid>
                                    <Grid item size={{ xs: 6, md: 6 }}>
                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={700} textTransform="uppercase" sx={{ mb: 0.5 }}>Inspection Date</Typography>
                                        <Typography variant="subtitle2" fontWeight={700}>{materialData.inspectionDate}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Information Sections */}
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    {/* Material Details Card */}
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", mb: 4, bgcolor: "white" }}>
                        <SectionHeader icon={<Inventory />} title="Material Information" />
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={3}>
                            <Grid item size={{ xs: 12, sm: 6, md: 3 }}><DetailRow label="Material Name" value={materialData.materialName} /></Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 3 }}><DetailRow label="PO Number" value={materialData.poNumber} /></Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 3 }}><DetailRow label="Supplier Name" value={materialData.supplierName} /></Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 3 }}><DetailRow label="Invoice Number" value={materialData.invoiceNumber} /></Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 3 }}><DetailRow label="Lot Number" value={materialData.lotNumber} /></Grid>
                            <Grid item size={{ xs: 12, sm: 6, md: 3 }}><DetailRow label="Lot Quantity" value={materialData.lotQuantity} /></Grid>
                        </Grid>
                    </Paper>

                    {/* Observations Table */}
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", mb: 4, bgcolor: "white" }}>
                        <SectionHeader icon={<Science />} title="Inspection Observations" />
                        <TableContainer sx={{ borderRadius: 2, border: "1px solid #f1f5f9" }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                        <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>PARAMETER</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>SPECIFICATION</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>METHOD</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>OBSERVATION</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>REMARKS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {observations.map((obs, idx) => (
                                        <TableRow key={idx} hover sx={{ "&:last-child td": { border: 0 } }}>
                                            <TableCell sx={{ fontWeight: 600 }}>{obs.parameter}</TableCell>
                                            <TableCell>{obs.specification}</TableCell>
                                            <TableCell>{obs.method}</TableCell>
                                            <TableCell sx={{ color: "#1172ba", fontWeight: 600 }}>{obs.observation || "-"}</TableCell>
                                            <TableCell color="text.secondary">{obs.remarks || "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Summary and Decisions */}
                    <Grid container spacing={3}>
                        <Grid item size={{ xs: 12, md: 7 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<Assignment />} title="Summary & Decisions" />
                                <Grid container spacing={3} sx={{ mb: 3 }}>
                                    <Grid item size={{ xs: 6, sm: 3 }}>
                                        <Box sx={{ p: 2, bgcolor: "#f0fdf4", borderRadius: 2, border: "1px solid #bbf7d0", textAlign: "center" }}>
                                            <Typography variant="caption" display="block" color="#16a34a" fontWeight={700}>ACCEPTED</Typography>
                                            <Typography variant="h6" fontWeight={800} color="#16a34a">{summaryData.acceptedQuantity}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item size={{ xs: 6, sm: 3 }}>
                                        <Box sx={{ p: 2, bgcolor: "#fef2f2", borderRadius: 2, border: "1px solid #fecaca", textAlign: "center" }}>
                                            <Typography variant="caption" display="block" color="#dc2626" fontWeight={700}>REJECTED</Typography>
                                            <Typography variant="h6" fontWeight={800} color="#dc2626">{summaryData.rejectedQuantity}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item size={{ xs: 6, sm: 3 }}>
                                        <Box sx={{ p: 2, bgcolor: "#fffbeb", borderRadius: 2, border: "1px solid #fde68a", textAlign: "center" }}>
                                            <Typography variant="caption" display="block" color="#b45309" fontWeight={700}>HOLD/SCRAP</Typography>
                                            <Typography variant="h6" fontWeight={800} color="#b45309">{summaryData.holdScrapQuantity}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item size={{ xs: 6, sm: 3 }}>
                                        <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0", textAlign: "center" }}>
                                            <Typography variant="caption" display="block" color="#64748b" fontWeight={700}>OTHER</Typography>
                                            <Typography variant="h6" fontWeight={800} color="#64748b">{summaryData.other || 0}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Typography variant="subtitle2" fontWeight={700} color="#64748b" sx={{ mb: 1, textTransform: "uppercase" }}>Decision/Comments</Typography>
                                <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #f1f5f9" }}>
                                    <Typography variant="body2" sx={{ color: "#334155", fontStyle: summaryData.comments ? "normal" : "italic" }}>
                                        {summaryData.comments || "No comments provided."}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item size={{ xs: 12, md: 5 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<CheckCircle />} title="Approvals" />
                                <Stack spacing={3}>
                                    <Box sx={{ p: 2, border: "1px solid #f1f5f9", borderRadius: 2 }}>
                                        <Typography variant="subtitle2" fontWeight={700} color="#1172ba" sx={{ mb: 2 }}>Updated By</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item size={{ xs: 6 }}><DetailRow label="Name" value={approvalData.updatedByName} /></Grid>
                                            <Grid item size={{ xs: 6 }}><DetailRow label="Date" value={approvalData.updatedByDate} /></Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ p: 2, border: "1px solid #f1f5f9", borderRadius: 2 }}>
                                        <Typography variant="subtitle2" fontWeight={700} color="#059669" sx={{ mb: 2 }}>Approved By</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item size={{ xs: 6 }}><DetailRow label="Name" value={approvalData.approvedByName} /></Grid>
                                            <Grid item size={{ xs: 6 }}><DetailRow label="Date" value={approvalData.approvedByDate} /></Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default function ViewInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewInspectionContent />
        </Suspense>
    );
}

