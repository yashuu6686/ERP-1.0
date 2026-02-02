import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Assignment from "@mui/icons-material/Assignment";

const OrderInformationSection = ({ formData, handleChange }) => {
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
                        { label: "Order Number", name: "orderNo", placeholder: "ORD-2024-001" },
                        { label: "Customer Name", name: "customerName", placeholder: "Enter customer name" },
                        { label: "Order Date", name: "orderDate", type: "date" },
                        { label: "Contact Number", name: "contact", placeholder: "Enter contact number" },
                        {
                            label: "Customer Address",
                            name: "address",
                            placeholder: "Enter address",
                            fullWidth: true,
                        },
                        { label: "Delivery Date", name: "deliveryDate", type: "date" },
                        { label: "Order Status", name: "status", placeholder: "Pending" },
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
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
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
