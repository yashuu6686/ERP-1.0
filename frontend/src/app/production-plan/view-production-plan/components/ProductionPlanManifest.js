import React from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import { Inventory, Numbers, Description } from "@mui/icons-material";

const ViewSectionHeader = ({ icon, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, color: '#1172ba' }}>
        {React.cloneElement(icon, { sx: { fontSize: 22 } })}
        <Typography variant="subtitle1" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
            {title}
        </Typography>
    </Box>
);

const DataField = ({ label, value, color = "#1e293b", fullWidth = false }) => (
    <Box sx={{ mb: 1 }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem", display: "block", mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: color, fontSize: '1rem' }}>
            {value || "-"}
        </Typography>
    </Box>
);

export default function ProductionPlanManifest({ plan }) {
    if (!plan) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                bgcolor: "#fff",
                position: 'relative'
            }}
        >
            {/* Decorative Top Line */}
            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
                {/* Production Details */}
                <Box sx={{ mb: 5 }}>
                    <ViewSectionHeader icon={<Inventory />} title="Production Details" />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <DataField label="Product Name" value={plan.productName} color="#1172ba" />
                        </Grid>
                        <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                            <DataField label="Total Quantity" value={plan.quantity} />
                        </Grid>
                        <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                            <DataField label="Planned Quantity" value={plan.plannedQty} />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 5, borderStyle: 'dashed' }} />

                {/* Serial Tracking */}
                <Box sx={{ mb: 5 }}>
                    <ViewSectionHeader icon={<Numbers />} title="Serial Number Tracking" />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                            <DataField label="Serial No From" value={plan.serialNoFrom} />
                        </Grid>
                        <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                            <DataField label="Serial No To" value={plan.serialNoTo} />
                        </Grid>
                        <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                            <DataField label="Final Assembly" value={plan.finalAssyName} />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 5, borderStyle: 'dashed' }} />

                {/* Remarks */}
                <Box>
                    <ViewSectionHeader icon={<Description />} title="Remarks & Instructions" />
                    <Box sx={{ p: 3, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #f1f5f9" }}>
                        <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                            {plan.remarks || "No specific instructions or remarks provided for this plan."}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
