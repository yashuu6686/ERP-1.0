"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Inventory from "@mui/icons-material/Inventory";
import Assignment from "@mui/icons-material/Assignment";
import Print from "@mui/icons-material/Print";
import Edit from "@mui/icons-material/Edit";
import Person from "@mui/icons-material/Person";
import HistoryEdu from "@mui/icons-material/HistoryEdu";
import ReportProblem from "@mui/icons-material/ReportProblem";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Description from "@mui/icons-material/Description";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Receipt from "@mui/icons-material/Receipt";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import DefectiveMaterialForm from "../components/DefectiveMaterialForm";

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

function ViewMaterialIssueContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState(null);
    const [bomItems, setBomItems] = useState([]);
    const [storeItems, setStoreItems] = useState([]);
    const [openDefectiveDialog, setOpenDefectiveDialog] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/material-issue/${id}`);
                const requestData = response.data;
                setRequest(requestData);

                // Prioritize materials directly on the request if they exist (data created with request)
                if (requestData.materials && Array.isArray(requestData.materials)) {
                    setBomItems(requestData.materials);
                } else if (requestData.bomId || requestData.bomNumber || requestData.bom) {
                    const bomRes = await axiosInstance.get("/bom");
                    if (bomRes.data && Array.isArray(bomRes.data)) {
                        const targetBom = bomRes.data.find(b =>
                            b.id === requestData.bomId ||
                            b.number === (requestData.bomNumber || requestData.bom)
                        );
                        if (targetBom && targetBom.materials) {
                            setBomItems(targetBom.materials);
                        }
                    }
                }

                const storeRes = await axiosInstance.get("/store");
                setStoreItems(storeRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [id]);

    const handleDefectiveClose = (refresh = false) => {
        setOpenDefectiveDialog(false);
    };

    if (loading) return <Loader fullPage message="Accessing Material Registry..." />;

    if (!request) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Material Issue Request Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/material-issue")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Registry
                </Button>
            </Box>
        );
    }



    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/material-issue")}
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
                            <Tooltip title="Print Slip">
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
                                startIcon={<ReportProblem />}
                                onClick={() => setOpenDefectiveDialog(true)}
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                                    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                                        boxShadow: "0 6px 16px rgba(220, 38, 38, 0.35)",
                                    },
                                }}
                            >
                                Report Defective
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
                                                MATERIAL ISSUE
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Inventory Allocation & Release Slip
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={request.requestNo}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    label={request.status || "PENDING"}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: request.status === "APPROVED" ? "#dcfce7" : "#eff6ff",
                                                        color: request.status === "APPROVED" ? "#166534" : "#1172ba",
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={Assignment}
                                                label="Production For"
                                                value={request.productName || request.product}
                                            />
                                            <InfoItem
                                                icon={CalendarMonth}
                                                label="Start Date"
                                                value={request.startDate || request.start}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Issue Metadata Grid */}
                                    <Grid container spacing={2} sx={{ mb: 6 }}>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <InfoItem icon={Receipt} label="BOM Reference" value={request.bomNumber || request.bom} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <InfoItem icon={ProductionQuantityLimits} label="Required Quantity" value={`${request.requiredQty || request.qty} Units`} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <InfoItem icon={Description} label="End Date" value={request.endDate || request.end} />
                                        </Grid>
                                    </Grid>

                                    {/* Instruction Section */}
                                    {request.description && (
                                        <Box sx={{ mb: 6, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 1 }}>Administrative Instructions</Typography>
                                            <Typography variant="body2" sx={{ color: "#1e293b", lineHeight: 1.6 }}>{request.description}</Typography>
                                        </Box>
                                    )}

                                    {/* Material Allocation Table */}
                                    <Box>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Inventory sx={{ color: '#1172ba' }} /> Material Allocation Breakdown
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>
                                                {bomItems.length} Components Required
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR.</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>COMPONENT DETAILS</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QUANTITY</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {bomItems.map((item, idx) => {
                                                        return (
                                                            <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                                <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                                                <TableCell>
                                                                    <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.componentName || item.component || item.materialName || item.goods}</Typography>
                                                                    <Typography variant="caption" sx={{ color: "#1172ba", fontWeight: 600 }}>PN: {item.scanboPartNo || item.scanboPartNumber || item.partNo || "-"}</Typography>
                                                                </TableCell>
                                                                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>{item.qty || item.quantity || 0}</TableCell>
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

                        {/* Sidebar / Control Area */}
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <Stack spacing={2}>
                                {/* Authorization Card */}
                                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Authorization
                                    </Typography>

                                    <Stack spacing={2}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><Person /></Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Requested By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{request.requestedBy || "Unspecified"}</Typography>
                                            </Box>
                                        </Stack>

                                        <Divider sx={{ borderStyle: 'dashed' }} />

                                        <Stack direction="row" spacing={2}>
                                            <Avatar sx={{ bgcolor: request.approvedBy ? "#dcfce7" : "#fff1f2", color: request.approvedBy ? "#166534" : "#991b1b" }}>
                                                {request.approvedBy ? <CheckCircle /> : <Warning />}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Approved By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>{request.approvedBy || "Pending Review"}</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Paper>

                                {/* Record Metadata */}
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Description sx={{ color: '#1172ba', fontSize: 20 }} /> Registry Info
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Request No.</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#1172ba">{request.requestNo || "-"}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Created On</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a">{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "—"}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Current Status</Typography>
                                            <Typography variant="caption" fontWeight={900} color={request.status === "APPROVED" ? "#166534" : "#1172ba"}>{request.status || "PENDING"}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">System UID</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{id ? id.substring(0, 8) : 'N/A'}</Typography>
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

                {/* Defective Dialog */}
                <Dialog
                    open={openDefectiveDialog}
                    onClose={() => handleDefectiveClose()}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
                >
                    <DialogContent sx={{ p: 0 }}>
                        <DefectiveMaterialForm
                            request={request}
                            onClose={(refresh) => handleDefectiveClose(refresh)}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
        </Fade>
    );
}

export default function ViewMaterialIssue() {
    return (
        <Suspense fallback={<Loader fullPage message="Initializing Material Registry..." />}>
            <ViewMaterialIssueContent />
        </Suspense>
    );
}
