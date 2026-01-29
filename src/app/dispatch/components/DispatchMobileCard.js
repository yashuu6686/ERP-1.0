import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Divider,
    Grid,
    Button,
    IconButton,
} from "@mui/material";
import { Visibility, Edit, Delete, LocalShipping, Warning, CheckCircle, Schedule, Download } from "@mui/icons-material";

const getStatusColor = (status) => {
    switch (status) {
        case "Shipped":
            return { bg: "#d1ecf1", color: "#0c5460", icon: <LocalShipping /> };
        case "Delivered":
            return { bg: "#d4edda", color: "#155724", icon: <CheckCircle /> };
        case "Pending":
            return { bg: "#fff3cd", color: "#856404", icon: <Schedule /> };
        case "Processing":
            return { bg: "#e2e3e5", color: "#383d41", icon: <Warning /> };
        default:
            return { bg: "#f8d7da", color: "#721c24", icon: <Warning /> };
    }
};

const formatDate = (dateString) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function DispatchMobileCard({ item, router }) {
    const statusInfo = getStatusColor(item.status);
    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 700,
                                color: "#1172ba",
                                fontSize: "1rem",
                                mb: 0.5,
                            }}
                        >
                            {item.order}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#666", fontSize: "0.875rem" }}
                        >
                            {item.product}
                        </Typography>
                    </Box>
                    <Chip
                        label={item.status}
                        size="small"
                        sx={{
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color,
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: "24px",
                        }}
                    />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Order Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatDate(item.orderDate)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Shipping Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatDate(item.shippingDate)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Platform
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.platform}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Contact
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.contact}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Address
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: "#333",
                                backgroundColor: "#f8f9fa",
                                p: 1,
                                borderRadius: "6px",
                            }}
                        >
                            {item.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Tracking Info
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: item.tracking === "-" ? "#999" : "#1172ba",
                            }}
                        >
                            {item.tracking}
                        </Typography>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        pt: 1.5,
                        borderTop: "1px solid #f0f0f0",
                    }}
                >
                    <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => router.push(`/dispatch/${item.id}`)}
                        sx={{
                            flex: 1,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            color: "#1172ba",
                            borderColor: "#1172ba",
                        }}
                        variant="outlined"
                    >
                        View
                    </Button>
                    <IconButton
                        size="small"
                        sx={{
                            color: "#6c757d",
                            border: "1px solid #6c757d",
                            borderRadius: "8px",
                        }}
                    >
                        <Download fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{
                            color: "#28a745",
                            border: "1px solid #28a745",
                            borderRadius: "8px",
                        }}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}
