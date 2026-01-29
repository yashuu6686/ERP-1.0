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
import { Visibility } from "@mui/icons-material";

const MaterialsTable = ({ data, onView }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr. No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Material Code
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Material Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Category
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Available Qty
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Minimum Qty
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Last Updated
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i} sx={{ transition: "0.2s" }}>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                {i + 1}
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, color: "#1172ba" }}>
                                {row.code}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={row.available}
                                    color={row.available <= row.minimum ? "error" : "success"}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="center">{row.minimum}</TableCell>
                            <TableCell align="center">{row.updated}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    size="small"
                                    onClick={() => onView(row.code)}
                                    sx={{
                                        color: "rgb(17, 114, 186)",
                                        bgcolor: "#f1f5f9",
                                        "&:hover": { bgcolor: "#e2e8f0" },
                                    }}
                                >
                                    <Visibility fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default MaterialsTable;
