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
} from "@mui/material";
import { FactCheck, Person, CalendarToday } from "@mui/icons-material";

export default function AuthorizationCard() {
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "white",
            "&:hover": {
                "& > fieldset": { borderColor: "#1172ba" },
            },
        },
    };

    return (
        <Card
            sx={{
                mb: 4,
                border: "1px solid #e9ecef",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <FactCheck />
                <Typography color="white" variant="h6" fontWeight={600}>
                    Authorization
                </Typography>
            </Box>
            <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Analysed By"
                            placeholder="Enter Name"
                            sx={textFieldStyle}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: "#1172ba", fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Approved By"
                            placeholder="Enter Name"
                            sx={textFieldStyle}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FactCheck sx={{ color: "#1172ba", fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Analysed Date"
                            type="date"
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Approved Date"
                            type="date"
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
                </Grid>
            </CardContent>
        </Card>
    );
}
