"use client";

import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, TextField, MenuItem, Typography, Autocomplete, CircularProgress } from '@mui/material';
import { Business, Person, Phone, Email, CalendarMonth, Badge, Category } from '@mui/icons-material';
import axiosInstance from '@/axios/axiosInstance';

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

const SupplierDetailsSection = ({ formik }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchApprovedSuppliers();
    }, []);

    const fetchApprovedSuppliers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/evaluation");
            // Filter only approved ones as this is for "Ongoing" evaluation
            const approved = (response.data || []).filter(item => item.supplierApproved === "yes");
            setSuppliers(approved);
        } catch (error) {
            console.error("Error fetching approved suppliers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSupplierChange = (event, newValue) => {
        if (newValue) {
            formik.setFieldValue("supplierId", newValue.id || "");
            formik.setFieldValue("supplierName", newValue.supplierName || "");
            formik.setFieldValue("contactPerson", newValue.contactPerson || "");
            formik.setFieldValue("phone", newValue.phone || "");
            formik.setFieldValue("email", newValue.email || "");
            // Auto-set classification if present in evaluation data
            if (newValue.classification) {
                formik.setFieldValue("supplierClassification", newValue.classification);
            }
        } else {
            formik.setFieldValue("supplierId", "");
            formik.setFieldValue("supplierName", "");
            formik.setFieldValue("contactPerson", "");
            formik.setFieldValue("phone", "");
            formik.setFieldValue("email", "");
        }
    };

    return (
        <GradientCard title="Supplier Details" icon={Business}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                        options={suppliers}
                        getOptionLabel={(option) => option.supplierName || ""}
                        value={suppliers.find(s => s.id === formik.values.supplierId || s.supplierName === formik.values.supplierName) || null}
                        loading={loading}
                        onChange={handleSupplierChange}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant="body1" fontWeight={600}>
                                            {option.supplierName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Contact: {option.contactPerson} | {option.email}
                                        </Typography>
                                    </Box>
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search Approved Suppliers"
                                placeholder="Select a supplier to auto-fill details..."
                                required
                                error={formik.touched.supplierName && Boolean(formik.errors.supplierName)}
                                helperText={formik.touched.supplierName && formik.errors.supplierName}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <Business sx={{ color: '#1172ba', mr: 1, fontSize: 20 }} />
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        name="contactPerson"
                        label="Contact Person"
                        value={formik.values.contactPerson}
                        onChange={formik.handleChange}
                        error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                        helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                        InputProps={{
                            startAdornment: <Person sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        InputProps={{
                            startAdornment: <Phone sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            startAdornment: <Email sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        select
                        name="supplierClassification"
                        label="Supplier Classification"
                        value={formik.values.supplierClassification}
                        onChange={formik.handleChange}
                        InputProps={{
                            startAdornment: <Category sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    >
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="Non-Critical">Non-Critical</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        name="evaluationPeriod"
                        label="Evaluation Period"
                        placeholder="e.g., 2024-2025"
                        value={formik.values.evaluationPeriod}
                        onChange={formik.handleChange}
                        InputProps={{
                            startAdornment: <CalendarMonth sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        name="evaluatedBy"
                        label="Evaluated By"
                        value={formik.values.evaluatedBy}
                        onChange={formik.handleChange}
                        error={formik.touched.evaluatedBy && Boolean(formik.errors.evaluatedBy)}
                        helperText={formik.touched.evaluatedBy && formik.errors.evaluatedBy}
                        InputProps={{
                            startAdornment: <Badge sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        type="date"
                        name="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.date}
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

export default SupplierDetailsSection;
