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
} from "@mui/material";
import {
    QrCode2,
    DateRange,
    Business,
    Person,
    Phone,
    LocationOn,
    LocalShipping,
    Email,
    Info,
    Map
} from "@mui/icons-material";

// Helper for row items
const InfoRow = ({ icon: Icon, label, value, isEmail = false }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{
            mt: 0.5,
            p: 1,
            borderRadius: '8px',
            bgcolor: 'rgba(17, 114, 186, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}>
            <Icon sx={{ fontSize: 18, color: '#1172ba' }} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{
                color: '#0f172a',
                fontWeight: 600,
                wordBreak: isEmail ? 'break-all' : 'normal'
            }}>
                {value || '-'}
            </Typography>
        </Box>
    </Stack>
);

export default function DeviceManifest({ serialNumber, modelCode, batchNo, mfgDate, customer }) {
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

            <Box sx={{ p: { xs: 3, md: 4 } }}>
                {/* Document Header */}
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 4 }}>
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                            <QrCode2 sx={{ color: '#1172ba', fontSize: 28 }} />
                            <Typography variant="h4" fontWeight={800} sx={{ color: "#0f172a", letterSpacing: "-0.04em" }}>
                                DEVICE PROFILE
                            </Typography>
                        </Stack>
                        <Typography variant="body1" fontWeight={600} sx={{ color: "#64748b", mb: 2 }}>
                            Technical Specifications & History
                        </Typography>
                        <Chip
                            label={serialNumber}
                            sx={{
                                fontWeight: 700,
                                bgcolor: "#f1f5f9",
                                color: "#0f172a",
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontFamily: 'monospace',
                                border: '1px solid #e2e8f0',
                                height: 32
                            }}
                        />
                    </Box>

                    <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                        <Typography variant="caption" fontWeight={700} color="#94a3b8" display="block">MANUFACTURED ON</Typography>
                        <Typography variant="h6" fontWeight={800} color="#0f172a">{mfgDate}</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ mb: 4, opacity: 0.6 }} />

                {/* Main Content Grid */}
                <Grid container spacing={4}>
                    {/* Left: Device Info */}
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                <Info sx={{ color: '#1172ba' }} /> DEVICE IDENTITY
                            </Typography>
                            <Stack spacing={3}>
                                <InfoRow icon={QrCode2} label="Model Type" value={modelCode} />
                                <InfoRow icon={Info} label="Batch Number" value={batchNo} />
                                <InfoRow icon={DateRange} label="Production Date" value={mfgDate} />
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Right: Customer Info */}
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                <LocalShipping sx={{ color: '#1172ba' }} /> DISPATCH & CUSTOMER
                            </Typography>
                            <Stack spacing={3}>
                                <InfoRow icon={Business} label="Customer Name" value={customer.name} />
                                <InfoRow icon={Map} label="Destination" value={customer.address} />
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <InfoRow icon={Person} label="Contact" value={customer.contactPerson} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InfoRow icon={Phone} label="Phone" value={customer.phone} />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
