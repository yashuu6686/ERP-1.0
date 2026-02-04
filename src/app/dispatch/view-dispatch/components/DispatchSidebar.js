"use client";
import React from "react";
import { Stack, Paper, Typography, Divider, Button } from "@mui/material";
import { Inventory, Explore } from "@mui/icons-material";

export default function DispatchSidebar({ shipmentInfo, items }) {
    const totalQty = items ? items.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0) : 0;
    const itemsCount = items ? items.length : 0;

    return (
        <Stack spacing={2}>
            {/* Order Summary */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Inventory sx={{ color: '#1172ba', fontSize: 20 }} /> Summary
                </Typography>

                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Total Items</Typography>
                        <Typography variant="h6" color="#0f172a" fontWeight={800}>{itemsCount}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Total Qty</Typography>
                        <Typography variant="h6" color="#0f172a" fontWeight={800}>{totalQty}</Typography>
                    </Stack>
                </Stack>

                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 3, borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                    onClick={() => window.open(`https://www.google.com/search?q=${shipmentInfo.carrier}+tracking+${shipmentInfo.trackingNumber}`, '_blank')}
                >
                    Track on {shipmentInfo.carrier}
                </Button>
            </Paper>

            {/* System Info */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Explore sx={{ color: '#1172ba', fontSize: 20 }} /> System Data
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" fontWeight={700} color="#64748b">Dispatch Ref</Typography>
                    <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{shipmentInfo.dispatchNo || shipmentInfo.orderNumber}</Typography>
                </Stack>
                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />
                <Typography variant="caption" color="#64748b" sx={{ fontStyle: 'italic', display: 'block', textAlign: 'center' }}>
                    &quot;Verify condition upon receipt.&quot;
                </Typography>
            </Paper>
        </Stack>
    );
}
