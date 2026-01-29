import React from "react";
import {
    Card,
    Box,
    Typography,
    CardContent,
    Grid,
    TextField,
} from "@mui/material";
import { Business } from "@mui/icons-material";

const SupplierInformation = () => {
    return (
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
                <Typography variant="h6" fontWeight={600}>
                    Supplier Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                            label="Company Name"
                            placeholder="ABC Suppliers Pvt Ltd"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            placeholder="John Doe"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            placeholder="123 Business Street"
                            multiline
                            rows={1}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="contact@supplier.com"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            placeholder="+91 98765 43210"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="PAN Number"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                            placeholder="ABCDE1234F"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="GSTIN"
                            placeholder="22ABCDE1234F1Z5"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SupplierInformation;
