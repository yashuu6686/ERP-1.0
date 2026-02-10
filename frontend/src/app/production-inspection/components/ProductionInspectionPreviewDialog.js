import React from "react";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import {
    FactCheck,
    Assignment,
    Person,
    Summarize,
    CheckCircle,
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
    TableContainer,
    Divider,
} from "@mui/material";

export default function ProductionInspectionPreviewDialog({ open, onClose, onConfirm, values, loading, observationColumns = [] }) {
    if (!values) return null;

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Review Production Quality Check"
            icon={<FactCheck />}
            headerInfo={{
                label1: "PRODUCT",
                value1: values.productName || "N/A",
                label2: "INSPECTION DATE",
                value2: values.inspectionDate || "N/A"
            }}
            confirmLabel="Confirm & Submit"
            loading={loading}
        >
            <Grid container spacing={3}>
                {/* Product Information */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Assignment sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Information</Typography>
                        </Box>
                        <Box sx={{ display: 'grid', gap: 1.5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REQ NO</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{values.materialRequestNo || "N/A"}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>CHECK NO</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{values.checkNumber || "N/A"}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>QUAL. STD</Typography>
                                    <Typography variant="body2">{values.qualityStandard || "N/A"}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>CHECKED QTY</Typography>
                                    <Typography variant="body2">{values.checkedQuantity || "0"}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Inspection Summary */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Summarize sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inspection Summary</Typography>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>ACCEPTED</Typography>
                                <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>{values.acceptedQuantity || "0"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REJECTED</Typography>
                                <Typography variant="h6" color="error.main" sx={{ fontWeight: 700 }}>{values.rejectedQuantity || "0"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>HOLD/SCRAP</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.holdScrapQuantity || "0"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>OTHER</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.other || "0"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Quality Check Table */}
                <Grid item xs={12} size={{ xs: 12 }}>
                    <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                        <Box sx={{ p: 1.5, bgcolor: 'var(--bg-page)', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 18, color: 'var(--brand-primary)' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Check Details ({values.checkDetails?.length || 0})</Typography>
                        </Box>
                        <TableContainer sx={{ maxHeight: 300 }}>
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Parameter</TableCell>
                                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Specification</TableCell>
                                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Method</TableCell>
                                        {observationColumns.map(col => (
                                            <TableCell key={col.id} sx={{ fontWeight: 600, py: 1.5, color: 'var(--brand-primary)' }}>{col.label}</TableCell>
                                        ))}
                                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>Remarks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values.checkDetails?.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                            <TableCell sx={{ py: 1 }}>{row.parameters}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row.specification}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row.method}</TableCell>
                                            {observationColumns.map(col => (
                                                <TableCell key={col.id} sx={{ py: 1 }}>{row[col.id] || "-"}</TableCell>
                                            ))}
                                            <TableCell sx={{ py: 1 }}>{row.remarks || "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Authorizations */}
                <Grid item xs={12} size={{ xs: 12 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authorizations & Comments</Typography>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 1.5, bgcolor: 'var(--bg-page)', borderRadius: 1.5 }}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, display: 'block' }}>UPDATED BY</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                        <Typography variant="body2" fontWeight={600}>{values.updatedBy?.name || "N/A"}</Typography>
                                        <Typography variant="body2" color="textSecondary">{values.updatedBy?.date || "-"}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 1.5, bgcolor: 'var(--bg-page)', borderRadius: 1.5 }}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, display: 'block' }}>APPROVED BY</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                        <Typography variant="body2" fontWeight={600}>{values.approvedBy?.name || "Pending"}</Typography>
                                        <Typography variant="body2" color="textSecondary">{values.approvedBy?.date || "-"}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            {values.comments && (
                                <Grid item xs={12}>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>COMMENTS</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 0.5 }}>
                                            &quot;{values.comments}&quot;
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
}
