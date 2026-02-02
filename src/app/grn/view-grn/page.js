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
import Cancel from "@mui/icons-material/Cancel";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/Loader";
import { Suspense, useEffect, useState } from "react";

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

    if (loading) return <Loader fullPage message="Loading GRN Details..." />;

    if (!grn) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" gutterBottom fontWeight={600}>GRN Not Found</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>The goods receipt note you are looking for does not exist or has been removed.</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ borderRadius: 2, textTransform: "none" }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box>
                {/* Top Navigation & Actions */}
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }} spacing={1} sx={{ mb: 1 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/grn")}
                        sx={{
                            color: "#64748b",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "0.95rem",
                            "&:hover": { color: "#334155", bgcolor: "transparent" },
                        }}
                    >
                        Back to List
                    </Button>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<Print />}
                            onClick={() => window.print()}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                color: "#475569",
                                borderColor: "#e2e8f0",
                                bgcolor: "white",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                            }}
                        >
                            Print
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Download />}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                color: "#475569",
                                borderColor: "#e2e8f0",
                                bgcolor: "white",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                            }}
                        >
                            Download
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => router.push(`/grn/create-grn?id=${id}`)}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                boxShadow: "0 4px 6px -1px rgba(17, 114, 186, 0.2)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                                    boxShadow: "0 6px 8px -1px rgba(17, 114, 186, 0.3)",
                                },
                            }}
                        >
                            Edit GRN
                        </Button>
                    </Stack>
                </Stack>

                {/* Main Content Card */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: "rgba(226, 232, 240, 0.8)",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    {/* Header Banner */}
                    <Box sx={{ p: { xs: 3, md: 2 }, borderBottom: "1px solid #f1f5f9" }}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={12} md={6}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box>
                                        <Typography variant="h4" fontWeight={800} sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
                                            GOODS RECEIPT NOTE
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 0.5 }}>
                                            <Typography variant="body1" fontWeight={600} sx={{ color: "#64748b" }}>
                                                #{grn.grnNumber}
                                            </Typography>
                                            <Chip
                                                icon={<CheckCircle sx={{ fontSize: 18 }} />}
                                                label="Received"
                                                size="small"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: "0.75rem",
                                                    borderRadius: "6px",
                                                    bgcolor: "#d1fae5",
                                                    color: "#059669",
                                                    border: "1px solid #34d399",
                                                    height: 24,
                                                    "& .MuiChip-icon": { color: "inherit", marginLeft: "4px" },
                                                    "& .MuiChip-label": { paddingLeft: "8px", paddingRight: "8px" },
                                                }}
                                            />
                                            {grn.inspectionStatus && (
                                                <Chip
                                                    icon={grn.inspectionStatus === "Completed" ? <CheckCircle sx={{ fontSize: 18 }} /> : <Schedule sx={{ fontSize: 18 }} />}
                                                    label={`Inspection: ${grn.inspectionStatus}`}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: "0.75rem",
                                                        borderRadius: "6px",
                                                        bgcolor: grn.inspectionStatus === "Completed" ? "#d1fae5" : "#fef3c7",
                                                        color: grn.inspectionStatus === "Completed" ? "#059669" : "#d97706",
                                                        border: `1px solid ${grn.inspectionStatus === "Completed" ? "#34d399" : "#fbbf24"}`,
                                                        height: 24,
                                                        "& .MuiChip-icon": { color: "inherit", marginLeft: "4px" },
                                                        "& .MuiChip-label": { paddingLeft: "8px", paddingRight: "8px" },
                                                    }}
                                                />
                                            )}
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={{ xs: 2, sm: 4 }}
                                    justifyContent={{ md: "flex-end" }}
                                    sx={{ bgcolor: "#f8fafc", p: 2, borderRadius: 3, border: "1px solid #e2e8f0" }}
                                >
                                    <Box>
                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                            Received Date
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                            {new Date(grn.receivedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                            PO Number
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                            {grn.poNumber}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="block" color="#64748b" fontWeight={600} textTransform="uppercase" sx={{ mb: 0.5 }}>
                                            Invoice Number
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0f172a">
                                            {grn.invoiceNumber || "-"}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Content Section */}
                    <Box sx={{ p: { xs: 1, md: 2 } }}>
                        {/* 2-Column Info Grid */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            {/* Supplier Card */}
                            <Grid item xs={12} md={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: "100%",
                                        borderRadius: 3,
                                        border: "1px solid #e2e8f0",
                                        bgcolor: "white",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Stack spacing={2.5}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box sx={{
                                                width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff",
                                                display: "flex", alignItems: "center", justifyContent: "center"
                                            }}>
                                                <Business sx={{ color: "#1172ba", fontSize: 20 }} />
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                                Supplier Details
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />
                                        <Box>
                                            <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 0.5 }}>
                                                {grn.supplierName}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>

                            {/* Received By Card */}
                            <Grid item xs={12} md={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: "100%",
                                        borderRadius: 3,
                                        border: "1px solid #e2e8f0",
                                        bgcolor: "white",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Stack spacing={2.5}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box sx={{
                                                width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff",
                                                display: "flex", alignItems: "center", justifyContent: "center"
                                            }}>
                                                <AssignmentTurnedIn sx={{ color: "#1172ba", fontSize: 20 }} />
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={700} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
                                                Received By
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ borderStyle: "solid", borderColor: "#f1f5f9" }} />
                                        <Box>
                                            <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 0.5 }}>
                                                {grn.receivedBy}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Order Items Table */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                bgcolor: "white",
                                borderRadius: 3,
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                        >
                            <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ mb: 3 }}>
                                Received Items
                            </Typography>
                            <TableContainer>
                                <Table sx={{ minWidth: 500 }}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                            <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>SR NO.</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>ITEM DETAILS</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>ORDERED QTY</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>RECEIVED QTY</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>UNIT</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: "#94a3b8", py: 2, fontSize: "0.75rem", letterSpacing: "0.05em" }}>REMARK</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {grn.items?.map((item, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    "&:hover": { bgcolor: "#f8fafc" },
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                    transition: "background-color 0.1s",
                                                    borderBottom: "1px solid #f1f5f9"
                                                }}
                                            >
                                                <TableCell sx={{ py: 2.5, color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>
                                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                                </TableCell>
                                                <TableCell sx={{ py: 2.5 }}>
                                                    <Typography variant="subtitle2" fontWeight={600} color="#1e293b">{item.name}</Typography>
                                                </TableCell>
                                                <TableCell align="center" sx={{ py: 2.5 }}>
                                                    <Box
                                                        sx={{
                                                            display: "inline-block",
                                                            bgcolor: "#f1f5f9",
                                                            color: "#475569",
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: "6px",
                                                            fontWeight: 700,
                                                            fontSize: "0.85rem",
                                                            minWidth: "40px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {item.orderedQty}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ py: 2.5 }}>
                                                    <Box
                                                        sx={{
                                                            display: "inline-block",
                                                            bgcolor: "#eff6ff",
                                                            color: "#1172ba",
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: "6px",
                                                            fontWeight: 700,
                                                            fontSize: "0.85rem",
                                                            minWidth: "40px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {item.receivedQty}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ py: 2.5, color: "#64748b", fontWeight: 500 }}>
                                                    {item.unit || "Nos"}
                                                </TableCell>
                                                <TableCell sx={{ py: 2.5, color: "#64748b" }}>
                                                    {item.remark || "-"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default function ViewGRN() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewGRNContent />
        </Suspense>
    );
}
