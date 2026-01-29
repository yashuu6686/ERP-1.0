import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Box,
} from "@mui/material";

const GRNListTable = ({ data }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr.No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            GRN Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            PO Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Invoice Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Item Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Received Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Received By
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Supplier
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Quantity
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                transition: "0.2s",
                            }}
                        >
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell align="center" sx={{ color: "#1172ba", fontWeight: 600 }}>
                                {row.grn}
                            </TableCell>
                            <TableCell align="center">{row.po}</TableCell>
                            <TableCell align="center">{row.invoice}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: 280 }}>
                                {row.item}
                            </TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">
                                <Chip label={row.receivedBy} size="small" />
                            </TableCell>
                            <TableCell align="center">{row.supplier}</TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={row.qty}
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default GRNListTable;
