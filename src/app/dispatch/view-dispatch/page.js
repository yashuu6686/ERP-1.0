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
import LocalShipping from "@mui/icons-material/LocalShipping";
import Print from "@mui/icons-material/Print";
import Business from "@mui/icons-material/Business";
import Download from "@mui/icons-material/Download";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";
import Explore from "@mui/icons-material/Explore";
import Cancel from "@mui/icons-material/Cancel";
import Person from "@mui/icons-material/Person";
import Inventory from "@mui/icons-material/Inventory";
import Map from "@mui/icons-material/Map";
import Phone from "@mui/icons-material/Phone";

import axiosInstance from "@/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
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

function ViewDispatchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [dispatch, setDispatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchDispatchDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/dispatches/${id}`);
                console.log("Dispatch Server Data:", response.data);
                setDispatch(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                // No fallback - only show server data
                setDispatch(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDispatchDetails();
        }
    }, [id]);

    const handleApprove = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/dispatches/${id}`, {
                ...dispatch,
                status: 'Shipped'
            });
            setDispatch(prev => ({ ...prev, status: 'Shipped' }));
            alert("Dispatch entry has been approved.");
        } catch (error) {
            console.error("Error approving dispatch:", error);
            alert("Failed to approve dispatch.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setLoading(true);
            await axiosInstance.put(`/dispatches/${id}`, {
                ...dispatch,
                status: 'Rejected'
            });
            setDispatch(prev => ({ ...prev, status: 'Rejected' }));
            alert("Dispatch entry has been rejected.");
        } catch (error) {
            console.error("Error rejecting dispatch:", error);
            alert("Failed to reject dispatch.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Tracking Shipment..." />;

    if (!dispatch) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Dispatch Record Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/dispatch")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Dispatch List
                </Button>
            </Box>
        );
    }

    const { shipmentInfo, customer, items, status } = dispatch;

    const getStatusChip = (currentStatus) => {
        const configs = {
            Shipped: { color: "#0c5460", bg: "#d1ecf1", label: "SHIPPED", icon: <LocalShipping sx={{ fontSize: '16px !important' }} /> },
            Delivered: { color: "#155724", bg: "#d4edda", label: "DELIVERED", icon: <CheckCircle sx={{ fontSize: '16px !important' }} /> },
            Pending: { color: "#856404", bg: "#fff3cd", label: "PENDING", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            Processing: { color: "#383d41", bg: "#e2e3e5", label: "PROCESSING", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            "Pending Approval": { color: "#92400e", bg: "#fef3c7", label: "PENDING APPROVAL", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            Rejected: { color: "#b91c1c", bg: "#fee2e2", label: "REJECTED", icon: <Cancel sx={{ fontSize: '16px !important' }} /> },
        };
        const config = configs[currentStatus] || configs.Pending;

        return (
            <Chip
                icon={config.icon}
                label={config.label}
                sx={{
                    fontWeight: 700,
                    bgcolor: config.bg,
                    color: config.color,
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    height: 28,
                    '& .MuiChip-icon': { color: 'inherit' }
                }}
            />
        );
    };

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 3 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/dispatch")}
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
                            Back to Dispatch
                        </Button>

                        <Stack direction="row" spacing={1.5}>
                            {user?.role === 'admin' && dispatch.status === 'Pending Approval' && (
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
                                        Approve Entry
                                    </Button>
                                </>
                            )}
                            <Tooltip title="Download Waybill">
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
                                    Waybill
                                </Button>
                            </Tooltip>
                            <Tooltip title="Print Manifest">
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
                                onClick={() => router.push(`/dispatch/create-dispatch-entry?id=${id}`)}
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
                                Edit Tracking
                            </Button>
                        </Stack>
                    </Stack>

                    <Grid container spacing={4}>
                        {/* Main Content */}
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
                                                DISPATCH MANIFEST
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Logistics & Shipment Details
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={shipmentInfo.trackingNumber}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem',
                                                        fontFamily: 'monospace'
                                                    }}
                                                />
                                                {getStatusChip(status)}
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 260 }}>
                                            <InfoItem
                                                icon={LocalShipping}
                                                label="Carrier"
                                                value={shipmentInfo.carrier}
                                            />
                                            <InfoItem
                                                icon={Schedule}
                                                label="Expected Delivery"
                                                value={new Date(shipmentInfo.expectedDelivery).toLocaleDateString()}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Logistics & Destination */}
                                    <Grid container spacing={6} sx={{ mb: 6 }}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                                    <Explore sx={{ color: '#1172ba' }} /> LOGISTICS INFO
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <InfoItem icon={Business} label="Sales Platform" value={shipmentInfo.platform} />
                                                    <InfoItem icon={Schedule} label="Ship Date" value={new Date(shipmentInfo.shippingDate).toLocaleDateString()} />
                                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                                    <Typography variant="caption" color="#64748b" fontWeight={700}>TRACKING ID</Typography>
                                                    <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ fontFamily: 'monospace' }}>
                                                        {shipmentInfo.trackingNumber}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                                    <Map sx={{ color: '#1172ba' }} /> DESTINATION
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <Typography variant="body1" fontWeight={700} color="#1e293b">{customer.companyName}</Typography>
                                                    <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{customer.address}</Typography>
                                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                                    <Box>
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <Person sx={{ fontSize: 16, color: '#64748b' }} />
                                                            <Typography variant="body2" fontWeight={600}>{customer.contactPerson}</Typography>
                                                        </Stack>
                                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                                                            <Phone sx={{ fontSize: 16, color: '#64748b' }} />
                                                            <Typography variant="body2" fontWeight={600}>{customer.phone}</Typography>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Items Table */}
                                    <Box>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Inventory sx={{ color: '#1172ba' }} /> Shipment Contents
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>ITEM DESCRIPTION</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SERIAL NO</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>WEIGHT</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {items.map((item, idx) => (
                                                        <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                            <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                                            <TableCell>
                                                                <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ fontFamily: 'monospace', color: "#64748b", fontWeight: 600 }}>
                                                                {item.serialNo || "-"}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Chip label={item.qty} size="small" sx={{ fontWeight: 800, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px' }} />
                                                            </TableCell>
                                                            <TableCell align="right" sx={{ fontWeight: 700, color: "#0f172a" }}>
                                                                {item.weight}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {(!items || items.length === 0) && (
                                                        <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No items in shipment.</TableCell></TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} lg={3}>
                            <Stack spacing={3}>
                                {/* Order Summary */}
                                <Paper sx={{ p: 4, px: 6, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Inventory sx={{ color: '#1172ba', fontSize: 20 }} /> Summary
                                    </Typography>

                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Total Items</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>{items.length}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Total Qty</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>
                                                {items.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0)}
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 3, borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                                    >
                                        Track on {shipmentInfo.carrier}
                                    </Button>
                                </Paper>

                                {/* System Info */}
                                <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Explore sx={{ color: '#1172ba', fontSize: 20 }} /> System Data
                                    </Typography>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="caption" fontWeight={700} color="#64748b">Order Ref</Typography>
                                        <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{shipmentInfo.orderNumber}</Typography>
                                    </Stack>
                                    <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />
                                    <Typography variant="caption" color="#64748b" sx={{ fontStyle: 'italic', display: 'block', textAlign: 'center' }}>
                                        &quot;Verify condition upon receipt.&quot;
                                    </Typography>
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

export default function ViewDispatchPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Tracking Shipment..." />}>
            <ViewDispatchContent />
        </Suspense>
    );
}
