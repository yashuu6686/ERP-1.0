import React from "react";
import {
    Card,
    Box,
    Typography,
    CardContent,
    Grid,
    TextField,
} from "@mui/material";
import { LocalShipping } from "@mui/icons-material";

const DeliveryInformation = () => {
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
                <LocalShipping />
                <Typography variant="h6" fontWeight={600}>
                    Delivery Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Invoice To"
                            placeholder="Company Name"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Deliver To"
                            placeholder="Warehouse/Site"
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Delivery Address"
                            placeholder="456 Delivery Lane"
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
                            label="Contact Person"
                            placeholder="Jane Smith"
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
                            label="Email"
                            placeholder="delivery@company.com"
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

export default DeliveryInformation;
