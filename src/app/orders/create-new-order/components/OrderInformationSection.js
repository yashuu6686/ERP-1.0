import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Assignment from "@mui/icons-material/Assignment";

const OrderInformationSection = ({ formik }) => {
    const { values, handleChange, handleBlur, touched, errors } = formik;

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
                        { label: "Order Number", name: "orderNo", placeholder: "ORD-2024-001", required: true },
                        { label: "Customer Name", name: "customerName", placeholder: "Enter customer name", required: true },
                        { label: "Order Date", name: "orderDate", type: "date", required: true },
                        { label: "Contact Number", name: "contact", placeholder: "Enter contact number", required: true },
                        {
                            label: "Customer Address",
                            name: "address",
                            placeholder: "Enter address",
                            fullWidth: true,
                            required: true,
                        },
                        { label: "Delivery Date", name: "deliveryDate", type: "date", required: true },
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
                                value={values[field.name] || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const fields = [
                                            "orderNo",
                                            "customerName",
                                            "orderDate",
                                            "contact",
                                            "address",
                                            "deliveryDate",
                                        ];
                                        const currentIndex = fields.indexOf(field.name);
                                        if (currentIndex < fields.length - 1) {
                                            const nextField = fields[currentIndex + 1];
                                            const nextInput = document.querySelector(`[name="${nextField}"]`);
                                            if (nextInput) nextInput.focus();
                                        } else {
                                            // Try to focus first single product name if available, otherwise Add Product button
                                            let nextInput = document.querySelector(`[name="singleProducts[0].name"]`);
                                            if (!nextInput) {
                                                nextInput = document.getElementById('add-product-btn');
                                            }
                                            if (nextInput) nextInput.focus();
                                        }
                                    }
                                }}
                                error={touched[field.name] && Boolean(errors[field.name])}
                                helperText={touched[field.name] && errors[field.name]}
                                placeholder={field.placeholder}
                                type={field.type || "text"}
                                variant="outlined"
                                size="small"
                                required={field.required}
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
