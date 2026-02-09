import React from "react";
import { Grid, Typography, Box, Chip } from "@mui/material";
import { CalendarMonth, Description, Business } from "@mui/icons-material";

const DetailItem = ({ icon, label, value, status }) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <Box sx={{
            p: 1,
            borderRadius: "50%",
            bgcolor: "#eff6ff",
            color: "#1172ba",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {icon}
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                {label}
            </Typography>
            {status ? (
                <Box mt={0.5}>{value}</Box>
            ) : (
                <Typography variant="body1" sx={{ fontWeight: 600, color: "#1e293b", mt: 0.5 }}>
                    {value || "N/A"}
                </Typography>
            )}
        </Box>
    </Box>
);

const SupplierDetails = ({ evaluation }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Approved": return { bgcolor: "#dcfce7", color: "#15803d" };
            case "Rejected": return { bgcolor: "#fee2e2", color: "#b91c1c" };
            case "Pending": return { bgcolor: "#fef9c3", color: "#a16207" };
            default: return { bgcolor: "#f1f5f9", color: "#64748b" };
        }
    };

    return (
        <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
                <DetailItem
                    icon={<Description />}
                    label="Evaluation No"
                    value={evaluation.evaluationNo}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <DetailItem
                    icon={<Business />}
                    label="Supplier Name"
                    value={evaluation.supplierName}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <DetailItem
                    icon={<CalendarMonth />}
                    label="Status"
                    status
                    value={
                        <Chip
                            label={evaluation.status || "Pending"}
                            sx={{
                                ...getStatusColor(evaluation.status),
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                height: "24px",
                                borderRadius: "6px"
                            }}
                        />
                    }
                />
            </Grid>
        </Grid>
    );
};

export default SupplierDetails;
