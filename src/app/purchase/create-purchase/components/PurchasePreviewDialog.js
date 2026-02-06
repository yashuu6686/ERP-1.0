import React from 'react';
import FormReviewDialog from '@/components/ui/FormReviewDialog';
import { Receipt, LocalShipping, Business } from '@mui/icons-material';
import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const PurchasePreviewDialog = ({ open, onClose, onConfirm, data, totals, isEditMode }) => {
    if (!data) return null;

    const { orderInfo, supplier, delivery, items } = data;

    // Define sections based on the purchase order data
    const sections = [
        {
            title: "Supplier Information",
            icon: <Business />,
            mainTitle: supplier.companyName,
            items: [
                { label: "Representative", value: supplier.contactPerson, isBold: true },
                { label: "Phone", value: supplier.phone },
                { label: "Email", value: supplier.email },
                { value: supplier.address, mt: 0.5, lineHeight: 1.5 }
            ]
        },
        {
            title: "Delivery Details",
            icon: <LocalShipping />,
            mainTitle: delivery.deliverTo,
            items: [
                { label: "Invoice To", value: delivery.invoiceTo },
                { label: "Recipient", value: delivery.contactPerson, isBold: true },
                { label: "Phone", value: delivery.phone },
                { value: delivery.deliveryAddress, mt: 0.5, lineHeight: 1.5 }
            ]
        }
    ];

    // Define table data
    const tableData = {
        headers: [
            { label: "ITEM DESCRIPTION" },
            { label: "QTY", align: "right" },
            { label: "UNIT PRICE", align: "right" },
            { label: "TOTAL", align: "right" }
        ],
        rows: items.map(item => [
            { value: item.name, whiteSpace: 'pre-line' },
            { value: item.qty, isBold: true },
            { value: `₹${(parseFloat(item.price) || 0).toLocaleString()}`, color: 'var(--text-secondary)' },
            { value: `₹${(parseFloat(item.total) || 0).toLocaleString()}`, isBold: true }
        ])
    };

    // Define summary items
    const summary = [
        { label: "Subtotal", value: `₹${totals.subtotal.toLocaleString()}` },
        { label: `Tax (${data.taxRate}%)`, value: `₹${totals.taxAmount.toLocaleString()}` },
        ...(totals.discountAmount > 0 ? [
            { label: "Discount", value: `- ₹${totals.discountAmount.toLocaleString()}`, color: 'var(--success)' }
        ] : []),
        ...(parseFloat(data.shippingCharges) > 0 ? [
            { label: "Shipping", value: `₹${(parseFloat(data.shippingCharges) || 0).toLocaleString()}` }
        ] : []),
        { isDivider: true },
        { label: "Grand Total", value: `₹${totals.grandTotal.toLocaleString()}`, isTotal: true }
    ];

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title={isEditMode ? "Review & Update Purchase Order" : "Review Purchase Order"}
            icon={<Receipt />}
            headerInfo={{
                label1: "PO NUMBER",
                value1: `#${orderInfo.orderNumber}`,
                label2: "ORDER DATE",
                value2: orderInfo.orderDate
            }}
            confirmLabel={isEditMode ? "Confirm & Update Order" : "Confirm & Create Order"}
        >
            <Grid container spacing={3}>
                {/* Entities Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Business sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Supplier Information</Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>{supplier.companyName}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Representative: <b style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{supplier.contactPerson}</b></Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Phone: {supplier.phone}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Email: {supplier.email}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5, lineHeight: 1.5, fontSize: '0.8125rem' }}>{supplier.address}</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <LocalShipping sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery Details</Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>{delivery.deliverTo}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Invoice To: {delivery.invoiceTo}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Recipient: <b style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{delivery.contactPerson}</b></Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Phone: {delivery.phone}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5, lineHeight: 1.5, fontSize: '0.8125rem' }}>{delivery.deliveryAddress}</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Items Table */}
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                        <Table size="small">
                            <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>ITEM DESCRIPTION</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>QTY</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>UNIT PRICE</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>TOTAL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ whiteSpace: 'pre-line', py: 2, fontWeight: 500 }}>{item.name}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 600 }}>{item.qty}</TableCell>
                                        <TableCell align="right" sx={{ color: 'var(--text-secondary)' }}>₹{(parseFloat(item.price) || 0).toLocaleString()}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{(parseFloat(item.total) || 0).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Summary */}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Paper elevation={0} sx={{ p: 3, minWidth: 320, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Subtotal</Typography>
                                <Typography sx={{ fontWeight: 700 }}>₹{totals.subtotal.toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Tax ({data.taxRate}%)</Typography>
                                <Typography sx={{ fontWeight: 700 }}>₹{totals.taxAmount.toLocaleString()}</Typography>
                            </Box>
                            {totals.discountAmount > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                                    <Typography sx={{ fontWeight: 500 }}>Discount</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>- ₹{totals.discountAmount.toLocaleString()}</Typography>
                                </Box>
                            )}
                            {parseFloat(data.shippingCharges) > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Shipping</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{(parseFloat(data.shippingCharges) || 0).toLocaleString()}</Typography>
                                </Box>
                            )}
                            {totals.otherDiscountAmount > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                                    <Typography sx={{ fontWeight: 500 }}>Other Discount ({data.otherDiscount}%)</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>- ₹{totals.otherDiscountAmount.toLocaleString()}</Typography>
                                </Box>
                            )}
                            <Divider sx={{ my: 1, borderColor: 'var(--border-default)' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>Grand Total</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--brand-primary)', fontFamily: 'var(--font-manrope)' }}>
                                    ₹{totals.grandTotal.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
};

export default PurchasePreviewDialog;
