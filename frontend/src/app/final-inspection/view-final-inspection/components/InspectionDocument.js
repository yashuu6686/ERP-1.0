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
    TableBody
} from "@mui/material";
import {
    Inventory,
    CalendarMonth,
    VerifiedUser,
    ProductionQuantityLimits,
    QrCode,
    Description,
    Rule,
    ReportProblem,
    Info,
    CheckCircle,
    Cancel,
    Edit
} from "@mui/icons-material";
import InspectionInfoItem from "./InspectionInfoItem";

export default function InspectionDocument({ data, getResultChip }) {
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
                            FINAL INSPECTION
                        </Typography>
                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                            Production Release Verification
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={data.inspectionNo}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f1f5f9",
                                    color: "#0f172a",
                                    borderRadius: '8px',
                                    fontSize: '0.95rem'
                                }}
                            />
                            {getResultChip(data.result)}
                        </Stack>
                    </Box>

                    <Stack spacing={2} sx={{ minWidth: 280 }}>
                        <InspectionInfoItem
                            icon={Inventory}
                            label="Inspected Product"
                            value={data.productName}
                        />
                        <InspectionInfoItem
                            icon={CalendarMonth}
                            label="Inspection Date"
                            value={data.date}
                        />
                    </Stack>
                </Stack>

                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                {/* Product & Scope Details */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <InspectionInfoItem icon={VerifiedUser} label="Standard Ref" value={data.inspectionStdNo} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <InspectionInfoItem icon={ProductionQuantityLimits} label="Total Lot Size" value={`${data.quantity} Units`} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <InspectionInfoItem icon={QrCode} label="Serial Range" value={`${data.serialFrom || 'N/A'} - ${data.serialTo || 'N/A'}`} />
                    </Grid>
                </Grid>

                {/* Remarks/Summary Section */}
                <Box sx={{ mb: 6, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                        <Description sx={{ color: '#1172ba', fontSize: 20 }} />
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Auditor Remarks</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: "#1e293b", lineHeight: 1.6, fontWeight: 500 }}>
                        {data.remarks || "No specific remarks recorded for this lot."}
                    </Typography>
                </Box>

                {/* Observations Table */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Rule sx={{ color: '#1172ba' }} /> Technical Observations
                        </Typography>
                    </Stack>

                    <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>PARAMETER</TableCell>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SPECIFICATION</TableCell>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>METHOD</TableCell>
                                    {(data.observationColumns || [{ id: 'observation', label: 'FINDINGS' }]).map(col => (
                                        <TableCell key={col.id} sx={{ fontWeight: 800, color: "#475569", py: 2 }}>{col.label.toUpperCase()}</TableCell>
                                    ))}
                                    <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>VERDICT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.observations?.map((obs, idx) => (
                                    <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                        <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{obs.parameter}</TableCell>
                                        <TableCell sx={{ color: "#64748b", fontSize: '0.9rem' }}>{obs.specification}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={obs.method}
                                                size="small"
                                                sx={{ bgcolor: "#f1f5f9", fontWeight: 600, color: "#475569", borderRadius: '6px' }}
                                            />
                                        </TableCell>
                                        {(data.observationColumns || [{ id: 'observation', label: 'FINDINGS' }]).map(col => (
                                            <TableCell key={col.id} sx={{ color: "#334155", fontWeight: 600 }}>{obs[col.id]}</TableCell>
                                        ))}
                                        <TableCell align="right">
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: "#166534" }}>OK</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!data.observations || data.observations.length === 0) && (
                                    <TableRow><TableCell colSpan={4 + (data.observationColumns?.length || 1)} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No technical observations recorded.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Problem Report & AQD Section */}
                <Grid container spacing={3} sx={{ mb: 6 }} mt={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, bgcolor: data.problemReport === 'yes' ? '#fff1f2' : '#f8fafc', borderRadius: 3, border: '1px solid', borderColor: data.problemReport === 'yes' ? '#fecaca' : '#f1f5f9', height: '100%' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <ReportProblem sx={{ color: data.problemReport === 'yes' ? '#e11d48' : '#1172ba', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ color: "#0f172a", fontWeight: 800, textTransform: "uppercase" }}>Problem Report</Typography>
                            </Stack>
                            {data.problemReport === 'yes' ? (
                                <Stack spacing={1.5}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: 'block' }}>DESCRIPTION</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.problemDescription}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: 'block' }}>ACTION TAKEN</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.problemActionTaken}</Typography>
                                    </Box>
                                </Stack>
                            ) : (
                                <Typography variant="body2" sx={{ color: "#64748b", fontStyle: 'italic' }}>No problems reported for this lot.</Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9', height: '100%' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <Info sx={{ color: '#1172ba', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ color: "#0f172a", fontWeight: 800, textTransform: "uppercase" }}>AQD Details</Typography>
                            </Stack>
                            {data.aqd === 'yes' ? (
                                <Box>
                                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: 'block' }}>AQD DESCRIPTION</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.aqdDescription}</Typography>
                                </Box>
                            ) : (
                                <Typography variant="body2" sx={{ color: "#64748b", fontStyle: 'italic' }}>No Acceptable Quality Difference recorded.</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>

                {/* Action Items & Checklist Section */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <Edit sx={{ color: '#1172ba', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ color: "#0f172a", fontWeight: 800, textTransform: "uppercase" }}>Action Items</Typography>
                            </Stack>
                            {data.actionItemsDescription ? (
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 8 }}>
                                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: 'block' }}>DESCRIPTION</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.actionItemsDescription}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, display: 'block' }}>FINISH DATE</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#1172ba' }}>{data.actionItemsFinishDate || '-'}</Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Typography variant="body2" sx={{ color: "#64748b", fontStyle: 'italic' }}>No specific action items defined.</Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <CheckCircle sx={{ color: '#16a34a', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ color: "#0f172a", fontWeight: 800, textTransform: "uppercase" }}>Final Verification</Typography>
                            </Stack>
                            <Stack spacing={1}>
                                {[
                                    { label: 'Label Attached', checked: data.checklist?.labelAttached },
                                    { label: 'Packaging Proof', checked: data.checklist?.packagingProof },
                                    { label: 'Final Test Done', checked: data.checklist?.finalTestDone },
                                ].map((item, idx) => (
                                    <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1, px: 1.5, bgcolor: 'white', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>{item.label}</Typography>
                                        {item.checked ?
                                            <CheckCircle sx={{ color: '#16a34a', fontSize: 18 }} /> :
                                            <Cancel sx={{ color: '#94a3b8', fontSize: 18 }} />
                                        }
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
