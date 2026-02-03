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
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

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
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Payment from "@mui/icons-material/Payment";
import Calculate from "@mui/icons-material/Calculate";

import Loader from "../../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";

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

                // For demonstration if API fails, fallback data isn't needed per instructions but good for stability 
                // Using existing pattern of other pages where we handle error
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvoiceDetails();
        }
    }, [id]);

    if (loading) {
        return <Loader fullPage message="Accessing Financial Ledger..." />;
    }

    if (!invoice) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Invoice Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/invoices")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Invoices
                </Button>
            </Box>
        );
    }

    const invoiceInfo = invoice.invoiceInfo || {};
    const customer = invoice.customer || {};
    const delivery = invoice.delivery || {};

    // Support both 'items' and 'products' naming
    const rawItems = invoice.items || invoice.products || [];
    const items = rawItems.map(item => ({
        ...item,
        name: item.name || item.itemName || "Unnamed Item",
        qty: item.qty || item.quantity || 0,
        price: item.price || 0,
        total: item.total || item.amount || 0
    }));

    // Support both 'totals' and 'summary' naming
    const totals = {
        subtotal: invoice.totals?.subtotal ?? invoice.summary?.subtotal ?? 0,
        taxAmount: invoice.totals?.taxAmount ?? invoice.summary?.tax ?? 0,
        discountAmount: invoice.totals?.discountAmount ?? invoice.summary?.discount ?? 0,
        grandTotal: invoice.totals?.grandTotal ?? invoice.summary?.total ?? 0
    };

    const status = invoice.status || "Draft";
    const paymentStatus = invoice.paymentStatus || "Unpaid";

    const getPaymentChip = (pStatus) => {
        const configs = {
            Paid: { color: "#166534", bg: "#dcfce7", label: "PAID", icon: <CheckCircle sx={{ fontSize: '16px !important' }} /> },
            Partial: { color: "#b45309", bg: "#fef3c7", label: "PARTIAL", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            Unpaid: { color: "#991b1b", bg: "#fee2e2", label: "UNPAID", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
        };
        const config = configs[pStatus] || configs.Unpaid;

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
                            onClick={() => router.push("/invoices")}
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
                            Back to Register
                        </Button>

                        <Stack direction="row" spacing={1.5}>
                            <Tooltip title="Download PDF">
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
                            <Tooltip title="Print Invoice">
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
                                onClick={() => {/* Handle edit */ }}
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
                                Edit Invoice
                            </Button>
                        </Stack>
                    </Stack>

                    <Grid container spacing={4}>
                        {/* Main Document Area */}
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
                                                TAX INVOICE
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Official Payment Record
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={invoiceInfo.invoiceNumber}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                {getPaymentChip(paymentStatus)}
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 240 }}>
                                            <InfoItem
                                                icon={Description}
                                                label="Invoice Date"
                                                value={new Date(invoiceInfo.invoiceDate).toLocaleDateString()}
                                            />
                                            <InfoItem
                                                icon={Schedule}
                                                label="Due Date"
                                                value={new Date(invoiceInfo.dueDate).toLocaleDateString()}
                                                color="#dc2626"
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Billing & Delivery Info */}
                                    <Grid container spacing={6} sx={{ mb: 6 }}>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                                    <Business sx={{ color: '#1172ba' }} /> BILLING DETAILS
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <Typography variant="body1" fontWeight={700} color="#1e293b">{customer.companyName}</Typography>
                                                    <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{customer.address}</Typography>
                                                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                                        <Chip label={`GST: ${customer.gstin}`} size="small" sx={{ fontWeight: 600, bgcolor: "#fff", border: '1px solid #e2e8f0' }} />
                                                        <Chip label={`PAN: ${customer.pan}`} size="small" sx={{ fontWeight: 600, bgcolor: "#fff", border: '1px solid #e2e8f0' }} />
                                                    </Stack>
                                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                                    <Box>
                                                        <Typography variant="caption" color="#64748b" fontWeight={600}>CONTACT</Typography>
                                                        <Typography variant="body2" fontWeight={600}>{customer.contactPerson}</Typography>
                                                        <Typography variant="body2" color="#64748b">{customer.phone}</Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                                    <LocalShipping sx={{ color: '#1172ba' }} /> SHIPPING DETAILS
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <Typography variant="body1" fontWeight={700} color="#1e293b">{delivery.deliverTo}</Typography>
                                                    <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{delivery.deliveryAddress}</Typography>
                                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                                    <Box>
                                                        <Typography variant="caption" color="#64748b" fontWeight={600}>CONTACT</Typography>
                                                        <Typography variant="body2" fontWeight={600}>{delivery.contactPerson}</Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Items Table */}
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <ShoppingCart sx={{ color: '#1172ba' }} /> Line Items
                                        </Typography>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR.</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>ITEM DESCRIPTION</TableCell>
                                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>UNIT PRICE</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TOTAL</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {items.map((item, idx) => (
                                                        <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                            <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                                            <TableCell>
                                                                <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                                                {item.hsnSac && <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>HSN: {item.hsnSac}</Typography>}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Chip label={item.qty} size="small" sx={{ fontWeight: 800, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px' }} />
                                                            </TableCell>
                                                            <TableCell align="right" sx={{ fontWeight: 600, color: "#475569", fontFamily: 'monospace' }}>
                                                                ₹{parseFloat(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                            </TableCell>
                                                            <TableCell align="right" sx={{ fontWeight: 700, color: "#0f172a", fontFamily: 'monospace' }}>
                                                                ₹{parseFloat(item.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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

                        {/* Sidebar / Calculation Area */}
                        <Grid item xs={12} lg={3}>
                            <Stack spacing={3}>
                                {/* Payment Summary */}
                                <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calculate sx={{ color: '#1172ba', fontSize: 20 }} /> Payment Summary
                                    </Typography>

                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Subtotal</Typography>
                                            <Typography variant="body2" color="#0f172a" fontWeight={700} sx={{ fontFamily: 'monospace' }}>
                                                ₹{totals.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Tax (18%)</Typography>
                                            <Typography variant="body2" color="#0f172a" fontWeight={700} sx={{ fontFamily: 'monospace' }}>
                                                ₹{totals.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </Stack>
                                        {totals.discountAmount > 0 && (
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2" color="#64748b" fontWeight={600}>Discount</Typography>
                                                <Typography variant="body2" color="#dc2626" fontWeight={700} sx={{ fontFamily: 'monospace' }}>
                                                    -₹{totals.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                </Typography>
                                            </Stack>
                                        )}

                                        <Divider borderStyle="dashed" />

                                        <Box sx={{ p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Total Payable</Typography>
                                            <Typography variant="h5" sx={{ color: "#1172ba", fontWeight: 900, fontFamily: 'monospace', mt: 0.5 }}>
                                                ₹{totals.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<Payment />}
                                        sx={{
                                            mt: 3,
                                            borderRadius: '10px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                                            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)"
                                        }}
                                    >
                                        Record Payment
                                    </Button>
                                </Paper>

                                {/* System Info */}
                                <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Verification
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Invoice ID</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{invoiceInfo.invoiceNumber}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Status</Typography>
                                            <Typography variant="caption" fontWeight={900} color={status === 'Draft' ? '#d97706' : '#166534'}>
                                                {status?.toUpperCase() || 'FINALIZED'}
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
        </Fade>
    );
}

export default function ViewInvoicePage() {
    return (
        <Suspense fallback={<Loader fullPage message="Accessing Financial Ledger..." />}>
            <ViewInvoiceContent />
        </Suspense>
    );
}
