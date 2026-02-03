import React from "react";
import { Box, Stack, Typography, Chip, Divider } from "@mui/material";
import { CalendarMonth, Description, Receipt, CheckCircle, Schedule, Cancel } from "@mui/icons-material";

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b" }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5
        }}>
            <Icon sx={{ color: "#1172ba", fontSize: 18 }} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem" }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
);

const InspectionMainDetails = ({ materialData, inspectionStatus }) => {
    const getStatusConfig = (status) => {
        const configs = {
            Approved: { color: "#15803d", bg: "#dcfce7", border: "#bbf7d0", icon: <CheckCircle /> },
            Rejected: { color: "#b91c1c", bg: "#fee2e2", border: "#fecaca", icon: <Cancel /> },
            "Pending Approval": { color: "#1e40af", bg: "#dbeafe", border: "#bfdbfe", icon: <Schedule /> },
            Pending: { color: "#a16207", bg: "#fef9c3", border: "#fde68a", icon: <Schedule /> },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(inspectionStatus);

    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                <Box>
                    <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                        QC REPORT
                    </Typography>
                    <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2 }}>
                        Incoming Material Inspection
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            label={materialData.inspectionReportNumber}
                            sx={{
                                fontWeight: 700,
                                bgcolor: "#f1f5f9",
                                color: "#0f172a",
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                            }}
                        />
                        <Chip
                            icon={React.cloneElement(statusConfig.icon, { sx: { fontSize: '16px !important' } })}
                            label={inspectionStatus}
                            sx={{
                                fontWeight: 700,
                                bgcolor: statusConfig.bg,
                                color: statusConfig.color,
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                border: `1px solid ${statusConfig.border}`,
                                "& .MuiChip-icon": { color: statusConfig.color }
                            }}
                        />
                    </Stack>
                </Box>

                <Stack spacing={2} sx={{ minWidth: 260 }}>
                    <InfoItem icon={CalendarMonth} label="Inspection Date" value={materialData.inspectionDate} />
                    <InfoItem icon={Description} label="GRN Reference" value={materialData.grnNumber} />
                    <InfoItem icon={CalendarMonth} label="Received Date" value={materialData.receivedDate} />
                    <InfoItem icon={Receipt} label="Invoice Number" value={materialData.invoiceNumber} />
                </Stack>
            </Stack>
            <Divider sx={{ mb: 5, opacity: 0.6 }} />
        </Box>
    );
};

export default InspectionMainDetails;
export { InfoItem };
