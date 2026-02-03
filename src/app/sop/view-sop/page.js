"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Devices from "@mui/icons-material/Devices";
import FactCheck from "@mui/icons-material/FactCheck";
import Inventory from "@mui/icons-material/Inventory";
import Print from "@mui/icons-material/Print";
import Business from "@mui/icons-material/Business";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import Engineering from "@mui/icons-material/Engineering";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import CheckCircle from "@mui/icons-material/CheckCircle";
import TaskAlt from "@mui/icons-material/TaskAlt";
import Person from "@mui/icons-material/Person";
import LocalShipping from "@mui/icons-material/LocalShipping";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

// Constant definitions matching the creation steps
const deviceTestingSteps = [
    { step: 1, task: "Preparation / Physical status" },
    { step: 2, task: "Temperature" },
    { step: 3, task: "Oxygen Saturation" },
    { step: 4, task: "Glucose" },
    { step: 5, task: "Blood Pressure" },
    { step: 6, task: "ECG Functionality" },
    { step: 7, task: "BP Cuffs" },
    { step: 8, task: "Large BP Cuff" },
    { step: 9, task: "Glucose Bottles" },
    { step: 10, task: "Lancet Pouch" },
    { step: 11, task: "USB cables" },
    { step: 12, task: "User Manual" },
    { step: 13, task: "Lancet pen" },
    { step: 14, task: "Plastic shield" },
    { step: 15, task: "Hologram stickers" },
    { step: 16, task: "Validity Stickers" },
    { step: 17, task: "Scanbo Jute bag" },
    { step: 18, task: "Finalize / Report" },
    { step: 19, task: "Final Check" },
];

const packagingSteps = [
    { step: 1, components: "Scanbo D8 Device" },
    { step: 2, components: "BP Cuffs" },
    { step: 3, components: "Large BP Cuff" },
    { step: 4, components: "Glucose Bottles" },
    { step: 5, components: "Lancet Pouch" },
    { step: 6, components: "Lancet Pen" },
    { step: 7, components: "USB Cable" },
    { step: 8, components: "Plastic Shield" },
    { step: 9, components: "Scanbo Jute Bag" },
    { step: 10, components: "All Assemble Component" },
    { step: 11, components: "Seal Package" },
    { step: 12, components: "Validity Stickers" },
    { step: 13, components: "Picture / Video" },
    { step: 14, components: "Final Check" },
];

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b", fullWidth = false }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: fullWidth ? '100%' : 'auto' }}>
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5
        }}>
            <Icon sx={{ color: "#1172ba", fontSize: 18 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.2 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4 }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
);

function ViewSOPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            fetchSOP();
        }
    }, [id]);

    const fetchSOP = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/sops/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching SOP:", error);
            // Fallback for demo
            setData({
                id: "sop_1",
                sopNumber: "SOP-2026-003",
                date: "2026-02-03",
                deviceId: "D8-PRO-X100",
                companyName: "MedTech Solutions Pvt Ltd",
                companyAddress: "Tech Park, Building 4A, Bangalore",
                assistedBy: "Rahul Verma",
                doneBy: "Karthik R",
                testingBy: "Quality Team A",
                testingDate: "2026-02-03",
                verifiedBy: "Sanjay Kumar",
                verifiedDate: "2026-02-03",
                packedBy: "Logistics Unit 2",
                checkedBy: "Supervisor John",
                testingResults: {
                    0: { status: "Pass", remarks: "Physical condition ok", parameter: "Visual", methodology: "Manual", expected: "No damage" },
                    1: { status: "Pass", remarks: "36.5C", parameter: "Temp Sensor", methodology: "Comparison", expected: "36-37C" },
                },
                packagingResults: {
                    0: { status: "Pass", remarks: "Included", parameter: "Device Unit", expected: "1 Unit" },
                    1: { status: "Pass", remarks: "Included", parameter: "Standard Cuff", expected: "1 Unit" },
                }
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Accessing SOP Registry..." />;

    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>SOP Record Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/sop")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to Registry
            </Button>
        </Box>
    );

    // Helper to get result object for a step index from the data map
    const getTestingResult = (idx) => data.testingResults && data.testingResults[idx] ? data.testingResults[idx] : {};
    const getPackagingResult = (idx) => data.packagingResults && data.packagingResults[idx] ? data.packagingResults[idx] : {};

    const StatusChip = ({ status }) => (
        <Chip
            label={status || "PENDING"}
            size="small"
            sx={{
                fontWeight: 800,
                bgcolor: status === 'Pass' ? "#dcfce7" : status === 'Fail' ? "#fee2e2" : "#f1f5f9",
                color: status === 'Pass' ? "#166534" : status === 'Fail' ? "#991b1b" : "#64748b",
                borderRadius: '6px',
                fontSize: '0.75rem',
                minWidth: 60
            }}
        />
    );

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 3 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/sop")}
                            sx={{
                                color: "#64748b",
                                fontWeight: 600,
                                textTransform: "none",
                                bgcolor: "rgba(255,255,255,0.8)",
                                px: 2,
                                borderRadius: '12px',
                                backdropFilter: "blur(4px)",
                                border: '1px solid #e2e8f0',
                                "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                            }}
                        >
                            Back to Registry
                        </Button>

                        <Stack direction="row" spacing={1.5}>
                            <Tooltip title="Print Document">
                                <Button
                                    variant="outlined"
                                    startIcon={<Print />}
                                    onClick={() => window.print()}
                                    sx={{
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        color: "#475569",
                                        borderColor: "#e2e8f0",
                                        bgcolor: "white",
                                        "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                                    }}
                                >
                                    Print
                                </Button>
                            </Tooltip>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => router.push(`/sop/create-sop?id=${id}`)}
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                    boxShadow: "0 4px 12px rgba(17, 114, 186, 0.25)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                                        boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                                    },
                                }}
                            >
                                Edit SOP
                            </Button>
                        </Stack>
                    </Stack>

                    <Grid container spacing={4}>
                        {/* Main Document Area */}
                        <Grid item xs={12} lg={9}>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 4,
                                    border: "1px solid #e2e8f0",
                                    overflow: "hidden",
                                    bgcolor: "#fff",
                                    position: 'relative'
                                }}
                            >
                                {/* Decorative Header Gradient */}
                                <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                                <Box sx={{ p: { xs: 3, md: 5 } }}>
                                    {/* Document Header */}
                                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                                                STANDARD PROCEDURE
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Quality Assurance Protocol
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={data.sopNumber}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    icon={<CheckCircle sx={{ fontSize: '18px !important' }} />}
                                                    label="ACTIVE"
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#dcfce7",
                                                        color: "#166534",
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={Devices}
                                                label="Target Device"
                                                value={data.deviceId}
                                            />
                                            <InfoItem
                                                icon={Business}
                                                label="Client Company"
                                                value={data.companyName}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Exec Team & Scope */}
                                    <Grid container spacing={6} sx={{ mb: 6 }}>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                                    <AssignmentInd sx={{ color: '#1172ba' }} /> EXECUTION DETAILS
                                                </Typography>
                                                <Stack spacing={2}>
                                                    <InfoItem icon={Person} label="Assisted By" value={data.assistedBy} />
                                                    <InfoItem icon={Engineering} label="Executed By" value={data.doneBy} />
                                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                                    <Typography variant="body2" color="#64748b" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                                                        Site: {data.companyAddress}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', height: '100%' }}>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                                    <FactCheck sx={{ color: '#1172ba' }} /> PROCESS METRICS
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <InfoItem icon={TaskAlt} label="Tests Configured" value={deviceTestingSteps.length} />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <InfoItem icon={LocalShipping} label="Pack Items" value={packagingSteps.length} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <InfoItem icon={VerifiedUser} label="Final Validator" value={data.checkedBy} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Testing Results Table */}
                                    <Box sx={{ mb: 6 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <FactCheck sx={{ color: '#1172ba' }} /> Testing Procedure Results
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>SR</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>TEST TASK</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>METHOD / PARAM</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>REMARKS</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>STATUS</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {deviceTestingSteps.map((stepItem, idx) => {
                                                        const result = getTestingResult(idx);
                                                        return (
                                                            <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                                <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{stepItem.step}</TableCell>
                                                                <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: '0.9rem' }}>{stepItem.task}</TableCell>
                                                                <TableCell>
                                                                    <Typography variant="caption" display="block" color="#64748b" fontWeight={600}>M: {result.methodology || "-"}</Typography>
                                                                    <Typography variant="caption" display="block" color="#64748b">P: {result.parameter || "-"}</Typography>
                                                                </TableCell>
                                                                <TableCell sx={{ color: "#334155", fontSize: '0.85rem', maxWidth: 200 }}>{result.remarks || "-"}</TableCell>
                                                                <TableCell align="right">
                                                                    <StatusChip status={result.status} />
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>

                                    {/* Packaging Results Table */}
                                    <Box>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Inventory sx={{ color: '#1172ba' }} /> Packaging Checklist
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>SR</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>COMPONENT</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>SPEC / EXPECTED</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>REMARKS</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", py: 1.5 }}>STATUS</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {packagingSteps.map((stepItem, idx) => {
                                                        const result = getPackagingResult(idx);
                                                        return (
                                                            <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                                <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{stepItem.step}</TableCell>
                                                                <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: '0.9rem' }}>{stepItem.components}</TableCell>
                                                                <TableCell>
                                                                    <Typography variant="caption" display="block" color="#64748b">S: {result.parameter || "-"}</Typography>
                                                                    <Typography variant="caption" display="block" color="#64748b">E: {result.expected || "-"}</Typography>
                                                                </TableCell>
                                                                <TableCell sx={{ color: "#334155", fontSize: '0.85rem', maxWidth: 200 }}>{result.remarks || "-"}</TableCell>
                                                                <TableCell align="right">
                                                                    <StatusChip status={result.status} />
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Sidebar / Signatures */}
                        <Grid item xs={12} lg={3}>
                            <Stack spacing={3}>
                                {/* Authorization Card */}
                                <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authorization
                                    </Typography>

                                    <Stack spacing={4}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><Person /></Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Tested By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.testingBy}</Typography>
                                                <Typography variant="caption" sx={{ color: "#1172ba", fontWeight: 700 }}>{data.testingDate}</Typography>
                                            </Box>
                                        </Stack>
                                        <Divider borderStyle="dashed" />
                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: "#dcfce7", color: "#166534" }}><CheckCircle /></Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Verified By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.verifiedBy}</Typography>
                                                <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>{data.verifiedDate}</Typography>
                                            </Box>
                                        </Stack>
                                        <Divider borderStyle="dashed" />
                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: "#fef3c7", color: "#d97706" }}><Inventory /></Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Packed By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{data.packedBy}</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Print Context Styles */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-item.lg-3 { display: none !important; }
                            .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                        }
                    `}} />
                </Container>
            </Box>
        </Fade>
    );
}

export default function ViewSOP() {
    return (
        <Suspense fallback={<Loader fullPage message="Accessing SOP Registry..." />}>
            <ViewSOPContent />
        </Suspense>
    );
}
