"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Divider,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack,
    Avatar,
} from "@mui/material";
import {
    ArrowBack,
    Inventory,
    Science,
    Assignment,
    VerifiedUser,
    Edit as EditIcon,
    Print as PrintIcon,
    CheckCircle,
    Cancel,
    ErrorOutline,
    People,
    Receipt,
    PrecisionManufacturing,
    Person
} from "@mui/icons-material";
import CommonCard from "@/components/CommonCard";
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

function ViewInspectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchInspection = async () => {
            try {
                setLoading(true);
                // Simulation data for now as we did for others
                const dummyData = {
                    productDetails: {
                        productName: "D8 Smart Device",
                        qualityStandard: "QMS-2025-V2",
                        checkedQuantity: "20",
                        inspectionDate: "2026-01-30",
                        checkNumber: id ? `FIN-INS-${id.padStart(4, '0')}` : "FIN-INS-0001",
                    },
                    checkDetails: [
                        { id: 1, parameters: "Visual Inspection", specification: "No scratches, clean finish", method: "Visual", observation: "Found 2 units with minor scratches", remarks: "Units rejected" },
                        { id: 2, parameters: "Functional Test", specification: "Power on, App sync", method: "Software link", observation: "All units syncing perfectly", remarks: "N/A" },
                        { id: 3, parameters: "Battery Voltage", specification: "3.7V - 4.2V", method: "Multimeter", observation: "AVG 3.85V", remarks: "Within spec" },
                    ],
                    inspectionSummary: {
                        acceptedQuantity: "18",
                        rejectedQuantity: "2",
                        holdScrapQuantity: "0",
                        other: "None",
                        comments: "Batch passed with minor rejections due to aesthetic defects. Electronic functionality is 100%."
                    },
                    approval: {
                        reviewedBy: "Sanjay Kumar",
                        reviewedDate: "2026-01-30",
                        approvedBy: "John Doe",
                        approvedDate: "2026-01-30",
                    }
                };

                // Simulate real API fetch
                setTimeout(() => {
                    setData(dummyData);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error fetching inspection:", error);
                setLoading(false);
            }
        };

        fetchInspection();
    }, [id]);

    if (loading) return <Loader fullPage message="Loading High Precision Inspection Report..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center" }}>Inspection report not found.</Box>;

    const { productDetails, checkDetails, inspectionSummary, approval } = data;

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
                            <PrecisionManufacturing />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>
                                {productDetails.checkNumber}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                                Production Inspection Log • Authenticated
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
                        Edit Report
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    {/* Left Column: Core Data */}
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #e2e8f0", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                                <Inventory sx={{ color: "#1172ba" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Production Details</Typography>
                            </Box>

                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Product Name" value={productDetails.productName} icon={Layers} /></Grid>
                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Quality Standard" value={productDetails.qualityStandard} icon={Assignment} /></Grid>
                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Batch Info" value="PRD-BATCH-V2" icon={Receipt} /></Grid>

                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Target Qty" value={productDetails.checkedQuantity} color="#1172ba" icon={PrecisionManufacturing} /></Grid>
                                <Grid item xs={12} sm={6} md={4}><InfoItem label="Inspection Date" value={productDetails.inspectionDate} icon={EventNote} /></Grid>
                            </Grid>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 0, borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                            <Box sx={{ p: 3, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Science sx={{ color: "#1172ba" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Validation Logs</Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: "#fff" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>Parameter</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>Control Method</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#1172ba" }}>Observation</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>Verdict</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {checkDetails.map((obs, index) => (
                                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { bgcolor: "#f1f5f9" } }}>
                                                <TableCell sx={{ py: 2.5 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{obs.parameters}</Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>Spec: {obs.specification}</Typography>
                                                </TableCell>
                                                <TableCell><Chip label={obs.method} size="small" variant="outlined" sx={{ fontWeight: 600, borderRadius: 1 }} /></TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>{obs.observation || "-"}</TableCell>
                                                <TableCell sx={{ color: "#64748b", fontStyle: "italic", fontSize: "0.85rem" }}>{obs.remarks || "No defects"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Right Column: Results & Signing */}
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
                                    <VerifiedUser fontSize="small" />
                                </Box>

                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Inspection Verdict</Typography>

                                <Stack spacing={3}>
                                    <Box sx={{ p: 2, bgcolor: "#ecfdf5", borderRadius: 2, border: "1px solid #10b981" }}>
                                        <Typography variant="caption" sx={{ color: "#047857", fontWeight: 800, textTransform: "uppercase" }}>Passed Quantity</Typography>
                                        <Typography variant="h4" sx={{ color: "#065f46", fontWeight: 900 }}>{inspectionSummary.acceptedQuantity}</Typography>
                                    </Box>

                                    <Box sx={{ p: 2, bgcolor: "#fef2f2", borderRadius: 2, border: "1px solid #ef4444" }}>
                                        <Typography variant="caption" sx={{ color: "#b91c1c", fontWeight: 800, textTransform: "uppercase" }}>Failed/Rejected</Typography>
                                        <Typography variant="h4" sx={{ color: "#991b1b", fontWeight: 900 }}>{inspectionSummary.rejectedQuantity}</Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 1.5 }}>
                                            QC Comments
                                        </Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#475569", bgcolor: "#f8fafc", p: 2, borderRadius: 2, border: "1px solid #e2e8f0" }}>
                                            {inspectionSummary.comments}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "#fff" }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Official Clearance</Typography>

                                <Stack spacing={3}>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><Person /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>EXAMINED BY</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{approval.reviewedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#1172ba" }}>{approval.reviewedDate}</Typography>
                                        </Box>
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Avatar sx={{ bgcolor: "#f0fdf4", color: "#15803d" }}><CheckCircle /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>MASTER APPROVAL</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{approval.approvedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#10b981" }}>{approval.approvedDate}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/production-inspection")}
                        sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
                    >
                        Back to Inspection Registry
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

const Layers = () => <Box sx={{ fontSize: 18 }}>•</Box>;
const EventNote = () => <Box sx={{ fontSize: 18 }}>•</Box>;

export default function ViewProductionInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Authenticating QC Record..." />}>
            <ViewInspectionContent />
        </Suspense>
    );
}
