"use client";

import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Box, TextField, Stack } from '@mui/material';
import { AssignmentTurnedIn } from '@mui/icons-material';

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

const RequiredActionsSection = ({ formik }) => {
    const actions = [
        { label: "Add to Approved Supplier List (ASL)", value: "AddToASL" },
        { label: "Remove from ASL", value: "RemoveFromASL" },
    ];

    const handleToggle = (value) => {
        const current = [...formik.values.requiredActions];
        const idx = current.indexOf(value);
        if (idx === -1) current.push(value);
        else current.splice(idx, 1);
        formik.setFieldValue("requiredActions", current);
    };

    return (
        <GradientCard title="Required Actions (Check all that apply)" icon={AssignmentTurnedIn}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ mb: 3 }}>
                {actions.map((item) => (
                    <FormControlLabel
                        key={item.value}
                        control={
                            <Checkbox
                                checked={formik.values.requiredActions.includes(item.value)}
                                onChange={() => handleToggle(item.value)}
                            />
                        }
                        label={<Typography variant="body2" fontWeight={700}>{item.label}</Typography>}
                    />
                ))}
            </Stack>
            <TextField
                fullWidth
                label="Other Required Actions"
                name="otherAction"
                value={formik.values.otherAction}
                onChange={formik.handleChange}
            />
        </GradientCard>
    );
};

export default RequiredActionsSection;
