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
import Print from "@mui/icons-material/Print";
import Delete from "@mui/icons-material/DeleteForever";
import ReportProblem from "@mui/icons-material/ReportProblem";
import Engineering from "@mui/icons-material/Engineering";
import Inventory from "@mui/icons-material/Inventory";
import Person from "@mui/icons-material/Person";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Description from "@mui/icons-material/Description";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import Calculate from "@mui/icons-material/Calculate";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b", fullWidth = false }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: fullWidth ? '100%' : 'auto' }}>
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: "10px", // Standard blue theme background
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5
        }}>
            {/* Standard blue theme icon */}
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

function ViewRejectedGoodsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchRejectedGoods = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/rejected-goods/${id}`);
                // Map server data to view format
                const serverData = response.data;
                console.log("Server Data:", serverData);
                setData({
                    rejectionNo: serverData.rejectionId || serverData.rejectionNo,
                    date: serverData.date,
                    vendor: serverData.vendor || "-",
                    sourceRef: serverData.sourceRef,
                    sourceType: serverData.sourceType,
                    invoiceNo: serverData.sourceRef || serverData.invoiceNo,
                    inspectedBy: serverData.rejectedBy || serverData.inspectedBy,
                    department: serverData.department || "Quality Control",
                    status: serverData.status === "total" ? "Pending Disposal" :
                        serverData.status === "return" ? "Returned" :
                            serverData.status === "scrap" ? "Scrapped" : serverData.status,
                    totalRejectionCost: serverData.totalRejectionCost || "0.00",
                    items: serverData.items || [
                        {
                            name: serverData.goods,
                            batchNo: serverData.batchNo || "-",
                            qty: serverData.qty,
                            reason: serverData.reason,
                            action: serverData.status === "return" ? "Return to Vendor" : "Scrap"
                        }
                    ],
                    remarks: serverData.remarks || serverData.reason || ""
                });
            } catch (error) {
                console.error("Error fetching rejected goods:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRejectedGoods();
        }
    }, [id]);
    if (loading) return <Loader fullPage message="Loading Rejection Report..." />;

    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Report Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/rejected-goods")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to List
            </Button>
        </Box>
    );

    const getStatusParams = (status) => {
        switch (status) {
            case 'Pending Disposal': return { color: "#b45309", bg: "#fffbeb", label: "PENDING DISPOSAL", icon: <Warning sx={{ fontSize: 16 }} /> };
            case 'Scrapped': return { color: "#b91c1c", bg: "#fee2e2", label: "SCRAPPED", icon: <Delete sx={{ fontSize: 16 }} /> };
            case 'Returned': return { color: "#1d4ed8", bg: "#dbeafe", label: "RETURNED", icon: <Inventory sx={{ fontSize: 16 }} /> };
            default: return { color: "#374151", bg: "#f3f4f6", label: status, icon: <Description sx={{ fontSize: 16 }} /> };
        }
    }

    const statusParams = getStatusParams(data.status);

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/rejected-goods")}
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
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => {/* Handle Edit */ }}
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)", // Converted to Theme Blue
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
                        {/* Main Document Area */}
                        <Grid size={{ xs: 12, md: 9 }}>
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
                                {/* Standard Blue Header Gradient */}
                                <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                                <Box sx={{ p: { xs: 3, md: 5 } }}>
                                    {/* Document Header */}
                                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                                                REJECTION REPORT
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Non-Conformance Material Log
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={data.rejectionNo}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    icon={statusParams.icon}
                                                    label={statusParams.label}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: statusParams.bg,
                                                        color: statusParams.color,
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem',
                                                        '& .MuiChip-icon': { color: 'inherit' }
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 260 }}>
                                            <InfoItem
                                                icon={CalendarMonth}
                                                label="Date of Rejection"
                                                value={data.date}
                                            />
                                            <InfoItem
                                                icon={Description}
                                                label="Ref Invoice"
                                                value={data.invoiceNo}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Source and Inspector Info */}
                                    <Grid container spacing={2} sx={{ mb: 6 }}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                                                {/* Blue Header */}
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#1172ba' }}>
                                                    <Inventory sx={{ color: '#1172ba' }} /> VENDOR DETAILS
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <InfoItem icon={Inventory} label="Vendor Name" value={data.vendor} />
                                                    <InfoItem icon={Description} label="Invoice No" value={data.invoiceNo} />
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                                                {/* Blue Header */}
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#1172ba' }}>
                                                    <VerifiedUser sx={{ color: '#1172ba' }} /> INSPECTION INFO
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <InfoItem icon={Person} label="Inspected By" value={data.inspectedBy} />
                                                    <InfoItem icon={Engineering} label="Department" value={data.department} />
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Rejection Items Table */}
                                    <Box sx={{ mb: 4 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                {/* Blue Icon */}
                                                <ReportProblem sx={{ color: '#1172ba' }} /> Rejected Items
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>MATERIAL NAME</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>BATCH</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>REASON FOR REJECTION</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>ACTION</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.items && data.items.map((item, idx) => (
                                                        <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                            <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                                            <TableCell>
                                                                <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ fontFamily: 'monospace', color: "#64748b", fontWeight: 600 }}>
                                                                {item.batchNo || "-"}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {/* Quantity Chip - kept light red for context, but softer */}
                                                                <Chip label={item.qty} size="small" sx={{ fontWeight: 800, bgcolor: "#fee2e2", color: "#b91c1c", borderRadius: '6px' }} />
                                                            </TableCell>
                                                            <TableCell sx={{ color: "#334155", fontWeight: 500 }}>
                                                                {item.reason}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography variant="caption" fontWeight={700} color="#0f172a" sx={{ bgcolor: "#f1f5f9", px: 1, py: 0.5, borderRadius: 1 }}>
                                                                    {item.action}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {(!data.items || data.items.length === 0) && (
                                                        <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No rejected items recorded.</TableCell></TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>

                                    {/* Remarks Section */}
                                    <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #e2e8f0" }}>
                                        <Typography variant="caption" fontWeight={700} color="#64748b" textTransform="uppercase">Additional Remarks</Typography>
                                        <Typography variant="body2" color="#334155" sx={{ mt: 0.5, fontStyle: data.remarks ? 'normal' : 'italic' }}>
                                            {data.remarks || "No additional remarks provided."}
                                        </Typography>
                                    </Box>

                                </Box>
                            </Paper>
                        </Grid>

                        {/* Sidebar */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Stack spacing={2}>
                                {/* Cost Impact Summary */}
                                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>

                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calculate sx={{ color: '#1172ba', fontSize: 20 }} /> Impact Analysis
                                    </Typography>

                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Rejection Count</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>{data.items ? data.items.length : 0}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Total Qty</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>
                                                {data.items ? data.items.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0) : 0}
                                            </Typography>
                                        </Stack>
                                        <Divider borderStyle="dashed" />
                                        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Est. Value Loss</Typography>
                                            <Typography variant="h6" color="#b91c1c" fontWeight={800}>
                                                ₹ {data.totalRejectionCost || "0.00"}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>

                                {/* System Info */}
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, color: '#1172ba', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Warning sx={{ color: '#1172ba', fontSize: 20 }} /> Action Required
                                    </Typography>
                                    <Typography variant="body2" color="#334155" sx={{ mb: 2 }}>
                                        Items marked for &quot;Return to Vendor&quot; must be dispatched within 48 hours. Items for &quot;Scrap&quot; require manager approval.
                                    </Typography>
                                    <Button fullWidth variant="outlined" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: "white", borderColor: "#e2e8f0", color: "#475569" }}>
                                        Notify Vendor
                                    </Button>
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

export default function ViewRejectedGoods() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewRejectedGoodsContent />
        </Suspense>
    );
}
