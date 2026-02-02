import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import ListAlt from "@mui/icons-material/ListAlt";

const FullKitSection = ({ kitQty, setKitQty, additionalProducts }) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                height: "100%",
                boxShadow: "none",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    bgcolor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                }}
            >
                <Typography variant="subtitle2" fontWeight={700} color="#475569">
                    Full Kit Details
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        border: "1px solid #e2e8f0",
                        borderRadius: 2,
                        bgcolor: "white",
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={600} color="#1e293b">
                            D8 Kit
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                            Standard diagnostic assembly includes:
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5, mt: 1 }}>
                            {[
                                "Scanbo D8 Device", "BP Cuffs", "Large BP Cuff",
                                "Glucose Bottles", "Lancet Pouch", "Lancet Pen",
                                "USB Cable", "Plastic Shield", "Scanbo Jute Bag"
                            ].map((comp, idx) => (
                                <Typography key={idx} variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    • {comp}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <IconButton
                            onClick={() => setKitQty(Math.max(0, kitQty - 1))}
                            size="small"
                            sx={{ border: "1px solid #e2e8f0", bgcolor: "#f8fafc" }}
                        >
                            <Remove fontSize="small" />
                        </IconButton>
                        <Typography
                            fontWeight={700}
                            sx={{ minWidth: 24, textAlign: "center" }}
                        >
                            {kitQty}
                        </Typography>
                        <IconButton
                            onClick={() => setKitQty(kitQty + 1)}
                            size="small"
                            sx={{
                                border: "1px solid #e2e8f0",
                                bgcolor: "#f8fafc",
                                color: "#1172ba",
                            }}
                        >
                            <Add fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        border: "1px dashed #cbd5e1",
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        mb={2}
                        color="#475569"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <ListAlt fontSize="small" /> Order Summary
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Standard Kit (D8):
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="#0f172a">
                            {kitQty} units
                        </Typography>
                    </Box>

                    {additionalProducts.some((p) => p.name || p.quantity) && (
                        <>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography
                                variant="body2"
                                fontWeight={700}
                                color="#475569"
                                sx={{ mb: 1 }}
                            >
                                Additional Products:
                            </Typography>
                            {additionalProducts.map(
                                (product, idx) =>
                                    (product.name || product.quantity) && (
                                        <Box
                                            key={idx}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mb: 0.5,
                                            }}
                                        >
                                            <Typography variant="body2" color="textSecondary">
                                                {product.name || `Product ${idx + 1}`}:
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600}>
                                                {product.quantity || 0} units
                                            </Typography>
                                        </Box>
                                    )
                            )}
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default FullKitSection;
