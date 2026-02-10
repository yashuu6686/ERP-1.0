"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Inventory from "@mui/icons-material/Inventory";
import Assignment from "@mui/icons-material/Assignment";
import Print from "@mui/icons-material/Print";
import Edit from "@mui/icons-material/Edit";
import Person from "@mui/icons-material/Person";
import HistoryEdu from "@mui/icons-material/HistoryEdu";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Description from "@mui/icons-material/Description";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Receipt from "@mui/icons-material/Receipt";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import Warning from "@mui/icons-material/Warning";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";
import Layers from "@mui/icons-material/Layers";
import Science from "@mui/icons-material/Science";
import Rule from "@mui/icons-material/Rule";
import FactCheck from "@mui/icons-material/FactCheck";
import Download from "@mui/icons-material/Download";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import Schedule from "@mui/icons-material/Schedule";

const COLORS = {
    primary: "#1172ba",
    secondary: "#64748b",
    accent: "#0ea5e9",
    background: "#f8fafc",
    card: "#ffffff",
    border: "#e2e8f0"
};

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b" }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
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
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem" }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
);

function ViewInspectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchInspection = async () => {
            let foundData = null;
            try {
                setLoading(true);
                // Attempt real fetch if ID exists
                if (id) {
                    const response = await axiosInstance.get(`/quality-inspection/${id}`);
                    foundData = response.data;
                    console.log("Quality Inspection Data:", foundData);
                    setData(foundData);
                }
            } catch (error) {
                console.warn("API fetch failed, generating verified dummy record...");
            } finally {
                setLoading(false);
            }
        };

        fetchInspection();
    }, [id]);

    const handleApprove = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/quality-inspection/${id}`, {
                ...data,
                status: 'Approved'
            });
            setData(prev => ({ ...prev, status: 'Approved' }));
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
            await axiosInstance.put(`/quality-inspection/${id}`, {
                ...data,
                status: 'Rejected'
            });
            setData(prev => ({ ...prev, status: 'Rejected' }));
            alert("Inspection report has been rejected.");
        } catch (error) {
            console.error("Error rejecting inspection:", error);
            alert("Failed to reject inspection.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Accessing Quality Control Records..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center", color: COLORS.secondary }}>Secure Record Not Found.</Box>;

    const {
        productName,
        qualityStandard,
        checkedQuantity,
        inspectionDate,
        checkNumber,
        checkDetails,
        acceptedQuantity,
        rejectedQuantity,
        comments,
        approval,
        status,
        id: checkId
    } = data;

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/production-inspection")}
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
                            {user?.role === 'admin' && data.status === 'Pending Approval' && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<Cancel />}
                                        onClick={handleReject}
                                        sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckCircle />}
                                        onClick={handleApprove}
                                        sx={{
                                            borderRadius: "10px",
                                            textTransform: "none",
                                            fontWeight: 700,
                                            bgcolor: "#16a34a",
                                            "&:hover": { bgcolor: "#15803d" }
                                        }}
                                    >
                                        Approve Report
                                    </Button>
                                </>
                            )}

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

                            <Tooltip title="Download Report">
                                <Button
                                    variant="outlined"
                                    startIcon={<Download />}
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
                                    Download
                                </Button>
                            </Tooltip>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => router.push(`/production-inspection/edit-inspection?id=${id}`)}
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
                                Edit Record
                            </Button>
                        </Stack>
                    </Stack>

                    <Grid container spacing={2}>
                        {/* Main Document Area */}
                        <Grid size={{ xs: 12, lg: 9 }}>
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
                                                QUALITY INSPECTION
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Production Assurance & Verification
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={checkNumber}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    label={status || "COMPLETED"}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: status === "Approved" ? "#dcfce7" : status === "Rejected" ? "#fee2e2" : "#dcfce7",
                                                        color: status === "Approved" ? "#166534" : status === "Rejected" ? "#b91c1c" : "#166534",
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={Assignment}
                                                label="Inspected Product"
                                                value={productName}
                                            />
                                            <InfoItem
                                                icon={CalendarMonth}
                                                label="Inspection Date"
                                                value={inspectionDate}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Issue Metadata Grid */}
                                    <Grid container spacing={3} sx={{ mb: 6 }}>
                                        <Grid item xs={12} sm={4}>
                                            <InfoItem icon={VerifiedUser} label="Quality Standard" value={qualityStandard} />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InfoItem icon={ProductionQuantityLimits} label="Total Sample Size" value={`${checkedQuantity} Units`} />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InfoItem icon={Layers} label="Batch Reference" value="BATCH-2026-EXP-A" />
                                        </Grid>
                                    </Grid>

                                    {/* Inspection Summary / Comments Section */}
                                    <Box sx={{ mb: 6, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                                            <FactCheck sx={{ color: '#1172ba', fontSize: 20 }} />
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Executive Summary</Typography>
                                        </Stack>
                                        <Typography variant="body2" sx={{ color: "#1e293b", lineHeight: 1.6, fontWeight: 500 }}>
                                            {comments || "No specific comments recorded."}
                                        </Typography>
                                    </Box>

                                    {/* Verification Ledger Table */}
                                    <Box>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Rule sx={{ color: '#1172ba' }} /> Parameter Verification Header
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>
                                                {checkDetails?.length || 0} Control Points Checked
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>PARAMETER</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SPECIFICATION</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>METHOD</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>OBSERVATION</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>STATUS</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {checkDetails?.map((item, idx) => (
                                                        <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                            <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{item.parameters}</TableCell>
                                                            <TableCell sx={{ color: "#64748b", fontSize: '0.9rem' }}>{item.specification}</TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label={item.method}
                                                                    size="small"
                                                                    sx={{ bgcolor: "#f1f5f9", fontWeight: 600, color: "#475569", borderRadius: '6px' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ color: "#334155", fontWeight: 600 }}>{item.observation}</TableCell>
                                                            <TableCell align="right">
                                                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                                                    <Typography variant="caption" sx={{ fontWeight: 800, color: "#059669" }}>PASS</Typography>
                                                                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#059669" }} />
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Sidebar / Control Area */}
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <Stack spacing={3}>
                                {/* Authorization Card */}
                                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authorization
                                    </Typography>

                                    <Stack spacing={4}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><Person /></Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>QC Officer</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{approval?.updatedByName || "Pending"}</Typography>
                                                <Typography variant="caption" sx={{ color: "#1172ba", fontWeight: 700 }}>{approval?.updatedByDate}</Typography>
                                            </Box>
                                        </Stack>

                                        <Divider sx={{ borderStyle: 'dashed' }} />

                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: "#dcfce7", color: "#166534" }}>
                                                <CheckCircle />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Approved By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{approval?.approvedByName || "Pending"}</Typography>
                                                <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>{approval?.approvedByDate}</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Paper>

                                {/* Results Card */}
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Science sx={{ color: '#1172ba', fontSize: 20 }} /> Verdict Metrics
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Accepted</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#059669" sx={{ fontSize: '1rem' }}>
                                                {acceptedQuantity}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Rejected</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#dc2626" sx={{ fontSize: '1rem' }}>
                                                {rejectedQuantity}
                                            </Typography>
                                        </Stack>
                                        <Divider />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Yield Rate</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a">
                                                {((Number(acceptedQuantity || 0) / Number(checkedQuantity || 1)) * 100).toFixed(1)}%
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>

                                {/* Record Metadata */}
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Description sx={{ color: '#1172ba', fontSize: 20 }} /> System Info
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Check ID</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a">{id || "N/A"}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Methodology</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ textAlign: 'right', maxWidth: '60%' }}>
                                                Quantitative Analysis
                                            </Typography>
                                        </Stack>
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
        </Fade >
    );
}

export default function ViewProductionInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Secure transmission of Quality Data..." />}>
            <ViewInspectionContent />
        </Suspense>
    );
}
