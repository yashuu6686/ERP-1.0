"use client";

import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, Box } from '@mui/material';
import { Assignment, Badge, CalendarMonth } from '@mui/icons-material';

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

const SummarySection = ({ formik }) => {
    return (
        <GradientCard title="Summary of Evaluation" icon={Assignment}>
            <Grid container spacing={4}>
                {/* Completion Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Completed By"
                        name="completedBy"
                        value={formik.values.completedBy}
                        onChange={formik.handleChange}
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: <Badge sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                    <TextField
                        fullWidth
                        type="date"
                        label="Completion Date"
                        name="completedDate"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.completedDate}
                        onChange={formik.handleChange}
                        InputProps={{
                            startAdornment: <CalendarMonth sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>

                {/* Approval Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Approved By"
                        name="approvedBy"
                        value={formik.values.approvedBy}
                        onChange={formik.handleChange}
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: <Badge sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                    <TextField
                        fullWidth
                        type="date"
                        label="Approval Date"
                        name="approvedDate"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.approvedDate}
                        onChange={formik.handleChange}
                        InputProps={{
                            startAdornment: <CalendarMonth sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
            </Grid>
        </GradientCard>
    );
};

export default SummarySection;
