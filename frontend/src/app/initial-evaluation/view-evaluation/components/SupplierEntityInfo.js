import React from "react";
import { Grid, Typography, Box, Paper, Divider } from "@mui/material";
import { Business, Factory, Email, Phone } from "@mui/icons-material";

const InfoSection = ({ title, icon, children }) => (
    <Box sx={{ p: 3, border: "1px solid #f1f5f9", borderRadius: 3, bgcolor: "#f8fafc", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ color: "#0f172a" }}>{icon}</Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                {title}
            </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "#e2e8f0" }} />
        {children}
    </Box>
);

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b", textAlign: "right" }}>
            {value || "-"}
        </Typography>
    </Box>
);

const SupplierEntityInfo = ({ evaluation }) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <InfoSection title="Contact Information" icon={<Business />}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                            {evaluation.supplierName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                            {evaluation.address}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                            {evaluation.city}, {evaluation.state} {evaluation.zipCode}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Phone sx={{ fontSize: 16, color: "#94a3b8" }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {evaluation.phone}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Email sx={{ fontSize: 16, color: "#94a3b8" }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {evaluation.contactPerson} ({evaluation.title})
                            </Typography>
                        </Box>
                    </Box>
                </InfoSection>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <InfoSection title="Facilities Information" icon={<Factory />}>
                    <InfoRow label="Year Established" value={evaluation.yearEstablished} />
                    <InfoRow label="Total Square Footage" value={evaluation.totalSquareFootage} />
                    <InfoRow label="Total Employees" value={evaluation.numberOfEmployees} />
                    <InfoRow label="QA Employees" value={evaluation.numberOfQAEmployees} />
                    <InfoRow label="QA Representative" value={evaluation.qaTitle} />
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                            Products/Services
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, color: "#334155" }}>
                            {evaluation.productServices}
                        </Typography>
                    </Box>
                </InfoSection>
            </Grid>
        </Grid>
    );
};

export default SupplierEntityInfo;
