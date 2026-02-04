import React from "react";
import { Box, Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { Receipt } from "@mui/icons-material";

const PurchaseItemsTable = ({ items }) => {
    return (
        <Box sx={{ mb: 6 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Receipt sx={{ color: '#1172ba' }} /> Line Items
                </Typography>
                <Typography variant="body2" color="#64748b" fontWeight={600}>
                    {items.length} Distinct Products
                </Typography>
            </Stack>

            <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR.</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>ITEM DESCRIPTION</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>UNIT PRICE</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, idx) => (
                            <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                    {item.description && <Typography variant="caption" color="#64748b">{item.description}</Typography>}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={item.qty}
                                        size="small"
                                        sx={{ fontWeight: 800, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px' }}
                                    />
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 600, color: "#475569" }}>
                                    ₹{parseFloat(item.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 800, color: "#0f172a" }}>
                                    ₹{parseFloat(item.total || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PurchaseItemsTable;
