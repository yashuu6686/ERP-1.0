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
                border: "1px solid var(--border-default)",
                borderRadius: "var(--card-radius)",
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
                    background: "var(--bg-page)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--border-strong)",
                    borderRadius: "10px",
                    border: "2px solid var(--bg-page)",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "var(--text-muted)",
                },
            }}
        >
            <Table size="small">
                <TableHead sx={{ bgcolor: "var(--bg-page)" }}>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableCell
                                key={index}
                                align={col.align || "left"}
                                sx={{
                                    fontWeight: 700,
                                    color: "var(--text-secondary)",
                                    py: 2,
                                    whiteSpace: "nowrap",
                                    fontSize: "var(--size-caption)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.02em",
                                    fontFamily: "var(--font-manrope)",
                                    borderBottom: "1px solid var(--border-default)",
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
                                    "&:hover": { bgcolor: "var(--brand-soft) !important" },
                                }}
                            >
                                {columns.map((col, colIndex) => (
                                    <TableCell
                                        sx={{
                                            whiteSpace: "nowrap",
                                            fontSize: "var(--size-body)",
                                            color: "var(--text-primary)",
                                            fontFamily: "var(--font-manrope)",
                                            py: 2,
                                            borderBottom: "1px solid var(--border-default)",
                                        }}
                                        key={colIndex}
                                        align={col.align || "left"}
                                    >
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
                                <Typography sx={{ fontSize: "var(--size-body)", color: "var(--text-muted)", fontFamily: "var(--font-manrope)" }}>
                                    No records found in this view.
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
