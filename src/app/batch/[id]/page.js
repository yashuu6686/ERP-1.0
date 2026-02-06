"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Chip,
    Divider,
    Button,
    IconButton,
    Paper,
    Stack,
    Container,
    Fade,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

    Avatar,
    Select,
    MenuItem
} from "@mui/material";
import {
    ArrowBack,
    Inventory2,
    FactCheck,
    Summarize,
    DateRange,
    Numbers,
    Print,
    Edit,
    Description,
    VerifiedUser,
    CheckCircle,
    Analytics,
    Visibility,
    NavigateBefore,
    NavigateNext
} from "@mui/icons-material";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "../../../components/ui/Loader";
import { expandSerialNumberRange } from "../../../lib/serialUtils";

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

export default function BatchDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchBatchDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/batches/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching batch details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBatchDetails();
        }
    }, [id]);



    const deviceList = React.useMemo(() => {
        if (!data || !data.productSr) return [];
        return expandSerialNumberRange(data.productSr, data.acceptedQty || 0);
    }, [data]);

    if (loading) return <Loader fullPage message="Accessing Production Record..." />;

    if (!data) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Batch Record Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/batch")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Registry
                </Button>
            </Box>
        );
    }

    const {
        batchNo,
        requestNo,
        checkNo,
        productSr,
        acceptedQty,
        status,
        date,
        qualityCheck = [],
        summary = {}
    } = data;

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.back()}
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
                                    Print Log
                                </Button>
                            </Tooltip>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => router.push(`/batch/edit-batch?id=${id}`)}
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
                                Modify Batch
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
                                                PRODUCTION LOG
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Serialized Batch Tracking
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={batchNo}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    label={status || "PENDING"}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: status === "Ready" ? "#dcfce7" : "#fff7ed",
                                                        color: status === "Ready" ? "#166534" : "#c2410c",
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={DateRange}
                                                label="Created Date"
                                                value={date ? new Date(date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }) : "-"}
                                            />
                                            <InfoItem
                                                icon={Numbers}
                                                label="Product Serial Range"
                                                value={productSr}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Core Info Grid */}
                                    <Grid container spacing={3} sx={{ mb: 6 }}>
                                        <Grid size={{ xs: 6, sm: 4 }}>
                                            <InfoItem icon={Inventory2} label="Request No." value={requestNo} />
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 4 }}>
                                            <InfoItem icon={FactCheck} label="Check No." value={checkNo} />
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 4 }}>
                                            <InfoItem icon={CheckCircle} label="Initial Status" value={status} />
                                        </Grid>
                                    </Grid>

                                    {/* Quality Verification Log Table */}
                                    <Box sx={{ mb: 5 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <FactCheck sx={{ color: '#1172ba' }} /> Quality Verification Log
                                            </Typography>
                                        </Stack>

                                        <TableContainer sx={{
                                            borderRadius: 3,
                                            border: '1px solid #f1f5f9',
                                            bgcolor: '#f8fafc'
                                        }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>PARAMETER</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SPECIFICATION</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>OBSERVATION</TableCell>
                                                        <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>REMARKS</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {qualityCheck.length > 0 ? (
                                                        qualityCheck.map((row, index) => (
                                                            <TableRow key={index} sx={{ "&:hover": { bgcolor: "#fff" }, bgcolor: 'white' }}>
                                                                <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{row.parameters}</TableCell>
                                                                <TableCell sx={{ color: "#64748b", fontSize: '0.9rem' }}>{row.specification}</TableCell>
                                                                <TableCell sx={{ color: "#1172ba", fontWeight: 700 }}>{row.observation}</TableCell>
                                                                <TableCell sx={{ fontStyle: "italic", color: "#64748b" }}>{row.remarks || "-"}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow bgcolor="white">
                                                            <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: 'italic' }}>
                                                                No technical observations recorded.
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

                        {/* Sidebar / Sidebar Panels */}
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <Stack spacing={3}>
                                {/* Inspection Summary Card */}
                                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Summarize sx={{ color: '#1172ba', fontSize: 20 }} /> Yield Summary
                                    </Typography>

                                    <Stack spacing={3}>
                                        <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: 3, border: '1px solid #dcfce7' }}>
                                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 800, textTransform: "uppercase", display: 'block', mb: 0.5 }}>Accepted Quantity</Typography>
                                            <Typography variant="h3" color="#166534" fontWeight={900}>{summary.acceptedQuantity || acceptedQty || 0}</Typography>
                                        </Box>

                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 6 }}>
                                                <Box sx={{ p: 2, bgcolor: '#fff1f2', borderRadius: 3, border: '1px solid #ffe4e6' }}>
                                                    <Typography variant="caption" sx={{ color: "#b91c1c", fontWeight: 800, display: 'block' }}>REJECTED</Typography>
                                                    <Typography variant="h6" color="#991b1b" fontWeight={800}>{summary.rejectedQuantity || 0}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Box sx={{ p: 2, bgcolor: '#fff7ed', borderRadius: 3, border: '1px solid #ffedd5' }}>
                                                    <Typography variant="caption" sx={{ color: "#c2410c", fontWeight: 800, display: 'block' }}>HOLD/SCRAP</Typography>
                                                    <Typography variant="h6" color="#9a3412" fontWeight={800}>{summary.holdScrapQuantity || 0}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Divider borderStyle="dashed" />

                                        {summary.comments && (
                                            <Box sx={{ mt: 1 }}>
                                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                                                    <Description sx={{ color: '#64748b', fontSize: 18 }} />
                                                    <Typography variant="caption" sx={{ color: "#475569", fontWeight: 800, textTransform: "uppercase" }}>Batch Remarks</Typography>
                                                </Stack>
                                                <Typography variant="body2" sx={{ color: "#475569", fontWeight: 600, fontStyle: "italic", lineHeight: 1.5, display: 'block', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                    &quot;{summary.comments}&quot;
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>

                                </Paper>

                                {/* System Tracking */}
                                {/* <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> System Trace
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Batch UUID</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{id ? id.substring(0, 13).toUpperCase() : 'N/A'}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Record Status</Typography>
                                            <Typography variant="caption" fontWeight={900} color={status === "Ready" ? "#166534" : "#c2410c"}>{status?.toUpperCase()}</Typography>
                                        </Stack>
                                    </Stack>
                                </Paper> */}
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Serialized Device Inventory */}
                    <Box sx={{ mt: 4 }}>
                        <Paper elevation={0} sx={{ p: 0, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff', overflow: 'hidden' }}>
                            <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', background: 'linear-gradient(to right, #f8fafc, #fff)' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                    <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Serialized Device Inventory
                                </Typography>
                            </Box>

                            <div>
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc' }}>Sr.No.</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc' }}>BATCH DATE</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc' }}>BATCH ID</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc' }}>SERIAL NO.</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc' }}>DEVICE</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc' }}>LOCATION</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", bgcolor: '#f8fafc', textAlign: 'center' }}>ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {deviceList.length > 0 ? (
                                            deviceList
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((serial, idx) => (
                                                    <TableRow key={serial} hover>
                                                        <TableCell sx={{ color: "#94a3b8", fontWeight: 600, fontSize: '0.85rem' }}>{(page * rowsPerPage) + idx + 1}</TableCell>
                                                        <TableCell sx={{ color: "#475569", fontWeight: 600, fontSize: '0.85rem' }}>
                                                            {date ? new Date(date).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }) : "-"}
                                                        </TableCell>
                                                        <TableCell sx={{ color: "#475569", fontWeight: 700, fontSize: '0.85rem', fontFamily: 'monospace' }}>{batchNo || "-"}</TableCell>
                                                        <TableCell sx={{ color: "#1172ba", fontWeight: 700, fontFamily: 'monospace', fontSize: '0.9rem' }}>{serial}</TableCell>
                                                        <TableCell sx={{ color: "#475569", fontWeight: 600, fontSize: '0.85rem' }}>{requestNo || "Device"}</TableCell>
                                                        <TableCell sx={{ color: "#166534", fontWeight: 600, fontSize: '0.8rem' }}>
                                                            <Chip label="Finished Goods Store" size="small" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 700, borderRadius: '6px', height: 24 }} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Tooltip title="View Device Details">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => router.push(`/batch/${id}/${serial}`)}
                                                                    sx={{ color: '#1172ba', bgcolor: 'rgba(17, 114, 186, 0.1)', '&:hover': { bgcolor: 'rgba(17, 114, 186, 0.2)' } }}
                                                                >
                                                                    <Visibility fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center" sx={{ py: 3, color: "#94a3b8", fontStyle: "italic" }}>
                                                    No serialized devices found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Custom Pagination matching GlobalTable theme */}
                            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9' }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography sx={{ fontSize: "14px", color: "#64748b" }}>
                                            Rows per page:
                                        </Typography>
                                        <Select
                                            value={rowsPerPage}
                                            onChange={(e) => {
                                                setRowsPerPage(parseInt(e.target.value, 10));
                                                setPage(0);
                                            }}
                                            variant="standard"
                                            disableUnderline
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 500,
                                                color: "#64748b",
                                                "& .MuiSelect-select": { py: 0 },
                                            }}
                                        >
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                        </Select>
                                    </Box>

                                    <Typography sx={{ fontSize: "14px", color: "#64748b" }}>
                                        {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, deviceList.length)} of ${deviceList.length}`}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <IconButton
                                        disabled={page === 0}
                                        onClick={() => setPage(page - 1)}
                                        size="small"
                                        sx={{ color: "#64748b" }}
                                    >
                                        <NavigateBefore fontSize="small" />
                                    </IconButton>

                                    {Array.from({ length: Math.ceil(deviceList.length / rowsPerPage) }, (_, i) => i).map((p) => (
                                        <Box
                                            key={p}
                                            onClick={() => setPage(p)}
                                            sx={{
                                                minWidth: "32px",
                                                height: "32px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                                bgcolor: p === page ? "#1172ba" : "transparent",
                                                color: p === page ? "#ffffff" : "#64748b",
                                                "&:hover": {
                                                    bgcolor: p === page ? "#1172ba" : "#f1f5f9",
                                                },
                                            }}
                                        >
                                            {p + 1}
                                        </Box>
                                    ))}

                                    <IconButton
                                        disabled={page >= Math.ceil(deviceList.length / rowsPerPage) - 1}
                                        onClick={() => setPage(page + 1)}
                                        size="small"
                                        sx={{ color: "#64748b" }}
                                    >
                                        <NavigateNext fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

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

