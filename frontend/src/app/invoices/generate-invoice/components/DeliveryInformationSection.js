"use client";
import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import LocalShipping from "@mui/icons-material/LocalShipping";

const DeliveryInformationSection = ({ formik, lockedFields = {} }) => {
    const { values, setFieldValue, touched, errors } = formik;

    const handleKeyDown = (e, nextFieldName) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextInput = document.querySelector(`[name="${nextFieldName}"]`);
            if (nextInput) nextInput.focus();
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
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
                <LocalShipping sx={{ color: "#fff" }} />
                <Typography color="white" variant="subtitle1" fontWeight={600}>
                    Delivery Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Delivery Address"
                            size="small"
                            name="delivery.deliveryAddress"
                            value={values.delivery.deliveryAddress || ""}
                            onChange={(e) => setFieldValue("delivery.deliveryAddress", e.target.value)}
                            onBlur={() => formik.setFieldTouched("delivery.deliveryAddress", true)}
                            onKeyDown={(e) => handleKeyDown(e, "delivery.contactPerson")}
                            error={touched.delivery?.deliveryAddress && Boolean(errors.delivery?.deliveryAddress)}
                            helperText={touched.delivery?.deliveryAddress && errors.delivery?.deliveryAddress}
                            InputProps={{ readOnly: !!lockedFields.deliveryAddress }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.deliveryAddress ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            size="small"
                            name="delivery.contactPerson"
                            value={values.delivery.contactPerson || ""}
                            onChange={(e) => setFieldValue("delivery.contactPerson", e.target.value)}
                            onBlur={() => formik.setFieldTouched("delivery.contactPerson", true)}
                            onKeyDown={(e) => handleKeyDown(e, "delivery.phone")}
                            error={touched.delivery?.contactPerson && Boolean(errors.delivery?.contactPerson)}
                            helperText={touched.delivery?.contactPerson && errors.delivery?.contactPerson}
                            InputProps={{ readOnly: !!lockedFields.contactPerson }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.contactPerson ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            size="small"
                            name="delivery.phone"
                            value={values.delivery.phone || ""}
                            onChange={(e) => setFieldValue("delivery.phone", e.target.value)}
                            onBlur={() => formik.setFieldTouched("delivery.phone", true)}
                            onKeyDown={(e) => handleKeyDown(e, "items[0].name")}
                            error={touched.delivery?.phone && Boolean(errors.delivery?.phone)}
                            helperText={touched.delivery?.phone && errors.delivery?.phone}
                            InputProps={{ readOnly: !!lockedFields.phone }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.phone ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DeliveryInformationSection;
