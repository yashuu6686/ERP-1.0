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

import Download from "@mui/icons-material/Download";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Print from "@mui/icons-material/Print";
import Business from "@mui/icons-material/Business";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Description from "@mui/icons-material/Description";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";
import Cancel from "@mui/icons-material/Cancel";
import Receipt from "@mui/icons-material/Receipt";
import Payments from "@mui/icons-material/Payments";
import Person from "@mui/icons-material/Person";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";

import axiosInstance from "@/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
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

const SummaryRow = ({ label, value, isTotal = false, isDiscount = false }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography variant={isTotal ? "subtitle1" : "body2"} color={isTotal ? "#0f172a" : "#64748b"} fontWeight={isTotal ? 800 : 500}>
            {label}
        </Typography>
        <Typography
            variant={isTotal ? "h6" : "body2"}
            fontWeight={isTotal ? 900 : 700}
            color={isDiscount ? "#ef4444" : isTotal ? "#1172ba" : "#1e293b"}
            sx={{ fontFamily: 'monospace' }}
        >
            {isDiscount ? `-₹${value}` : `₹${value}`}
        </Typography>
    </Box>
);

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
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/purachase/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                alert(`Failed to fetch purchase order details.`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Securely Loading Order..." />;

    if (!order) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Purchase Order Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/purchase")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to List
                </Button>
            </Box>
        );
    }

    const { orderInfo, supplier, delivery, items, totals, status, shippingCharges, otherDiscount } = order;

    const getStatusConfig = (status) => {
        const configs = {
            Approved: { color: "#166534", bg: "#dcfce7", border: "#bbedc2", icon: <CheckCircle /> },
            Pending: { color: "#92400e", bg: "#fef3c7", border: "#fde68a", icon: <Schedule /> },
            Rejected: { color: "#991b1b", bg: "#fee2e2", border: "#fecaca", icon: <Cancel /> },
            "Pending Approval": { color: "#1e40af", bg: "#dbeafe", border: "#bfdbfe", icon: <Schedule /> },
            Completed: { color: "#0369a1", bg: "#e0f2fe", border: "#bae6fd", icon: <CheckCircle /> },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(status);

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
                        onClick={() => router.push("/purchase")}
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
                        Back to Orders
                    </Button>

                    <Stack direction="row" spacing={1.5}>
                        <Tooltip title="Print Order">
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

                        {user?.role === "admin" && status === "Pending Approval" ? (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={handleApprove}
                                    sx={{
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        bgcolor: "#059669",
                                        "&:hover": { bgcolor: "#047857" },
                                        boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
                                    }}
                                >
                                    Approve PO
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleReject}
                                    sx={{
                                        borderRadius: "12px",
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
                        ) : (
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => router.push(`/purchase/create-purchase?id=${id}`)}
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
                                Edit Order
                            </Button>
                        )}
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
                                            PURCHASE ORDER
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                            Official Procurement Document
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                                label={orderInfo.orderNumber}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#f1f5f9",
                                                    color: "#0f172a",
                                                    borderRadius: '8px',
                                                    fontSize: '0.95rem'
                                                }}
                                            />
                                            <Chip
                                                icon={React.cloneElement(statusConfig.icon, { sx: { fontSize: '18px !important' } })}
                                                label={status}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: statusConfig.bg,
                                                    color: statusConfig.color,
                                                    borderRadius: '8px',
                                                    fontSize: '0.85rem',
                                                    border: `1px solid ${statusConfig.border}`,
                                                    "& .MuiChip-icon": { color: statusConfig.color }
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Stack spacing={2} sx={{ minWidth: 280 }}>
                                        <InfoItem
                                            icon={CalendarMonth}
                                            label="Order Date"
                                            value={new Date(orderInfo.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        />
                                        <InfoItem
                                            icon={LocalShipping}
                                            label="Expected Delivery"
                                            value={new Date(orderInfo.expectedDelivery).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        />
                                    </Stack>
                                </Stack>

                                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                {/* Entities Grid */}
                                <Grid container spacing={4} sx={{ mb: 6 }}>
                                    {/* Vendor Details */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2.5 }}>
                                            Vendor / Supplier
                                        </Typography>
                                        <Paper elevation={0} sx={{ p: 4, bgcolor: "#f8fafc", borderRadius: 4, border: '1px solid #f1f5f9', height: '100%' }}>
                                            <Stack spacing={3}>
                                                <Box>
                                                    <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 1 }}>{supplier.companyName}</Typography>
                                                    <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>{supplier.address}</Typography>
                                                </Box>

                                                <Stack direction="row" spacing={1}>
                                                    <Chip label={`GSTIN: ${supplier.gstin}`} size="small" sx={{ fontWeight: 700, bgcolor: "#fff", border: '1px solid #e2e8f0', color: '#1172ba' }} />
                                                    {supplier.pan && <Chip label={`PAN: ${supplier.pan}`} size="small" sx={{ fontWeight: 700, bgcolor: "#fff", border: '1px solid #e2e8f0', color: '#475569' }} />}
                                                </Stack>

                                                <Stack spacing={1.5}>
                                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                                        <Person sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                        <Typography variant="body2" fontWeight={600}>{supplier.contactPerson}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                                        <Phone sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                        <Typography variant="body2" fontWeight={600}>{supplier.phone}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                                        <Email sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                        <Typography variant="body2" fontWeight={600}>{supplier.email}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    {/* Delivery Details */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2.5 }}>
                                            Ship To / Delivery
                                        </Typography>
                                        <Paper elevation={0} sx={{ p: 4, bgcolor: "#f8fafc", borderRadius: 4, border: '1px solid #f1f5f9', height: '100%' }}>
                                            <Stack spacing={3}>
                                                <Box>
                                                    <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 1 }}>{delivery.deliverTo}</Typography>
                                                    <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>{delivery.deliveryAddress}</Typography>
                                                </Box>

                                                <Box sx={{ mt: 'auto', pt: 2 }}>
                                                    <Stack spacing={1.5}>
                                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                                            <Person sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                            <Typography variant="body2" fontWeight={600}>{delivery.contactPerson}</Typography>
                                                        </Stack>
                                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                                            <Phone sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                            <Typography variant="body2" fontWeight={600}>{delivery.phone}</Typography>
                                                        </Stack>
                                                        {delivery.email && (
                                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                                <Email sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                                <Typography variant="body2" fontWeight={600}>{delivery.email}</Typography>
                                                            </Stack>
                                                        )}
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                {/* Items Table */}
                                <Box sx={{ mb: 6 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Receipt sx={{ color: '#1172ba' }} /> Line Items
                                        </Typography>
                                        <Typography variant="body2" color="#64748b" fontWeight={600}>
                                            {items.length} Distinct Products
                                        </Typography>
                                    </Stack>

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
                                                            {item.description && <Typography variant="caption" color="#64748b">{item.description}</Typography>}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={item.qty}
                                                                size="small"
                                                                sx={{ fontWeight: 800, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px' }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 600, color: "#475569" }}>
                                                            ₹{parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 800, color: "#0f172a" }}>
                                                            ₹{parseFloat(item.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
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

                    {/* Sidebar / Summary Area */}
                    <Grid size={{ xs: 12, lg: 3 }}>
                        <Stack spacing={2}>
                            {/* Financial Summary */}
                            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Payments sx={{ color: '#1172ba', fontSize: 20 }} /> Order Summary
                                </Typography>

                                <Stack spacing={0.5}>
                                    <SummaryRow label="Subtotal" value={totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} />
                                    <SummaryRow label="Tax (GST)" value={totals.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} />

                                    {shippingCharges > 0 && (
                                        <SummaryRow label="Shipping" value={Number(shippingCharges).toLocaleString(undefined, { minimumFractionDigits: 2 })} />
                                    )}

                                    {(otherDiscount > 0 || totals.discountAmount > 0) && (
                                        <SummaryRow
                                            label="Discount"
                                            value={(Number(otherDiscount) + totals.discountAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            isDiscount
                                        />
                                    )}

                                    <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                                    <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 3, border: '1px solid #bae6fd', textAlign: 'center' }}>
                                        <Typography variant="caption" sx={{ color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                                            Grand Total
                                        </Typography>
                                        <Typography variant="h5" fontWeight={900} color="#1172ba" sx={{ fontFamily: 'monospace' }}>
                                            ₹{totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            {/* Payment/Account Details */}
                            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AccountBalanceWallet sx={{ color: '#1172ba', fontSize: 20 }} /> Accounting Info
                                </Typography>
                                <Stack spacing={2.5}>
                                    <InfoItem icon={Description} label="PO Reference" value={orderInfo.orderNumber} />
                                    <InfoItem icon={Payments} label="Payment Terms" value="Net 30 Days" />
                                </Stack>
                            </Paper>

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
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Fade>
    );
}

export default function ViewPurchaseOrder() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Order Details..." />}>
            <ViewPurchaseOrderContent />
        </Suspense>
    );
}
