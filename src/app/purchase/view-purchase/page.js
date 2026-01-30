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
} from "@mui/material";
import {
    Download,
    ArrowBack,
    Edit,
    Print,
    Business,
    LocalShipping,
    Description,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";

export default function ViewPurchaseOrder() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

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

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6">Loading Order Details...</Typography>
            </Box>
        );
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

    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 2 }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/purchase")}
                    sx={{ color: "#64748b", textTransform: "none" }}
                >
                    Back to List
                </Button>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/purchase/create-purchase?id=${id}`)}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)"
                        }}
                    >
                        Edit Order
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
                {/* Header */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight={800} color="primary" sx={{ mb: 1 }}>
                            PURCHASE ORDER
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#64748b" }}>
                            #{orderInfo.orderNumber}
                        </Typography>
                        <Box
                            sx={{
                                mt: 2,
                                display: "inline-block",
                                px: 2,
                                py: 0.5,
                                borderRadius: 2,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                bgcolor: status === "Approved" ? "#dcfce7" : status === "Pending" ? "#fef9c3" : "#fee2e2",
                                color: status === "Approved" ? "#15803d" : status === "Pending" ? "#a16207" : "#b91c1c",
                            }}
                        >
                            {status}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: { md: "right" } }}>
                        <Typography variant="h6" fontWeight={700}>Order Details</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Date: {new Date(orderInfo.orderDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Expected Delivery: {new Date(orderInfo.expectedDelivery).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 6 }} />

                {/* Addresses */}
                <Grid container spacing={6} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <Business color="primary" />
                            <Typography variant="subtitle1" fontWeight={700}>Supplier Information</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>{supplier.companyName}</Typography>
                        <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>{supplier.address}</Typography>
                        <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>
                            Contact: {supplier.contactPerson}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#475569" }}>
                            Email: {supplier.email}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#475569" }}>
                            Phone: {supplier.phone}
                        </Typography>
                        {supplier.gstin && (
                            <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>
                                GSTIN: {supplier.gstin}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <LocalShipping color="primary" />
                            <Typography variant="subtitle1" fontWeight={700}>Delivery To</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>{delivery.deliverTo}</Typography>
                        <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>{delivery.deliveryAddress}</Typography>
                        <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>
                            Attn: {delivery.contactPerson}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#475569" }}>
                            Phone: {delivery.phone}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <Description color="primary" />
                            <Typography variant="subtitle1" fontWeight={700}>Invoicing To</Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>{delivery.invoiceTo}</Typography>
                        <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>{delivery.deliveryAddress}</Typography>
                    </Grid>
                </Grid>

                {/* Items Table */}
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2, mb: 6 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Item Description</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Qty</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Unit Price</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">{item.qty}</TableCell>
                                    <TableCell align="right">₹{parseFloat(item.price).toLocaleString()}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600 }}>₹{parseFloat(item.total).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Totals */}
                <Grid container justifyContent="flex-end">
                    <Grid item xs={12} md={4}>
                        <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography color="textSecondary">Subtotal:</Typography>
                                <Typography fontWeight={600}>₹{totals.subtotal.toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography color="textSecondary">Tax Amount:</Typography>
                                <Typography fontWeight={600}>₹{totals.taxAmount.toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography color="textSecondary">Discount:</Typography>
                                <Typography fontWeight={600} color="error">-₹{totals.discountAmount.toLocaleString()}</Typography>
                            </Box>
                            <Divider sx={{ my: 1.5 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" fontWeight={800}>Grand Total:</Typography>
                                <Typography variant="h6" fontWeight={800} color="primary">₹{totals.grandTotal.toLocaleString()}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
