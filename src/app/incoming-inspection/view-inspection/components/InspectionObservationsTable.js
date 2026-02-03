import React from "react";
import { Box, Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { Science } from "@mui/icons-material";

const InspectionObservationsTable = ({ observations }) => {
    if (!observations || observations.length === 0) return null;

    // Determine dynamic observation columns
    const firstObs = observations[0];
    const dynamicKeys = Object.keys(firstObs).filter(k => k.startsWith("observation_"));

    return (
        <Box sx={{ mb: 6 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Science sx={{ color: '#1172ba' }} /> Technical Observations
                </Typography>
                <Typography variant="body2" color="#64748b" fontWeight={600}>
                    {observations.length} Test Parameters
                </Typography>
            </Stack>

            <TableContainer sx={{ borderRadius: 4, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2.5 }}>PARAMETER</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2.5 }}>SPECIFICATION</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2.5 }}>METHOD</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2.5 }}>OBSERVATION</TableCell>
                            {dynamicKeys.map(key => (
                                <TableCell key={key} sx={{ fontWeight: 800, color: "#475569", py: 2.5 }}>{key.replace("observation_", "OBS ")}</TableCell>
                            ))}
                            <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2.5 }}>RESULT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations.map((obs, idx) => (
                            <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                <TableCell sx={{ fontWeight: 800, color: "#1e293b", bgcolor: '#fff' }}>{obs.parameter}</TableCell>
                                <TableCell sx={{ color: "#475569", fontWeight: 600 }}>{obs.specification}</TableCell>
                                <TableCell sx={{ color: "#64748b", fontWeight: 500, fontSize: '0.85rem' }}>{obs.method}</TableCell>
                                <TableCell sx={{ color: "#1172ba", fontWeight: 800, bgcolor: 'rgba(17, 114, 186, 0.02)' }}>{obs.observation || "-"}</TableCell>
                                {dynamicKeys.map(key => (
                                    <TableCell key={key} sx={{ color: "#1172ba", fontWeight: 700 }}>{obs[key] || "-"}</TableCell>
                                ))}
                                <TableCell align="right">
                                    <Chip
                                        label={obs.remarks || "PASS"}
                                        size="small"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '0.65rem',
                                            borderRadius: '6px',
                                            bgcolor: (obs.remarks?.toLowerCase() === 'rejected' || obs.remarks?.toLowerCase() === 'fail') ? '#fee2e2' : '#f0fdf4',
                                            color: (obs.remarks?.toLowerCase() === 'rejected' || obs.remarks?.toLowerCase() === 'fail') ? '#dc2626' : '#16a34a',
                                            border: (obs.remarks?.toLowerCase() === 'rejected' || obs.remarks?.toLowerCase() === 'fail') ? '1px solid #fecaca' : '1px solid #bbf7d0',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InspectionObservationsTable;
