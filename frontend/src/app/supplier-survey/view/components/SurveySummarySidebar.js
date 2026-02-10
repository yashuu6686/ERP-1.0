import React from "react";
import { Paper, Typography, Stack, Box, Divider } from "@mui/material";
import { FactCheck, Contacts, Business, Assessment } from "@mui/icons-material";

const SidebarItem = ({ icon: Icon, label, value }) => (
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
        <Box sx={{
            width: 28,
            height: 28,
            borderRadius: "8px",
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.2
        }}>
            <Icon sx={{ color: "#1172ba", fontSize: 16 }} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: 600 }}>
                {value || "Not Provided"}
            </Typography>
        </Box>
    </Stack>
);

const SurveySummarySidebar = ({ data }) => {
    if (!data) return null;

    const status = data.status || "Pending";
    const getStatusColor = (s) => {
        switch (s) {
            case "Approved": return "#15803d";
            case "Rejected": return "#b91c1c";
            default: return "#a16207";
        }
    };

    return (
        <Stack spacing={2}>
            {/* Survey Status Card */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Assessment sx={{ color: '#1172ba', fontSize: 18 }} /> Evaluation Status
                </Typography>

                <Box sx={{ p: 2, bgcolor: `${getStatusColor(status)}10`, borderRadius: 3, border: `1px solid ${getStatusColor(status)}30`, textAlign: 'center', mb: 3 }}>
                    <Typography variant="caption" sx={{ color: getStatusColor(status), fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                        Current Status
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={800} sx={{ color: getStatusColor(status) }}>
                        {status}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2, opacity: 0.5 }} />

                <SidebarItem icon={FactCheck} label="Survey Date" value={data.signOff?.date} />
                <SidebarItem icon={Contacts} label="Reviewed By" value={data.scanboReview?.reviewedBy} />
                <SidebarItem icon={Business} label="Authorized By" value={data.signOff?.name} />
            </Paper>

            {/* Quick Analytics Card - Example for aesthetic */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Business sx={{ color: '#1172ba', fontSize: 18 }} /> Company Profile
                </Typography>
                <Stack spacing={0.5}>
                    <SidebarItem icon={Assessment} label="Years Active" value={data.financials?.yearsInBusiness} />
                    <SidebarItem icon={Contacts} label="Total Staff" value={data.financials?.totalEmployees} />
                </Stack>
            </Paper>
        </Stack>
    );
};

export default SurveySummarySidebar;
