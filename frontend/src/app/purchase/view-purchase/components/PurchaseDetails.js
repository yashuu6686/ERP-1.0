import React from "react";
import { Box, Stack, Typography, Chip, Divider } from "@mui/material";
import { CalendarMonth, LocalShipping, CheckCircle, Schedule, Cancel } from "@mui/icons-material";

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

const PurchaseDetails = ({ orderInfo, status }) => {
    const getStatusConfig = (status) => {
        const configs = {
            Approved: { color: "#166534", bg: "#dcfce7", border: "#bbedc2", icon: <CheckCircle /> },
            Pending: { color: "#92400e", bg: "#fef3c7", border: "#fde68a", icon: <Schedule /> },
            Rejected: { color: "#991b1b", bg: "#fee2e2", border: "#fecaca", icon: <Cancel /> },
            "Pending Approval": { color: "#1e40af", bg: "#dbeafe", border: "#bfdbfe", icon: <Schedule /> },
            Completed: { color: "#0369a1", bg: "#e0f2fe", border: "#bae6fd", icon: <CheckCircle /> },
        };
        return configs[status] || configs.Pending;
    };

    const statusConfig = getStatusConfig(status);

    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                <Box>
                    <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                        PURCHASE ORDER
                    </Typography>
                    <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                        Official Procurement Document
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            label={orderInfo.orderNumber}
                            sx={{
                                fontWeight: 700,
                                bgcolor: "#f1f5f9",
                                color: "#0f172a",
                                borderRadius: '8px',
                                fontSize: '0.95rem'
                            }}
                        />
                        <Chip
                            icon={React.cloneElement(statusConfig.icon, { sx: { fontSize: '18px !important' } })}
                            label={status}
                            sx={{
                                fontWeight: 700,
                                bgcolor: statusConfig.bg,
                                color: statusConfig.color,
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                border: `1px solid ${statusConfig.border}`,
                                "& .MuiChip-icon": { color: statusConfig.color }
                            }}
                        />
                    </Stack>
                </Box>

                <Stack spacing={2} sx={{ minWidth: 280 }}>
                    <InfoItem
                        icon={CalendarMonth}
                        label="Order Date"
                        value={new Date(orderInfo.orderDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                    <InfoItem
                        icon={LocalShipping}
                        label="Expected Delivery"
                        value={new Date(orderInfo.expectedDelivery).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                </Stack>
            </Stack>
            <Divider sx={{ mb: 5, opacity: 0.6 }} />
        </Box>
    );
};

export default PurchaseDetails;
export { InfoItem };
