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
import { Visibility, Edit, Delete, Warning, CheckCircle, Cancel } from "@mui/icons-material";

const getStatusColor = (status) => {
    switch (status) {
        case "total":
            return { bg: "#fff3cd", color: "#856404", label: "Pending" };
        case "return":
            return { bg: "#d1ecf1", color: "#0c5460", label: "Return to Vendor" };
        case "scrap":
            return { bg: "#f8d7da", color: "#721c24", label: "Scrapped" };
        default:
            return { bg: "#e2e3e5", color: "#383d41", label: status };
    }
};

const getSeverityIcon = (severity) => {
    switch (severity) {
        case "high":
            return <Cancel sx={{ fontSize: 18, color: "#dc3545" }} />;
        case "medium":
            return <Warning sx={{ fontSize: 18, color: "#ffc107" }} />;
        case "low":
            return <CheckCircle sx={{ fontSize: 18, color: "#28a745" }} />;
        default:
            return null;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function RejectedGoodsTable({ filteredData }) {
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
                        <TableCell sx={{ width: "60px" }}>S. No.</TableCell>
                        <TableCell>Rejection ID</TableCell>
                        <TableCell>Source Type</TableCell>
                        <TableCell>Source Reference</TableCell>
                        <TableCell>Rejected Goods</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Rejection Reason</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filteredData.map((row, i) => {
                        const statusInfo = getStatusColor(row.status);
                        return (
                            <TableRow
                                key={row.id}
                                sx={{
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <TableCell sx={{ color: "#6c757d" }}>{i + 1}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {getSeverityIcon(row.severity)}
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 600, color: "#1172ba" }}
                                        >
                                            {row.rejectionId}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{row.sourceType}</TableCell>
                                <TableCell sx={{ color: "#495057" }}>
                                    {row.sourceRef}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 500 }}>{row.goods}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={row.qty}
                                        size="small"
                                        sx={{
                                            bgcolor: "#fee",
                                            color: "#dc3545",
                                            fontWeight: 600,
                                            minWidth: "50px",
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{formatDate(row.date)}</TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            maxWidth: "200px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {row.reason}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={statusInfo.label}
                                        size="small"
                                        sx={{
                                            backgroundColor: statusInfo.bg,
                                            color: statusInfo.color,
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                                        <IconButton
                                            size="small"
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

                    {filteredData.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10} align="center" sx={{ py: 8 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <Warning sx={{ fontSize: 64, color: "#dee2e6" }} />
                                    <Typography variant="h6" sx={{ color: "#6c757d" }}>
                                        No rejected goods found
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#adb5bd" }}>
                                        Try adjusting your search or filter criteria
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
