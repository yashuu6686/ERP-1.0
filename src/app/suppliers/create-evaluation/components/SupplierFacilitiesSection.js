import React from "react";
import { Card, CardContent, Box, Typography, Grid, TextField } from "@mui/material";
import { Factory } from "@mui/icons-material";

export default function SupplierFacilitiesSection({ formik }) {
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
                <Factory sx={{ color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Supplier Facilities
                </Typography>
            </Box>

            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Year Established"
                            name="yearEstablished"
                            id="yearEstablished"
                            size="small"
                            value={values.yearEstablished}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "totalSquareFootage")}
                            error={touched.yearEstablished && Boolean(errors.yearEstablished)}
                            helperText={touched.yearEstablished && errors.yearEstablished}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Total Square Footage"
                            name="totalSquareFootage"
                            id="totalSquareFootage"
                            size="small"
                            value={values.totalSquareFootage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "numberOfEmployees")}
                            error={touched.totalSquareFootage && Boolean(errors.totalSquareFootage)}
                            helperText={touched.totalSquareFootage && errors.totalSquareFootage}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Number of Employees"
                            name="numberOfEmployees"
                            id="numberOfEmployees"
                            type="number"
                            size="small"
                            value={values.numberOfEmployees}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "qaTitle")}
                            error={touched.numberOfEmployees && Boolean(errors.numberOfEmployees)}
                            helperText={touched.numberOfEmployees && errors.numberOfEmployees}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="QA Management Representative Title"
                            name="qaTitle"
                            id="qaTitle"
                            size="small"
                            value={values.qaTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "numberOfQAEmployees")}
                            error={touched.qaTitle && Boolean(errors.qaTitle)}
                            helperText={touched.qaTitle && errors.qaTitle}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Number of QA/Inspection Employees"
                            name="numberOfQAEmployees"
                            id="numberOfQAEmployees"
                            type="number"
                            size="small"
                            value={values.numberOfQAEmployees}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e) => handleKeyPress(e, "productServices")}
                            error={touched.numberOfQAEmployees && Boolean(errors.numberOfQAEmployees)}
                            helperText={touched.numberOfQAEmployees && errors.numberOfQAEmployees}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Type of Product/Services Provided to SCANBO"
                            name="productServices"
                            id="productServices"
                            size="small"
                            multiline
                            rows={3}
                            value={values.productServices}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.productServices && Boolean(errors.productServices)}
                            helperText={touched.productServices && errors.productServices}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
