"use client";
import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Tooltip,
    IconButton,
    Fade,
} from "@mui/material";
import { Devices, HelpOutline, CalendarToday } from "@mui/icons-material";

export default function DeviceInfoStep({ formData, handleInputChange }) {
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            transition: "all 0.3s ease",
            "&:hover": {
                "& > fieldset": { borderColor: "#1172ba" },
            },
            "&.Mui-focused fieldset": {
                borderColor: "#1172ba",
                borderWidth: "2px",
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#1172ba",
        }
    };

    const cardHeaderStyle = {
        background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
        color: "white",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
    };

    const glassStyle = {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    };

    return (
        <Fade in={true} timeout={500}>
            <Card sx={{ mb: 4, borderRadius: 3, ...glassStyle }}>
                <Box sx={cardHeaderStyle}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Devices />
                        <Typography variant="h6" fontWeight={700}>Device Information</Typography>
                    </Box>
                    <Tooltip title="Enter basic device and company details">
                        <IconButton size="small" sx={{ color: "white" }}><HelpOutline /></IconButton>
                    </Tooltip>
                </Box>
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Device ID"
                                placeholder="e.g. SN-8821"
                                value={formData.deviceId}
                                onChange={(e) => handleInputChange("deviceId", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange("date", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldStyle}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarToday sx={{ color: "#1172ba", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange("companyName", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField
                                fullWidth
                                label="Company Address"
                                value={formData.companyAddress}
                                onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <TextField
                                fullWidth
                                label="Assisted By"
                                value={formData.assistedBy}
                                onChange={(e) => handleInputChange("assistedBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <TextField
                                fullWidth
                                label="Done By"
                                value={formData.doneBy}
                                onChange={(e) => handleInputChange("doneBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    );
}
