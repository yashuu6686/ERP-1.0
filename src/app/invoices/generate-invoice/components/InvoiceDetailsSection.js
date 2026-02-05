"use client";
import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Receipt from "@mui/icons-material/Receipt";

const InvoiceDetailsSection = ({ formik, orders = [], selectedOrderId, onOrderChange }) => {
    const { values, setFieldValue, touched, errors } = formik;

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
                    padding: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Receipt sx={{ color: "#fff" }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Invoice Details
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            select
                            fullWidth
                            label="Order Number"
                            variant="outlined"
                            size="small"
                            value={selectedOrderId || ""}
                            onChange={(e) => onOrderChange?.(e.target.value)}
                            onBlur={() => formik.setFieldTouched("invoiceInfo.orderNo", true)}
                            error={touched.invoiceInfo?.orderNo && Boolean(errors.invoiceInfo?.orderNo)}
                            helperText={touched.invoiceInfo?.orderNo && errors.invoiceInfo?.orderNo}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                            required
                        >
                            {orders.map((order) => (
                                <MenuItem key={order.id} value={order.id}>
                                    {order.orderNo}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Invoice No."
                            variant="outlined"
                            size="small"
                            placeholder="Auto-generated"
                            value={values.invoiceInfo.invoiceNumber || ""}
                            onChange={(e) => setFieldValue("invoiceInfo.invoiceNumber", e.target.value)}
                            onBlur={() => formik.setFieldTouched("invoiceInfo.invoiceNumber", true)}
                            error={touched.invoiceInfo?.invoiceNumber && Boolean(errors.invoiceInfo?.invoiceNumber)}
                            helperText={touched.invoiceInfo?.invoiceNumber && errors.invoiceInfo?.invoiceNumber}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "white",
                                },
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Invoice Date"
                            type="date"
                            variant="outlined"
                            size="small"
                            value={values.invoiceInfo.invoiceDate || ""}
                            onChange={(e) => setFieldValue("invoiceInfo.invoiceDate", e.target.value)}
                            onBlur={() => formik.setFieldTouched("invoiceInfo.invoiceDate", true)}
                            error={touched.invoiceInfo?.invoiceDate && Boolean(errors.invoiceInfo?.invoiceDate)}
                            helperText={touched.invoiceInfo?.invoiceDate && errors.invoiceInfo?.invoiceDate}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Due Date"
                            type="date"
                            variant="outlined"
                            size="small"
                            value={values.invoiceInfo.dueDate || ""}
                            onChange={(e) => setFieldValue("invoiceInfo.dueDate", e.target.value)}
                            onBlur={() => formik.setFieldTouched("invoiceInfo.dueDate", true)}
                            error={touched.invoiceInfo?.dueDate && Boolean(errors.invoiceInfo?.dueDate)}
                            helperText={touched.invoiceInfo?.dueDate && errors.invoiceInfo?.dueDate}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InvoiceDetailsSection;
