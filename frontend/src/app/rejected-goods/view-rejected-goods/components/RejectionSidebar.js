"use client";
import React from "react";
import { Stack, Paper, Typography, Divider, Button } from "@mui/material";
import { Calculate, Warning } from "@mui/icons-material";

export default function RejectionSidebar({ data }) {
    const totalQty = data.items ? data.items.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0) : 0;
    const itemsCount = data.items ? data.items.length : 0;

    return (
        <Stack spacing={2}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Calculate sx={{ color: '#1172ba', fontSize: 20 }} /> Impact Analysis
                </Typography>

                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Rejection Count</Typography>
                        <Typography variant="h6" color="#0f172a" fontWeight={800}>{itemsCount}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Total Qty</Typography>
                        <Typography variant="h6" color="#0f172a" fontWeight={800}>{totalQty}</Typography>
                    </Stack>
                    <Divider borderStyle="dashed" />
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Est. Value Loss</Typography>
                        <Typography variant="h6" color="#b91c1c" fontWeight={800}>
                            ₹ {data.totalRejectionCost || "0.00"}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, color: '#1172ba', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning sx={{ color: '#1172ba', fontSize: 20 }} /> Action Required
                </Typography>
                <Typography variant="body2" color="#334155" sx={{ mb: 2 }}>
                    Items marked for &quot;Return to Vendor&quot; must be dispatched within 48 hours. Items for &quot;Scrap&quot; require manager approval.
                </Typography>
                <Button fullWidth variant="outlined" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: "white", borderColor: "#e2e8f0", color: "#475569" }}>
                    Notify Vendor
                </Button>
            </Paper>
        </Stack>
    );
}
