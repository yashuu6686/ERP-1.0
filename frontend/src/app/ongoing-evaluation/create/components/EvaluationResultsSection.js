"use client";

import React from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { Assessment } from '@mui/icons-material';

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

const EvaluationResultsSection = ({ formik }) => {
    return (
        <GradientCard title="Evaluation Results" icon={Assessment}>
            <RadioGroup
                name="evaluationResult"
                value={formik.values.evaluationResult}
                onChange={formik.handleChange}
            >
                <FormControlLabel
                    value="Approved without conditions"
                    control={<Radio />}
                    label={<Typography variant="body1" fontWeight={600}>Approved without conditions</Typography>}
                    sx={{ mb: 1 }}
                />
                <FormControlLabel
                    value="Approved conditionally"
                    control={<Radio />}
                    label={<Typography variant="body1" fontWeight={600}>Approved conditionally</Typography>}
                    sx={{ mb: 1 }}
                />
                <FormControlLabel
                    value="Not approved"
                    control={<Radio />}
                    label={<Typography variant="body1" fontWeight={600} color="#ef4444">Not approved</Typography>}
                />
            </RadioGroup>
        </GradientCard>
    );
};

export default EvaluationResultsSection;
