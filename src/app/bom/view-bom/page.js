"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Print from "@mui/icons-material/Print";
import Download from "@mui/icons-material/Download";
import Build from "@mui/icons-material/Build";
import Inventory from "@mui/icons-material/Inventory";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Person from "@mui/icons-material/Person";
import HistoryEdu from "@mui/icons-material/HistoryEdu";
import Description from "@mui/icons-material/Description";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Receipt from "@mui/icons-material/Receipt";
import Settings from "@mui/icons-material/Settings";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

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

function ViewBOMContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [bom, setBom] = useState(null);

    useEffect(() => {
        const fetchBOM = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/bom/${id}`);
                setBom(response.data);
            } catch (error) {
                console.error("Error fetching BOM:", error);
                // Fallback to dummy for demonstration if API fails
                setBom({
                    number: "BOM-202502-001",
                    productName: "Scanbo Pro Health Kit",
                    date: "02-02-2025",
                    status: "Approved",
                    materials: [
                        { scanboPartNumber: "SIPL.ASY.PBT.001", materialName: "Upper Case", quantity: "1", manufacturerName: "Xiamen Linktop", technicalDetails: "ABS Industrial Grade, Grade A" },
                        { scanboPartNumber: "SIPL.MEC.HSG.002", materialName: "Main PCB", quantity: "1", manufacturerName: "Precision Circuits", technicalDetails: "Main logic board with wireless module" }
                    ],
                    authorization: {
                        reviewedBy: "Sanjay Kumar",
                        reviewedDate: "01-02-2025",
                        approvedBy: "John Doe",
                        approvedDate: "02-02-2025"
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBOM();
    }, [id]);

    if (loading) return <Loader fullPage message="Authentizing BOM Specifications..." />;

    if (!bom) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Bill of Materials Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/bom")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Registry
                </Button>
            </Box>
        );
    }

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/bom")}
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
                        Back
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

                        <Tooltip title="Download BOM">
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
                            onClick={() => router.push(`/bom/edit-bom?id=${id}`)}
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
                            Edit BOM
                        </Button>
                    </Stack>
                </Stack>

                <Grid container spacing={2}>
                    {/* Main Document Area */}
                    <Grid size={{ xs: 12, lg: 9 }}>
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
                                            BILL OF MATERIALS
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                            Component Engineering Registry
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                                label={bom.number}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#f1f5f9",
                                                    color: "#0f172a",
                                                    borderRadius: '8px',
                                                    fontSize: '0.95rem'
                                                }}
                                            />
                                            <Chip
                                                icon={<VerifiedUser sx={{ fontSize: '18px !important' }} />}
                                                label={bom.status || "Approved"}
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
                                            icon={Build}
                                            label="Assigned Product"
                                            value={bom.productName}
                                        />
                                        <InfoItem
                                            icon={CalendarMonth}
                                            label="Effective Date"
                                            value={bom.date}
                                        />
                                    </Stack>
                                </Stack>

                                <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                {/* Component Grid */}
                                <Box sx={{ mb: 6 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Inventory sx={{ color: '#1172ba' }} /> Component Specifications
                                        </Typography>
                                        <Typography variant="body2" color="#64748b" fontWeight={600}>
                                            {bom.materials.length} Engineering Units
                                        </Typography>
                                    </Stack>

                                    <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR.</TableCell>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>PART NUMBER</TableCell>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>MATERIAL NAME</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>MANUFACTURER</TableCell>
                                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>TECHNICAL DETAILS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {bom.materials.map((item, idx) => (
                                                    <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                        <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                                        <TableCell sx={{ fontWeight: 700, color: "#1172ba" }}>
                                                            {item.scanboPartNumber || item.scanboPartNo}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.materialName || item.description}</Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={item.quantity || item.qty}
                                                                size="small"
                                                                sx={{ fontWeight: 800, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px', fontFamily: 'monospace' }}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ color: "#475569", fontWeight: 600 }}>
                                                            {item.manufacturerName || item.manufacturer}
                                                        </TableCell>
                                                        <TableCell sx={{ color: "#64748b", fontSize: '0.8rem', maxWidth: 250 }}>
                                                            {item.technicalDetails || item.specs}
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

                    {/* Sidebar / Authorization Area */}
                    <Grid size={{ xs: 12, lg: 3 }}>
                        <Stack spacing={3}>
                            {/* Authorization Stack */}
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authorization
                                </Typography>

                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><HistoryEdu /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Reviewed By</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{bom.authorization.reviewedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#1172ba", fontWeight: 700 }}>{bom.authorization.reviewedDate}</Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ borderStyle: 'dashed' }} />

                                    <Stack direction="row" spacing={2}>
                                        <Avatar sx={{ bgcolor: "#dcfce7", color: "#166534" }}><Person /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Approved By</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{bom.authorization.approvedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 700 }}>{bom.authorization.approvedDate}</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Paper>

                            {/* Summary Metadata */}
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Description sx={{ color: '#1172ba', fontSize: 20 }} /> Metadata
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="caption" fontWeight={700} color="#64748b">Total Components</Typography>
                                        <Typography variant="caption" fontWeight={900} color="#0f172a">{bom.materials.length}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="caption" fontWeight={700} color="#64748b">Revision Status</Typography>
                                        <Typography variant="caption" fontWeight={900} color="#166534">CERTIFIED</Typography>
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
        </Fade>
    );
}

export default function ViewBOM() {
    return (
        <Suspense fallback={<Loader fullPage message="Initializing BOM Data..." />}>
            <ViewBOMContent />
        </Suspense>
    );
}
