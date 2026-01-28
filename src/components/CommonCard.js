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
}) => {
    return (
        <Box sx={{}}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: "12px",
                    // border: "1px solid #e0e0e0",
                    backgroundColor: "#fff",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 3px",
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        backgroundColor: "rgb(238, 238, 238)",
                        p: 1.5,
                        borderRadius: "8px",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 500, }}
                    >
                        {title}
                    </Typography>
                    {onAdd && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={onAdd}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                // borderRadius: "8px",

                            }}
                        >
                            {addText || "Add New"}
                        </Button>
                    )}
                </Box>

                {/* Search Section */}
                {(searchValue !== undefined || onSearchChange) && (
                    <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={onSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: "#9ca3af" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: "50px",
                                    backgroundColor: "#fff",
                                    "& fieldset": {
                                        borderColor: "#d1d5db",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#1172ba",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#1172ba",
                                        borderWidth: "1px",
                                    },
                                },
                            }}
                            sx={{ flex: 1 }}
                        />
                        {searchExtra}
                    </Box>
                )}

                {/* Content Section */}
                <Box sx={{ minHeight: "300px" }}>{children}</Box>


            </Paper>
        </Box>
    );
};

export default CommonCard;
