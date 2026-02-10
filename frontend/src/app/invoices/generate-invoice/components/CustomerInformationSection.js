"use client";
import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Person from "@mui/icons-material/Person";

const CustomerInformationSection = ({ formik, lockedFields = {} }) => {
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
                <Person sx={{ color: "#fff" }} />
                <Typography color="white" variant="subtitle1" fontWeight={600}>
                    Customer Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Customer Name"
                            size="small"
                            name="customer.companyName"
                            value={values.customer.companyName || ""}
                            onChange={(e) => setFieldValue("customer.companyName", e.target.value)}
                            onBlur={() => formik.setFieldTouched("customer.companyName", true)}
                            onKeyDown={(e) => handleKeyDown(e, "customer.organization")}
                            error={touched.customer?.companyName && Boolean(errors.customer?.companyName)}
                            helperText={touched.customer?.companyName && errors.customer?.companyName}
                            InputProps={{ readOnly: !!lockedFields.companyName }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.companyName ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Organization"
                            size="small"
                            name="customer.organization"
                            value={values.customer.organization || ""}
                            onChange={(e) => setFieldValue("customer.organization", e.target.value)}
                            onBlur={() => formik.setFieldTouched("customer.organization", true)}
                            onKeyDown={(e) => handleKeyDown(e, "customer.address")}
                            error={touched.customer?.organization && Boolean(errors.customer?.organization)}
                            helperText={touched.customer?.organization && errors.customer?.organization}
                            InputProps={{ readOnly: !!lockedFields.organization }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.organization ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            size="small"
                            name="customer.address"
                            value={values.customer.address || ""}
                            onChange={(e) => setFieldValue("customer.address", e.target.value)}
                            onBlur={() => formik.setFieldTouched("customer.address", true)}
                            onKeyDown={(e) => handleKeyDown(e, "customer.contact")}
                            error={touched.customer?.address && Boolean(errors.customer?.address)}
                            helperText={touched.customer?.address && errors.customer?.address}
                            InputProps={{ readOnly: !!lockedFields.address }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.address ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Contact No."
                            size="small"
                            name="customer.contact"
                            value={values.customer.contact || ""}
                            onChange={(e) => setFieldValue("customer.contact", e.target.value)}
                            onBlur={() => formik.setFieldTouched("customer.contact", true)}
                            onKeyDown={(e) => handleKeyDown(e, "customer.drugLicence")}
                            error={touched.customer?.contact && Boolean(errors.customer?.contact)}
                            helperText={touched.customer?.contact && errors.customer?.contact}
                            InputProps={{ readOnly: !!lockedFields.contact }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.contact ? "#f1f5f9" : "white" } }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Drug Licence"
                            size="small"
                            name="customer.drugLicence"
                            value={values.customer.drugLicence || ""}
                            onChange={(e) => setFieldValue("customer.drugLicence", e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "delivery.deliveryAddress")}
                            InputProps={{ readOnly: !!lockedFields.drugLicence }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.drugLicence ? "#f1f5f9" : "white" } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CustomerInformationSection;
