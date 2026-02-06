"use client";
import React from "react";
import { Box, Paper, Typography, Divider, Button, Chip } from "@mui/material";
import { Inventory, Explore, LocationOn, DateRange } from "@mui/icons-material";

export default function DeviceSidebar({ customer }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Status Summary */}
            <Paper sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff', boxShadow: "none" }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Inventory sx={{ color: '#1172ba', fontSize: 20 }} /> Current Status
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mb: 3 }}>
                    <Chip
                        label={customer.status.toUpperCase()}
                        sx={{
                            fontWeight: 800,
                            bgcolor: '#dcfce7',
                            color: '#166534',
                            height: 32,
                            borderRadius: '8px',
                            width: '100%'
                        }}
                    />
                    <Typography variant="caption" color="#64748b" fontWeight={600}>
                        Last Updated: Just now
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Location</Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" color="#0f172a" fontWeight={700}>Finished Goods</Typography>
                            <Typography variant="caption" color="#94a3b8" fontWeight={600}>Zone A-12</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* Tracking Info */}
            <Paper sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff', boxShadow: "none" }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Explore sx={{ color: '#1172ba', fontSize: 20 }} /> Tracking
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="caption" fontWeight={700} color="#64748b">AWB Number</Typography>
                    <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{customer.awb}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" fontWeight={700} color="#64748b">Dispatched</Typography>
                    <Typography variant="caption" fontWeight={900} color="#0f172a">{customer.dispatchDate}</Typography>
                </Box>

                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 3, borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                    onClick={() => window.open(`https://www.google.com/search?q=${customer.awb}`, '_blank')}
                >
                    Track Shipment
                </Button>
            </Paper>
        </Box>
    );
}
