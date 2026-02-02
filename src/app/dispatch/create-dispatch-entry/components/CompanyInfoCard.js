import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
} from "@mui/material";
import { Business } from "@mui/icons-material";

export default function CompanyInfoCard() {
    return (
        <Card
            sx={{
                mb: 4,
                border: "1px solid #e9ecef",
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
                    Company Information
                </Typography>
            </Box>
            <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Company Name"
                            defaultValue="Scanbo Engineering Pvt. Ltd."
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "white",
                                    "&:hover": {
                                        "& > fieldset": { borderColor: "#1172ba" },
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Office Address"
                            defaultValue="Mumbai, Maharashtra, India"
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            type="email"
                            defaultValue="info@scanbo.com"
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Phone Number"
                            defaultValue="+91 98765 43210"
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
