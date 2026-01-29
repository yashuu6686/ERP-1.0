import React from "react";
import { Box, Grid, Card, TextField, Paper, Typography, Divider } from "@mui/material";

const PurchaseSummary = ({
    subtotal,
    taxRate,
    setTaxRate,
    discount,
    setDiscount,
    taxAmount,
    discountAmount,
    grandTotal,
}) => {
    return (
        <Grid container spacing={3}>
            <Grid item size={{ xs: 12, md: 12 }}>
                <Card sx={{ background: "#f8fafc", p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Discount (%)"
                                type="number"
                                size="small"
                                value={discount}
                                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                sx={{ bgcolor: "white" }}
                            />
                        </Grid>
                        <Grid item size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Tax Rate (%)"
                                type="number"
                                size="small"
                                value={taxRate}
                                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                sx={{ bgcolor: "white" }}
                            />
                        </Grid>
                        <Grid item size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Tax Rate (%)"
                                type="number"
                                size="small"
                                value={taxRate}
                                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                sx={{ bgcolor: "white" }}
                            />
                        </Grid>
                        <Grid item size={{ xs: 6, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Tax Rate (%)"
                                type="number"
                                size="small"
                                value={taxRate}
                                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                sx={{ bgcolor: "white" }}
                            />
                        </Grid>
                    </Grid>
                </Card>
                <Grid item size={{ xs: 12, md: 12 }} sx={{ mt: 4 }}>
                    <Paper sx={{ p: 3, border: "2px solid #1172ba", borderRadius: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography color="textSecondary">Subtotal:</Typography>
                            <Typography fontWeight={600}>₹{subtotal.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography color="textSecondary">Tax ({taxRate}%):</Typography>
                            <Typography fontWeight={600}>₹{taxAmount.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography color="textSecondary">Discount ({discount}%):</Typography>
                            <Typography fontWeight={600} color="error">
                                -₹{discountAmount.toFixed(2)}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6" fontWeight={700}>
                                Grand Total:
                            </Typography>
                            <Typography variant="h6" fontWeight={700} color="primary">
                                ₹{grandTotal.toFixed(2)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PurchaseSummary;
