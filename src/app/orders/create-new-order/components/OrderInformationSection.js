import React from "react";
import { Card, Box, Typography, CardContent, Grid, TextField } from "@mui/material";
import { Assignment } from "@mui/icons-material";

const OrderInformationSection = () => {
    return (
        <Card
            elevation={0}
            sx={{
                mb: 4,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Assignment sx={{ color: "#fff" }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Order Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    {[
                        { label: "Order Number", placeholder: "ORD-2024-001" },
                        { label: "Customer Name", placeholder: "Enter customer name" },
                        { label: "Order Date", type: "date" },
                        { label: "Contact Number", placeholder: "Enter contact number" },
                        {
                            label: "Customer Address",
                            placeholder: "Enter address",
                            fullWidth: true,
                        },
                        { label: "Delivery Date", type: "date" },
                        { label: "Order Status", placeholder: "Pending" },
                    ].map((field, i) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={field.fullWidth ? 6 : 3}
                            size={{ xs: 12, sm: 6, md: field.fullWidth ? 6 : 3 }}
                            key={i}
                        >
                            <TextField
                                fullWidth
                                label={field.label}
                                placeholder={field.placeholder}
                                type={field.type || "text"}
                                variant="outlined"
                                size="small"
                                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        bgcolor: "white",
                                        "&:hover fieldset": { borderColor: "#1172ba" },
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderInformationSection;
