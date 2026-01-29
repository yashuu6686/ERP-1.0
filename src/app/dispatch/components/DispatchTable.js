import React from "react";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Chip,
    IconButton,
} from "@mui/material";
import { Visibility, Edit, Delete, LocalShipping, Warning, CheckCircle, Schedule, Download } from "@mui/icons-material";

const getStatusColor = (status) => {
    switch (status) {
        case "Shipped":
            return { bg: "#d1ecf1", color: "#0c5460", icon: <LocalShipping /> };
        case "Delivered":
            return { bg: "#d4edda", color: "#155724", icon: <CheckCircle /> };
        case "Pending":
            return { bg: "#fff3cd", color: "#856404", icon: <Schedule /> };
        case "Processing":
            return { bg: "#e2e3e5", color: "#383d41", icon: <Warning /> };
        default:
            return { bg: "#f8d7da", color: "#721c24", icon: <Warning /> };
    }
};

const formatDate = (dateString) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function DispatchTable({ filtered, router }) {
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: "#f8f9fa",
                            "& th": {
                                fontWeight: 600,
                                color: "#495057",
                                borderBottom: "2px solid #dee2e6",
                                py: 1.5,
                            },
                        }}
                    >
                        <TableCell align="center" sx={{ width: "60px" }}>Sr. No.</TableCell>
                        <TableCell align="center">Order Details</TableCell>
                        <TableCell align="center">Product</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Order Date</TableCell>
                        <TableCell align="center">Shipping Date</TableCell>
                        <TableCell align="center">Sales Platform</TableCell>
                        <TableCell align="center">Contact Person</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Tracking Info</TableCell>
                        <TableCell align="center">Evidence</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filtered.map((row, i) => {
                        const statusInfo = getStatusColor(row.status);
                        return (
                            <TableRow
                                key={row.id}
                                sx={{
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <TableCell align="center" sx={{ color: "#6c757d" }}>{i + 1}</TableCell>
                                <TableCell align="center">
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, color: "#1172ba" }}
                                    >
                                        {row.order}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500 }}>
                                    {row.product}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        sx={{
                                            backgroundColor: statusInfo.bg,
                                            color: statusInfo.color,
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">{formatDate(row.orderDate)}</TableCell>
                                <TableCell align="center">{formatDate(row.shippingDate)}</TableCell>
                                <TableCell align="center">{row.platform}</TableCell>
                                <TableCell align="center">{row.contact}</TableCell>
                                <TableCell align="center">
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            maxWidth: "130px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {row.address}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            color: row.tracking === "-" ? "#999" : "#1172ba",
                                        }}
                                    >
                                        {row.tracking}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
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
                                <TableCell align="center">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => router.push(`/dispatch/${row.id}`)}
                                            sx={{
                                                color: "rgb(17, 114, 186)",
                                                bgcolor: "#f1f5f9",
                                                "&:hover": { bgcolor: "#e2e8f0" }
                                            }}
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "#dc2626",
                                                bgcolor: "#fef2f2",
                                                "&:hover": { bgcolor: "#fee2e2" }
                                            }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "#dc2626",
                                                bgcolor: "#fef2f2",
                                                "&:hover": { bgcolor: "#fee2e2" }
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {filtered.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={12} align="center" sx={{ py: 8 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <LocalShipping sx={{ fontSize: 64, color: "#dee2e6" }} />
                                    <Typography variant="h6" sx={{ color: "#6c757d" }}>
                                        No dispatch records found
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#adb5bd" }}>
                                        Try adjusting your search criteria
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};
