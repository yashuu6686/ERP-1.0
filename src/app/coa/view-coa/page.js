"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Edit from "@mui/icons-material/Edit";
import Print from "@mui/icons-material/Print";
import Description from "@mui/icons-material/Description";
import Science from "@mui/icons-material/Science";
import VerifiedUser from "@mui/icons-material/VerifiedUser";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

const DetailRow = ({ label, value }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
            {value || "N/A"}
        </Typography>
    </Box>
);

const SectionHeader = ({ icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box sx={{
            width: 36, height: 36, borderRadius: "8px", bgcolor: "#eff6ff",
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            {React.cloneElement(icon, { sx: { color: "#1172ba", fontSize: 20 } })}
        </Box>
        <Typography variant="subtitle1" fontWeight={800} color="#1172ba" textTransform="uppercase" letterSpacing="0.05em">
            {title}
        </Typography>
    </Box>
);

function ViewCOAContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCOA = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/coa/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching COA:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCOA();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Fetching COA Details..." />;
    if (!data) return <Box sx={{ p: 4 }}>Certificate Not Found</Box>;

    return (
        <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: "1400px", margin: "0 auto" }}>
            {/* Action Bar */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/coa")}
                    sx={{ color: "#64748b", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "transparent", color: "#334155" } }}
                >
                    Back to List
                </Button>

                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, color: "#475569", borderColor: "#e2e8f0", bgcolor: "white" }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/coa/create-coa?id=${id}`)}
                        sx={{
                            borderRadius: "10px", textTransform: "none", fontWeight: 700,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                            boxShadow: "0 4px 6px -1px rgba(17, 114, 186, 0.2)"
                        }}
                    >
                        Edit Certificate
                    </Button>
                </Stack>
            </Stack>

            {/* Main Content */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                }}
            >
                {/* Header Banner */}
                <Box sx={{ p: { xs: 3, md: 4 }, borderBottom: "1px solid #f1f5f9" }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item size={{ xs: 12, md: 8 }}>
                            <Box>
                                <Typography variant="h4" fontWeight={900} sx={{ color: "#1e293b", letterSpacing: "-0.02em" }}>
                                    {data.coaNumber}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                    <Typography variant="body1" fontWeight={700} sx={{ color: "#64748b" }}>
                                        Certificate of Analysis
                                    </Typography>
                                    <Chip
                                        label={data.status}
                                        size="small"
                                        sx={{
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            bgcolor: data.status === "Approved" ? "#dcfce7" : data.status === "Pending" ? "#fef9c3" : "#fee2e2",
                                            color: data.status === "Approved" ? "#15803d" : data.status === "Pending" ? "#a16207" : "#b91c1c",
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item size={{ xs: 12, md: 4 }}>
                            <Box sx={{ bgcolor: "#f1f5f9", p: 2, borderRadius: 3, border: "1px solid #e2e8f0", textAlign: "right" }}>
                                <Typography variant="caption" display="block" color="#64748b" fontWeight={800} textTransform="uppercase">Issue Date</Typography>
                                <Typography variant="h6" fontWeight={800} color="#1172ba">{data.issueDate}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Information Sections */}
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Grid container spacing={4}>
                        {/* Certificate Info */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<Description />} title="Certificate Information" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><DetailRow label="COA Number" value={data.coaNumber} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Product Name" value={data.productName} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Batch No." value={data.batchNo} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Quantity" value={data.quantity} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Issue Date" value={data.issueDate} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Expiry Date" value={data.expiryDate} /></Grid>
                                    <Grid item xs={12}><DetailRow label="Manufacturing Date" value={data.manufacturingDate} /></Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Authorization */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", bgcolor: "white" }}>
                                <SectionHeader icon={<VerifiedUser />} title="Authorization" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><DetailRow label="Analysed By" value={data.analysedBy} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Approved By" value={data.approvedBy} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Analysed Date" value={data.analysedDate} /></Grid>
                                    <Grid item xs={6}><DetailRow label="Approved Date" value={data.approvedDate} /></Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                        </Grid>

                        {/* Test Results */}
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "white" }}>
                                <SectionHeader icon={<Science />} title="Test Results" />
                                <TableContainer sx={{ borderRadius: 2, border: "1px solid #f1f5f9" }}>
                                    <Table size="small">
                                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>PARAMETERS</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>SPECIFICATION</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>METHOD</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>RESULT</TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>STATUS</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.testResults?.map((test) => (
                                                <TableRow key={test.id} hover>
                                                    <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>{test.parameters}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{test.specification}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{test.method}</TableCell>
                                                    <TableCell sx={{ color: "#475569" }}>{test.result}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={test.status || "N/A"}
                                                            size="small"
                                                            sx={{
                                                                fontWeight: 700,
                                                                bgcolor: test.status === "Pass" ? "#dcfce7" : "#fee2e2",
                                                                color: test.status === "Pass" ? "#15803d" : "#b91c1c"
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {(!data.testResults || data.testResults.length === 0) && (
                                                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No test results recorded.</TableCell></TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default function ViewCOA() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewCOAContent />
        </Suspense>
    );
}
