"use client";

import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Grid, Box, TextField, FormGroup } from '@mui/material';
import { FactCheck } from '@mui/icons-material';

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

const RoutineControlsSection = ({ formik }) => {
    const controls = [
        { label: "Purchase Orders", value: "purchaseOrders" },
        { label: "Part/Service Specifications", value: "specifications" },
        { label: "Incoming Inspections", value: "incomingInspections" },
        { label: "Report/document review and/or approval", value: "reportReview" },
        { label: "Agreement/Contract", value: "contract" },
    ];

    const handleToggle = (value) => {
        const current = [...formik.values.routineControls];
        const idx = current.indexOf(value);
        if (idx === -1) current.push(value);
        else current.splice(idx, 1);
        formik.setFieldValue("routineControls", current);
    };

    return (
        <GradientCard title="Routine Controls (Check all that apply)" icon={FactCheck}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <FormGroup row>
                        {controls.map((item) => (
                            <FormControlLabel
                                key={item.value}
                                sx={{ width: { xs: '100%', sm: '50%', md: '33%' }, mb: 1 }}
                                control={
                                    <Checkbox
                                        checked={formik.values.routineControls.includes(item.value)}
                                        onChange={() => handleToggle(item.value)}
                                    />
                                }
                                label={item.label}
                            />
                        ))}
                    </FormGroup>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Other Routine Controls"
                        name="otherControls"
                        value={formik.values.otherControls}
                        onChange={formik.handleChange}
                    />
                </Grid>
            </Grid>
        </GradientCard>
    );
};

export default RoutineControlsSection;
