import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Chip,
    Tooltip,
    Box,
    Typography,
} from "@mui/material";
import { Visibility, Edit, Download, FactCheck } from "@mui/icons-material";

const InspectionListTable = ({ data, onView }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow
                        sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}
                    >
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Sr. No.
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Quality Check No.
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Checked Qty
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Accepted Qty
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Rejected Qty
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Inspection Result
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Inspection Date
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: 500, color: "#334155", py: 1.5 }}
                        >
                            Approved By
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                fontWeight: 500,
                                color: "#334155",
                                textAlign: "center",
                                py: 1.5,
                            }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={row.id} sx={{ transition: "background-color 0.2s" }}>
                            <TableCell align="center" sx={{ py: 1 }}>
                                {i + 1}
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 600, color: "#1172ba", py: 1 }}
                            >
                                {row.checkNo}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1 }}>
                                {row.checkedQty}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1 }}>
                                <Chip
                                    label={row.acceptedQty}
                                    size="small"
                                    sx={{
                                        bgcolor: "#dcfce7",
                                        color: "#166534",
                                        fontWeight: 700,
                                        minWidth: 40,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1 }}>
                                <Chip
                                    label={row.rejectedQty}
                                    size="small"
                                    sx={{
                                        bgcolor: "#fee2e2",
                                        color: "#991b1b",
                                        fontWeight: 700,
                                        minWidth: 40,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1 }}>
                                <Chip
                                    label={row.result.split(" / ")[0]}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1, color: "#64748b" }}>
                                {row.date}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1, fontWeight: 500 }}>
                                {row.approvedBy}
                            </TableCell>
                            <TableCell align="center" sx={{ textAlign: "center", py: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                                    <Tooltip title="View Details">
                                        <IconButton
                                            size="small"
                                            onClick={() => onView(row.id)}
                                            sx={{
                                                color: "rgb(17, 114, 186)",
                                                bgcolor: "#f1f5f9",
                                                "&:hover": { bgcolor: "#e2e8f0" },
                                            }}
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "#dc2626",
                                                bgcolor: "#fef2f2",
                                                "&:hover": { bgcolor: "#fee2e2" },
                                            }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Download Report">
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "#0891b2",
                                                bgcolor: "#ecfeff",
                                                "&:hover": { bgcolor: "#cffafe" },
                                            }}
                                        >
                                            <Download fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}

                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                                <Box sx={{ opacity: 0.5 }}>
                                    <FactCheck sx={{ fontSize: 48, mb: 1 }} />
                                    <Typography variant="body1">No inspection records found</Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default InspectionListTable;
