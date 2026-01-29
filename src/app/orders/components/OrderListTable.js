import React from "react";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Chip,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

const OrderListTable = ({ data, onView }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f4f6" }}>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Sr.No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Order No.
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Products
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Customer Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Order Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Contact Number
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Customer Address
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Delivery Date
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Order Status
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 400 }}>
                            Order Reference
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
                                {row.orderNo}
                            </TableCell>
                            <TableCell align="center">{row.products}</TableCell>
                            <TableCell align="center">{row.customerName}</TableCell>
                            <TableCell align="center">{row.orderDate}</TableCell>
                            <TableCell align="center">{row.contact}</TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                            <TableCell align="center">{row.deliveryDate}</TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={row.status}
                                    color={row.status === "Completed" ? "success" : "warning"}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="center">{row.reference}</TableCell>
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
                            </TableCell>
                        </TableRow>
                    ))}

                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={11} align="center">
                                No customer orders found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default OrderListTable;
