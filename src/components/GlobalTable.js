"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";

const GlobalTable = ({ columns, data, onRowClick }) => {
    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                overflowX: "auto",
                width: "100%",
                maxWidth: "100%",
                display: "block",
                // Custom Scrollbar Styles
                "&::-webkit-scrollbar": {
                    height: "8px",
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    background: "#f8fafc",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#cbd5e1",
                    borderRadius: "10px",
                    border: "2px solid #f8fafc",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#94a3b8",
                },
            }}
        >
            <Table size="small">
                <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableCell
                                key={index}
                                align={col.align || "left"}
                                sx={{
                                    fontWeight: 600,
                                    color: "#475569",
                                    py: 1.5,
                                    whiteSpace: "nowrap",
                                    ...col.sx,
                                }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={row.id || rowIndex}
                                hover
                                onClick={() => onRowClick && onRowClick(row)}
                                sx={{
                                    cursor: onRowClick ? "pointer" : "default",
                                    transition: "background-color 0.2s",
                                    "&:hover": { bgcolor: "#f8fafc" },
                                }}
                            >
                                {columns.map((col, colIndex) => (
                                    <TableCell sx={{ whiteSpace: "nowrap", }} key={colIndex} align={col.align || "left"}>
                                        {col.render
                                            ? col.render(row, rowIndex)
                                            : row[col.accessor] || "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No data found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GlobalTable;
