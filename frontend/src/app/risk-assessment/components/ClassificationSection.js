import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { Category } from '@mui/icons-material';

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

const ClassificationSection = ({ formik }) => {
    const classifications = [
        { type: 'Hardware / Component', impact: 'Direct impact on product safety/performance', classification: 'Critical' },
        { type: 'Software / Calibration / Testing', impact: 'Ensures measurement accuracy or compliance', classification: 'Critical' },
        { type: 'Sterilization / Packaging', impact: 'Impacts sterility or integrity', classification: 'Critical' },
        { type: 'Logistic / Admin / Non-Product', impact: 'No direct impact on product', classification: 'Non-Critical' },
    ];

    return (
        <GradientCard title="Classification of Supplied Product/Service" icon={Category}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    The category of the supplier is based on the classification below:
                </Typography>
                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, overflow: 'hidden' }}>
                    <Grid container sx={{ bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <Grid size={{ xs: 4 }} sx={{ p: 1.5, borderRight: '1px solid #e2e8f0' }}>
                            <Typography variant="caption" fontWeight={700}>Product/Service Type</Typography>
                        </Grid>
                        <Grid size={{ xs: 4 }} sx={{ p: 1.5, borderRight: '1px solid #e2e8f0' }}>
                            <Typography variant="caption" fontWeight={700}>Impact on Device</Typography>
                        </Grid>
                        <Grid size={{ xs: 4 }} sx={{ p: 1.5 }}>
                            <Typography variant="caption" fontWeight={700}>Classification</Typography>
                        </Grid>
                    </Grid>
                    {classifications.map((item, idx) => (
                        <Grid container key={idx} sx={{ borderBottom: idx < classifications.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                            <Grid size={{ xs: 4 }} sx={{ p: 1.5, borderRight: '1px solid #e2e8f0' }}>
                                <Typography variant="body2">{item.type}</Typography>
                            </Grid>
                            <Grid size={{ xs: 4 }} sx={{ p: 1.5, borderRight: '1px solid #e2e8f0' }}>
                                <Typography variant="body2">{item.impact}</Typography>
                            </Grid>
                            <Grid size={{ xs: 4 }} sx={{ p: 1.5 }}>
                                <Typography variant="body2" fontWeight={600} color={item.classification === 'Critical' ? 'error.main' : 'success.main'}>
                                    {item.classification}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            </Box>

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
        </GradientCard>
    );
};

export default ClassificationSection;
