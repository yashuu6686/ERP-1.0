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

export default function InvoiceDocument({ invoice, invoiceInfo, customer, delivery, items, notes, getPaymentChip, paymentStatus }) {
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
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em" }}>
                                TAX INVOICE
                            </Typography>
                            {invoiceInfo.orderNo && (
                                <Chip
                                    label={`ORD: ${invoiceInfo.orderNo}`}
                                    size="small"
                                    sx={{ fontWeight: 700, bgcolor: "#f1f5f9", color: "#64748b", borderRadius: '6px' }}
                                />
                            )}
                        </Stack>
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
                                <Box>
                                    <Typography variant="body1" fontWeight={700} color="#1e293b">{customer.companyName}</Typography>
                                    {customer.organization && (
                                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                                            {customer.organization}
                                        </Typography>
                                    )}
                                </Box>
                                <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{customer.address}</Typography>

                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                    {customer.gstin && <Chip label={`GST: ${customer.gstin}`} size="small" sx={{ fontWeight: 600, bgcolor: "#fff", border: '1px solid #e2e8f0' }} />}
                                    {customer.pan && <Chip label={`PAN: ${customer.pan}`} size="small" sx={{ fontWeight: 600, bgcolor: "#fff", border: '1px solid #e2e8f0' }} />}
                                    {customer.drugLicence && <Chip label={`DL: ${customer.drugLicence}`} size="small" sx={{ fontWeight: 600, bgcolor: "#fff", border: '1px solid #e2e8f0' }} />}
                                </Stack>
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <Box>
                                    <Typography variant="caption" color="#64748b" fontWeight={600}>CONTACT</Typography>
                                    <Typography variant="body2" fontWeight={600}>{customer.contactPerson || customer.companyName}</Typography>
                                    <Typography variant="body2" color="#64748b">{customer.phone || customer.contact}</Typography>
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
                                <Typography variant="body1" fontWeight={700} color="#1e293b">{delivery.deliverTo || delivery.contactPerson}</Typography>
                                <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{delivery.deliveryAddress}</Typography>
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <Box>
                                    <Typography variant="caption" color="#64748b" fontWeight={600}>CONTACT</Typography>
                                    <Typography variant="body2" fontWeight={600}>{delivery.contactPerson}</Typography>
                                    {delivery.phone && <Typography variant="body2" color="#64748b">{delivery.phone}</Typography>}
                                    {delivery.email && <Typography variant="body2" color="#64748b">{delivery.email}</Typography>}
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

                {/* Items Table */}
                <Box sx={{ mb: 6 }}>
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
                                    <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TAX (%)</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TAX AMT</TableCell>
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
                                            ₹{parseFloat(item.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 600, color: "#64748b", fontFamily: 'monospace' }}>
                                            {item.taxPercent || 0}%
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 600, color: "#64748b", fontFamily: 'monospace' }}>
                                            ₹{parseFloat(item.taxAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 700, color: "#0f172a", fontFamily: 'monospace' }}>
                                            ₹{parseFloat(item.total || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Notes & Terms Section */}
                {(notes.termsAndConditions || notes.additionalNotes) && (
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {notes.termsAndConditions && (
                                <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <Typography variant="subtitle2" fontWeight={800} color="#0f172a" sx={{ mb: 1, textTransform: 'uppercase' }}>
                                        Terms & Conditions
                                    </Typography>
                                    <Typography variant="body2" color="#64748b" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                        {notes.termsAndConditions}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {notes.additionalNotes && (
                                <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: '#fff9f9', border: '1px solid #fee2e2' }}>
                                    <Typography variant="subtitle2" fontWeight={800} color="#991b1b" sx={{ mb: 1, textTransform: 'uppercase' }}>
                                        Additional Notes
                                    </Typography>
                                    <Typography variant="body2" color="#b91c1c" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                                        {notes.additionalNotes}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Paper>
    );
}
