"use client";
import React from "react";
import { Paper, Stack, Typography, Divider, Box, Avatar } from "@mui/material";
import { FactCheck, VerifiedUser, Person } from "@mui/icons-material";

export default function InspectionSidebar({ data, id }) {
    return (
        <Stack spacing={3}>
            {/* QA Verdict Card */}
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FactCheck sx={{ color: '#1172ba', fontSize: 20 }} /> QA Verdict
                </Typography>

                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Total Checked</Typography>
                        <Typography variant="h6" color="#0f172a" fontWeight={800}>{data.totalChecked}</Typography>
                    </Stack>
                    <Divider borderStyle="dashed" />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Approved</Typography>
                        <Typography variant="h6" color="#15803d" fontWeight={800}>{data.approved}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="#64748b" fontWeight={600}>Rejected</Typography>
                        <Typography variant="h6" color="#b91c1c" fontWeight={800}>{data.rejected}</Typography>
                    </Stack>

                    <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px dashed #bbf7d0', textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: "#166534", fontWeight: 800, textTransform: "uppercase" }}>YIELD RATE</Typography>
                        <Typography variant="h5" sx={{ color: "#15803d", fontWeight: 800 }}>
                            {data.totalChecked > 0 ? ((Number(data.approved) / Number(data.totalChecked)) * 100).toFixed(1) : 0}%
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* System Info & Approval */}
            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authority
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><Person /></Avatar>
                    <Box>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Updated By</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.updatedBySignature || 'N/A'}</Typography>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700 }}>{data.updatedByDate}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                    <Avatar sx={{ bgcolor: "#dcfce7", color: "#166534" }}><Person /></Avatar>
                    <Box>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Approved By</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.approvedBy || "Waiting for Approval"}</Typography>
                        <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>{data.approvalDate}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                    <Typography variant="caption" fontWeight={700} color="#64748b">Inspection ID</Typography>
                    <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{data.id || id}</Typography>
                </Stack>
            </Paper>
        </Stack>
    );
}
