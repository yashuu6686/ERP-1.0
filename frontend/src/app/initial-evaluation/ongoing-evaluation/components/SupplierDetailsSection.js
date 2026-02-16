import React from 'react';
import { Box, Card, CardContent, Grid, TextField, MenuItem, Typography } from '@mui/material';
import { Business, Person, Phone, Email, CalendarMonth, Badge } from '@mui/icons-material';

const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2, mb: 3 }}>
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
            {Icon && <Icon />}
            <Typography variant="h6" fontWeight={600} color={"white"}>
                {title}
            </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
            {children}
        </CardContent>
    </Card>
);

const SupplierDetailsSection = ({ formik }) => {
    return (
        <GradientCard title="Supplier Details" icon={Business}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        name="supplierName"
                        label="Name of the Supplier"
                        value={formik.values.supplierName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.supplierName && Boolean(formik.errors.supplierName)}
                        helperText={formik.touched.supplierName && formik.errors.supplierName}
                        InputProps={{
                            startAdornment: <Business sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        name="contactPerson"
                        label="Contact Person"
                        value={formik.values.contactPerson}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                        helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                        InputProps={{
                            startAdornment: <Person sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        InputProps={{
                            startAdornment: <Phone sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            startAdornment: <Email sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        select
                        name="supplierClassification"
                        label="Supplier Classification"
                        value={formik.values.supplierClassification}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.supplierClassification && Boolean(formik.errors.supplierClassification)}
                        helperText={formik.touched.supplierClassification && formik.errors.supplierClassification}
                    >
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="Non-Critical">Non-Critical</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        name="evaluationPeriod"
                        label="Evaluation Period"
                        placeholder="e.g., Jan 2023 - Dec 2023"
                        value={formik.values.evaluationPeriod}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.evaluationPeriod && Boolean(formik.errors.evaluationPeriod)}
                        helperText={formik.touched.evaluationPeriod && formik.errors.evaluationPeriod}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        name="evaluatedBy"
                        label="Evaluated By"
                        value={formik.values.evaluatedBy}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.evaluatedBy && Boolean(formik.errors.evaluatedBy)}
                        helperText={formik.touched.evaluatedBy && formik.errors.evaluatedBy}
                        InputProps={{
                            startAdornment: <Badge sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        type="date"
                        name="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        InputProps={{
                            startAdornment: <CalendarMonth sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
            </Grid>
        </GradientCard>
    );
};

export default SupplierDetailsSection;
