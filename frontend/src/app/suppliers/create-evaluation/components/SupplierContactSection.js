import React from "react";
import { Card, CardContent, Box, Typography, Grid, TextField } from "@mui/material";
import { Business } from "@mui/icons-material";

export default function SupplierContactSection({ formik }) {
    const { values, handleChange, handleBlur, touched, errors } = formik;

    const handleKeyPress = (e, nextFieldId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextField = document.getElementById(nextFieldId);
            if (nextField) {
                nextField.focus();
            }
        }
    };

    return (
        <Card elevation={0} sx={{ mb: 4, borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Business sx={{ color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Supplier Contact Information
                </Typography>
            </Box>

            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Supplier / Distributor Name"
                            name="supplierName"
                            id="supplierName"
                            size="small"
                            value={values.supplierName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "address")}
                            error={touched.supplierName && Boolean(errors.supplierName)}
                            helperText={touched.supplierName && errors.supplierName}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            id="address"
                            size="small"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "city")}
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            id="city"
                            size="small"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "state")}
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            id="state"
                            size="small"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "zipCode")}
                            error={touched.state && Boolean(errors.state)}
                            helperText={touched.state && errors.state}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Zip Code"
                            name="zipCode"
                            id="zipCode"
                            size="small"
                            value={values.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "contactPerson")}
                            error={touched.zipCode && Boolean(errors.zipCode)}
                            helperText={touched.zipCode && errors.zipCode}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            name="contactPerson"
                            id="contactPerson"
                            size="small"
                            value={values.contactPerson}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "title")}
                            error={touched.contactPerson && Boolean(errors.contactPerson)}
                            helperText={touched.contactPerson && errors.contactPerson}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            id="title"
                            size="small"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "phone")}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            id="phone"
                            size="small"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
