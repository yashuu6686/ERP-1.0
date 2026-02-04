import React from "react";
import { Paper, Typography, Stack, Box, Divider } from "@mui/material";
import { Payments, AccountBalanceWallet, Description } from "@mui/icons-material";
import { InfoItem } from "./PurchaseDetails";

const SummaryRow = ({ label, value, isTotal = false, isDiscount = false }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography variant={isTotal ? "subtitle1" : "body2"} color={isTotal ? "#0f172a" : "#64748b"} fontWeight={isTotal ? 800 : 500}>
            {label}
        </Typography>
        <Typography
            variant={isTotal ? "h6" : "body2"}
            fontWeight={isTotal ? 900 : 700}
            color={isDiscount ? "#ef4444" : isTotal ? "#1172ba" : "#1e293b"}
            sx={{ fontFamily: 'monospace' }}
        >
            {isDiscount ? `-₹${value}` : `₹${value}`}
        </Typography>
    </Box>
);

const PurchaseSummarySidebar = ({ totals, shippingCharges, otherDiscount, orderNumber }) => {
    return (
        <Stack spacing={2}>
            {/* Financial Summary */}
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Payments sx={{ color: '#1172ba', fontSize: 20 }} /> Order Summary
                </Typography>

                <Stack spacing={0.5}>
                    <SummaryRow label="Subtotal" value={totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} />
                    <SummaryRow label="Tax (GST)" value={totals.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} />

                    {shippingCharges > 0 && (
                        <SummaryRow label="Shipping" value={Number(shippingCharges).toLocaleString(undefined, { minimumFractionDigits: 2 })} />
                    )}

                    {(otherDiscount > 0 || totals.discountAmount > 0) && (
                        <SummaryRow
                            label="Discount"
                            value={(Number(otherDiscount) + totals.discountAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            isDiscount
                        />
                    )}

                    <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                    <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 3, border: '1px solid #bae6fd', textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                            Grand Total
                        </Typography>
                        <Typography variant="h5" fontWeight={900} color="#1172ba" sx={{ fontFamily: 'monospace' }}>
                            ₹{totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* Payment/Account Details */}
            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalanceWallet sx={{ color: '#1172ba', fontSize: 20 }} /> Accounting Info
                </Typography>
                <Stack spacing={2.5}>
                    <InfoItem icon={Description} label="PO Reference" value={orderNumber} />
                    <InfoItem icon={Payments} label="Payment Terms" value="Net 30 Days" />
                </Stack>
            </Paper>
        </Stack>
    );
};

export default PurchaseSummarySidebar;
