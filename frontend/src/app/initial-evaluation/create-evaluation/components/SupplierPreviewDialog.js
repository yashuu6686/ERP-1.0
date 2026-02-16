import React from "react";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import { Business, CheckCircle } from "@mui/icons-material";
import { Box, Typography, Grid, Paper, Chip, Divider } from "@mui/material";

export default function SupplierPreviewDialog({ open, onClose, onConfirm, values, loading }) {
    if (!values) return null;

    const getAnswerColor = (answer) => {
        switch (answer) {
            case "yes":
                return { bgcolor: "#dcfce7", color: "#15803d" };
            case "no":
                return { bgcolor: "#fee2e2", color: "#b91c1c" };
            case "n/a":
                return { bgcolor: "#f1f5f9", color: "#64748b" };
            default:
                return { bgcolor: "#fef9c3", color: "#a16207" };
        }
    };

    const answeredQuestions = Object.entries(values.questionnaire || {}).filter(
        ([_, q]) => q.answer
    ).length;

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Review Supplier Evaluation"
            icon={<Business />}
            headerInfo={{
                label1: "SUPPLIER NAME",
                value1: values.supplierName || "N/A",
                label2: "EVALUATION DATE",
                value2: values.evaluationDate || "N/A",
            }}
            confirmLabel="Submit Evaluation"
            loading={loading}
        >
            <Grid container spacing={3}>
                {/* Supplier Contact Information */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            height: "100%",
                            borderRadius: "var(--card-radius)",
                            border: "1px solid var(--border-default)",
                            bgcolor: "var(--bg-surface)",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "var(--brand-primary)" }}>
                            <Business sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Contact Information
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Address
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.address || "N/A"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-secondary)", fontSize: "0.8125rem" }}>
                                    {values.city}, {values.state} {values.zipCode}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Contact Person
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.contactPerson} - {values.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-secondary)", fontSize: "0.8125rem" }}>
                                    {values.phone}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Facilities Information */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            height: "100%",
                            borderRadius: "var(--card-radius)",
                            border: "1px solid var(--border-default)",
                            bgcolor: "var(--bg-surface)",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "var(--brand-primary)" }}>
                            <CheckCircle sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Facilities
                            </Typography>
                        </Box>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 6 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Established
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.yearEstablished || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Square Footage
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.totalSquareFootage || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Employees
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.numberOfEmployees || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    QA Employees
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.numberOfQAEmployees || "N/A"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Questionnaire Summary */}
                <Grid size={{ xs: 12 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: "var(--card-radius)",
                            border: "1px solid var(--border-default)",
                            bgcolor: "var(--bg-surface)",
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                            Questionnaire Summary
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <Chip
                                label={`${answeredQuestions} / 27 Questions Answered`}
                                size="small"
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: answeredQuestions === 27 ? "#dcfce7" : "#fef9c3",
                                    color: answeredQuestions === 27 ? "#15803d" : "#a16207",
                                }}
                            />
                        </Box>
                        <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
                            {Object.entries(values.questionnaire || {}).map(([key, q], index) =>
                                q.answer ? (
                                    <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                        <Typography variant="caption" sx={{ color: "var(--text-secondary)", minWidth: "30px" }}>
                                            Q{index + 1}:
                                        </Typography>
                                        <Chip
                                            label={q.answer.toUpperCase()}
                                            size="small"
                                            sx={{ ...getAnswerColor(q.answer), fontSize: "0.65rem", fontWeight: 700 }}
                                        />
                                    </Box>
                                ) : null
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Approval Status */}
                <Grid size={{ xs: 12 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: "var(--card-radius)",
                            border: "1px solid var(--border-default)",
                            bgcolor: "var(--bg-surface)",
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                            Approval Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Completed By
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.completedBy || "N/A"}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "var(--text-secondary)" }}>
                                    {values.completedDate || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Reviewed By
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.reviewedBy || "Pending"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="caption" sx={{ color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                                    Approved By
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {values.approvedBy || "Pending"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
}
