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
import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";
import Cancel from "@mui/icons-material/Cancel";
import CommonCard from "../../../components/CommonCard";
import Loader from "../../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
function ViewPurchaseOrderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const handleApprove = async () => {
        try {
            await axiosInstance.patch(`/purachase/${id}`, { status: "Approved" });
            setOrder({ ...order, status: "Approved" });
            await NotificationService.clearByPoId(id);
            alert("Purchase Order Approved Successfully!");
        } catch (error) {
            console.error("Approval Error:", error);
            alert("Failed to approve PO.");
        }
    };

    const handleReject = async () => {
        try {
            await axiosInstance.patch(`/purachase/${id}`, { status: "Rejected" });
            setOrder({ ...order, status: "Rejected" });
            await NotificationService.clearByPoId(id);
            alert("Purchase Order Rejected.");
        } catch (error) {
            console.error("Rejection Error:", error);
            alert("Failed to reject PO.");
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            console.log("ViewPurchase: Start fetching for ID:", id);
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/purachase/${id}`);
                console.log("ViewPurchase: Successfully fetched PO:", response.data);
                setOrder(response.data);
            } catch (error) {
                console.error("ViewPurchase: Fetch Error Detail:", error.response || error);
                alert(`Failed to fetch purchase order details for ID: ${id}. Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        } else {
            console.warn("ViewPurchase: No ID found in search params");
        }
    }, [id]);

    if (loading) {
        return <Loader fullPage message="Loading Order Details..." />;
    }

    if (!order) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" gutterBottom fontWeight={600}>Order Not Found</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>The purchase order you are looking for does not exist or has been removed.</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ borderRadius: 2, textTransform: "none" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    const { orderInfo, supplier, delivery, items, totals, status, shippingCharges, otherDiscount } = order;



    const getStatusConfig = (status) => {
        const configs = {
            Approved: {
                color: "#059669",
                bg: "#d1fae5",
                border: "#34d399",
                icon: <CheckCircle sx={{ fontSize: 18 }} />,
                label: "Approved",
            },
            Pending: {
                color: "#d97706",
                bg: "#fef3c7",
                border: "#fbbf24",
                icon: <Schedule sx={{ fontSize: 18 }} />,
                label: "Pending",
            },
            Rejected: {
                color: "#dc2626",
                bg: "#fee2e2",
                border: "#f87171",
                icon: <Cancel sx={{ fontSize: 18 }} />,
                label: "Rejected",
            },
            "Pending Approval": {
                color: "#2563eb",
                bg: "#eff6ff",
                border: "#93c5fd",
                icon: <Schedule sx={{ fontSize: 18 }} />,
                label: "Pending Approval",
            },
            Completed: {
                color: "#0369a1",
                bg: "#e0f2fe",
                border: "#bae6fd",
                icon: <CheckCircle sx={{ fontSize: 18 }} />,
                label: "Completed",
            },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(status);

    return (
        <Box
        >
            <Box >
                {/* Top Navigation & Actions */}
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }} spacing={1} sx={{ mb: 1 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/purchase")}
                        sx={{
                            color: "#64748b",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "0.95rem",
                            "&:hover": { color: "#334155", bgcolor: "transparent" },
                        }}
                    >
                        Back to Orders
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
                        {user?.role === "hr" && status === "Pending Approval" && (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={handleApprove}
                                    sx={{
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        bgcolor: "#059669",
                                        "&:hover": { bgcolor: "#047857" },
                                        boxShadow: "0 4px 6px -1px rgba(5, 150, 105, 0.2)",
                                    }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleReject}
                                    sx={{
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        color: "#dc2626",
                                        borderColor: "#fee2e2",
                                        bgcolor: "#fff1f2",
                                        "&:hover": { borderColor: "#fecaca", bgcolor: "#ffe4e6" },
                                    }}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                        {user?.role !== "hr" && (
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => router.push(`/purchase/create-purchase?id=${id}`)}
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
                                Edit Order
                            </Button>
                        )}
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
                                    {/* <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 3,
                                            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "1px solid #bfdbfe",
                                        }}
                                    >
                                        <Description sx={{ color: "#1172ba", fontSize: 28 }} />
                                    </Box> */}
                                    <Box>
                                        <Typography variant="h4" fontWeight={800} sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
                                            Purchase Order
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 0.5 }}>
                                            <Typography variant="body1" fontWeight={600} sx={{ color: "#64748b" }}>
                                                {orderInfo.orderNumber}
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
                                            Order Date
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                            {new Date(orderInfo.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                            Expected Delivery
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                            {new Date(orderInfo.expectedDelivery).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Content Section */}
                    <Box sx={{ p: { xs: 1, md: 2 } }}>

                        {/* 2-Column Info Grid */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            {/* Supplier Card */}
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
                                        {/* Header */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box sx={{
                                                width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff",
                                                display: "flex", alignItems: "center", justifyContent: "center"
                                            }}>
                                                <Business sx={{ color: "#1172ba", fontSize: 20 }} />
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                                Supplier Details
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />

                                        {/* Content */}
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 0.5 }}>
                                                    {supplier.companyName}
                                                </Typography>
                                                <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{supplier.address}</Typography>
                                                {supplier.gstin && (
                                                    <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
                                                        <Box sx={{
                                                            display: "inline-block", bgcolor: "#eff6ff", color: "#1172ba",
                                                            px: 1.5, py: 0.5, borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600
                                                        }}>
                                                            GSTIN: {supplier.gstin}
                                                        </Box>
                                                        {supplier.pan && (
                                                            <Box sx={{
                                                                display: "inline-block", bgcolor: "#f1f5f9", color: "#475569",
                                                                px: 1.5, py: 0.5, borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600
                                                            }}>
                                                                PAN: {supplier.pan}
                                                            </Box>
                                                        )}
                                                    </Box>
                                                )}
                                            </Box>

                                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <Typography variant="body2" color="#64748b">Contact Person</Typography>
                                                    <Typography variant="body2" fontWeight={600} color="#334155">{supplier.contactPerson}</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <Typography variant="body2" color="#64748b">Phone</Typography>
                                                    <Typography variant="body2" fontWeight={600} color="#334155">{supplier.phone}</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <Typography variant="body2" color="#64748b">Email</Typography>
                                                    <Typography variant="body2" fontWeight={600} color="#334155">{supplier.email}</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Grid>

                            {/* Delivery Card */}
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
                                        {/* Header */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box sx={{
                                                width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff",
                                                display: "flex", alignItems: "center", justifyContent: "center"
                                            }}>
                                                <LocalShipping sx={{ color: "#1172ba", fontSize: 20 }} />
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                                Ship To
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />

                                        {/* Content */}
                                        <Stack spacing={2}>
                                            <Box>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                    <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <LocalShipping sx={{ fontSize: 14, color: "#16a34a" }} />
                                                    </Box>
                                                    <Typography variant="h6" fontWeight={700} color="#1e293b">
                                                        {delivery.deliverTo}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{delivery.deliveryAddress}</Typography>
                                            </Box>

                                            <Stack spacing={1.5} sx={{ mt: "auto" }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <Typography variant="body2" color="#64748b">Contact Person</Typography>
                                                    <Typography variant="body2" fontWeight={600} color="#334155">{delivery.contactPerson}</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <Typography variant="body2" color="#64748b">Phone</Typography>
                                                    <Typography variant="body2" fontWeight={600} color="#334155">{delivery.phone}</Typography>
                                                </Box>
                                                {delivery.email && (
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                        <Typography variant="body2" color="#64748b">Email</Typography>
                                                        <Typography variant="body2" fontWeight={600} color="#334155">{delivery.email}</Typography>
                                                    </Box>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Order Items and Totals Row */}
                        <Grid container spacing={2} sx={{}}>
                            {/* Order Items Table */}
                            <Grid size={{ xs: 12, lg: 8 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        bgcolor: "white",
                                        borderRadius: 3,
                                        border: "1px solid #e2e8f0",
                                        height: "100%",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 3 }}>
                                        Order Items
                                    </Typography>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 500 }}>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                                    <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>SR NO.</TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>ITEM DETAILS</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>QTY</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>UNIT PRICE</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>TOTAL</TableCell>
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
                                                            {item.description && <Typography variant="caption" color="#64748b" display="block" sx={{ mt: 0.5 }}>{item.description}</Typography>}
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ py: 2.5 }}>
                                                            <Box
                                                                sx={{
                                                                    display: "inline-block",
                                                                    bgcolor: "#eff6ff",
                                                                    color: "#1172ba",
                                                                    px: 1.5,
                                                                    py: 0.5,
                                                                    borderRadius: "6px",
                                                                    fontWeight: 700,
                                                                    fontSize: "0.85rem",
                                                                    minWidth: "40px",
                                                                    textAlign: "center"
                                                                }}
                                                            >
                                                                {item.qty}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ py: 2.5, color: "#64748b", fontWeight: 500, fontFamily: 'monospace', fontSize: "0.95rem" }}>₹{parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                                                        <TableCell align="right" sx={{ py: 2.5, color: "#0f172a", fontWeight: 700, fontFamily: 'monospace', fontSize: "0.95rem" }}>₹{parseFloat(item.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>

                            {/* Totals Section */}
                            <Grid size={{ xs: 12, lg: 4 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        bgcolor: "white",
                                        borderRadius: 3,
                                        border: "1px solid #e2e8f0",
                                        height: "fit-content",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 3 }}>
                                        Order Summary
                                    </Typography>
                                    <Stack spacing={2.5}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="body2" color="#64748b" fontWeight={500}>Subtotal</Typography>
                                            <Typography variant="body2" color="#1e293b" fontWeight={600} sx={{ fontFamily: 'monospace' }}>₹{totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="body2" color="#64748b" fontWeight={500}>Tax (GST)</Typography>
                                            <Typography variant="body2" color="#1e293b" fontWeight={600} sx={{ fontFamily: 'monospace' }}>₹{totals.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                        </Box>
                                        {shippingCharges > 0 && (
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2" color="#64748b" fontWeight={500}>Shipping Charges</Typography>
                                                <Typography variant="body2" color="#1e293b" fontWeight={600} sx={{ fontFamily: 'monospace' }}>+₹{Number(shippingCharges).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                            </Box>
                                        )}
                                        {otherDiscount > 0 && (
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2" color="#64748b" fontWeight={500}>Other Discount</Typography>
                                                <Typography variant="body2" color="#ef4444" fontWeight={600} sx={{ fontFamily: 'monospace' }}>-₹{Number(otherDiscount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                            </Box>
                                        )}
                                        {totals.discountAmount > 0 && (
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2" color="#64748b" fontWeight={500}>Discount</Typography>
                                                <Typography variant="body2" color="#ef4444" fontWeight={600} sx={{ fontFamily: 'monospace' }}>-₹{totals.discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                            </Box>
                                        )}
                                        <Divider sx={{ borderColor: "#e2e8f0", borderStyle: "dashed", my: 1 }} />
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
                                            <Typography variant="h6" color="#0f172a" fontWeight={700}>Grand Total</Typography>
                                            <Typography
                                                variant="h5"
                                                fontWeight={800}
                                                color="#1172ba"
                                                sx={{
                                                    fontFamily: 'monospace'
                                                }}
                                            >
                                                ₹{totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default function ViewPurchaseOrder() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewPurchaseOrderContent />
        </Suspense>
    );
}