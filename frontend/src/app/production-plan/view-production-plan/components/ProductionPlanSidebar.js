import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { CalendarToday, VerifiedUser, Info } from "@mui/icons-material";

const SidebarCard = ({ icon, title, children }) => (
    <Paper
        elevation={0}
        sx={{
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            bgcolor: "#fff",
            mb: 2,
            position: 'relative'
        }}
    >
        <Box sx={{ height: 4, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />
        <Box sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#1172ba' }}>
                {React.cloneElement(icon, { sx: { fontSize: 18 } })}
                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {title}
                </Typography>
            </Box>
            {children}
        </Box>
    </Paper>
);

const SidebarField = ({ label, value, mb = 2 }) => (
    <Box sx={{ mb: mb }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", fontSize: "0.6rem", display: "block", mb: 0.2 }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
            {value || "-"}
        </Typography>
    </Box>
);

export default function ProductionPlanSidebar({ plan, getStatusChip }) {
    if (!plan) return null;

    return (
        <Box>
            {/* Status Section */}
            <SidebarCard icon={<Info />} title="Current Status">
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                    {getStatusChip(plan.status)}
                </Box>
            </SidebarCard>

            {/* Timeline Section */}
            <SidebarCard icon={<CalendarToday />} title="Production Timeline">
                <SidebarField label="Start Date" value={plan.startDate} />
                <SidebarField label="Target Date" value={plan.targetDate} mb={0} />
            </SidebarCard>

            {/* Approvals Section */}
            <SidebarCard icon={<VerifiedUser />} title="Approvals">
                <SidebarField label="Reviewed By" value={plan.reviewedBy} />
                <SidebarField label="Approved By" value={plan.approvedBy} mb={0} />
            </SidebarCard>
        </Box>
    );
}
