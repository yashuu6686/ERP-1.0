import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Chip,
    Box,
} from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";

const InspectionListTable = ({ data }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr.No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Inspection No
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Received Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            GRN Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Supplier
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Serial No
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Received Qty
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Checked Qty
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Visual Notes
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Accepted
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Rejected
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Checked By
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={row.id} sx={{ transition: "0.2s" }}>
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 400, color: "#1172ba" }}>
                                {row.inspectionNo}
                            </TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.grn}</TableCell>
                            <TableCell align="center">{row.supplier}</TableCell>
                            <TableCell align="center">{row.serial}</TableCell>
                            <TableCell align="center">
                                <Chip label={row.receivedQty} size="small" />
                            </TableCell>
                            <TableCell align="center">
                                <Chip label={row.checkedQty} size="small" color="info" />
                            </TableCell>
                            <TableCell align="center" sx={{ maxWidth: 200 }}>
                                {row.notes}
                            </TableCell>
                            <TableCell align="center">
                                <Chip label={row.accepted} color="success" size="small" />
                            </TableCell>
                            <TableCell align="center">
                                <Chip label={row.rejected} color="error" size="small" />
                            </TableCell>
                            <TableCell align="center">{row.checkedBy}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "rgb(17, 114, 186)",
                                        bgcolor: "#f1f5f9",
                                        "&:hover": { bgcolor: "#e2e8f0" },
                                    }}
                                >
                                    <Visibility fontSize="small" />
                                </IconButton>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default InspectionListTable;
