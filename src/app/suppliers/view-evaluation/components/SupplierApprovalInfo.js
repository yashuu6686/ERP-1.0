import React from "react";
import { Grid, Typography, Box, Paper, Divider, Chip } from "@mui/material";
import { CheckCircle, Person, CalendarToday } from "@mui/icons-material";

const ApprovalBlock = ({ title, person, date, status, comments }) => (
    <Box sx={{ p: 2, border: "1px solid #e2e8f0", borderRadius: 2, bgcolor: "#fff", height: "100%" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1172ba", mb: 1.5, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.5px" }}>
            {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Person sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
                {person || "Pending"}
            </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: status ? 1 : 0 }}>
            <CalendarToday sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#64748b" }}>
                {date || "-"}
            </Typography>
        </Box>
        {status && (
            <Chip
                label={status}
                size="small"
                sx={{
                    bgcolor: status === "yes" || status === "Approved" ? "#dcfce7" : "#fee2e2",
                    color: status === "yes" || status === "Approved" ? "#15803d" : "#b91c1c",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    height: "20px"
                }}
            />
        )}
        {comments && (
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px dashed #e2e8f0" }}>
                <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mb: 0.5 }}>Comments</Typography>
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>{comments}</Typography>
            </Box>
        )}
    </Box>
);

const SupplierApprovalInfo = ({ evaluation }) => {
    return (
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #e2e8f0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <CheckCircle sx={{ color: "#1172ba" }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#0f172a" }}>
                    Approval Workflow
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ApprovalBlock
                        title="Completed By"
                        person={`${evaluation.completedBy} (${evaluation.completedByTitle})`}
                        date={evaluation.completedDate}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ApprovalBlock
                        title="Reviewed By (QA/RA)"
                        person={evaluation.reviewedBy}
                        date={evaluation.reviewedDate}
                        status={evaluation.supplierApproved}
                        comments={evaluation.approvalComments}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ApprovalBlock
                        title="Approved By (CEO)"
                        person={evaluation.approvedBy}
                        date={evaluation.approvedDate}
                        status={evaluation.status === "Approved" ? "Approved" : (evaluation.status === "Rejected" ? "Rejected" : null)}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SupplierApprovalInfo;
