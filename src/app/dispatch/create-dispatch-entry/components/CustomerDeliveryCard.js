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

export default function CustomerDeliveryCard({ formData, handleChange, errors }) {
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
                                    value={formData.customerName}
                                    onChange={(e) => handleChange("customerName", e.target.value)}
                                    required
                                    error={errors.customerName}
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                    }}
                                    label="Customer/Organisation"
                                    placeholder="Enter customer name"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    value={formData.contactPerson}
                                    onChange={(e) => handleChange("contactPerson", e.target.value)}
                                    required
                                    error={errors.contactPerson}
                                    label="Contact Person"
                                    placeholder="Contact name"
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    value={formData.contactNo}
                                    onChange={(e) => handleChange("contactNo", e.target.value)}
                                    required
                                    error={errors.contactNo}
                                    label="Contact No."
                                    placeholder="+91 98765 43210"
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    value={formData.deliveryAddress}
                                    onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                                    required
                                    error={errors.deliveryAddress}
                                    label="Delivery Address"
                                    placeholder="Enter complete delivery address"
                                    multiline
                                    rows={2}
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
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
                        <Typography variant="h6" fontWeight={600}>
                            Delivery Details
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    value={formData.deliveryDate}
                                    onChange={(e) => handleChange("deliveryDate", e.target.value)}
                                    required
                                    error={errors.deliveryDate}
                                    label="Delivery Date"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    value={formData.courierCompany}
                                    onChange={(e) => handleChange("courierCompany", e.target.value)}
                                    required
                                    error={errors.courierCompany}
                                    label="Courier Company"
                                    placeholder="e.g., Blue Dart"
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    value={formData.referenceNo}
                                    onChange={(e) => handleChange("referenceNo", e.target.value)}
                                    required
                                    error={errors.referenceNo}
                                    label="Reference No."
                                    placeholder="Internal reference"
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6 }}>
                                <TextField
                                    fullWidth
                                    value={formData.salesPlatform}
                                    onChange={(e) => handleChange("salesPlatform", e.target.value)}
                                    required
                                    error={errors.salesPlatform}
                                    label="Sales Platform"
                                    placeholder="Direct Sales / Online"
                                    sx={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
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
