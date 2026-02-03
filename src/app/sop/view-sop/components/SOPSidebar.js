"use client";
import React from "react";
import { Stack, Paper, Typography, Divider, Avatar, Box } from "@mui/material";
import { VerifiedUser, Person, CheckCircle, Inventory } from "@mui/icons-material";

export default function SOPSidebar({ data }) {
    return (
        <Stack spacing={3}>
            {/* Authorization Card */}
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authorization
                </Typography>

                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><Person /></Avatar>
                        <Box>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Tested By</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.testingBy}</Typography>
                            <Typography variant="caption" sx={{ color: "#1172ba", fontWeight: 700 }}>{data.testingDate}</Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: "#dcfce7", color: "#166534" }}><CheckCircle /></Avatar>
                        <Box>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Verified By</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.verifiedBy}</Typography>
                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>{data.verifiedDate}</Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: "#fef3c7", color: "#d97706" }}><Inventory /></Avatar>
                        <Box>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Packed By</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.packedBy}</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
}
