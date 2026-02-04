"use client";
import React from "react";
import { Paper, Stack, Typography, Divider, Box, Button } from "@mui/material";
import { Calculate, Payment, VerifiedUser } from "@mui/icons-material";

export default function InvoiceSidebar({ totals, invoiceInfo, status }) {
    return (
        <Stack spacing={2}>
            {/* Payment Summary */}
            <Paper sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
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
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Tax Amount</Typography>
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
            <Paper sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
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
    );
}
