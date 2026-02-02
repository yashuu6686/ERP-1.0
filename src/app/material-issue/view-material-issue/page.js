"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Divider,
    Chip,
    Paper,
    Button,
    Stack,
    Avatar,
} from "@mui/material";
import {
    ArrowBack,
    Inventory,
    Assignment,
    Print as PrintIcon,
    Edit as EditIcon,
    Person,
    HistoryEdu,
    Category,
    Layers,
    ProductionQuantityLimits,
    EventNote
} from "@mui/icons-material";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const InfoItem = ({ label, value, icon: Icon, color = "#1e293b" }) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
        {Icon && (
            <Box sx={{
                p: 0.75,
                bgcolor: "rgba(17, 114, 186, 0.05)",
                borderRadius: 1,
                color: "#1172ba",
                display: "flex",
                mt: 0.5
            }}>
                <Icon sx={{ fontSize: 18 }} />
            </Box>
        )}
        <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: color }}>
                {value || "-"}
            </Typography>
        </Box>
    </Box>
);

function ViewMaterialIssueContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState(null);

    // Simulation data
    const dummyRequest = {
        requestNo: `MIR-2026-${String(id || "001").padStart(3, '0')}`,
        productName: "D8 Smart Device",
        bomNumber: "BOM-SCAN-2025-01",
        requiredQty: 25,
        startDate: "2026-01-01",
        endDate: "2026-01-25",
        status: "Pending",
        requestedBy: "Sanjay Kumar",
        approvedBy: "John Doe",
        description: "Materials needed for the upcoming production batch of D8 devices. All items must be verified against current BOM standards."
    };

    useEffect(() => {
        const fetchRequest = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/material-issue/${id}`);
                setRequest(response.data);
            } catch (error) {
                console.error("Error fetching Material Request:", error);
                // Simulation fallback for specific ids or initial testing
                if (id === "cf7d" || id === "1" || id === "2") {
                    setRequest(dummyRequest);
                } else {
                    setRequest(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Professional Material Issue Request..." />;
    if (!request) return <Box sx={{ p: 4, textAlign: "center" }}>Material Request Not Found.</Box>;

    return (
        <Box sx={{ pb: 6, bgcolor: "#f8fafc" }}>
            {/* Professional Header Section */}
            <Box sx={{
                bgcolor: "#fff",
                borderBottom: "1px solid #e2e8f0",
                py: 3,
                px: 4,
                mb: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2
            }}>
                <Stack spacing={0.5}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: "#1172ba", width: 44, height: 44 }}>
                            <Category />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>
                                {request.requestNo}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                                Material Issue Request • Priority Execution
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Button
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={() => window.print()}
                        sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, borderColor: "#e2e8f0", color: "#475569" }}
                    >
                        Export PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                            bgcolor: "#1172ba",
                            boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                        }}
                    >
                        Edit Request
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    {/* Left Column: Core Request Info */}
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #e2e8f0", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                                <Inventory sx={{ color: "#1172ba" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Issue Specifications</Typography>
                            </Box>

                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={6}><InfoItem label="Product Name" value={request.productName} icon={Layers} /></Grid>
                                <Grid item xs={12} sm={6} md={6}><InfoItem label="Linked BOM" value={request.bomNumber} icon={Assignment} /></Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Box sx={{ p: 2, bgcolor: "rgba(17, 114, 186, 0.05)", borderRadius: 2, border: "1px solid rgba(17, 114, 186, 0.1)" }}>
                                        <InfoItem label="Required Quantity" value={`${request.requiredQty} Units`} icon={ProductionQuantityLimits} color="#1172ba" />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Production Start" value={request.startDate} icon={EventNote} /></Grid>
                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Production End" value={request.endDate} icon={EventNote} /></Grid>
                            </Grid>

                            <Divider sx={{ my: 4, borderStyle: "dashed" }} />

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                                <Assignment sx={{ color: "#64748b" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1rem" }}>Description / Purpose</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ lineHeight: 1.8, color: "#475569", bgcolor: "#f8fafc", p: 3, borderRadius: 2, border: "1px solid #e2e8f0" }}>
                                {request.description}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Right Column: Status & Authorization */}
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={3}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "#1172ba",
                                bgcolor: "#fff",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    p: 1.5,
                                    bgcolor: "#1172ba",
                                    color: "#fff",
                                    borderBottomLeftRadius: 12
                                }}>
                                    <HistoryEdu fontSize="small" />
                                </Box>

                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Request Status</Typography>

                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 1.5 }}>
                                            Current Phase
                                        </Typography>
                                        <Chip
                                            label={request.status}
                                            sx={{
                                                bgcolor: "#fff7ed",
                                                color: "#c2410c",
                                                fontWeight: 800,
                                                fontSize: "0.85rem",
                                                px: 1,
                                                border: "1px solid #fdba74"
                                            }}
                                        />
                                    </Box>

                                    <Divider />

                                    <Box>
                                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 2 }}>
                                            Authorization Sign-offs
                                        </Typography>

                                        <Stack spacing={3}>
                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b", width: 36, height: 36 }}><Person sx={{ fontSize: 20 }} /></Avatar>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>REQUESTED BY</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{request.requestedBy}</Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                <Avatar sx={{ bgcolor: "#f0fdf4", color: "#15803d", width: 36, height: 36 }}><HistoryEdu sx={{ fontSize: 20 }} /></Avatar>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>APPROVED BY</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{request.approvedBy || "Pending Review"}</Typography>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "#fff" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 1 }}>
                                    Administrative Notes
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                                    This request is generated automatically based on production planning module. All issues must be logged in the warehouse register upon physical movement of inventory.
                                </Typography>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/material-issue")}
                        sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
                    >
                        Back to Request List
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default function ViewMaterialIssue() {
    return (
        <Suspense fallback={<Loader fullPage message="Initializing Material Request..." />}>
            <ViewMaterialIssueContent />
        </Suspense>
    );
}
