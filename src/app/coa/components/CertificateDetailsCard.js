"use client";
import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
} from "@mui/material";
import { Description } from "@mui/icons-material";

export default function CertificateDetailsCard() {
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
                <Description />
                <Typography color="white" variant="h6" fontWeight={600}>
                    Certificate Details
                </Typography>
            </Box>
            <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
                <Grid container spacing={3}>
                    {[
                        { label: "Certificate No.", name: "certNo" },
                        { label: "Customer Name", name: "customer" },
                        { label: "Order Date", name: "date", type: "date" },
                        { label: "Delivery Address", name: "address" },
                        { label: "Scanbo's Address", name: "scanboAddress" },
                        { label: "Order No.", name: "orderNo" },
                        { label: "Scanbo's Email", name: "email", type: "email" },
                        { label: "Model No.", name: "model" },
                        { label: "Device Serial No.", name: "serial" },
                        { label: "Quantity", name: "qty", type: "number" },
                        { label: "Batch/Lot No.", name: "batch" },
                    ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                            <TextField
                                fullWidth
                                size="small"
                                label={field.label}
                                type={field.type || "text"}
                                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                                variant="outlined"
                                sx={textFieldStyle}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
