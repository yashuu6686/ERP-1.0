import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, MenuItem, Autocomplete } from '@mui/material';
import { Business } from '@mui/icons-material';
import axiosInstance from '@/axios/axiosInstance';

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

const SupplierInfoSection = ({ formik }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/supplier-surveys");
            setSuppliers(response.data || []);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSupplierSelect = (event, value) => {
        if (value) {
            formik.setFieldValue('supplierName', value.companyName || '');
            formik.setFieldValue('addressLocation', value.address || '');
            formik.setFieldValue('contactPerson', value.customerServiceContact?.name || '');
            formik.setFieldValue('typeOfSupplier',
                value.supplierType?.product && value.supplierType?.service ? 'Product & Service' :
                    value.supplierType?.product ? 'Product' :
                        value.supplierType?.service ? 'Service' : ''
            );
            formik.setFieldValue('suppliedProductService',
                value.productCapabilities?.productsDescription || value.serviceCapabilities?.servicesDescription || ''
            );
            formik.setFieldValue('qualityAgreement', ''); // Not in survey, leave empty
        }
    };

    return (
        <GradientCard title="Supplier Information" icon={Business}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Autocomplete
                        options={suppliers}
                        getOptionLabel={(option) => option.companyName || ''}
                        loading={loading}
                        onChange={handleSupplierSelect}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Supplier from Survey"
                                required
                                helperText="Select a supplier from the survey to auto-fill details"
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        name="addressLocation"
                        label="Address / Location"
                        value={formik.values.addressLocation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.addressLocation && Boolean(formik.errors.addressLocation)}
                        helperText={formik.touched.addressLocation && formik.errors.addressLocation}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f8fafc' }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        name="contactPerson"
                        label="Contact Person"
                        value={formik.values.contactPerson}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                        helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f8fafc' }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        name="typeOfSupplier"
                        label="Type of Supplier"
                        placeholder="e.g., Manufacturer, Distributor, Service Provider"
                        value={formik.values.typeOfSupplier}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.typeOfSupplier && Boolean(formik.errors.typeOfSupplier)}
                        helperText={formik.touched.typeOfSupplier && formik.errors.typeOfSupplier}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f8fafc' }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={2}
                        name="suppliedProductService"
                        label="Supplied Product / Service"
                        value={formik.values.suppliedProductService}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.suppliedProductService && Boolean(formik.errors.suppliedProductService)}
                        helperText={formik.touched.suppliedProductService && formik.errors.suppliedProductService}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f8fafc' }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        name="qualityAgreement"
                        label="Quality Agreement / QA Terms"
                        placeholder="e.g., Quality Agreement, QA Terms Only, No agreement"
                        value={formik.values.qualityAgreement}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.qualityAgreement && Boolean(formik.errors.qualityAgreement)}
                        helperText={formik.touched.qualityAgreement && formik.errors.qualityAgreement}
                    />
                </Grid>
            </Grid>
        </GradientCard>
    );
};

export default SupplierInfoSection;
