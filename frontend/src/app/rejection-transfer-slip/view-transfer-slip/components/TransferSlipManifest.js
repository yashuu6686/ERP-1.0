import React from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import { Inventory, Category } from "@mui/icons-material";

const ViewSectionHeader = ({ icon, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, color: '#1172ba' }}>
        {React.cloneElement(icon, { sx: { fontSize: 22 } })}
        <Typography variant="subtitle1" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem' }}>
            {title}
        </Typography>
    </Box>
);

const DataField = ({ label, value, color = "#1e293b" }) => (
    <Box sx={{ mb: 1 }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem", display: "block", mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: color, fontSize: '1rem' }}>
            {value || "-"}
        </Typography>
    </Box>
);

const TransferSlipManifest = ({ slip }) => {
    if (!slip) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                bgcolor: "#fff",
                position: 'relative',
                mb: 3
            }}
        >
            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
                {/* Batch & Process Details */}
                <Box sx={{ mb: 5 }}>
                    <ViewSectionHeader icon={<Inventory />} title="Batch & Process Details" />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <DataField label="BMR No." value={slip.bmrNo} color="#1172ba" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DataField label="Batch No." value={slip.batchNo} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DataField label="Serial No." value={slip.serialNo} />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 5, borderStyle: 'dashed' }} />

                {/* Product Information */}
                <Box>
                    <ViewSectionHeader icon={<Category />} title="Product Information" />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <DataField label="Product Name" value={slip.productName} color="#1172ba" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DataField label="Batch Qty" value={slip.batchQty} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    );
};

export default TransferSlipManifest;
