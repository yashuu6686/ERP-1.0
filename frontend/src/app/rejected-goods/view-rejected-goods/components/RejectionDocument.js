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
    CalendarMonth,
    Description,
    Inventory,
    VerifiedUser,
    Person,
    Engineering,
    ReportProblem
} from "@mui/icons-material";
import RejectionInfoItem from "./RejectionInfoItem";

export default function RejectionDocument({ data, statusParams }) {
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
            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                    <Box>
                        <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                            REJECTION REPORT
                        </Typography>
                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                            Non-Conformance Material Log
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={data.rejectionNo}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f1f5f9",
                                    color: "#0f172a",
                                    borderRadius: '8px',
                                    fontSize: '0.95rem'
                                }}
                            />
                            <Chip
                                icon={statusParams.icon}
                                label={statusParams.label}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: statusParams.bg,
                                    color: statusParams.color,
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    '& .MuiChip-icon': { color: 'inherit' }
                                }}
                            />
                        </Stack>
                    </Box>

                    <Stack spacing={2} sx={{ minWidth: 260 }}>
                        <RejectionInfoItem
                            icon={CalendarMonth}
                            label="Date of Rejection"
                            value={data.date}
                        />
                        <RejectionInfoItem
                            icon={Description}
                            label="Ref Invoice"
                            value={data.invoiceNo}
                        />
                    </Stack>
                </Stack>

                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                <Grid container spacing={2} sx={{ mb: 6 }}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#1172ba' }}>
                                <Inventory sx={{ color: '#1172ba' }} /> VENDOR DETAILS
                            </Typography>
                            <Stack spacing={2}>
                                <RejectionInfoItem icon={Inventory} label="Vendor Name" value={data.vendor} />
                                <RejectionInfoItem icon={Description} label="Invoice No" value={data.invoiceNo} />
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#1172ba' }}>
                                <VerifiedUser sx={{ color: '#1172ba' }} /> INSPECTION INFO
                            </Typography>
                            <Stack spacing={2}>
                                <RejectionInfoItem icon={Person} label="Inspected By" value={data.inspectedBy} />
                                <RejectionInfoItem icon={Engineering} label="Department" value={data.department} />
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ReportProblem sx={{ color: '#1172ba' }} /> Rejected Items
                        </Typography>
                    </Stack>

                    <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR</TableCell>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>MATERIAL NAME</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>BATCH</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>REASON FOR REJECTION</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.items && data.items.map((item, idx) => (
                                    <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                        <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontFamily: 'monospace', color: "#64748b", fontWeight: 600 }}>
                                            {item.batchNo || "-"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip label={item.qty} size="small" sx={{ fontWeight: 800, bgcolor: "#fee2e2", color: "#b91c1c", borderRadius: '6px' }} />
                                        </TableCell>
                                        <TableCell sx={{ color: "#334155", fontWeight: 500 }}>
                                            {item.reason}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="caption" fontWeight={700} color="#0f172a" sx={{ bgcolor: "#f1f5f9", px: 1, py: 0.5, borderRadius: 1 }}>
                                                {item.action}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!data.items || data.items.length === 0) && (
                                    <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No rejected items recorded.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #e2e8f0" }}>
                    <Typography variant="caption" fontWeight={700} color="#64748b" textTransform="uppercase">Additional Remarks</Typography>
                    <Typography variant="body2" color="#334155" sx={{ mt: 0.5, fontStyle: data.remarks ? 'normal' : 'italic' }}>
                        {data.remarks || "No additional remarks provided."}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
