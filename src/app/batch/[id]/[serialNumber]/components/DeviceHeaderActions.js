"use client";
import React from "react";
import { Stack, Button, Tooltip, Box, Typography } from "@mui/material";
import { ArrowBack, Print, VerifiedUser } from "@mui/icons-material";

export default function DeviceHeaderActions({
    onBack,
    onPrint,
    serialNumber
}) {
    return (
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} sx={{ mb: 3 }} className="no-print">
            <Button
                startIcon={<ArrowBack />}
                onClick={onBack}
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
                Back to Batch
            </Button>

            <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: '#eff6ff',
                    px: 2,
                    py: 0.8,
                    borderRadius: '10px',
                    border: '1px solid #bfdbfe'
                }}>
                    <VerifiedUser sx={{ fontSize: 16, color: '#1d4ed8' }} />
                    <Typography variant="caption" fontWeight={700} color="#1e40af">
                        AUTHENTIC DEVICE
                    </Typography>
                </Box>

                <Tooltip title="Print Device Label">
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={onPrint}
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
                        Print Label
                    </Button>
                </Tooltip>
            </Stack>
        </Stack>
    );
}
