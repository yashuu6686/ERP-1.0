"use client";

import React from 'react';
import { Box, Card, CardContent, Grid, Typography, MenuItem, TextField, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import { FactCheck, Stars } from '@mui/icons-material';

const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2, mb: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
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
            {Icon && <Icon sx={{ fontSize: 20 }} />}
            <Typography variant="h6" fontWeight={700} fontSize="1.1rem" color={"white"}>
                {title}
            </Typography>
        </Box>
        <CardContent sx={{ p: 4 }}>
            {children}
        </CardContent>
    </Card>
);

const RatingItem = ({ label, name, formik }) => (
    <Box sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={700} sx={{ mb: 1.5, color: '#334155', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Stars sx={{ fontSize: 18, color: '#1172ba' }} /> {label}
        </Typography>
        <TextField
            fullWidth
            select
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            size="small"
        >
            <MenuItem value="Unsatisfactory">Unsatisfactory</MenuItem>
            <MenuItem value="Marginal">Marginal</MenuItem>
            <MenuItem value="Acceptable">Acceptable</MenuItem>
            <MenuItem value="Excellent">Excellent</MenuItem>
        </TextField>
    </Box>
);

const PerformanceEvaluationsSection = ({ formik }) => {
    return (
        <GradientCard title="Ongoing Performance Evaluation" icon={FactCheck}>
            <Grid container spacing={5}>
                {/* Qualification Details */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" fontWeight={800} color="primary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Certifications & Qualifications
                    </Typography>
                    <Box sx={{ p: 3, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <Typography variant="body2" sx={{ mb: 2, color: '#64748b', fontStyle: 'italic' }}>
                            Verification of ISO Certificates, registration certificates, and training records.
                        </Typography>
                        <Grid container spacing={3} alignItems="flex-start">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>Qualification check documents status?</Typography>
                                <RadioGroup
                                    row
                                    name="certificationStatus"
                                    value={formik.values.certificationStatus}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                                </RadioGroup>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Certification Details & Expiry Dates"
                                    name="certificationDetails"
                                    value={formik.values.certificationDetails}
                                    onChange={formik.handleChange}
                                    placeholder="Enter certificate numbers and validity..."
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Divider sx={{ mb: 1 }} />
                </Grid>

                {/* Performance Ratings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <RatingItem label="Meet Specified Design/Service Requirements" name="meetRequirements" formik={formik} />
                    <RatingItem label="Responsiveness/Management Capabilities" name="responsiveness" formik={formik} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <RatingItem label="Quality of goods/Services delivered" name="quality" formik={formik} />
                    <RatingItem label="On Time Delivery of goods/services" name="onTimeDelivery" formik={formik} />
                    <RatingItem label="Cost of goods/services delivered" name="cost" formik={formik} />
                </Grid>
            </Grid>
        </GradientCard>
    );
};

export default PerformanceEvaluationsSection;
