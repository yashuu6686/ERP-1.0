"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import Download from "@mui/icons-material/Download";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Print from "@mui/icons-material/Print";
import Business from "@mui/icons-material/Business";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Description from "@mui/icons-material/Description";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";
import Explore from "@mui/icons-material/Explore";

import Loader from "../../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";

function ViewDispatchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [dispatch, setDispatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDispatchDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/dispatches/${id}`);
                setDispatch(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                alert("Failed to fetch dispatch details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDispatchDetails();
        }
    }, [id]);

    if (loading) {
        return <Loader fullPage message="Loading Dispatch Details..." />;
    }

    if (!dispatch) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" gutterBottom fontWeight={600}>Dispatch Record Not Found</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>The dispatch entry you are looking for does not exist or has been removed.</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ borderRadius: 2, textTransform: "none" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    const { shipmentInfo, customer, items, status } = dispatch;

    const getStatusConfig = (currentStatus) => {
        const configs = {
            Shipped: { color: "#0c5460", bg: "#d1ecf1", border: "#bee5eb", label: "Shipped", icon: <LocalShipping sx={{ fontSize: 16 }} /> },
            Delivered: { color: "#155724", bg: "#d4edda", border: "#c3e6cb", label: "Delivered", icon: <CheckCircle sx={{ fontSize: 16 }} /> },
            Pending: { color: "#856404", bg: "#fff3cd", border: "#ffeeba", label: "Pending", icon: <Schedule sx={{ fontSize: 16 }} /> },
            Processing: { color: "#383d41", bg: "#e2e3e5", border: "#d6d8db", label: "Processing", icon: <Schedule sx={{ fontSize: 16 }} /> },
        };
        return configs[currentStatus] || configs.Pending;
    };

    const statusConfig = getStatusConfig(status);

    return (
        <Box>
            {/* Top Navigation & Actions */}
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }} spacing={1} sx={{ mb: 1 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/dispatch")}
                    sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        "&:hover": { color: "#334155", bgcolor: "transparent" },
                    }}
                >
                    Back to Dispatch List
                </Button>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            color: "#475569",
                            borderColor: "#e2e8f0",
                            bgcolor: "white",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                        }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            color: "#475569",
                            borderColor: "#e2e8f0",
                            bgcolor: "white",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                            boxShadow: "0 4px 6px -1px rgba(17, 114, 186, 0.2)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                                boxShadow: "0 6px 8px -1px rgba(17, 114, 186, 0.3)",
                            },
                        }}
                    >
                        Edit Tracking
                    </Button>
                </Stack>
            </Stack>

            {/* Main Content Card */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "rgba(226, 232, 240, 0.8)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                }}
            >
                {/* Header Banner */}
                <Box sx={{ p: { xs: 3, md: 2 }, borderBottom: "1px solid #f1f5f9" }}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box>
                                    <Typography variant="h4" fontWeight={800} sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
                                        Dispatch Entry
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 0.5 }}>
                                        <Typography variant="body1" fontWeight={600} sx={{ color: "#64748b" }}>
                                            Order: {shipmentInfo.orderNumber}
                                        </Typography>
                                        <Chip
                                            icon={statusConfig.icon}
                                            label={statusConfig.label}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "0.75rem",
                                                borderRadius: "6px",
                                                bgcolor: statusConfig.bg,
                                                color: statusConfig.color,
                                                border: `1px solid ${statusConfig.border}`,
                                                height: 24,
                                                "& .MuiChip-icon": { color: "inherit", marginLeft: "4px" },
                                                "& .MuiChip-label": { paddingLeft: "8px", paddingRight: "8px" },
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={{ xs: 2, sm: 4 }}
                                justifyContent={{ md: "flex-end" }}
                                sx={{ bgcolor: "#f8fafc", p: 2, borderRadius: 3, border: "1px solid #e2e8f0" }}
                            >
                                <Box>
                                    <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                        Shipping Date
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                        {new Date(shipmentInfo.shippingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                        Carrier
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                        {shipmentInfo.carrier}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: { xs: 1, md: 2 } }}>
                    {/* 2-Column Info Grid */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {/* Shipment Info Card */}
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: "100%",
                                    borderRadius: 3,
                                    border: "1px solid #e2e8f0",
                                    bgcolor: "white",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                }}
                            >
                                <Stack spacing={2.5}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Explore sx={{ color: "#1172ba", fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                            Tracking & Logistics
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />
                                    <Stack spacing={2}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                            <Typography variant="body2" color="#64748b">Tracking Number</Typography>
                                            <Typography variant="body2" fontWeight={700} color="#1172ba">{shipmentInfo.trackingNumber}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                            <Typography variant="body2" color="#64748b">Sales Platform</Typography>
                                            <Typography variant="body2" fontWeight={600} color="#334155">{shipmentInfo.platform}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                            <Typography variant="body2" color="#64748b">Expected Delivery</Typography>
                                            <Typography variant="body2" fontWeight={600} color="#334155">{new Date(shipmentInfo.expectedDelivery).toLocaleDateString()}</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Customer Card */}
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: "100%",
                                    borderRadius: 3,
                                    border: "1px solid #e2e8f0",
                                    bgcolor: "white",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                }}
                            >
                                <Stack spacing={2.5}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Business sx={{ color: "#1172ba", fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                            Delivery Destination
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />
                                    <Stack spacing={1}>
                                        <Typography variant="h6" fontWeight={700} color="#1e293b">{customer.companyName}</Typography>
                                        <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{customer.address}</Typography>
                                        <Stack spacing={1} sx={{ mt: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2" color="#64748b">Contact</Typography>
                                                <Typography variant="body2" fontWeight={600}>{customer.contactPerson}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2" color="#64748b">Phone</Typography>
                                                <Typography variant="body2" fontWeight={600}>{customer.phone}</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Dispatched Items Table */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: "white",
                            borderRadius: 3,
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 3 }}>
                            Shipment Items
                        </Typography>
                        <TableContainer>
                            <Table sx={{ minWidth: 500 }}>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                        <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>SR NO.</TableCell>
                                        <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>ITEM NAME</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>SERIAL NO.</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>QTY</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>WEIGHT</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:hover": { bgcolor: "#f8fafc" },
                                                "&:last-child td, &:last-child th": { border: 0 },
                                                transition: "background-color 0.1s",
                                                borderBottom: "1px solid #f1f5f9"
                                            }}
                                        >
                                            <TableCell sx={{ py: 2.5, color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>
                                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                            </TableCell>
                                            <TableCell sx={{ py: 2.5 }}>
                                                <Typography variant="subtitle2" fontWeight={600} color="#1e293b">{item.name}</Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ py: 2.5, fontWeight: 500, color: "#64748b" }}>
                                                {item.serialNo}
                                            </TableCell>
                                            <TableCell align="center" sx={{ py: 2.5 }}>
                                                <Box sx={{ display: "inline-block", bgcolor: "#eff6ff", color: "#1172ba", px: 1.5, py: 0.5, borderRadius: "6px", fontWeight: 700, fontSize: "0.85rem", minWidth: "40px", textAlign: "center" }}>
                                                    {item.qty}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right" sx={{ py: 2.5, color: "#0f172a", fontWeight: 700, fontSize: "0.95rem" }}>
                                                {item.weight}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Paper>
        </Box>
    );
}

export default function ViewDispatchPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewDispatchContent />
        </Suspense>
    );
}
