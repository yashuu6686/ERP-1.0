import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import Assessment from "@mui/icons-material/Assessment";

const InvoiceSummarySection = ({ formData = {}, products = [] }) => {
    const subtotal = products.reduce((sum, p) => sum + ((parseFloat(p.qty) || 0) * (parseFloat(p.price) || 0)), 0);
    const tax = products.reduce((sum, p) => sum + (parseFloat(p.taxAmount) || 0), 0);
    const discount = parseFloat(formData.discountAmount || formData.discount) || 0;
    const total = subtotal + tax - discount;
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Assessment sx={{ color: "#fff" }} />
                <Typography color="white" variant="subtitle1" fontWeight={600}>
                    Invoice Summary
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Box
                    sx={{
                        bgcolor: "#fff",
                        p: 2,
                        borderRadius: 2,
                        border: "1px dashed #cbd5e1",
                    }}
                >
                    {[
                        { label: "Subtotal", value: `₹${subtotal.toFixed(2)}` },
                        { label: "Tax (GST)", value: `₹${tax.toFixed(2)}` },
                        { label: "Discount", value: `-₹${discount.toFixed(2)}` },
                    ].map((item, idx) => (
                        <Box
                            key={idx}
                            sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}
                        >
                            <Typography color="textSecondary" variant="body2">
                                {item.label}
                            </Typography>
                            <Typography fontWeight={500}>{item.value}</Typography>
                        </Box>
                    ))}
                    <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0 }}>
                        <Typography variant="h6" fontWeight={700}>
                            Grand Total
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="primary">
                            ₹{total.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default InvoiceSummarySection;
