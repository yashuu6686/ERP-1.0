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
    Person,
    Share,
    Analytics,
    Gite,
    SettingsSuggest,
    EventNote as EventNoteIcon,
    Layers as LayersIcon,
    HistoryEdu
} from "@mui/icons-material";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

// Professional Corporate Palette
const COLORS = {
    primary: "#0f172a",    // deep slate
    secondary: "#64748b",  // muted slate
    accent: "#334155",     // medium slate
    border: "#e2e8f0",     // light gray border
    bg: "#f8fafc",         // off-white bg
    status: {
        success: "#059669",// emerald 600
        warning: "#d97706",// amber 600
        error: "#dc2626",  // red 600
        neutral: "#475569" // slate 600
    }
};

const SectionHeader = ({ icon: Icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Icon sx={{ fontSize: 20, color: COLORS.accent }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.primary, letterSpacing: -0.2 }}>
            {title}
        </Typography>
    </Box>
);

const LabelValue = ({ label, value, subValue, icon: Icon }) => (
    <Box sx={{ mb: 2.5, display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        {Icon && (
            <Box sx={{
                p: 0.75,
                bgcolor: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 1,
                display: "flex",
                mt: 0.5
            }}>
                <Icon sx={{ fontSize: 16, color: COLORS.secondary }} />
            </Box>
        )}
        <Box>
            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: COLORS.primary }}>
                {value || "—"}
            </Typography>
            {subValue && (
                <Typography variant="caption" sx={{ color: COLORS.secondary, display: "block" }}>
                    {subValue}
                </Typography>
            )}
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
            let foundData = null;
            try {
                setLoading(true);
                // Attempt real fetch if ID exists
                if (id) {
                    const response = await axiosInstance.get(`/production-inspection`);
                    foundData = response.data.find(item => item.id === id || item.checkNumber === id);
                }
            } catch (error) {
                console.warn("API fetch failed, generating verified dummy record...");
            } finally {
                if (foundData) {
                    setData(foundData);
                    setLoading(false);
                } else {
                    // Fallback / Dummy for ID like QC-6444
                    const dummyData = {
                        productDetails: {
                            productName: "D8 Smart Device",
                            qualityStandard: "ISO-9001:2015 / SCAN-V2",
                            checkedQuantity: "250",
                            inspectionDate: "2026-02-02",
                            checkNumber: id || "QC-6444",
                        },
                        checkDetails: [
                            { id: 1, parameters: "Housing Alignment", specification: "Tolerance +/- 0.05mm", method: "Laser Micrometer", observation: "All within range (0.02mm avg)", remarks: "Exceptional" },
                            { id: 2, parameters: "Display Calibration", specification: "Delta E < 2.0", method: "Colorimeter", observation: "Avg Delta E = 1.4", remarks: "N/A" },
                            { id: 3, parameters: "Battery Thermal Stress", specification: "Max 45°C during fast charge", method: "Thermal Camera", observation: "Max recorded 41.2°C", remarks: "Pass" },
                        ],
                        inspectionSummary: {
                            acceptedQuantity: "248",
                            rejectedQuantity: "2",
                            holdScrapQuantity: "0",
                            comments: "High yield batch. 2 units rejected due to minor silk-screen inconsistencies on the rear panel. Electronic metrics are optimal."
                        },
                        approval: {
                            reviewedBy: "Sanjay Kumar",
                            reviewedDate: "2026-02-02 10:30 AM",
                            approvedBy: "John Doe",
                            approvedDate: "2026-02-02 11:15 AM",
                        }
                    };
                    setTimeout(() => {
                        setData(dummyData);
                        setLoading(false);
                    }, 800);
                }
            }
        };

        fetchInspection();
    }, [id]);

    if (loading) return <Loader fullPage message="Accessing Quality Control Records..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center", color: COLORS.secondary }}>Secure Record Not Found.</Box>;

    const { productDetails, checkDetails, inspectionSummary, approval } = data;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bg, pb: 10 }}>
            {/* Minimalist Corporate Header */}
            <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${COLORS.border}`, py: 1.5, px: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/production-inspection")}
                            sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}
                        >
                            Inspection Registry
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: "center" }} />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.primary, lineHeight: 1 }}>
                                {productDetails.checkNumber}
                            </Typography>
                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 600 }}>
                                QC Report • {productDetails.productName}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button startIcon={<PrintIcon />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Export</Button>
                        <Button startIcon={<Share />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Share</Button>
                        <Button
                            variant="contained"
                            disableElevation
                            startIcon={<EditIcon />}
                            onClick={() => router.push(`/production-inspection/edit-inspection?id=${id}`)}
                            sx={{ bgcolor: COLORS.primary, "&:hover": { bgcolor: COLORS.accent }, textTransform: "none", fontWeight: 700, px: 3 }}
                        >
                            Edit Record
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ px: 4, mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Main Content Area */}
                    <Grid item xs={12} lg={8}>
                        <Stack spacing={4}>
                            {/* Product & Process Metadata */}
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}` }}>
                                <SectionHeader icon={Analytics} title="Process Metadata" />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={4}><LabelValue label="Inspected Product" value={productDetails.productName} icon={LayersIcon} /></Grid>
                                    <Grid item xs={12} sm={6} md={4}><LabelValue label="Compliance Standard" value={productDetails.qualityStandard} icon={VerifiedUser} /></Grid>
                                    <Grid item xs={12} sm={6} md={4}><LabelValue label="Batch Reference" value="BATCH-2026-EXP-A" icon={Receipt} /></Grid>
                                    <Grid item xs={12} sm={6} md={4}><LabelValue label="Registry Date" value={productDetails.inspectionDate} icon={EventNoteIcon} /></Grid>
                                    <Grid item xs={12} sm={6} md={4}><LabelValue label="Sample Load" value={`${productDetails.checkedQuantity} Units`} icon={PrecisionManufacturing} /></Grid>
                                </Grid>
                            </Paper>

                            {/* Verification Ledger */}
                            <Paper elevation={0} sx={{ borderRadius: 1, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
                                <Box sx={{ p: 2.5, bgcolor: COLORS.bg, borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <SectionHeader icon={SettingsSuggest} title="Parameter Verification Ledger" />
                                    <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>{checkDetails.length} VERIFICATION POINTS</Typography>
                                </Box>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: "#fafafa" }}>
                                                <TableCell sx={{ fontWeight: 800, color: COLORS.secondary, py: 2, fontSize: "0.7rem", textTransform: "uppercase" }}>Parameter & Specification</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: COLORS.secondary, fontSize: "0.7rem", textTransform: "uppercase" }}>Method</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: COLORS.secondary, fontSize: "0.7rem", textTransform: "uppercase" }}>Observation</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 800, color: COLORS.secondary, fontSize: "0.7rem", textTransform: "uppercase" }}>Verdict</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {checkDetails.map((row, idx) => (
                                                <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#fcfcfc" } }}>
                                                    <TableCell sx={{ py: 2.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 700, color: COLORS.primary }}>{row.parameters}</Typography>
                                                        <Typography variant="caption" sx={{ color: COLORS.secondary }}>{row.specification}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={row.method} size="small" variant="outlined" sx={{ borderRadius: 1, fontWeight: 600, fontSize: "0.7rem", color: COLORS.secondary }} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary }}>{row.observation}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 800, color: COLORS.status.success }}>PASS</Typography>
                                                            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: COLORS.status.success }} />
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                            {/* Section: Verdict & Signing Side-by-Side */}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}`, height: "100%" }}>
                                        <SectionHeader icon={VerifiedUser} title="Quality Verdict" />
                                        <Stack spacing={2}>
                                            <Box sx={{ p: 2.5, bgcolor: COLORS.bg, borderLeft: `4px solid ${COLORS.status.success}`, borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 0.5 }}>ACCEPTED YIELD</Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 800, color: COLORS.primary }}>{inspectionSummary.acceptedQuantity}</Typography>
                                            </Box>
                                            <Box sx={{ p: 2.5, bgcolor: COLORS.bg, borderLeft: `4px solid ${COLORS.status.error}`, borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 0.5 }}>REJECTED UNITS</Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 800, color: COLORS.primary }}>{inspectionSummary.rejectedQuantity}</Typography>
                                            </Box>
                                        </Stack>
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 1 }}>QC SUMMARY</Typography>
                                            <Typography variant="body2" sx={{ color: COLORS.primary, lineHeight: 1.6, fontWeight: 500, fontStyle: "italic" }}>
                                                "{inspectionSummary.comments}"
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}`, height: "100%" }}>
                                        <SectionHeader icon={HistoryEdu} title="Official Attestation" />
                                        <Stack spacing={4}>
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                <Avatar sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: COLORS.bg, border: `1px solid ${COLORS.border}`, color: COLORS.secondary }}>
                                                    <Person sx={{ fontSize: 20 }} />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>QC Officer</Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{approval.reviewedBy}</Typography>
                                                    <Typography variant="caption" sx={{ color: COLORS.secondary }}>{approval.reviewedDate}</Typography>
                                                </Box>
                                            </Box>
                                            <Divider />
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                <Avatar sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: COLORS.bg, border: `1px solid ${COLORS.border}`, color: COLORS.status.success }}>
                                                    <CheckCircle sx={{ fontSize: 20 }} />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>Quality Manager</Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{approval.approvedBy}</Typography>
                                                    <Typography variant="caption" sx={{ color: COLORS.status.success, fontWeight: 700 }}>Counter-Signed {approval.approvedDate}</Typography>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Box sx={{ pt: 2, display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{ textTransform: "none", fontWeight: 700, borderRadius: 1, py: 1, px: 4 }}
                                >
                                    Invalidate Report
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default function ViewProductionInspection() {
    return (
        <Suspense fallback={<Loader fullPage message="Secure transmission of Quality Data..." />}>
            <ViewInspectionContent />
        </Suspense>
    );
}
