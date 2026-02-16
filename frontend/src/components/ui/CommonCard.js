"use client";
import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    InputAdornment,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";

const CommonCard = ({
    title,
    addText,
    onAdd,
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    children,
    searchExtra,
    action, // Custom action component (e.g., extra buttons)
}) => {
    return (
        <Box sx={{ mb: "var(--space-lg)" }}>
            <Paper
                elevation={0}
                sx={{
                    p: "var(--space-sm)",
                    borderRadius: "var(--card-radius)",
                    border: "1px solid var(--border-default)",
                    backgroundColor: "var(--bg-surface)",
                    boxShadow: "var(--card-shadow)",
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: "var(--space-lg)",
                        backgroundColor: "var(--bg-page)",
                        p: "8px 16px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-default)",
                    }}
                >
                    <Typography
                        component="div"
                        sx={{
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            fontSize: "var(--size-subtitle)",
                            fontFamily: "var(--font-manrope)"
                        }}
                    >
                        <Box sx={{ width: 4, height: 20, bgcolor: "var(--brand-primary)", borderRadius: 1 }} />
                        {title}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {action}
                        {onAdd && (
                            <Button
                                variant="contained"
                                startIcon={<Add sx={{ fontSize: 20 }} />}
                                onClick={onAdd}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: "var(--btn-radius)",
                                    bgcolor: "var(--brand-primary)",
                                    color: "#ffffff",
                                    px: 3,
                                    py: 1,
                                    fontSize: 'var(--size-body)',
                                    boxShadow: "none",
                                    transition: "all 0.2s",
                                    fontFamily: "var(--font-manrope)",
                                }}
                            >
                                {addText || "Add New"}
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Search Section */}
                {(searchValue !== undefined || onSearchChange) && (
                    <Box sx={{ mb: "var(--space-lg)", display: "flex", gap: 2, alignItems: "center" }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={onSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: "var(--input-radius)",
                                    backgroundColor: "var(--bg-surface)",
                                    height: "var(--btn-height)",
                                    fontSize: "var(--size-body)",
                                    fontFamily: "var(--font-manrope)",
                                    "& fieldset": {
                                        borderColor: "var(--border-strong)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "var(--brand-primary)",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "var(--brand-primary)",
                                        borderWidth: "1.5px",
                                    },
                                },
                            }}
                            sx={{ flex: 1 }}
                        />
                        {searchExtra}
                    </Box>
                )}

                {/* Content Section */}
                <Box sx={{}}>{children}</Box>
            </Paper>
        </Box>
    );
};

export default CommonCard;
