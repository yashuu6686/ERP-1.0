import React from "react";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
} from "@mui/material";

const InvoiceListTable = ({ data }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr. No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Invoice No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Invoice Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Due Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Customer Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Product
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Status
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Total Amount
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Paid
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Balance
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Payment Status
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Order Date
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
                                {row.invoiceNo}
                            </TableCell>
                            <TableCell align="center">{row.invoiceDate}</TableCell>
                            <TableCell align="center">{row.dueDate}</TableCell>
                            <TableCell align="center">{row.customer}</TableCell>
                            <TableCell align="center">{row.product}</TableCell>
                            <TableCell align="center">
                                <Chip label={row.status} color="info" size="small" />
                            </TableCell>
                            <TableCell align="center">
                                ₹{row.total.toLocaleString()}
                            </TableCell>
                            <TableCell align="center">₹{row.paid.toLocaleString()}</TableCell>
                            <TableCell align="center">
                                ₹{row.balance.toLocaleString()}
                            </TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={row.paymentStatus}
                                    color={row.paymentStatus === "Paid" ? "success" : "warning"}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="center">{row.orderDate}</TableCell>
                        </TableRow>
                    ))}

                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={12} align="center">
                                No invoices found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default InvoiceListTable;
