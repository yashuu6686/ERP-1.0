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
import Receipt from "@mui/icons-material/Receipt";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";

import Loader from "../../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";

function ViewInvoiceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/invoices/${id}`);
                setInvoice(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                alert("Failed to fetch invoice details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvoiceDetails();
        }
    }, [id]);

    if (loading) {
        return <Loader fullPage message="Loading Invoice Details..." />;
    }

    if (!invoice) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" gutterBottom fontWeight={600}>Invoice Not Found</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>The invoice you are looking for does not exist or has been removed.</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ borderRadius: 2, textTransform: "none" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    const { invoiceInfo, customer, delivery, items, totals, status, paymentStatus } = invoice;

    const getPaymentStatusConfig = (pStatus) => {
        const configs = {
            Paid: { color: "#059669", bg: "#d1fae5", border: "#34d399", label: "Paid", icon: <CheckCircle sx={{ fontSize: 16 }} /> },
            Partial: { color: "#d97706", bg: "#fef3c7", border: "#fbbf24", label: "Partial", icon: <Schedule sx={{ fontSize: 16 }} /> },
            Unpaid: { color: "#dc2626", bg: "#fee2e2", border: "#f87171", label: "Unpaid", icon: <Schedule sx={{ fontSize: 16 }} /> },
        };
        return configs[pStatus] || configs.Unpaid;
    };

    const paymentConfig = getPaymentStatusConfig(paymentStatus);

    return (
        <Box>
            {/* Top Navigation & Actions */}
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }} spacing={1} sx={{ mb: 1 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/invoices")}
                    sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        "&:hover": { color: "#334155", bgcolor: "transparent" },
                    }}
                >
                    Back to Invoices
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
                        Edit Invoice
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
                                        Invoice
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 0.5 }}>
                                        <Typography variant="body1" fontWeight={600} sx={{ color: "#64748b" }}>
                                            {invoiceInfo.invoiceNumber}
                                        </Typography>
                                        <Chip
                                            icon={paymentConfig.icon}
                                            label={paymentConfig.label}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "0.75rem",
                                                borderRadius: "6px",
                                                bgcolor: paymentConfig.bg,
                                                color: paymentConfig.color,
                                                border: `1px solid ${paymentConfig.border}`,
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
                                        Invoice Date
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                        {new Date(invoiceInfo.invoiceDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                        Due Date
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                        {new Date(invoiceInfo.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: { xs: 1, md: 2 } }}>
                    {/* 2-Column Info Grid */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
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
                                            Billed To
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 0.5 }}>
                                                {customer.companyName}
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{customer.address}</Typography>
                                            <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
                                                <Box sx={{ display: "inline-block", bgcolor: "#eff6ff", color: "#1172ba", px: 1.5, py: 0.5, borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 }}>
                                                    GSTIN: {customer.gstin}
                                                </Box>
                                                <Box sx={{ display: "inline-block", bgcolor: "#f1f5f9", color: "#475569", px: 1.5, py: 0.5, borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 }}>
                                                    PAN: {customer.pan}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                <Typography variant="body2" color="#64748b">Contact Person</Typography>
                                                <Typography variant="body2" fontWeight={600} color="#334155">{customer.contactPerson}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                <Typography variant="body2" color="#64748b">Phone</Typography>
                                                <Typography variant="body2" fontWeight={600} color="#334155">{customer.phone}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                <Typography variant="body2" color="#64748b">Email</Typography>
                                                <Typography variant="body2" fontWeight={600} color="#334155">{customer.email}</Typography>
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
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <LocalShipping sx={{ color: "#1172ba", fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                            Delivery Details
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 0.5 }}>
                                                {delivery.deliverTo}
                                            </Typography>
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
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                <Typography variant="body2" color="#64748b">Email</Typography>
                                                <Typography variant="body2" fontWeight={600} color="#334155">{delivery.email || "N/A"}</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Order Items Table */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8} size={{ xs: 12, lg: 8 }}>
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
                                    Invoice Items
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
                                                        {item.hsnSac && <Typography variant="caption" color="#64748b" display="block" sx={{ mt: 0.5 }}>HSN: {item.hsnSac}</Typography>}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ py: 2.5 }}>
                                                        <Box sx={{ display: "inline-block", bgcolor: "#eff6ff", color: "#1172ba", px: 1.5, py: 0.5, borderRadius: "6px", fontWeight: 700, fontSize: "0.85rem", minWidth: "40px", textAlign: "center" }}>
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

                        <Grid item xs={12} lg={4} size={{ xs: 12, lg: 4 }}>
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
                                    Invoice Summary
                                </Typography>
                                <Stack spacing={2.5}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="body2" color="#64748b" fontWeight={500}>Subtotal</Typography>
                                        <Typography variant="body2" color="#1e293b" fontWeight={600} sx={{ fontFamily: 'monospace' }}>₹{totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="body2" color="#64748b" fontWeight={500}>Tax Amount</Typography>
                                        <Typography variant="body2" color="#1e293b" fontWeight={600} sx={{ fontFamily: 'monospace' }}>₹{totals.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                    </Box>
                                    {totals.discountAmount > 0 && (
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="body2" color="#64748b" fontWeight={500}>Discount</Typography>
                                            <Typography variant="body2" color="#ef4444" fontWeight={600} sx={{ fontFamily: 'monospace' }}>-₹{totals.discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                                        </Box>
                                    )}
                                    <Divider sx={{ borderColor: "#e2e8f0", borderStyle: "dashed", my: 1 }} />
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
                                        <Typography variant="h6" color="#0f172a" fontWeight={700}>Grand Total</Typography>
                                        <Typography variant="h5" fontWeight={800} color="#1172ba" sx={{ fontFamily: 'monospace' }}>
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
    );
}

export default function ViewInvoicePage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewInvoiceContent />
        </Suspense>
    );
}
