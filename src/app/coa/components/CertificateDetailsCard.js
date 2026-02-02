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

export default function CertificateDetailsCard({ formData = {}, onChange }) {
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
                        { label: "Certificate No.", name: "coaNumber" },
                        { label: "Product Name", name: "productName" },
                        { label: "Issue Date", name: "issueDate", type: "date" },
                        { label: "Expiry Date", name: "expiryDate", type: "date" },
                        { label: "Batch/Lot No.", name: "batchNo" },
                        { label: "Manufacturing Date", name: "manufacturingDate", type: "date" },
                        { label: "Quantity", name: "quantity", type: "number" },
                    ].map((field) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
                            <TextField
                                fullWidth
                                size="small"
                                label={field.label}
                                type={field.type || "text"}
                                value={formData[field.name] || ""}
                                onChange={(e) => onChange?.(field.name, e.target.value)}
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
