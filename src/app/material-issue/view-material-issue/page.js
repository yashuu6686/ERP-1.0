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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogContent
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
    EventNote,
    CheckCircle,
    Warning,
    Error as ErrorIcon,
    ReceiptLong,
    Share,
    MoreVert,
    ReportProblem
} from "@mui/icons-material";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import DefectiveMaterialForm from "../components/DefectiveMaterialForm";

// Professional Corporate Palette
const COLORS = {
    primary: "#0f172a",    // deep slate
    secondary: "#64748b",  // muted slate
    accent: "#334155",     // medium slate
    border: "#e2e8f0",     // light gray border
    bg: "#f8fafc",         // off-white bg
    status: {
        ready: "#059669",  // emerald 600
        partial: "#d97706",// amber 600
        out: "#dc2626",    // red 600
        pending: "#475569" // slate 600
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

const LabelValue = ({ label, value, subValue }) => (
    <Box sx={{ mb: 2.5 }}>
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

                if (requestData.bomId || requestData.bomNumber) {
                    const bomRes = await axiosInstance.get("/bom");
                    const targetBom = bomRes.data.find(b =>
                        b.id === requestData.bomId || b.number === requestData.bomNumber
                    );
                    if (targetBom && targetBom.materials) {
                        setBomItems(targetBom.materials);
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
        if (refresh) {
            // Re-fetch data if needed
        }
    };

    if (loading) return <Loader fullPage message="Accessing Secure Records..." />;
    if (!request) return <Box sx={{ p: 4, textAlign: "center", color: COLORS.secondary }}>Record not found in the material registry.</Box>;

    const calculateStockStatus = (material) => {
        const partNo = material.scanboPartNo || material.scanboPartNumber;
        const storeItem = storeItems.find(item => (item.id === partNo || item.code === partNo));
        const needed = Number(material.qty || 0) * Number(request.requiredQty || 0);

        if (!storeItem) return { status: "unknown", color: COLORS.secondary, text: "Not Listed" };
        const available = Number(storeItem.available || 0);

        if (available >= needed) return { status: "ready", color: COLORS.status.ready, text: "Sufficient Stock" };
        if (available > 0) return { status: "partial", color: COLORS.status.partial, text: `${available} Available` };
        return { status: "out", color: COLORS.status.out, text: "Stock Depleted" };
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bg, pb: 10 }}>
            {/* Minimal Minimalist Header */}
            <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${COLORS.border}`, py: 1.5, px: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/material-issue")}
                            sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}
                        >
                            Registry
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: "center" }} />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.primary, lineHeight: 1 }}>
                                {request.requestNo}
                            </Typography>
                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 600 }}>
                                {request.productName} • ID: {id?.slice(0, 8)}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button startIcon={<PrintIcon />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Print</Button>
                        <Button startIcon={<Share />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Share</Button>
                        <Button
                            variant="contained"
                            disableElevation
                            startIcon={<ReportProblem />}
                            onClick={() => setOpenDefectiveDialog(true)}
                            sx={{
                                bgcolor: COLORS.status.out,
                                "&:hover": { bgcolor: "#b91c1c" },
                                textTransform: "none",
                                fontWeight: 700,
                                px: 3
                            }}
                        >
                            Defective
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ px: 4, mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Main Content Areas */}
                    <Grid item xs={12} lg={8}>
                        <Stack spacing={4}>
                            {/* Request Specifications */}
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}` }}>
                                <SectionHeader icon={Assignment} title="Issue Specifications" />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Production Item" value={request.productName} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="BOM Reference" value={request.bomNumber} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Issuance Qty" value={`${request.requiredQty} Units`} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>Issue Status</Typography>
                                            <Chip
                                                label={request.status || "PENDING"}
                                                size="small"
                                                sx={{ borderRadius: 1, fontWeight: 800, fontSize: "0.65rem", bgcolor: COLORS.bg, border: `1px solid ${COLORS.border}`, color: COLORS.primary }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Release Date" value={request.startDate} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Expected Delivery" value={request.endDate} /></Grid>
                                </Grid>
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", display: "block", mb: 1 }}>Administrative Description</Typography>
                                <Typography variant="body2" sx={{ color: COLORS.primary, lineHeight: 1.6, fontWeight: 500 }}>
                                    {request.description || "No categorical descriptions provided."}
                                </Typography>
                            </Paper>

                            {/* Inventory Allocation Table */}
                            <Paper elevation={0} sx={{ borderRadius: 1, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
                                <Box sx={{ p: 2.5, bgcolor: COLORS.bg, borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between" }}>
                                    <SectionHeader icon={Inventory} title="Material Allocation Breakdown" />
                                    <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>{bomItems.length} COMPONENTS</Typography>
                                </Box>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: "#fafafa" }}>
                                                <TableCell sx={{ fontWeight: 800, color: COLORS.secondary, py: 2, fontSize: "0.7rem", textTransform: "uppercase" }}>Part Information</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: COLORS.secondary, fontSize: "0.7rem", textTransform: "uppercase" }}>Requirement</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 800, color: COLORS.secondary, fontSize: "0.7rem", textTransform: "uppercase" }}>Stock Verification</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bomItems.map((item, idx) => {
                                                const stock = calculateStockStatus(item);
                                                const totalReq = Number(item.qty || 0) * Number(request.requiredQty || 0);
                                                return (
                                                    <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#fcfcfc" } }}>
                                                        <TableCell sx={{ py: 2 }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 700, color: COLORS.primary }}>{item.componentName || item.component}</Typography>
                                                            <Typography variant="caption" sx={{ color: COLORS.secondary }}>PN: {item.scanboPartNo || item.scanboPartNumber}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                                <Box>
                                                                    <Typography variant="caption" sx={{ color: COLORS.secondary, display: "block" }}>Per Unit</Typography>
                                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.qty || 0}</Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography variant="caption" sx={{ color: COLORS.secondary, display: "block" }}>Total Issue</Typography>
                                                                    <Typography variant="body2" sx={{ fontWeight: 800, color: COLORS.primary }}>{totalReq}</Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 800, color: stock.color }}>
                                                                    {stock.text.toUpperCase()}
                                                                </Typography>
                                                                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: stock.color }} />
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Stack>
                    </Grid>

                    {/* Sidebar: Control Panel */}
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={3}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}` }}>
                                <SectionHeader icon={HistoryEdu} title="Authorization" />
                                <Stack spacing={4}>
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: COLORS.bg, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Person sx={{ color: COLORS.secondary }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>Originator</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{request.requestedBy || "Unspecified"}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: COLORS.bg, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <CheckCircle sx={{ color: request.approvedBy ? COLORS.status.ready : COLORS.secondary }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>Authorized Signatory</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{request.approvedBy || "Pending Review"}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, border: `1px solid ${COLORS.border}`, bgcolor: "#fff", borderRadius: 1 }}>
                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 1.5 }}>RECORD METADATA</Typography>
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="caption" sx={{ color: COLORS.secondary }}>Created On</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{request.createdAt ? new Date(request.createdAt).toLocaleString() : "—"}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="caption" sx={{ color: COLORS.secondary }}>Registry ID</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: "monospace" }}>{id}</Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                sx={{ textTransform: "none", fontWeight: 700, borderRadius: 1, py: 1.2 }}
                            >
                                Void Request
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            {/* Defective Dialog */}
            <Dialog
                open={openDefectiveDialog}
                onClose={() => handleDefectiveClose()}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 1 }
                }}
            >
                <DialogContent dividers>
                    <DefectiveMaterialForm
                        request={request}
                        onClose={(refresh) => handleDefectiveClose(refresh)}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default function ViewMaterialIssue() {
    return (
        <Suspense fallback={<Loader fullPage message="Secure data transmission in progress..." />}>
            <ViewMaterialIssueContent />
        </Suspense>
    );
}
