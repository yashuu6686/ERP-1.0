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

const BatchDetailsTable = ({ data }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 400 }}>Serial No</TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>Product Name</TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>Batch Number</TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>Material Issue Req No</TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>Location</TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i} hover>
                            <TableCell>{row.serial}</TableCell>
                            <TableCell>{row.product}</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                                {row.batchNo}
                            </TableCell>
                            <TableCell>{row.requestNo}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>
                                <Chip label={row.status} color="success" size="small" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default BatchDetailsTable;
