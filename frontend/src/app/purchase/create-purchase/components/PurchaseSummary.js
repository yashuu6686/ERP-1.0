import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useFormikContext } from "formik";

const PurchaseSummary = ({
    subtotal = 0,
    taxAmount = 0,
    discountAmount = 0,
    grandTotal = 0,
    otherDiscountAmount = 0,
}) => {
    const { values, setFieldValue, errors, touched, handleBlur } = useFormikContext();

    const handleNumberChange = (field) => (e) => {
        const val = e.target.value;
        if (val === "") {
            setFieldValue(field, "");
        } else {
            const parsed = parseFloat(val);
            setFieldValue(field, parsed < 0 ? 0 : parsed);
        }
    };

    const formatCurrency = (amount) => {
        const num = parseFloat(amount) || 0;
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
                <Card sx={{
                    background: "#f8fafc",
                    p: 2,
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                        display: "none",
                    },
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Discount (%)"
                                type="number"
                                size="small"
                                name="discount"
                                value={values.discount}
                                onChange={handleNumberChange("discount")}
                                onBlur={handleBlur}
                                error={touched.discount && Boolean(errors.discount)}
                                helperText={touched.discount && errors.discount}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                slotProps={{
                                    htmlInput: { step: "any", min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Tax Rate (%)"
                                type="number"
                                size="small"
                                name="taxRate"
                                value={values.taxRate}
                                onChange={handleNumberChange("taxRate")}
                                onBlur={handleBlur}
                                error={touched.taxRate && Boolean(errors.taxRate)}
                                helperText={touched.taxRate && errors.taxRate}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                slotProps={{
                                    htmlInput: { step: "any", min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Enter Shipping Charges"
                                type="number"
                                size="small"
                                name="shippingCharges"
                                value={values.shippingCharges}
                                onChange={handleNumberChange("shippingCharges")}
                                onBlur={handleBlur}
                                error={touched.shippingCharges && Boolean(errors.shippingCharges)}
                                helperText={touched.shippingCharges && errors.shippingCharges}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                slotProps={{
                                    htmlInput: { step: "any", min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Enter Other Discount (%)"
                                type="number"
                                size="small"
                                name="otherDiscount"
                                value={values.otherDiscount}
                                onChange={handleNumberChange("otherDiscount")}
                                onBlur={handleBlur}
                                error={touched.otherDiscount && Boolean(errors.otherDiscount)}
                                helperText={touched.otherDiscount && errors.otherDiscount}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                slotProps={{
                                    htmlInput: { step: "any", min: 0 }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Card>
                <Grid size={{ xs: 12 }} sx={{ mt: 4 }}>
                    <Paper sx={{ p: 3, border: "2px solid #1172ba", borderRadius: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography color="textSecondary">Subtotal:</Typography>
                            <Typography fontWeight={600}>₹{formatCurrency(subtotal)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography color="textSecondary">Tax ({values.taxRate || 0}%):</Typography>
                            <Typography fontWeight={600}>₹{formatCurrency(taxAmount)}</Typography>
                        </Box>
                        {(parseFloat(values.discount) || 0) > 0 && (
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography color="textSecondary">Discount ({values.discount}%):</Typography>
                                <Typography fontWeight={600} color="error">
                                    -₹{formatCurrency(discountAmount)}
                                </Typography>
                            </Box>
                        )}
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography color="textSecondary">Shipping Charges:</Typography>
                            <Typography fontWeight={600}>₹{formatCurrency(values.shippingCharges || 0)}</Typography>
                        </Box>
                        {(parseFloat(values.otherDiscount) || 0) > 0 && (
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography color="textSecondary">Other Discount ({values.otherDiscount}%):</Typography>
                                <Typography fontWeight={600} color="error">
                                    -₹{formatCurrency(otherDiscountAmount)}
                                </Typography>
                            </Box>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6" fontWeight={700}>
                                Grand Total:
                            </Typography>
                            <Typography variant="h6" fontWeight={700} color="primary">
                                ₹{formatCurrency(grandTotal)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PurchaseSummary;
