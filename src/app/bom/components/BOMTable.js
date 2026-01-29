import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Box,
} from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";

const BOMTable = ({ data, onView }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr. No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            BOM Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Created Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Approved By
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={row.id} hover>
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, color: "#1172ba" }}>
                                {row.number}
                            </TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.approvedBy}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={() => onView(row.id)}
                                >
                                    <Visibility fontSize="small" />
                                </IconButton>
                                <IconButton color="warning" size="small">
                                    <Edit fontSize="small" />
                                </IconButton>
                                <IconButton color="success" size="small">
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

export default BOMTable;
