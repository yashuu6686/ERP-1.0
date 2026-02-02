"use client";
import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Grid,
    Fade,
} from "@mui/material";
import { AssignmentTurnedIn, CheckCircle } from "@mui/icons-material";

export default function ReviewSummaryStep({ formData }) {
    const cardHeaderStyle = {
        background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
        color: "white",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
    };

    const glassStyle = {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    };

    return (
        <Fade in={true} timeout={500}>
            <Box>
                <Card sx={{ mb: 4, borderRadius: 3, ...glassStyle }}>
                    <Box sx={cardHeaderStyle}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <AssignmentTurnedIn />
                            <Typography variant="h6" color="white" fontWeight={700}>Review Summary</Typography>
                        </Box>
                        <Chip label="Ready to Save" sx={{ color: "#1172ba",bgcolor:"white" }} size="small" />
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="overline" color="text.secondary" fontWeight={700}>DEVICE & COMPANY</Typography>
                                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2"><strong>Device ID:</strong> {formData.deviceId || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Company:</strong> {formData.companyName || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Date:</strong> {formData.date}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="overline" color="text.secondary" fontWeight={700}>AUTHORIZATION</Typography>
                                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2"><strong>Testing By:</strong> {formData.testingBy || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Verified By:</strong> {formData.verifiedBy || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Packed By:</strong> {formData.packedBy || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Box>
        </Fade>
    );
}
