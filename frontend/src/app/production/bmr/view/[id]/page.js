"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
    Box,
    Typography,
    Grid,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
    Chip,
    IconButton,
    Container,
    Fade
} from "@mui/material";
import {
    ChevronLeft,
    Print,
    Download,
    Assignment,
    CheckCircle,
    VerifiedUser,
    Person,
    CalendarMonth,
    BatchPrediction,
    Inventory,
    Numbers
} from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";

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

const SectionHeader = ({ title, icon: Icon, color = "#1172ba" }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: `${color}15`, color: color, display: 'flex' }}>
            {Icon && <Icon sx={{ fontSize: 20 }} />}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
            {title}
        </Typography>
    </Box>
);

function BMRViewContent() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const { showNotification } = useNotification();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchBMR();
        }
    }, [id]);

    const fetchBMR = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/production-bmr/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching BMR:", error);
            showNotification("Failed to load BMR details", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Securely Loading BMR..." />;
    if (!data) return (
        <Box sx={{ p: 4, textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" color="error" fontWeight={600}>BMR Record Not Found</Typography>
            <Button variant="contained" startIcon={<ChevronLeft />} onClick={() => router.push("/production/bmr")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to List
            </Button>
        </Box>
    );

    const checklistItems = [
        { id: 1, label: "Batch Manufacturing Record", code: "" },
        { id: 2, label: "Line Clearance Checklist", code: "FRM13-03" },
        { id: 3, label: "Rejection Material Transfer Slip", code: "FRM13-04" },
        { id: 4, label: "Final Inspection Report", code: "FRM23-07" },
        { id: 5, label: "Product Transfer Slip", code: "FRM13-05" },
        { id: 6, label: "Packaging & Labeling Verification Form", code: "FRM22-02" },
        { id: 7, label: "COA (Certificates of Analysis)", code: "FRM13-07" },
    ];

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }} className="no-print">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={() => router.push("/production/bmr")}
                            sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', "&:hover": { bgcolor: '#f8fafc' } }}
                        >
                            <ChevronLeft />
                        </IconButton>
                        <Box>
                            <Typography variant="h5" fontWeight={800} color="#1e293b" sx={{ letterSpacing: '-0.02em' }}>
                                View Batch Manufacturing Record
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                ID: {id} | Created: {new Date(data.createdAt || data.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<Print />}
                            onClick={() => window.print()}
                            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, px: 3, border: '1px solid #e2e8f0', color: '#64748b' }}
                        >
                            Print Document
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            sx={{
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 4,
                                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                            }}
                        >
                            Download PDF
                        </Button>
                    </Stack>
                </Box>

                <Grid container spacing={2}>
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
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                {/* Title Section */}
                                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                    <Box>
                                        <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                                            BMR REPORT
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                            Batch Manufacturing Status & Verification
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip label={data.bmrNo} sx={{ fontWeight: 700, bgcolor: "#f1f5f9", color: "#0f172a", borderRadius: '8px', fontSize: '0.95rem' }} />
                                            <Chip
                                                icon={<CheckCircle sx={{ fontSize: '18px !important' }} />}
                                                label="Completed"
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#dcfce7",
                                                    color: "#166534",
                                                    borderRadius: '8px',
                                                    fontSize: '0.85rem',
                                                    border: '1px solid #bbedc2'
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Stack spacing={2} sx={{ minWidth: 280 }}>
                                        <InfoItem icon={CalendarMonth} label="Record Date" value={data.date} />
                                        <InfoItem icon={BatchPrediction} label="Batch No" value={data.batchNo} />
                                    </Stack>
                                </Stack>

                                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                {/* Document Content */}
                                <Box sx={{ mb: 6 }}>
                                    <SectionHeader title="Basic Production Information" icon={Inventory} />
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={3}>
                                                <InfoItem icon={Assignment} label="Product Name" value={data.productName} color="#1172ba" />
                                                <InfoItem icon={Numbers} label="Batch Quantity" value={data.batchQty} />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={3}>
                                                <InfoItem icon={Numbers} label="Serial Numbers" value={data.serialNo} />
                                                <Stack direction="row" spacing={4}>
                                                    <InfoItem icon={CalendarMonth} label="MFG Date" value={data.manufacturingDate} />
                                                    <InfoItem icon={CalendarMonth} label="EXP Date" value={data.expiryDate} color="#991b1b" />
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box>
                                    <SectionHeader title="Verification Checklist" icon={CheckCircle} color="#059669" />
                                    <TableContainer sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                                        <Table size="small">
                                            <TableHead sx={{ bgcolor: '#f8fafc' }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 700, py: 2 }}>#</TableCell>
                                                    <TableCell sx={{ fontWeight: 700 }}>Checklist Item</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {checklistItems.map((item) => (
                                                    <TableRow key={item.id} hover>
                                                        <TableCell sx={{ color: '#64748b' }}>{item.id}</TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                                                {item.label}
                                                            </Typography>
                                                            {item.code && (
                                                                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                                                    Code: {item.code}
                                                                </Typography>
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={data.checklist?.[item.id] || "No"}
                                                                size="small"
                                                                sx={{
                                                                    fontWeight: 800,
                                                                    fontSize: "0.65rem",
                                                                    borderRadius: 1.5,
                                                                    bgcolor: data.checklist?.[item.id] === 'Yes' ? '#dcfce7' : '#fee2e2',
                                                                    color: data.checklist?.[item.id] === 'Yes' ? '#15803d' : '#991b1b',
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar Area */}
                    <Grid item xs={12} lg={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                bgcolor: "#fff",
                                position: 'sticky',
                                top: 24
                            }}
                        >
                            <SectionHeader title="Sign-Off" icon={VerifiedUser} color="#6366f1" />
                            <Stack spacing={4}>
                                <InfoItem icon={Person} label="Reviewed By" value={data.reviewedBy} />
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <InfoItem icon={Person} label="Approved By" value={data.approvedBy} />
                            </Stack>

                            <Box sx={{ mt: 5, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, mb: 1, display: 'block', letterSpacing: '0.1em' }}>
                                    DOCUMENT STATUS
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CheckCircle sx={{ fontSize: 16 }} /> VERIFIED RECORD
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Print Context Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; padding: 20px; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .MuiGrid-item.lg-3 { display: none !important; }
                        .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                    }
                `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewBMR() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Digital Document..." />}>
            <BMRViewContent />
        </Suspense>
    );
}
