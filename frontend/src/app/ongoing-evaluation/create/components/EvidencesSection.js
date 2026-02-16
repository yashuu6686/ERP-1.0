"use client";

import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Grid, Box, TextField, Stack } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

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

const EvidencesSection = ({ formik }) => {
    const handleToggle = (value) => {
        const current = [...formik.values.evidences];
        const idx = current.indexOf(value);
        if (idx === -1) current.push(value);
        else current.splice(idx, 1);
        formik.setFieldValue("evidences", current);
    };

    return (
        <GradientCard title="Evidence & Verification" icon={FolderOpen}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Stack spacing={1}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.evidences.includes("registrationCertificate")}
                                    onChange={() => handleToggle("registrationCertificate")}
                                />
                            }
                            label="Current quality system registration certificate / Qualification Certificate"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.evidences.includes("qualityInspections")}
                                    onChange={() => handleToggle("qualityInspections")}
                                />
                            }
                            label="Perform quality Inspections at least once every 6 months (if applicable)"
                        />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Other Evidences"
                        name="otherEvidence"
                        value={formik.values.otherEvidence}
                        onChange={formik.handleChange}
                        placeholder="Specify other documents reviewed..."
                    />
                </Grid>
            </Grid>
        </GradientCard>
    );
};

export default EvidencesSection;
