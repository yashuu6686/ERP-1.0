"use client";

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
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";

import Download from "@mui/icons-material/Download";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Print from "@mui/icons-material/Print";
import Business from "@mui/icons-material/Business";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Description from "@mui/icons-material/Description";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";
import Receipt from "@mui/icons-material/Receipt";
import Inventory2 from "@mui/icons-material/Inventory2";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Person from "@mui/icons-material/Person";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/Loader";
import { Suspense, useEffect, useState } from "react";

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

function ViewGRNContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [grn, setGrn] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGRNDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/grn/${id}`);
                setGrn(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                alert("Failed to fetch GRN details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchGRNDetails();
        }
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <Loader fullPage message="Loading GRN Details..." />;

    if (!grn) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" gutterBottom fontWeight={600}>GRN Not Found</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>The goods receipt note you are looking for does not exist.</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ borderRadius: 2, textTransform: "none" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 3 } }}>
                {/* Header Actions */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                    sx={{ mb: 3, display: 'print: none' }}
                    className="no-print"
                >
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/grn")}
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
                        <Tooltip title="Print Document">
                            <Button
                                variant="outlined"
                                startIcon={<Print />}
                                onClick={handlePrint}
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
                            onClick={() => router.push(`/grn/create-grn?id=${id}`)}
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
                            Edit GRN
                        </Button>
                    </Stack>
                </Stack>

                <Grid container spacing={3}>
                    {/* Main Content Area */}
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
                                            GRN
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2 }}>
                                            Goods Receipt Note
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                                label={grn.grnNumber}
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#f1f5f9",
                                                    color: "#0f172a",
                                                    borderRadius: '8px',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                            <Chip
                                                icon={<CheckCircle sx={{ fontSize: '16px !important' }} />}
                                                label="Received"
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "#dcfce7",
                                                    color: "#166534",
                                                    borderRadius: '8px',
                                                    fontSize: '0.8rem',
                                                    "& .MuiChip-icon": { color: '#166534' }
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Stack spacing={2} sx={{ minWidth: 240 }}>
                                        <InfoItem icon={CalendarMonth} label="Received Date" value={new Date(grn.receivedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} />
                                        <InfoItem icon={Receipt} label="PO Reference" value={grn.poNumber} />
                                        <InfoItem icon={Description} label="Invoice Number" value={grn.invoiceNumber} />
                                    </Stack>
                                </Stack>

                                <Divider sx={{ mb: 4, opacity: 0.6 }} />

                                {/* Entities Grid */}
                                <Grid container spacing={4} sx={{ mb: 6 }}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>
                                            From (Supplier)
                                        </Typography>
                                        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                                    <Business sx={{ color: "#1172ba" }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" fontWeight={700} color="#1e293b">{grn.supplierName}</Typography>
                                                    <Typography variant="body2" color="#64748b">Verified Vendor</Typography>
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>
                                            Received By
                                        </Typography>
                                        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#fff", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                                                    <Person sx={{ color: "#1172ba" }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" fontWeight={700} color="#1e293b">{grn.receivedBy}</Typography>
                                                    <Typography variant="body2" color="#64748b">Warehouse Dept.</Typography>
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                {/* Items Table */}
                                <Box sx={{ mb: 2 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                        <Typography variant="h6" fontWeight={800} color="#0f172a">
                                            Material Check-list
                                        </Typography>
                                        <Typography variant="body2" color="#64748b" fontWeight={600}>
                                            {grn.items?.length || 0} Line Items
                                        </Typography>
                                    </Stack>

                                    <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                                    <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>#</TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>Material Description</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>Order Qty</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>Recv. Qty</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>Unit</TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: "#64748b", py: 2 }}>Status/Remark</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {grn.items?.map((item, index) => (
                                                    <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                        <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{index + 1}</TableCell>
                                                        <TableCell>
                                                            <Typography variant="body1" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Typography variant="body2" fontWeight={600} color="#64748b">{item.orderedQty}</Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Box sx={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                bgcolor: item.receivedQty >= item.orderedQty ? '#ecfdf5' : '#fff7ed',
                                                                color: item.receivedQty >= item.orderedQty ? '#059669' : '#d97706',
                                                                px: 1.5,
                                                                py: 0.5,
                                                                borderRadius: '6px',
                                                                fontWeight: 800,
                                                                fontSize: '0.85rem',
                                                                border: `1px solid ${item.receivedQty >= item.orderedQty ? '#a7f3d0' : '#ffedd5'}`
                                                            }}>
                                                                {item.receivedQty}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip label={item.unit || "Nos"} size="small" variant="outlined" sx={{ borderRadius: '6px', fontWeight: 600, color: '#64748b', borderColor: '#e2e8f0' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" sx={{ color: "#64748b", fontStyle: item.remark ? 'normal' : 'italic' }}>
                                                                {item.remark || "No remarks"}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                {/* Footer Note */}
                                <Box sx={{ mt: 6, p: 3, bgcolor: '#f1f5f9', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <AssignmentTurnedIn sx={{ color: '#64748b' }} />
                                        <Typography variant="body2" color="#475569" sx={{ fontWeight: 500 }}>
                                            This is a computer generated Goods Receipt Note. All materials listed above have been physically verified and counted upon arrival at the facility.
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar Area */}
                    <Grid item xs={12} lg={3}>
                        <Stack spacing={3}>
                            {/* Summary Card */}
                            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle sx={{ color: '#1172ba', fontSize: 20 }} /> Status Overview
                                </Typography>

                                <Stack spacing={2.5}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                                            Processing Status
                                        </Typography>
                                        <Chip
                                            label="Received & Logged"
                                            fullWidth
                                            sx={{
                                                width: '100%',
                                                height: 40,
                                                fontWeight: 700,
                                                bgcolor: '#1172ba',
                                                color: '#fff',
                                                borderRadius: '10px'
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                                            Inspection Quality
                                        </Typography>
                                        <Chip
                                            icon={grn.inspectionStatus === "Completed" ? <CheckCircle /> : <Schedule />}
                                            label={grn.inspectionStatus || "Pending"}
                                            sx={{
                                                width: '100%',
                                                height: 40,
                                                fontWeight: 700,
                                                bgcolor: grn.inspectionStatus === "Completed" ? '#dcfce7' : '#fef3c7',
                                                color: grn.inspectionStatus === "Completed" ? '#166534' : '#92400e',
                                                borderRadius: '10px',
                                                border: `1px solid ${grn.inspectionStatus === "Completed" ? '#bbedc2' : '#fde68a'}`,
                                                '& .MuiChip-icon': { color: 'inherit' }
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Paper>

                            {/* Logistics Card */}
                            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocalShipping sx={{ color: '#1172ba', fontSize: 20 }} /> Logistics Info
                                </Typography>

                                <Stack spacing={3}>
                                    <InfoItem icon={LocalShipping} label="Delivery Mode" value="Surface Transport" />
                                    <InfoItem icon={Inventory2} label="Total Items" value={`${grn.items?.length || 0} Units`} />
                                </Stack>
                            </Paper>

                            {/* Quick Stats */}
                            <Box sx={{
                                p: 3,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                color: '#fff'
                            }}>
                                <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
                                    {grn.items?.reduce((acc, item) => acc + (Number(item.receivedQty) || 0), 0)}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 600 }}>
                                    Total Quantity Received
                                </Typography>
                                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                                    Verified on {new Date().toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Print Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print {
                            display: none !important;
                        }
                        body {
                            background: white !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        .MuiContainer-root {
                            max-width: 100% !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        .MuiPaper-root {
                            border: none !important;
                            box-shadow: none !important;
                        }
                        .MuiGrid-item.lg-3 {
                            display: none !important;
                        }
                        .MuiGrid-item.lg-9 {
                            width: 100% !important;
                            max-width: 100% !important;
                            flex-basis: 100% !important;
                        }
                    }
                `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewGRN() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewGRNContent />
        </Suspense>
    );
}
