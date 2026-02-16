"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box, Grid, Typography, Paper, Divider, Button, Stack,
    Fade, Container, Tooltip, Chip
} from "@mui/material";
import {
    ArrowBack, Print, Edit, CheckCircle, Schedule,
    Download, CalendarMonth, AccessTime, AssignmentTurnedIn
} from "@mui/icons-material";
import CommonCard from "../../../components/ui/CommonCard";
import Loader from "../../../components/ui/Loader";

// Mock Checklist Points (consistent across components)
const CHECKLIST_POINTS = [
    "Whether left Over all Previous BATCH Material at Assembly Visual In process Inspection Station cleared/removed",
    "Whether Left Over all Previous BATCH Material at the Final Inspection Station Cleared/Removed",
    "Whether Post Assembly Inspection Station Pieces Storage Tray of Previous BATCH Cleared/Removed",
    "Whether Left Overall Previous BATCH Material at Primary Packing Station Cleared/Removed.",
    "Whether Rejected Semi Assembled Material Tray Cleared /Removed.",
    "Whether Post Assembly Inspection Rejected Material Polythene Bag Cleared/Removed",
    "Whether Left Over Material at Post Assembly Inspection Station Cleared /Removed.",
    "Whether Pouch Packed Pieces of Previous BATCH Cleared /Removed.",
    "Whether Packing Paper of Previous BATCH Cleared /Removed.",
    "Whether HM Paper of Previous BATCH Cleared /Removed.",
    "Whether Over Material Pouch Packing Station Cleared /Removed.",
    "Whether Table, Fixture & Machine is Properly Cleared For the new BATCH to be Started."
];

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b" }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
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
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem" }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
);

function ViewLineClearanceChecklistContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [checklist, setChecklist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Mock fetching data
            const timer = setTimeout(() => {
                setChecklist({
                    checklistNo: `LCC-2026-${id.padStart(3, '0')}`,
                    date: "2026-02-16",
                    bmrNo: "BMR/2026/015",
                    currentBatchNo: "BATCH-A12",
                    oldBatchNo: "BATCH-A11",
                    time: "10:30",
                    status: index => (index % 3 === 0 ? "Completed" : "Pending"), // Mock status logic
                    items: CHECKLIST_POINTS.map((point, i) => ({ point, response: i % 3 === 0 ? "No" : "Yes" })),
                    reviewedBy: "John Doe",
                    approvedBy: "Jane Smith",
                });
                setLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Securely Loading Checklist..." />;
    if (!checklist) return <Box sx={{ p: 4, textAlign: "center" }}><Typography color="error">Checklist not found.</Typography></Box>;

    return (
        <Fade in={!loading}>
            {/* <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}> */}
            <Box>
                {/* Header Actions */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                    sx={{ mb: 3 }}
                    className="no-print"
                >
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/line-clearance-checklist")}
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
                        Back to List
                    </Button>

                    <Stack direction="row" spacing={1.5}>
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
                                px: 3,
                                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                            }}
                        >
                            Print
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => router.push(`/line-clearance-checklist/create?id=${id}`)}
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                fontWeight: 600,
                                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                boxShadow: "0 4px 12px rgba(17, 114, 186, 0.25)",
                                px: 3,
                                "&:hover": {
                                    background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                                    boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                                },
                            }}
                        >
                            Edit Checklist
                        </Button>
                    </Stack>
                </Stack>

                <Grid container spacing={3}>
                    <Grid item xs={12} size={{ xs: 12, md: 12 }}>
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
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                {/* Document Header */}
                                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                    <Box>
                                        <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1, textTransform: "uppercase" }}>
                                            Line Clearance Checklist
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                            Quality Control & Manufacturing Compliance Document
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                                label={checklist.checklistNo}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#f1f5f9",
                                                    color: "#0f172a",
                                                    borderRadius: '8px',
                                                    fontSize: '0.95rem',
                                                    px: 1
                                                }}
                                            />
                                            <Chip
                                                icon={<CheckCircle sx={{ fontSize: '18px !important' }} />}
                                                label="Verified"
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#dcfce7",
                                                    color: "#15803d",
                                                    borderRadius: '8px',
                                                    fontSize: '0.85rem',
                                                    border: `1px solid #bbedc2`,
                                                    "& .MuiChip-icon": { color: "#15803d" }
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Grid container spacing={2} sx={{ maxWidth: 600 }}>
                                        <Grid item xs={6}>
                                            <InfoItem icon={CalendarMonth} label="Checklist Date" value={checklist.date} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InfoItem icon={AccessTime} label="Execution Time" value={checklist.time} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InfoItem icon={AssignmentTurnedIn} label="BMR No." value={checklist.bmrNo} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InfoItem icon={AssignmentTurnedIn} label="Current Batch No." value={checklist.currentBatchNo} />
                                        </Grid>
                                    </Grid>
                                </Stack>

                                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                {/* Old Batch Reference */}
                                <Box sx={{ mb: 5, bgcolor: "#f8fafc", p: 2, borderRadius: 2, borderLeft: "4px solid #1172ba" }}>
                                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Old Batch Reference</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: "#1e293b" }}>{checklist.oldBatchNo}</Typography>
                                </Box>

                                {/* Checklist Points Table */}
                                <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 800, mb: 3 }}>Inspection Points Results</Typography>
                                <Box sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                                    <Box sx={{ display: "flex", bgcolor: "#f1f5f9", p: 2, borderBottom: "2px solid #e2e8f0" }}>
                                        <Typography sx={{ width: "70px", fontWeight: 800, color: "#475569", textAlign: "center" }}>S.No.</Typography>
                                        <Typography sx={{ flex: 1, fontWeight: 800, color: "#475569", px: 2 }}>Inspection Description</Typography>
                                        <Typography sx={{ width: "120px", fontWeight: 800, color: "#475569", textAlign: "center" }}>Result</Typography>
                                    </Box>
                                    {checklist.items.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                p: 2,
                                                borderBottom: index === checklist.items.length - 1 ? "none" : "1px solid #f1f5f9",
                                                bgcolor: index % 2 === 0 ? "#fff" : "#fcfcfd",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Typography sx={{ width: "70px", color: "#64748b", fontWeight: 600, textAlign: "center" }}>{index + 1}</Typography>
                                            <Typography sx={{ flex: 1, color: "#1e293b", fontWeight: 500, px: 2, fontSize: "0.95rem" }}>{item.point}</Typography>
                                            <Box sx={{ width: "120px", textAlign: "center" }}>
                                                <Chip
                                                    label={item.response}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 800,
                                                        fontSize: "0.7rem",
                                                        width: "60px",
                                                        bgcolor: item.response === "Yes" ? "#dcfce7" : "#fee2e2",
                                                        color: item.response === "Yes" ? "#15803d" : "#ef4444",
                                                        border: `1px solid ${item.response === "Yes" ? "#bbedc2" : "#fecaca"}`
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Footer Approvals */}
                                <Grid container spacing={4} sx={{ mt: 8 }}>
                                    <Grid item xs={6}>
                                        <Box sx={{ borderTop: "2px solid #e2e8f0", pt: 2, textAlign: "center" }}>
                                            <Typography variant="body1" fontWeight={800} sx={{ color: "#0f172a", mb: 0.5 }}>{checklist.reviewedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Reviewed By (QA)</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ borderTop: "2px solid #e2e8f0", pt: 2, textAlign: "center" }}>
                                            <Typography variant="body1" fontWeight={800} sx={{ color: "#0f172a", mb: 0.5 }}>{checklist.approvedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Approved By (Production Manager)</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Print Context Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .printable-area { padding: 0 !important; }
                    }
                `}</style>
            </Box>
        </Fade>
    );
}

export default function ViewLineClearanceChecklist() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Checklist Details..." />}>
            <ViewLineClearanceChecklistContent />
        </Suspense>
    );
}
