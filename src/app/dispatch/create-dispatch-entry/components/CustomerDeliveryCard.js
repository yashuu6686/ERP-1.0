import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
} from "@mui/material";
import { Business, LocalShipping } from "@mui/icons-material";

export default function CustomerDeliveryCard({ formik }) {
    const handleCharacterOnlyChange = (e) => {
        const { name, value } = e.target;
        const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
        formik.setFieldValue(name, filteredValue);
    };

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Customer */}
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <Card
                    sx={{
                        height: "100%",
                        borderRadius: 2,
                    }}
                >
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
                        <Business />
                        <Typography color="white" variant="h6" fontWeight={600}>
                            Customer Information
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    name="customerName"
                                    value={formik.values.customerName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                                    helperText={formik.touched.customerName && formik.errors.customerName}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                    label="Customer/Organisation"
                                    placeholder="Enter customer name"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    name="contactPerson"
                                    value={formik.values.contactPerson}
                                    onChange={handleCharacterOnlyChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                                    helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                                    label="Contact Person"
                                    placeholder="Contact name"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    name="contactNo"
                                    value={formik.values.contactNo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                                    helperText={formik.touched.contactNo && formik.errors.contactNo}
                                    label="Contact No."
                                    placeholder="+91 98765 43210"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    name="deliveryAddress"
                                    value={formik.values.deliveryAddress}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.deliveryAddress && Boolean(formik.errors.deliveryAddress)}
                                    helperText={formik.touched.deliveryAddress && formik.errors.deliveryAddress}
                                    label="Delivery Address"
                                    placeholder="Enter complete delivery address"
                                    multiline
                                    rows={2}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Delivery */}
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <Card
                    sx={{
                        height: "100%",
                        borderRadius: 2,
                    }}
                >
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
                        <LocalShipping />
                        <Typography variant="h6" color="white" fontWeight={600}>
                            Delivery Details
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    name="deliveryDate"
                                    value={formik.values.deliveryDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.deliveryDate && Boolean(formik.errors.deliveryDate)}
                                    helperText={formik.touched.deliveryDate && formik.errors.deliveryDate}
                                    label="Delivery Date"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    name="courierCompany"
                                    value={formik.values.courierCompany}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.courierCompany && Boolean(formik.errors.courierCompany)}
                                    helperText={formik.touched.courierCompany && formik.errors.courierCompany}
                                    label="Courier Company"
                                    placeholder="e.g., Blue Dart"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    name="referenceNo"
                                    value={formik.values.referenceNo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.referenceNo && Boolean(formik.errors.referenceNo)}
                                    helperText={formik.touched.referenceNo && formik.errors.referenceNo}
                                    label="Reference No."
                                    placeholder="Internal reference"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    name="salesPlatform"
                                    value={formik.values.salesPlatform}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.salesPlatform && Boolean(formik.errors.salesPlatform)}
                                    helperText={formik.touched.salesPlatform && formik.errors.salesPlatform}
                                    label="Sales Platform"
                                    placeholder="Direct Sales / Online"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
