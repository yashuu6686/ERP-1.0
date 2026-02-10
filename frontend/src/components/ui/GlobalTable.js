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
    IconButton,
    Select,
    MenuItem,
} from "@mui/material";
import {
    NavigateBefore,
    NavigateNext,
} from "@mui/icons-material";

const GlobalTable = ({
    columns,
    data,
    onRowClick,
    page = 0,
    rowsPerPage = 10,
    totalCount = 0,
    onPageChange,
    onRowsPerPageChange,
    loading = false
}) => {
    const totalPages = Math.ceil(totalCount / rowsPerPage);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <Box sx={{ position: "relative" }}>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    overflowX: "auto",
                    width: "100%",
                    maxWidth: "100%",
                    display: "block",
                    mb: 2,
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
                    opacity: loading ? 0.6 : 1,
                    pointerEvents: loading ? "none" : "auto",
                    transition: "opacity 0.2s"
                }}
            >
                {loading && (
                    <Box sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                        bgcolor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "var(--card-radius)"
                    }}>
                        <Box className="loader-inner" sx={{
                            width: 40,
                            height: 40,
                            border: "3px solid var(--brand-soft)",
                            borderTop: "3px solid var(--brand-primary)",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }} />
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </Box>
                )}
                <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead sx={{
                        //  bgcolor: "var(--bg-page)"
                    }}>
                        <TableRow>
                            {columns.map((col, index) => (
                                <TableCell
                                    key={index}
                                    align={col.align || "left"}
                                    sx={{
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        py: 0,
                                        fontSize: "var(--size-caption)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.02em",
                                        fontFamily: "var(--font-manrope)",
                                        borderBottom: "1px solid var(--border-default)",
                                        width: col.width || "auto",
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
                                            key={colIndex}
                                            align={col.align || "left"}
                                            sx={{
                                                py: 2,
                                                borderBottom: "1px solid var(--border-default)",
                                                width: col.width || "auto",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: "var(--size-body)",
                                                    color: "var(--text-primary)",
                                                    fontFamily: "var(--font-manrope)",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: col.width || "200px",
                                                }}
                                                title={typeof (col.render ? col.render(row, rowIndex) : row[col.accessor]) === 'string' ? (col.render ? col.render(row, rowIndex) : row[col.accessor]) : ""}
                                            >
                                                {col.render
                                                    ? col.render(row, rowIndex)
                                                    : row[col.accessor] || "-"}
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            !loading && (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                        <Typography sx={{ fontSize: "var(--size-body)", color: "var(--text-muted)", fontFamily: "var(--font-manrope)" }}>
                                            No records found in this view.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Implementation */}
            {totalCount > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        fontFamily: "var(--font-manrope)",
                    }}
                >
                    {/* Left: Rows per page and Count */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "14px", color: "var(--text-muted)" }}>
                                Rows per page:
                            </Typography>
                            <Select
                                value={rowsPerPage}
                                onChange={(e) => onRowsPerPageChange && onRowsPerPageChange(e.target.value)}
                                variant="standard"
                                disableUnderline
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "var(--text-muted)",
                                    "& .MuiSelect-select": { py: 0 },
                                }}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </Box>

                        <Typography sx={{ fontSize: "14px", color: "var(--text-muted)" }}>
                            {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, totalCount)} of ${totalCount}`}
                        </Typography>
                    </Box>

                    {/* Right: Numeric Pagination */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            disabled={page === 0}
                            onClick={() => onPageChange && onPageChange(page - 1)}
                            size="small"
                            sx={{ color: "var(--text-muted)" }}
                        >
                            <NavigateBefore fontSize="small" />
                        </IconButton>

                        {getPageNumbers().map((p) => (
                            <Box
                                key={p}
                                onClick={() => onPageChange && onPageChange(p)}
                                sx={{
                                    minWidth: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    bgcolor: p === page ? "var(--brand-primary)" : "transparent",
                                    color: p === page ? "#ffffff" : "var(--text-secondary)",
                                    "&:hover": {
                                        bgcolor: p === page ? "var(--brand-primary)" : "var(--brand-soft)",
                                    },
                                }}
                            >
                                {p + 1}
                            </Box>
                        ))}

                        <IconButton
                            disabled={page >= totalPages - 1}
                            onClick={() => onPageChange && onPageChange(page + 1)}
                            size="small"
                            sx={{ color: "var(--text-muted)" }}
                        >
                            <NavigateNext fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default GlobalTable;
