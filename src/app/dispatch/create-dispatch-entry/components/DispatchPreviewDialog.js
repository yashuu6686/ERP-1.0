import React from "react";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import {
    LocalShipping,
    Business,
    Inventory,
    Person,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
} from "@mui/material";

export default function DispatchPreviewDialog({ open, onClose, onConfirm, values, loading }) {
    if (!values) return null;

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Review & Confirm Dispatch Details"
            icon={<LocalShipping />}
            headerInfo={{
                label1: "DISPATCH NO.",
                value1: values.dispatchNo || "TBD",
                label2: "DISPATCH DATE",
                value2: values.dispatchDate || "N/A"
            }}
            confirmLabel="Confirm & Ship"
            loading={loading}
        >
            <Grid container spacing={3}>
                {/* Shipping & Customer Details */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <LocalShipping sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shipping Information</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Tracking Number</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.trackingNumber || "N/A"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Carrier</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.courierCompany || "N/A"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Sales Platform</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.salesPlatform || "N/A"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Business sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer & Delivery</Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>{values.customerName}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Recipient: <b style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{values.contactPerson}</b></Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Phone: {values.contactNo}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5, lineHeight: 1.5, fontSize: '0.8125rem' }}>{values.deliveryAddress}</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Items Table */}
                <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>PRODUCT NAME</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>QUANTITY</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values.products.map((item, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ py: 2, fontWeight: 500 }}>{item.name || "N/A"}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Approvals Information */}
                <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personnel & Approvals</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4} size={{ xs: 4, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Packed By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.packedBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={4} size={{ xs: 4, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Approved By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.approvedBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={4} size={{ xs: 4, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Accounting By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.accountingBy || "N/A"}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
}
