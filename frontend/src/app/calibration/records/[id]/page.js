"use client";
import React, { Suspense } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Divider,
    Chip,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    Container,
    Fade,
    Card,
    CardContent,
    Button
} from "@mui/material";
import {
    ArrowBack,
    Print,
    VerifiedUser,
    PrecisionManufacturing,
    LocationOn,
    CalendarMonth,
    FileDownload
} from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { mockEquipmentData } from "../../mockData";

// Gradient Card Component
const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2 }}>
        <Box
            sx={{
                p: 2,
                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
            }}
        >
            {Icon && <Icon />}
            <Typography variant="h6" fontWeight={600} color={"white"}>
                {title}
            </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
            {children}
        </CardContent>
    </Card>
);



function EquipmentCalibrationRecordContent() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const equipmentData = mockEquipmentData.find(e => e.id === parseInt(id));

    if (!equipmentData) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" color="error">Equipment not found</Typography>
                <Button onClick={() => router.push('/calibration')} sx={{ mt: 2 }} variant="outlined">Back to List</Button>
            </Container>
        );
    }

    const equipment = {
        name: equipmentData.equipmentName,
        masterId: equipmentData.masterId,
        serialNo: equipmentData.serialNumber || "N/A",
        manufacturer: equipmentData.manufacturer || "N/A",
        model: equipmentData.model || "N/A",
        location: equipmentData.location,
        department: equipmentData.department || "N/A",
        description: equipmentData.remarks || "No description provided",
        calibrationInterval: equipmentData.frequency,
        lastCalibrated: equipmentData.lastCalibration || equipmentData.lastCalibrationDate,
        nextDue: equipmentData.dueDate || equipmentData.nextDueDate,
        status: equipmentData.status,
        docNo: equipmentData.certificateNo || "N/A",
        revision: "00" // Mock revision
    };

    const records = [
        {
            nextDueDate: "2024-08-15",
            dateCalibrated: "2023-08-15",
            calibratedBy: "External (Fluke Calibration)",
            source: "Calibration Standard #STD-01",
            certificateNo: "CAL-2023-08-001",
            condition: "Good"
        },
        {
            nextDueDate: "2023-08-15",
            dateCalibrated: "2023-02-10",
            calibratedBy: "External (Fluke Calibration)",
            source: "Calibration Standard #STD-01",
            certificateNo: "CAL-2023-02-045",
            condition: "Out of Tolerance"
        },
        {
            nextDueDate: "2023-02-10",
            dateCalibrated: "2022-08-14",
            calibratedBy: "External (Fluke Calibration)",
            source: "Calibration Standard #STD-01",
            certificateNo: "CAL-2022-08-112",
            condition: "Excellent"
        }
    ];

    return (
        <Fade in={true}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }} className="no-print">
                    <Tooltip title="Back to Calibration List">
                        <IconButton
                            onClick={() => router.push('/calibration')}
                            sx={{
                                color: "rgb(17, 114, 186)",
                                bgcolor: "#f1f5f9",
                                "&:hover": { bgcolor: "#e2e8f0" }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" fontWeight={700} color="#1e293b">
                            Equipment Calibration Record
                        </Typography>
                        <Typography variant="body2" color="#64748b">
                            Viewing full calibration history for {equipment.masterId}
                        </Typography>
                    </Box>
                    <Tooltip title="Print Record">
                        <IconButton
                            onClick={() => window.print()}
                            sx={{
                                color: "#0891b2",
                                bgcolor: "#ecfeff",
                                "&:hover": { bgcolor: "#cffafe" }
                            }}
                        >
                            <Print />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download PDF">
                        <IconButton
                            sx={{
                                color: "#0891b2",
                                bgcolor: "#ecfeff",
                                "&:hover": { bgcolor: "#cffafe" }
                            }}
                        >
                            <FileDownload />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Grid container spacing={2}>
                    {/* Main Document Area */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                overflow: "hidden",
                                bgcolor: "#fff"
                            }}
                        >
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                {/* Equipment Header */}
                                <Box sx={{ mb: 4 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box>
                                            <Typography variant="overline" sx={{ color: "#1172ba", fontWeight: 800, letterSpacing: 1.5 }}>
                                                CALIBRATION RECORD - FRM18-02
                                            </Typography>
                                            <Typography variant="h4" fontWeight={800} color="#0f172a" sx={{ mt: 0.5 }}>
                                                {equipment.name}
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" sx={{ mt: 1, fontFamily: 'monospace' }}>
                                                ID: {equipment.masterId} | S/N: {equipment.serialNo}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={equipment.status}
                                            size="medium"
                                            sx={{
                                                bgcolor: "#dcfce7",
                                                color: "#15803d",
                                                fontWeight: 800,
                                                fontSize: "0.75rem",
                                                textTransform: "uppercase",
                                                letterSpacing: 0.5,
                                                px: 2
                                            }}
                                        />
                                    </Box>
                                    <Divider />
                                </Box>

                                {/* Equipment Specifications */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle1" fontWeight={700} color="#1e293b" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PrecisionManufacturing sx={{ color: '#1172ba' }} /> Equipment Specifications
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Paper sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Typography variant="caption" color="#64748b" fontWeight={700}>MANUFACTURER</Typography>
                                                <Typography variant="body1" fontWeight={600}>{equipment.manufacturer}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Paper sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Typography variant="caption" color="#64748b" fontWeight={700}>MODEL</Typography>
                                                <Typography variant="body1" fontWeight={600}>{equipment.model}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Paper sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Typography variant="caption" color="#64748b" fontWeight={700}>LOCATION</Typography>
                                                <Typography variant="body1" fontWeight={600}>{equipment.location}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Paper sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Typography variant="caption" color="#64748b" fontWeight={700}>DEPARTMENT</Typography>
                                                <Typography variant="body1" fontWeight={600}>{equipment.department}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Paper sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Typography variant="caption" color="#64748b" fontWeight={700}>DESCRIPTION</Typography>
                                                <Typography variant="body2">{equipment.description}</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Calibration History Table */}
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={700} color="#1e293b" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba' }} /> Calibration History Log
                                    </Typography>
                                    <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                                        <Table>
                                            <TableHead sx={{ bgcolor: '#f8fafc' }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>DATE CALIBRATED</TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>BY / SOURCE</TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>CERTIFICATE NO</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>CONDITION</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>NEXT DUE</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {records.map((row, idx) => (
                                                    <TableRow key={idx} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                                                        <TableCell>
                                                            <Typography variant="body2" fontWeight={700} color="#1e293b">
                                                                {new Date(row.dateCalibrated).toLocaleDateString("en-GB", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" fontWeight={700} color="#1172ba">{row.calibratedBy}</Typography>
                                                            <Typography variant="caption" color="#64748b">{row.source}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#64748b' }}>
                                                                {row.certificateNo}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={row.condition}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: row.condition.includes('Out') ? '#fee2e2' : '#dcfce7',
                                                                    color: row.condition.includes('Out') ? '#b91c1c' : '#15803d',
                                                                    fontWeight: 800,
                                                                    fontSize: "0.65rem",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: 0.5,
                                                                    borderRadius: 1.5
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Typography variant="body2" fontWeight={700} color="#0f172a">
                                                                {new Date(row.nextDueDate).toLocaleDateString("en-GB", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </Box>

                                {/* Document Footer */}
                                <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="caption" color="#64748b">Document No</Typography>
                                        <Typography variant="body2" fontWeight={700}>{equipment.docNo}</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="caption" color="#64748b">Revision</Typography>
                                        <Typography variant="body2" fontWeight={700}>{equipment.revision}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{ position: 'sticky', top: 20 }}>
                            {/* Calibration Status */}
                            <GradientCard title="Calibration Status" icon={CalendarMonth}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="#64748b" fontWeight={700}>LAST CALIBRATED</Typography>
                                    <Typography variant="h6" fontWeight={700} color="#1e293b">
                                        {new Date(equipment.lastCalibrated).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="#64748b" fontWeight={700}>NEXT DUE DATE</Typography>
                                    <Typography variant="h6" fontWeight={700} color="#1172ba">
                                        {new Date(equipment.nextDue).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box>
                                    <Typography variant="caption" color="#64748b" fontWeight={700}>FREQUENCY</Typography>
                                    <Chip
                                        label={equipment.calibrationInterval}
                                        size="small"
                                        sx={{ mt: 1, bgcolor: '#eff6ff', color: '#1172ba', fontWeight: 700 }}
                                    />
                                </Box>
                            </GradientCard>

                            {/* Quick Actions */}
                            <Paper sx={{ p: 2, mt: 2, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                <Typography variant="subtitle2" fontWeight={700} color="#64748b" sx={{ mb: 2 }}>
                                    QUICK ACTIONS
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Chip
                                        label="Add Calibration Event"
                                        clickable
                                        sx={{
                                            bgcolor: '#1172ba',
                                            color: 'white',
                                            fontWeight: 600,
                                            height: 40,
                                            '&:hover': { bgcolor: '#0d5a94' }
                                        }}
                                    />
                                    <Chip
                                        label="Update Equipment Info"
                                        clickable
                                        onClick={() => router.push(`/calibration/register-equipment?id=${id}`)}
                                        sx={{
                                            bgcolor: '#f1f5f9',
                                            color: '#475569',
                                            fontWeight: 600,
                                            height: 40,
                                            '&:hover': { bgcolor: '#e2e8f0' }
                                        }}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

                {/* Print Styles */}
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

export default function EquipmentCalibrationRecord({ params }) {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Calibration Record..." />}>
            <EquipmentCalibrationRecordContent />
        </Suspense>
    );
}
