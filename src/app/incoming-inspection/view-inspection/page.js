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
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "@/context/AuthContext";

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
import Description from "@mui/icons-material/Description";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Business from "@mui/icons-material/Business";
import Receipt from "@mui/icons-material/Receipt";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Person from "@mui/icons-material/Person";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

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

const MetricBox = ({ label, value, color, bg, border }) => (
    <Box sx={{
        p: 2,
        bgcolor: bg,
        borderRadius: 3,
        border: `1px solid ${border}`,
        textAlign: 'center',
        flex: 1
    }}>
        <Typography variant="caption" display="block" color={color} fontWeight={800} sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="h6" fontWeight={900} color={color}>
            {value}
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

        if (id) {
            fetchInspection();
        }
    }, [id]);

    const handleApprove = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/incoming-inspection/${id}`, {
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
            await axiosInstance.put(`/incoming-inspection/${id}`, {
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

    const { user } = useAuth();

    if (loading) return <Loader fullPage message="Loading Inspection Details..." />;

    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Inspection Report Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/incoming-inspection")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to List
            </Button>
        </Box>
    );

    const { materialData, observations, summaryData, approvalData, inspectionStatus } = data;

    const getStatusConfig = (status) => {
        const configs = {
            Approved: { color: "#166534", bg: "#dcfce7", border: "#bbedc2", icon: <CheckCircle /> },
            Rejected: { color: "#991b1b", bg: "#fee2e2", border: "#fecaca", icon: <Cancel /> },
            Pending: { color: "#92400e", bg: "#fef3c7", border: "#fde68a", icon: <Schedule /> },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(inspectionStatus);

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                    sx={{ mb: 3 }}
                    className="no-print"
                >
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/incoming-inspection")}
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
                        Back to List
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

                        {user?.role === 'admin' && inspectionStatus === 'Pending Approval' && (
                            <>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<Cancel />}
                                    onClick={handleReject}
                                    sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600 }}
                                >
                                    Reject
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<CheckCircle />}
                                    onClick={handleApprove}
                                    sx={{
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        bgcolor: "#16a34a",
                                        "&:hover": { bgcolor: "#15803d" }
                                    }}
                                >
                                    Approve Report
                                </Button>
                            </>
                        )}

                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => router.push(`/incoming-inspection/add-material-inspection?id=${id}`)}
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
                            Edit Report
                        </Button>
                    </Stack>
                </Stack>

                <Grid container spacing={2}>
                    {/* Main Content Area */}
                    <Grid item xs={12} lg={9} size={{ xs: 12, lg: 9 }}>
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
                                            QC REPORT
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2 }}>
                                            Incoming Material Inspection
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                                label={materialData.inspectionReportNumber}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#f1f5f9",
                                                    color: "#0f172a",
                                                    borderRadius: '8px',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                            <Chip
                                                icon={React.cloneElement(statusConfig.icon, { sx: { fontSize: '16px !important' } })}
                                                label={inspectionStatus}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: statusConfig.bg,
                                                    color: statusConfig.color,
                                                    borderRadius: '8px',
                                                    fontSize: '0.8rem',
                                                    border: `1px solid ${statusConfig.border}`,
                                                    "& .MuiChip-icon": { color: statusConfig.color }
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Stack spacing={2} sx={{ minWidth: 260 }}>
                                        <InfoItem icon={CalendarMonth} label="Inspection Date" value={materialData.inspectionDate} />
                                        <InfoItem icon={Description} label="GRN Reference" value={materialData.grnNumber} />
                                        <InfoItem icon={Receipt} label="Invoice Number" value={materialData.invoiceNumber} />
                                    </Stack>
                                </Stack>

                                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                {/* Material Identity */}
                                <Box sx={{ mb: 6 }}>
                                    <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2.5 }}>
                                        Material & Source Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                            <Paper elevation={0} sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                                        <Inventory sx={{ color: "#1172ba" }} />
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight={700} color="#1e293b">{materialData.materialName}</Typography>
                                                        <Typography variant="body2" color="#64748b">ID: {materialData.itemId || "MAT-001"}</Typography>
                                                    </Box>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                            <Paper elevation={0} sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                                        <Business sx={{ color: "#1172ba" }} />
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight={700} color="#1e293b">{materialData.supplierName}</Typography>
                                                        <Typography variant="body2" color="#64748b">Verified Supplier</Typography>
                                                    </Box>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Inspection Table */}
                                <Box sx={{ mb: 6 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Science sx={{ color: '#1172ba' }} /> Technical Observations
                                        </Typography>
                                        <Typography variant="body2" color="#64748b" fontWeight={600}>
                                            {observations?.length || 0} Test Parameters
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
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>RESULT</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {observations?.map((obs, idx) => (
                                                    <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                        <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{obs.parameter}</TableCell>
                                                        <TableCell sx={{ color: "#475569", fontWeight: 500 }}>{obs.specification}</TableCell>
                                                        <TableCell sx={{ color: "#64748b", fontSize: '0.85rem' }}>{obs.method}</TableCell>
                                                        <TableCell sx={{ color: "#1172ba", fontWeight: 700 }}>{obs.observation || "-"}</TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={obs.remarks || "PASS"}
                                                                size="small"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize: '0.65rem',
                                                                    borderRadius: '50px',
                                                                    bgcolor: (obs.remarks?.toLowerCase() === 'rejected' || obs.remarks?.toLowerCase() === 'fail') ? '#fee2e2' : '#f0fdf4',
                                                                    color: (obs.remarks?.toLowerCase() === 'rejected' || obs.remarks?.toLowerCase() === 'fail') ? '#dc2626' : '#16a34a',
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                {/* Decision Summary */}
                                <Box sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Assignment sx={{ color: '#1172ba' }} /> Quality Decision & Comments
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: "#334155", fontStyle: summaryData.comments ? 'normal' : 'italic', mb: 0, lineHeight: 1.7 }}>
                                        {summaryData.comments || "Detailed quality inspection conducted based on standard operating procedures. The material conforms to all specified parameters."}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar Area */}
                    <Grid item xs={12} lg={3} size={{ xs: 12, lg: 3 }}>
                        <Stack spacing={2}>
                            {/* Quantity Breakdown */}
                            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Science sx={{ color: '#1172ba', fontSize: 20 }} /> Quantity Metrics
                                </Typography>

                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 1.5 }}>
                                            Lot Composition
                                        </Typography>
                                        <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                                            <MetricBox label="Accepted" value={summaryData.acceptedQuantity} color="#16a34a" bg="#f0fdf4" border="#bbf7d0" />
                                            <MetricBox label="Rejected" value={summaryData.rejectedQuantity} color="#dc2626" bg="#fef2f2" border="#fecaca" />
                                        </Stack>
                                        <Stack direction="row" spacing={1.5}>
                                            <MetricBox label="Hold/Scrap" value={summaryData.holdScrapQuantity} color="#b45309" bg="#fffbeb" border="#fde68a" />
                                            <MetricBox label="Other" value={summaryData.other || 0} color="#475569" bg="#f8fafc" border="#e2e8f0" />
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Paper>


                            {/* Batch Info */}
                            <Paper className="no-print" sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Batch Control
                                </Typography>
                                <Stack spacing={2.5}>
                                    <InfoItem icon={Assignment} label="Lot/Batch No." value={materialData.lotNumber} />
                                    <InfoItem icon={Description} label="PO Number" value={materialData.poNumber} />
                                </Stack>
                            </Paper>

                            {/* Approval Workflow */}
                            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle sx={{ color: '#1172ba', fontSize: 20 }} /> Verification
                                </Typography>

                                <Stack spacing={3}>
                                    <Box>
                                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                                            <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Person sx={{ color: '#1172ba', fontSize: 18 }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight={800} color="#1e293b">{approvalData.approvedByName}</Typography>
                                                <Typography variant="caption" color="#64748b" fontWeight={700}>Authorized Signatory</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', ml: 6 }}>
                                            {approvalData.approvedByDate}
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <Box>
                                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                                            <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Person sx={{ color: '#64748b', fontSize: 18 }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight={700} color="#475569">{approvalData.updatedByName}</Typography>
                                                <Typography variant="caption" color="#94a3b8" fontWeight={600}>Inspected By</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', ml: 6 }}>
                                            {approvalData.updatedByDate}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Print Context Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .MuiGrid-item.lg-3 { display: none !important; }
                        .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                    }
                `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewInspectionContent />
        </Suspense>
    );
}
