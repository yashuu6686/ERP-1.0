import React from "react";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import {
    Assignment,
    FactCheck,
    CheckCircle,
    Person,
    Info,
    ReportProblem,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Divider,
} from "@mui/material";

export default function FinalInspectionPreviewDialog({ open, onClose, onConfirm, values, loading }) {
    const [showAllObservations, setShowAllObservations] = React.useState(false);

    if (!values) return null;

    const observations = values.observations || [];
    const displayedObservations = showAllObservations
        ? observations
        : observations.slice(0, 5);

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Review Final Inspection Details"
            icon={<Assignment />}
            headerInfo={{
                label1: "INSPECTION NO.",
                value1: values.inspectionNo || "TBD",
                label2: "INSPECTION DATE",
                value2: values.date || "N/A"
            }}
            confirmLabel="Confirm & Complete Verification"
            loading={loading}
        >
            <Grid container spacing={3}>
                {/* Product Information */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Info sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Information</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Product Name</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.productName || "N/A"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Inspection Std No.</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{values.inspectionStdNo || "N/A"}</Typography>
                            </Box>
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Quantity</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.quantity || "0"}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Result</Typography>
                                    <Chip
                                        label={values.result || "N/A"}
                                        size="small"
                                        color={values.result === 'Pass' ? 'success' : 'error'}
                                        sx={{ fontWeight: 700, height: 20, fontSize: '0.65rem' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Serial Range & Authorization */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Serials & Approval</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Serial From</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.serialFrom || "N/A"}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Serial To</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.serialTo || "N/A"}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Divider sx={{ my: 1 }} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Updated By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.updatedBySignature || "N/A"}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Approved By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.approvedBy || "N/A"}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Observations Summary */}
                <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <FactCheck sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Observations Summary</Typography>
                        </Box>
                        <Table size="small" sx={{ mt: 1 }}>
                            <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>PARAMETER</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>SPECIFICATION</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>RESULT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedObservations.map((obs, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ py: 1, fontSize: '0.8125rem' }}>{obs?.parameter || "N/A"}</TableCell>
                                        <TableCell sx={{ py: 1, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{obs?.specification || "N/A"}</TableCell>
                                        <TableCell align="center">
                                            <Typography variant="caption" sx={{
                                                fontWeight: 700,
                                                color: (obs?.observation === 'Pass' || obs?.observation?.toLowerCase().includes('ok')) ? 'success.main' : 'error.main'
                                            }}>
                                                {obs?.observation || "N/A"}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {observations.length > 5 && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ pt: 2 }}>
                                            <Box
                                                onClick={() => setShowAllObservations(!showAllObservations)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'var(--brand-primary)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                    {showAllObservations ? "Show Less" : `+ ${observations.length - 5} more observations...`}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Quality Checklist & Special Reports */}
                <Grid size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                    <CheckCircle sx={{ fontSize: 18 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quality Checklist</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>Label Attached correctly?</Typography>
                                        <Chip label={values.checklist?.labelAttached ? "YES" : "NO"} size="small" variant="outlined" color={values.checklist?.labelAttached ? "success" : "default"} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>Packaging Proof checked?</Typography>
                                        <Chip label={values.checklist?.packagingProof ? "YES" : "NO"} size="small" variant="outlined" color={values.checklist?.packagingProof ? "success" : "default"} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>Final Test Done?</Typography>
                                        <Chip label={values.checklist?.finalTestDone ? "YES" : "NO"} size="small" variant="outlined" color={values.checklist?.finalTestDone ? "success" : "default"} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                    <ReportProblem sx={{ fontSize: 18 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Special Reports</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>Problem Report required?</Typography>
                                        <Chip label={values.problemReport?.toUpperCase() || "NO"} size="small" variant="outlined" color={values.problemReport === 'yes' ? "warning" : "default"} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>AQD required?</Typography>
                                        <Chip label={values.aqd?.toUpperCase() || "NO"} size="small" variant="outlined" color={values.aqd === 'yes' ? "warning" : "default"} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
}
