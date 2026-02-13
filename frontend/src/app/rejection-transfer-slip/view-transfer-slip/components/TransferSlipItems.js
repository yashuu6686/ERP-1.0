import React from "react";
import { Box, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { ListAlt } from "@mui/icons-material";

const TransferSlipItems = ({ items = [] }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                bgcolor: "#fff",
                mb: 4
            }}
        >
            <Box sx={{ p: 3, borderBottom: "1px solid #f1f5f9", display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ListAlt sx={{ color: "#1172ba" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem" }}>
                    MATERIAL DETAILS
                </Typography>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                            <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                Sr.No.
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                Description
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                Batch No.
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                Qty Issued
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                Qty Received
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                Remarks
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                <TableCell align="center">
                                    <Chip
                                        label={index + 1}
                                        size="small"
                                        sx={{ bgcolor: "#f1f5f9", color: "#475569", fontWeight: 700, borderRadius: 1.5 }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 500, color: "#334155" }}>{item.description}</TableCell>
                                <TableCell align="center" sx={{ color: "#475569" }}>{item.batchNo}</TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#1172ba" }}>
                                        {item.qtyIssued}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#15803d" }}>
                                        {item.qtyReceived}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ color: "#64748b", fontSize: "0.85rem" }}>{item.remarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};

export default TransferSlipItems;
