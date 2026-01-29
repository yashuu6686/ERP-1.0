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
import { Visibility, Edit } from "@mui/icons-material";

const BatchListTable = ({ data, onView }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            S. No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Batch No
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Material Issue Request No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Check Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Product Sr No
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Accepted Qty
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Batch Status
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 600, color: "#1172ba" }}
                            >
                                {row.batchNo}
                            </TableCell>
                            <TableCell align="center">{row.requestNo}</TableCell>
                            <TableCell align="center">{row.checkNo}</TableCell>
                            <TableCell align="center">{row.productSr}</TableCell>
                            <TableCell align="center">{row.acceptedQty}</TableCell>
                            <TableCell align="center">
                                <Chip label={row.status} color="success" size="small" />
                            </TableCell>
                            <TableCell align="center">
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default BatchListTable;
