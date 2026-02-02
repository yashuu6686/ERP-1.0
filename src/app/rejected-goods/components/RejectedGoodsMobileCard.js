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
import { Visibility, Edit, Delete, Warning, CheckCircle, Cancel } from "@mui/icons-material";

const getStatusColor = (status) => {
    switch (status) {
        case "total":
            return { bg: "#fff3cd", color: "#856404", label: "Pending" };
        case "return":
            return { bg: "#d1ecf1", color: "#0c5460", label: "Return to Vendor" };
        case "scrap":
            return { bg: "#f8d7da", color: "#721c24", label: "Scrapped" };
        default:
            return { bg: "#e2e3e5", color: "#383d41", label: status };
    }
};

const getSeverityIcon = (severity) => {
    switch (severity) {
        case "high":
            return <Cancel sx={{ fontSize: 18, color: "#dc3545" }} />;
        case "medium":
            return <Warning sx={{ fontSize: 18, color: "#ffc107" }} />;
        case "low":
            return <CheckCircle sx={{ fontSize: 18, color: "#28a745" }} />;
        default:
            return null;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function RejectedGoodsMobileCard({ item, onView, onEdit, onDelete }) {
    const statusInfo = getStatusColor(item.status);
    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
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
                            {item.rejectionId}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#666", fontSize: "0.875rem" }}
                        >
                            {item.goods}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {getSeverityIcon(item.severity)}
                        <Chip
                            label={statusInfo.label}
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
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={1.5}>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Source Type
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.sourceType}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}  >
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Source Ref
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.sourceRef}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Quantity
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#dc3545" }}
                        >
                            {item.qty} units
                        </Typography>
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                        <Typography

                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatDate(item.date)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="caption"
                            sx={{ color: "#999", display: "block", mb: 0.5 }}
                        >
                            Reason
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
                            {item.reason}
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
                        onClick={onView}
                        sx={{
                            flex: 1,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            color: "rgb(17, 114, 186)",
                            bgcolor: "#f1f5f9",
                            "&:hover": { bgcolor: "#e2e8f0" }
                        }}
                        variant="contained"
                    >
                        View
                    </Button>
                    <IconButton
                        size="small"
                        onClick={onEdit}
                        sx={{
                            color: "#ed6c02",
                            bgcolor: "#fff7ed",
                            "&:hover": { bgcolor: "#ffedd5" }
                        }}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={onDelete}
                        sx={{
                            color: "#dc2626",
                            bgcolor: "#fef2f2",
                            "&:hover": { bgcolor: "#fee2e2" }
                        }}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};
