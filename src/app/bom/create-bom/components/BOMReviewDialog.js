import React from 'react';
import FormReviewDialog from '@/components/ui/FormReviewDialog';
import { Inventory, Person, Engineering, Assignment } from '@mui/icons-material';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const BOMReviewDialog = ({ open, onClose, onConfirm, data, isEditMode }) => {
    if (!data) return null;

    const { productName, materials, auth } = data;

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title={isEditMode ? "Review & Update BOM" : "Review & Create BOM"}
            icon={<Engineering />}
            headerInfo={{
                label1: "PRODUCT NAME",
                value1: productName,
                label2: "DATE",
                value2: new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
            }}
            confirmLabel={isEditMode ? "Confirm & Update BOM" : "Confirm & Create BOM"}
        >
            <Grid container spacing={3}>
                {/* Authorization Info */}
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authorization Details</Typography>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REVIEWED BY</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{auth.reviewedBy}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>APPROVED BY</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{auth.approvedBy}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Materials Table */}
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ p: 2, borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Assignment sx={{ fontSize: 18, color: 'var(--brand-primary)' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)' }}>Material List</Typography>
                        </Box>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>Material Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>Manufacturer</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>Part No.</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>Qty</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map((item, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ py: 1.5, fontWeight: 500 }}>{item.materialName}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{item.manufacturerName}</TableCell>
                                        <TableCell align="center" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{item.supplierPartNumber}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
};

export default BOMReviewDialog;
