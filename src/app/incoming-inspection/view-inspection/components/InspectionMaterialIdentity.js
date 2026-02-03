import React from "react";
import { Grid, Paper, Stack, Box, Typography, Divider, Chip } from "@mui/material";
import { Inventory, Business, Assignment, VerifiedUser, Science, Construction, Settings, Article, Verified } from "@mui/icons-material";
import { InfoItem } from "./InspectionMainDetails";

const InspectionMaterialIdentity = ({ materialData }) => {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2.5 }}>
                Material & Source Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 4, bgcolor: "#f8fafc", borderRadius: 4, border: '1px solid #f1f5f9', height: '100%' }}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                    <Inventory sx={{ color: "#1172ba" }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight={800} color="#1e293b">{materialData.materialName}</Typography>
                                    <Typography variant="body2" color="#64748b" fontWeight={600}>Lot/Batch: {materialData.lotNumber}</Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ borderStyle: 'dashed' }} />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InfoItem icon={Assignment} label="PO Number" value={materialData.poNumber} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem icon={VerifiedUser} label="Lot Quantity" value={materialData.lotQuantity} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem icon={Science} label="Sample Size" value={materialData.sampleSize} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoItem icon={Settings} label="Equipment ID" value={materialData.equipmentId} />
                                </Grid>
                                <Grid item xs={12}>
                                    <InfoItem icon={Science} label="Inspection Standard No." value={materialData.inspectionStandardNumber} />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 4, bgcolor: "#f8fafc", borderRadius: 4, border: '1px solid #f1f5f9', height: '100%' }}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                    <Business sx={{ color: "#1172ba" }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight={800} color="#1e293b">{materialData.supplierName}</Typography>
                                    <Typography variant="body2" color="#64748b" fontWeight={600}>Verified Supplier</Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ borderStyle: 'dashed' }} />

                            <Stack spacing={2}>
                                <InfoItem icon={Construction} label="Inspection Standard" value={materialData.inspectionStandard} />
                                <InfoItem
                                    icon={Settings}
                                    label="Inspection Tools"
                                    value={materialData.toolsUsed ? materialData.toolsUsed.toUpperCase() : "N/A"}
                                    color={materialData.toolsUsed?.toLowerCase() === "yes" ? "#16a34a" : "#475569"}
                                />

                                <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

                                <Stack direction="row" spacing={3}>
                                    <Box sx={{ flex: 1 }}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                            <Article sx={{ color: "#94a3b8", fontSize: 16 }} />
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>SDS Status</Typography>
                                        </Stack>
                                        <Chip
                                            label={materialData.sdsAvailable ? materialData.sdsAvailable.toUpperCase() : "N/A"}
                                            size="small"
                                            sx={{
                                                fontWeight: 800,
                                                bgcolor: materialData.sdsAvailable?.toLowerCase() === "yes" ? "#dcfce7" : "#f1f5f9",
                                                color: materialData.sdsAvailable?.toLowerCase() === "yes" ? "#15803d" : "#64748b",
                                                borderRadius: '6px',
                                                border: materialData.sdsAvailable?.toLowerCase() === "yes" ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                                                px: 0.5
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                            <Verified sx={{ color: "#94a3b8", fontSize: 16 }} />
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Quality Cert.</Typography>
                                        </Stack>
                                        <Chip
                                            label={materialData.qualityCertificate ? materialData.qualityCertificate.toUpperCase() : "N/A"}
                                            size="small"
                                            sx={{
                                                fontWeight: 800,
                                                bgcolor: materialData.qualityCertificate?.toLowerCase() === "yes" ? "#dcfce7" : "#f1f5f9",
                                                color: materialData.qualityCertificate?.toLowerCase() === "yes" ? "#15803d" : "#64748b",
                                                borderRadius: '6px',
                                                border: materialData.qualityCertificate?.toLowerCase() === "yes" ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                                                px: 0.5
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InspectionMaterialIdentity;
