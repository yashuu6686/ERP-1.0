import React from "react";
import { Card, Box, Typography, CardContent, Divider } from "@mui/material";
import { Assessment } from "@mui/icons-material";

const InvoiceSummarySection = () => {
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
                <Typography variant="subtitle1" fontWeight={600}>
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
                        { label: "Subtotal", value: "₹1,125" },
                        { label: "Discount", value: "-₹21,335" },
                        { label: "Other Discount", value: "-₹3,847" },
                        { label: "GST", value: "₹0" },
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
                            ₹25,222.50
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default InvoiceSummarySection;
