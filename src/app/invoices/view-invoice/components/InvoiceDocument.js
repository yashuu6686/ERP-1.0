"use client";
import React from "react";
import {
    Box,
    Paper,
    Stack,
    Typography,
    Chip,
    Divider,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import {
    Description,
    Schedule,
    Business,
    LocalShipping,
    ShoppingCart
} from "@mui/icons-material";
import InvoiceInfoItem from "./InvoiceInfoItem";

export default function InvoiceDocument({ invoice, invoiceInfo, customer, delivery, items, getPaymentChip, paymentStatus }) {
    return (
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
                        <InvoiceInfoItem
                            icon={Description}
                            label="Invoice Date"
                            value={new Date(invoiceInfo.invoiceDate).toLocaleDateString()}
                        />
                        <InvoiceInfoItem
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
                    <Grid size={{ xs: 12, md: 6 }}>
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
                    <Grid size={{ xs: 12, md: 6 }}>
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
    );
}
