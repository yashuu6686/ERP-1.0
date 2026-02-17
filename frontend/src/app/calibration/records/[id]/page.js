"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Stack,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Container,
    Fade,
    Divider,
    Tooltip
} from "@mui/material";
import {
    ArrowBack,
    Print,
    Download,
    Edit,
    CheckCircle,
    Warning,
    EventNote,
    PrecisionManufacturing,
    CalendarMonth,
    Place,
    Business,
    Badge,
    Category,
    Schedule,
    Cancel,
    VerifiedUser,
    Description,
    Notes
} from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import NotificationService from "@/services/NotificationService";

// --- Styled Components (Internal) ---

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

const SectionCard = ({ title, children }) => (
    <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2.5 }}>
            {title}
        </Typography>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '2px solid #f1f5f9', height: '100%' }}>
            <Stack spacing={3}>
                {children}
            </Stack>
        </Paper>
    </Grid>
);

const SummaryRow = ({ label, value, isTotal = false, isAlert = false }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography variant={isTotal ? "subtitle1" : "body2"} color={isTotal ? "#0f172a" : "#64748b"} fontWeight={isTotal ? 800 : 500}>
            {label}
        </Typography>
        <Typography
            variant={isTotal ? "h6" : "body2"}
            fontWeight={isTotal ? 900 : 700}
            color={isAlert ? "#ef4444" : isTotal ? "#1172ba" : "#1e293b"}
            sx={{ fontFamily: 'monospace' }}
        >
            {value || "-"}
        </Typography>
    </Box>
);

export default function ViewCalibrationRecord() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipment = async () => {
            if (!id) return;
            try {
                const response = await axiosInstance.get(`/calibration-equipment/${id}`);
                setEquipment(response.data);
            } catch (error) {
                console.error("Failed to fetch equipment:", error);
                NotificationService.notify("Error", "Failed to load equipment details", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchEquipment();
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Record..." />;
    if (!equipment) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Record Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/calibration")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to List
            </Button>
        </Box>
    );

    const getStatusConfig = (status, dueDate) => {
        const isOverdue = new Date(dueDate) < new Date();
        const date = new Date(dueDate);
        const today = new Date();
        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isDueSoon = diffDays <= 30 && diffDays > 0;

        if (status === "Failed" || isOverdue) {
            return { color: "#991b1b", bg: "#fee2e2", border: "#fecaca", icon: <Warning />, label: status === "Failed" ? "Out of Service" : "Overdue" };
        } else if (isDueSoon || status === "Due Soon") {
            return { color: "#92400e", bg: "#fef3c7", border: "#fde68a", icon: <EventNote />, label: "Due Soon" };
        }
        return { color: "#166534", bg: "#dcfce7", border: "#bbedc2", icon: <CheckCircle />, label: status || "Calibrated" };
    };

    const statusConfig = getStatusConfig(equipment.status, equipment.nextDueDate);

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions (Matches PurchaseViewHeader) */}
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
                        onClick={() => router.push("/calibration")}
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
                        <Tooltip title="Print Record">
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
                        <Tooltip title="Download PDF">
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
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
                                Download
                            </Button>
                        </Tooltip>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => router.push(`/calibration/register-equipment?id=${id}`)}
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
                            Edit Record
                        </Button>
                    </Stack>
                </Stack>

                <Grid container spacing={2}>
                    {/* Main Document Area (Matches Purchase Layout 9/12) */}
                    <Grid item xs={12} lg={9} size={{ xs: 12, lg: 9 }}>
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
                                {/* Title and Status Section (Matches PurchaseDetails) */}
                                <Box>
                                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                                                {equipment.equipmentName}
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Calibration Record
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={equipment.masterId}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    icon={React.cloneElement(statusConfig.icon, { sx: { fontSize: '18px !important' } })}
                                                    label={statusConfig.label}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: statusConfig.bg,
                                                        color: statusConfig.color,
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem',
                                                        border: `1px solid ${statusConfig.border}`,
                                                        "& .MuiChip-icon": { color: statusConfig.color }
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={CalendarMonth}
                                                label="Last Calibration"
                                                value={new Date(equipment.lastCalibrationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            />
                                            <InfoItem
                                                icon={Schedule}
                                                label="Next Due Date"
                                                value={new Date(equipment.nextDueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                color={new Date(equipment.nextDueDate) < new Date() ? "#ef4444" : "#1172ba"}
                                            />
                                        </Stack>
                                    </Stack>
                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />
                                </Box>

                                {/* Entity Information Section (Matches EntityInformation) */}
                                <Grid container spacing={4} sx={{ mb: 6 }}>

                                <Grid spacing={4} size={{ xs: 12, lg: 6 }} >
                                    <SectionCard title="Equipment Details">
                                        <Box>
                                            <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 1 }}>{equipment.manufacturer}</Typography>
                                            <Typography variant="body2" sx={{ color: "#64748b" }}>Model: {equipment.model}</Typography>
                                        </Box>
                                        <Stack spacing={1.5}>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Badge sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                <Typography variant="body2" fontWeight={600}>Serial: {equipment.serialNumber}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Category sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                <Typography variant="body2" fontWeight={600}>Sub-ID: {equipment.subDeviceId}</Typography>
                                            </Stack>
                                        </Stack>
                                    </SectionCard>
                                </Grid>

                                <Grid spacing={4} size={{ xs: 12, lg: 6 }} >

                                    <SectionCard title="Location & Department">
                                        <Box>
                                            <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ mb: 1 }}>{equipment.department}</Typography>
                                            <Typography variant="body2" sx={{ color: "#64748b" }}>Assigned Department</Typography>
                                        </Box>
                                        <Stack spacing={1.5}>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Place sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                <Typography variant="body2" fontWeight={600}>{equipment.location}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Business sx={{ color: "#94a3b8", fontSize: 18 }} />
                                                <Typography variant="body2" fontWeight={600}>Main Facility</Typography>
                                            </Stack>
                                        </Stack>
                                    </SectionCard>
                                </Grid>
                                </Grid>


                                {/* Items Table Section (Matches PurchaseItemsTable) */}
                                <Box sx={{ mb: 6 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <VerifiedUser sx={{ color: '#1172ba' }} /> Calibration History
                                        </Typography>
                                        <Typography variant="body2" color="#64748b" fontWeight={600}>
                                            {equipment.history?.length || 0} Records Found
                                        </Typography>
                                    </Stack>

                                    <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>DATE</TableCell>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>CERTIFICATE NO</TableCell>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>PERFORMED BY</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>RESULT</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {equipment.history && equipment.history.length > 0 ? (
                                                    equipment.history.map((hist, idx) => (
                                                        <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                            <TableCell sx={{ color: "#1e293b", fontWeight: 700 }}>
                                                                {new Date(hist.date).toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell sx={{ fontFamily: 'monospace', color: "#64748b", fontWeight: 600 }}>
                                                                {hist.certificateNo}
                                                            </TableCell>
                                                            <TableCell sx={{ color: "#64748b", fontWeight: 600 }}>
                                                                {hist.performedBy}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Chip
                                                                    label={hist.result || "Pass"}
                                                                    size="small"
                                                                    sx={{
                                                                        fontWeight: 800,
                                                                        bgcolor: hist.result === "Fail" ? "#fee2e2" : "#eff6ff",
                                                                        color: hist.result === "Fail" ? "#b91c1c" : "#1172ba",
                                                                        borderRadius: '6px'
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                                                            No history available
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar / Summary Area (Matches PurchaseSummarySidebar) */}
                    <Grid item xs={12} lg={3} size={{ xs: 12, lg: 3 }}>
                        <Stack spacing={2}>
                            {/* Calibration Summary */}
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PrecisionManufacturing sx={{ color: '#1172ba', fontSize: 20 }} /> Summary
                                </Typography>

                                <Stack spacing={0.5}>
                                    <SummaryRow
                                        label="Frequency"
                                        value={equipment.frequency}
                                        isTotal
                                    />
                                    <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                    <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 3, border: '1px solid #bae6fd', textAlign: 'center' }}>
                                        <Typography variant="caption" sx={{ color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                                            Certificate No
                                        </Typography>
                                        <Typography variant="subtitle1" fontWeight={900} color="#1172ba" sx={{ fontFamily: 'monospace' }}>
                                            {equipment.certificateNo || "N/A"}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            {/* Remarks / Notes */}
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Notes sx={{ color: '#1172ba', fontSize: 20 }} /> Remarks
                                </Typography>
                                <Stack spacing={2.5}>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                        {equipment.remarks || "No additional remarks recorded for this equipment."}
                                    </Typography>
                                    <Divider />
                                    <InfoItem icon={VerifiedUser} label="Calibrated By" value={equipment.calibratedBy} />
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Print Context Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
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
