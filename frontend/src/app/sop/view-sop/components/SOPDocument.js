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
    TableBody,
    IconButton,
    Fade,
    Tooltip
} from "@mui/material";
import {
    Devices,
    Business,
    AssignmentInd,
    Person,
    Engineering,
    FactCheck,
    TaskAlt,
    LocalShipping,
    VerifiedUser,
    CheckCircle,
    Inventory,
    ArrowForward,
    ArrowBack
} from "@mui/icons-material";
import SOPInfoItem from "./SOPInfoItem";

const StatusChip = ({ status }) => (
    <Chip
        label={status || "PENDING"}
        size="small"
        sx={{
            fontWeight: 800,
            bgcolor: status === 'Pass' ? "#dcfce7" : status === 'Fail' ? "#fee2e2" : "#f1f5f9",
            color: status === 'Pass' ? "#166534" : status === 'Fail' ? "#991b1b" : "#64748b",
            borderRadius: '6px',
            fontSize: '0.75rem',
            minWidth: 60
        }}
    />
);

export default function SOPDocument({
    data,
    deviceTestingSteps,
    packagingSteps,
    getTestingResult,
    getPackagingResult
}) {
    const [view, setView] = React.useState('testing'); // 'testing' or 'packaging'

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
                            STANDARD PROCEDURE
                        </Typography>
                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                            Quality Assurance Protocol
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={data.sopNumber}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f1f5f9",
                                    color: "#0f172a",
                                    borderRadius: '8px',
                                    fontSize: '0.95rem'
                                }}
                            />
                            <Chip
                                icon={<CheckCircle sx={{ fontSize: '18px !important' }} />}
                                label="ACTIVE"
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#dcfce7",
                                    color: "#166534",
                                    borderRadius: '8px',
                                    fontSize: '0.85rem'
                                }}
                            />
                        </Stack>
                    </Box>

                    <Stack spacing={2} sx={{ minWidth: 280 }}>
                        <SOPInfoItem
                            icon={Devices}
                            label="Target Device"
                            value={data.deviceId}
                        />
                        <SOPInfoItem
                            icon={Business}
                            label="Client Company"
                            value={data.companyName}
                        />
                    </Stack>
                </Stack>

                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                {/* Exec Team & Scope */}
                <Grid container spacing={6} sx={{ mb: 6 }}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                <AssignmentInd sx={{ color: '#1172ba' }} /> EXECUTION DETAILS
                            </Typography>
                            <Stack spacing={2}>
                                <SOPInfoItem icon={Person} label="Assisted By" value={data.assistedBy} />
                                <SOPInfoItem icon={Engineering} label="Executed By" value={data.doneBy} />
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <Typography variant="body2" color="#64748b" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                                    Site: {data.companyAddress}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                <FactCheck sx={{ color: '#1172ba' }} /> PROCESS METRICS
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item size={{ xs: 6 }}>
                                    <SOPInfoItem icon={TaskAlt} label="Tests Configured" value={deviceTestingSteps.length} />
                                </Grid>
                                <Grid item size={{ xs: 6 }}>
                                    <SOPInfoItem icon={LocalShipping} label="Pack Items" value={packagingSteps.length} />
                                </Grid>
                                <Grid item size={{ xs: 12 }}>
                                    <SOPInfoItem icon={VerifiedUser} label="Final Validator" value={data.checkedBy} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                {/* Testing Results Table */}
                {view === 'testing' && (
                    <Fade in={view === 'testing'}>
                        <Box sx={{ mb: 6 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <FactCheck sx={{ color: '#1172ba' }} /> Testing Procedure Results
                                </Typography>
                                <Tooltip title="Packaging Checklist">
                                    <IconButton
                                        onClick={() => setView('packaging')}
                                        sx={{
                                            bgcolor: 'rgba(17, 114, 186, 0.1)',
                                            color: '#1172ba',
                                            '&:hover': { bgcolor: 'rgba(17, 114, 186, 0.2)' }
                                        }}
                                    >
                                        <ArrowForward />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>SR</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>TEST TASK</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>METHOD / PARAM</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>REMARKS</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>STATUS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {deviceTestingSteps.map((stepItem, idx) => {
                                            const result = getTestingResult(idx);
                                            return (
                                                <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                    <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{stepItem.step}</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: '0.9rem' }}>{stepItem.task}</TableCell>
                                                    <TableCell>
                                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={600}>M: {result.methodology || "-"}</Typography>
                                                        <Typography variant="caption" display="block" color="#64748b">P: {result.parameter || "-"}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ color: "#334155", fontSize: '0.85rem', maxWidth: 200 }}>{result.remarks || "-"}</TableCell>
                                                    <TableCell align="right">
                                                        <StatusChip status={result.status} />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Fade>
                )}

                {/* Packaging Results Table */}
                {view === 'packaging' && (
                    <Fade in={view === 'packaging'}>
                        <Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Inventory sx={{ color: '#1172ba' }} /> Packaging Checklist
                                </Typography>
                                <Tooltip title="Testing Results">
                                    <IconButton
                                        onClick={() => setView('testing')}
                                        sx={{
                                            bgcolor: 'rgba(17, 114, 186, 0.1)',
                                            color: '#1172ba',
                                            '&:hover': { bgcolor: 'rgba(17, 114, 186, 0.2)' }
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>SR</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>COMPONENT</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>SPEC / EXPECTED</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>REMARKS</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>STATUS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {packagingSteps.map((stepItem, idx) => {
                                            const result = getPackagingResult(idx);
                                            return (
                                                <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                    <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{stepItem.step}</TableCell>
                                                    <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: '0.9rem' }}>{stepItem.components}</TableCell>
                                                    <TableCell>
                                                        <Typography variant="caption" display="block" color="#64748b">S: {result.parameter || "-"}</Typography>
                                                        <Typography variant="caption" display="block" color="#64748b">E: {result.expected || "-"}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ color: "#334155", fontSize: '0.85rem', maxWidth: 200 }}>{result.remarks || "-"}</TableCell>
                                                    <TableCell align="right">
                                                        <StatusChip status={result.status} />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Fade>
                )}
            </Box>
        </Paper>
    );
}
