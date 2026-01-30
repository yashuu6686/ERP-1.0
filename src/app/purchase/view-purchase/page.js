"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Button,
    Grid,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Stack,
} from "@mui/material";
import {
    Download,
    ArrowBack,
    Edit,
    Print,
    Business,
    LocalShipping,
    Description,
    CalendarToday,
    CheckCircle,
    Schedule,
    Cancel,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import Loader from "../../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";

export default function ViewPurchaseOrder() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/purachase/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                alert("Failed to fetch purchase order details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);



    if (loading) {
        return <Loader fullPage message="Loading Order Details..." />;
    }

    if (!order) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="error">Order Not Found</Typography>
                <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    const { orderInfo, supplier, delivery, items, totals, status } = order;

    const getStatusConfig = (status) => {
        const configs = {
            Approved: {
                color: "#10b981",
                bg: "#d1fae5",
                icon: <CheckCircle sx={{ fontSize: 16 }} />,
            },
            Pending: {
                color: "#f59e0b",
                bg: "#fef3c7",
                icon: <Schedule sx={{ fontSize: 16 }} />,
            },
            Rejected: {
                color: "#ef4444",
                bg: "#fee2e2",
                icon: <Cancel sx={{ fontSize: 16 }} />,
            },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(status);

    return (
        <Box
            sx={{
                maxWidth: 1400,
                margin: "0 auto",
                p: 3,
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                minHeight: "100vh",
            }}
        >
            {/* Header Actions */}
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/purchase")}
                    sx={{
                        color: "#475569",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        "&:hover": {
                            bgcolor: "#f1f5f9",
                        },
                    }}
                >
                    Back to Purchase Orders
                </Button>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#cbd5e1",
                            color: "#475569",
                            px: 3,
                            "&:hover": {
                                borderColor: "#94a3b8",
                                bgcolor: "#f8fafc",
                            },
                        }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#cbd5e1",
                            color: "#475569",
                            px: 3,
                            "&:hover": {
                                borderColor: "#94a3b8",
                                bgcolor: "#f8fafc",
                            },
                        }}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/purchase/create-purchase?id=${id}`)}
                        sx={{
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                            boxShadow: "0 4px 12px rgba(17, 114, 186, 0.25)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #0d5a94 0%, #094a78 100%)",
                                boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                            },
                        }}
                    >
                        Edit Order
                    </Button>
                </Stack>
            </Box>

            {/* Main Paper Container */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                }}
            >
                {/* Header Section */}
                <Grid container spacing={4} sx={{ mb: 5 }}>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 3,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 8px 20px rgba(17, 114, 186, 0.3)",
                                }}
                            >
                                <Description sx={{ color: "#fff", fontSize: 32 }} />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h4"
                                    fontWeight={800}
                                    sx={{
                                        background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        mb: 0.5,
                                    }}
                                >
                                    PURCHASE ORDER
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#64748b",
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    #{orderInfo.orderNumber}
                                </Typography>
                            </Box>
                        </Box>
                        <Chip
                            icon={statusConfig.icon}
                            label={status}
                            sx={{
                                mt: 2,
                                px: 1.5,
                                py: 2.5,
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                bgcolor: statusConfig.bg,
                                color: statusConfig.color,
                                border: `2px solid ${statusConfig.color}40`,
                                "& .MuiChip-icon": {
                                    color: statusConfig.color,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                textAlign: { md: "right" },
                                bgcolor: "#f8fafc",
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #e2e8f0",
                            }}
                        >
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1e293b" }}>
                                Order Timeline
                            </Typography>
                            <Stack spacing={1.5}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { md: "flex-end" } }}>
                                    <CalendarToday sx={{ fontSize: 18, color: "#64748b" }} />
                                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                                        Order Date:
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="#1e293b">
                                        {new Date(orderInfo.orderDate).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { md: "flex-end" } }}>
                                    <LocalShipping sx={{ fontSize: 18, color: "#64748b" }} />
                                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                                        Expected Delivery:
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="#1e293b">
                                        {new Date(orderInfo.expectedDelivery).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 5, borderColor: "#e2e8f0" }} />

                {/* Information Cards */}
                <Grid container spacing={3} sx={{ mb: 5 }}>
                    {/* Supplier Information */}
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
                                borderRadius: 3,
                                border: "2px solid #e2e8f0",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#1172ba",
                                    boxShadow: "0 8px 24px rgba(17, 114, 186, 0.15)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        background: "linear-gradient(135deg, #1172ba20 0%, #0d5a9420 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Business sx={{ color: "#1172ba", fontSize: 22 }} />
                                </Box>
                                <Typography variant="subtitle1" fontWeight={700} color="#1e293b">
                                    Supplier Information
                                </Typography>
                            </Box>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1e293b" }}>
                                {supplier.companyName}
                            </Typography>
                            <Stack spacing={1}>
                                <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>
                                    {supplier.address}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#475569", fontWeight: 500 }}>
                                    <strong>Contact:</strong> {supplier.contactPerson}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#475569" }}>
                                    <strong>Email:</strong> {supplier.email}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#475569" }}>
                                    <strong>Phone:</strong> {supplier.phone}
                                </Typography>
                                {supplier.gstin && (
                                    <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>
                                        <strong>GSTIN:</strong> {supplier.gstin}
                                    </Typography>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Delivery Information */}
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
                                borderRadius: 3,
                                border: "2px solid #e2e8f0",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#10b981",
                                    boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        background: "linear-gradient(135deg, #10b98120 0%, #059e6a20 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <LocalShipping sx={{ color: "#10b981", fontSize: 22 }} />
                                </Box>
                                <Typography variant="subtitle1" fontWeight={700} color="#1e293b">
                                    Delivery To
                                </Typography>
                            </Box>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1e293b" }}>
                                {delivery.deliverTo}
                            </Typography>
                            <Stack spacing={1}>
                                <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>
                                    {delivery.deliveryAddress}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#475569", fontWeight: 500 }}>
                                    <strong>Attn:</strong> {delivery.contactPerson}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#475569" }}>
                                    <strong>Phone:</strong> {delivery.phone}
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Invoice Information */}
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
                                borderRadius: 3,
                                border: "2px solid #e2e8f0",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#f59e0b",
                                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.15)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        background: "linear-gradient(135deg, #f59e0b20 0%, #d9770620 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Description sx={{ color: "#f59e0b", fontSize: 22 }} />
                                </Box>
                                <Typography variant="subtitle1" fontWeight={700} color="#1e293b">
                                    Invoicing To
                                </Typography>
                            </Box>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1e293b" }}>
                                {delivery.invoiceTo}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>
                                {delivery.deliveryAddress}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Items Table */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: "#1e293b" }}>
                        Order Items
                    </Typography>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            border: "2px solid #e2e8f0",
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                    <TableCell sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", py: 2.5 }}>
                                        Item Description
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", py: 2.5 }}>
                                        Quantity
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", py: 2.5 }}>
                                        Unit Price
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", py: 2.5 }}>
                                        Total Amount
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "#f8fafc",
                                            },
                                            transition: "background-color 0.2s ease",
                                        }}
                                    >
                                        <TableCell sx={{ py: 2.5, fontWeight: 500, color: "#1e293b" }}>
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right" sx={{ py: 2.5, color: "#475569" }}>
                                            {item.qty}
                                        </TableCell>
                                        <TableCell align="right" sx={{ py: 2.5, color: "#475569" }}>
                                            ₹{parseFloat(item.price).toLocaleString()}
                                        </TableCell>
                                        <TableCell align="right" sx={{ py: 2.5, fontWeight: 700, color: "#1e293b" }}>
                                            ₹{parseFloat(item.total).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Totals Section */}
                <Grid container justifyContent="flex-end">
                    <Grid item xs={12} md={5} size={{ xs: 12, md: 5 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                bgcolor: "#f8fafc",
                                borderRadius: 3,
                                border: "2px solid #e2e8f0",
                            }}
                        >
                            <Stack spacing={2}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body1" color="textSecondary" fontWeight={500}>
                                        Subtotal:
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} color="#475569">
                                        ₹{totals.subtotal.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body1" color="textSecondary" fontWeight={500}>
                                        Tax Amount:
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} color="#475569">
                                        ₹{totals.taxAmount.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body1" color="textSecondary" fontWeight={500}>
                                        Discount:
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} color="#ef4444">
                                        -₹{totals.discountAmount.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1, borderColor: "#cbd5e1" }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        bgcolor: "#ffffff",
                                        p: 2,
                                        borderRadius: 2,
                                        border: "2px solid #1172ba20",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={800} color="#1e293b">
                                        Grand Total:
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        fontWeight={800}
                                        sx={{
                                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                            backgroundClip: "text",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        ₹{totals.grandTotal.toLocaleString()}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}