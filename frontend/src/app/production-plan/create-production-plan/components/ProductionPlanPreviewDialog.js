import React from "react";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import {
    Inventory,
    Numbers,
    Schedule,
    Person,
    Description,
    CalendarToday,
    VerifiedUser,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
} from "@mui/material";

export default function ProductionPlanPreviewDialog({ open, onClose, onConfirm, values, loading }) {
    if (!values) return null;

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Review & Confirm Production Plan"
            icon={<Inventory />}
            headerInfo={{
                label1: "PRODUCT",
                value1: values.productName || "N/A",
                label2: "QUANTITY",
                value2: values.quantity || "0"
            }}
            confirmLabel={values.id ? "Update Plan" : "Create Plan"}
            loading={loading}
        >
            <Grid container spacing={3}>
                {/* Production Info */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Inventory sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Production Details</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Product Name</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.productName || "N/A"}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Total Quantity</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.quantity || "0"}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Planned Qty</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.plannedQty || "0"}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Final Assembly</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.finalAssyName || "N/A"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Serial Tracking */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Numbers sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Serial Number Tracking</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Serial From</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.serialNoFrom || "N/A"}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Serial To</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.serialNoTo || "N/A"}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 0.5, borderStyle: 'dashed' }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Timeline</Typography>
                                <Box sx={{ display: 'flex', gap: 4, mt: 0.5 }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.6rem' }}>Start Date</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.startDate || "N/A"}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.6rem' }}>Target Date</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.targetDate || "N/A"}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Remarks */}
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Description sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Remarks & Extra Info</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: values.remarks ? 'var(--text-primary)' : 'var(--text-muted)', fontStyle: values.remarks ? 'normal' : 'italic' }}>
                            {values.remarks || "No additional remarks provided."}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Approvals */}
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <VerifiedUser sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personnel & Approvals</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Reviewed By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.reviewedBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Approved By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.approvedBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Status</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{values.status || "Pending"}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
}
