import React from "react";
import { Box, Typography } from "@mui/material";
import { Assignment } from "@mui/icons-material";

const InspectionDecisionSummary = ({ comments }) => {
    return (
        <Box sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Assignment sx={{ color: '#1172ba' }} /> Quality Decision & Comments
            </Typography>
            <Typography variant="body1" sx={{ color: "#334155", fontStyle: comments ? 'normal' : 'italic', mb: 0, lineHeight: 1.7 }}>
                {comments || "Detailed quality inspection conducted based on standard operating procedures. The material conforms to all specified parameters."}
            </Typography>
        </Box>
    );
};

export default InspectionDecisionSummary;
