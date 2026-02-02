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
import { Inventory } from "@mui/icons-material";

export default function ProductDetailsCard({ formData = {}, onChange }) {
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
                <Inventory />
                <Typography color="white" variant="h6" fontWeight={600}>
                    Product Details
                </Typography>
            </Box>
            <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
                <Grid container spacing={3}>
                    {[
                        { label: "Product Name", name: "productName", md: 4 },
                        { label: "Manufacturing Date", name: "mfgDate", type: "date", md: 4 },
                        { label: "Validity Period", name: "validity", md: 4 },
                        { label: "Description", name: "desc", md: 12, multiline: true, rows: 3 },
                    ].map((field) => (
                        <Grid size={{ xs: 12, sm: field.md === 12 ? 12 : 6, md: field.md }} key={field.name}>
                            <TextField
                                fullWidth
                                size="small"
                                label={field.label}
                                type={field.type || "text"}
                                multiline={field.multiline || false}
                                rows={field.rows || 1}
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
