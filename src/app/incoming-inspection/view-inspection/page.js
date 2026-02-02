"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
<<<<<<< Updated upstream
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import ArrowBack from "@mui/icons-material/ArrowBack";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Inventory from "@mui/icons-material/Inventory";
import Science from "@mui/icons-material/Science";
import Assignment from "@mui/icons-material/Assignment";
=======
import {
    Box,
    Typography,
    Grid,
    Divider,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack,
    Avatar,
} from "@mui/material";
import {
    ArrowBack,
    Inventory,
    Science,
    Assignment,
    VerifiedUser,
    Edit as EditIcon,
    Print as PrintIcon,
    CheckCircle,
    Cancel,
    ErrorOutline,
    People,
    Receipt,
} from "@mui/icons-material";
>>>>>>> Stashed changes
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const InfoItem = ({ label, value, icon: Icon, color = "#1e293b" }) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
        {Icon && (
            <Box sx={{
                p: 0.75,
                bgcolor: "rgba(17, 114, 186, 0.05)",
                borderRadius: 1,
                color: "#1172ba",
                display: "flex",
                mt: 0.5
            }}>
                <Icon sx={{ fontSize: 18 }} />
            </Box>
        )}
        <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: color }}>
                {value || "-"}
            </Typography>
        </Box>
    </Box>
);

const VerificationBadge = ({ label, status }) => {
    const isYes = status?.toLowerCase() === "yes";
    const isNo = status?.toLowerCase() === "no";

    return (
        <Box sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: isYes ? "#bbf7d0" : isNo ? "#fecaca" : "#e2e8f0",
            bgcolor: isYes ? "#f0fdf4" : isNo ? "#fef2f2" : "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#475569" }}>{label}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {isYes ? <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} /> :
                    isNo ? <Cancel sx={{ color: "#ef4444", fontSize: 20 }} /> :
                        <ErrorOutline sx={{ color: "#94a3b8", fontSize: 20 }} />}
                <Typography variant="button" sx={{
                    fontWeight: 800,
                    color: isYes ? "#15803d" : isNo ? "#b91c1c" : "#64748b",
                    fontSize: "0.75rem"
                }}>
                    {status?.toUpperCase() || "N/A"}
                </Typography>
            </Box>
        </Box>
    );
};

export default function ViewInspection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [observationColumns, setObservationColumns] = useState([
        { id: "observation", label: "Observation" },
    ]);

    useEffect(() => {
        if (id) {
            fetchInspection();
        }
    }, [id]);

    const fetchInspection = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/incoming-inspection/${id}`);
            const inspectionData = response.data;

            if (inspectionData) {
                const materialDataLoaded = {
                    ...inspectionData.materialData,
                    ...(inspectionData.materialData.verificationChecks || {})
                };

                setData({
                    ...inspectionData,
                    materialData: materialDataLoaded
                });

                if (inspectionData.observations?.length > 0) {
                    const firstObs = inspectionData.observations[0];
                    const dynamicKeys = Object.keys(firstObs).filter(k => k.startsWith("observation_"));
                    if (dynamicKeys.length > 0) {
                        const newCols = dynamicKeys.map(k => ({
                            id: k,
                            label: `Observation ${k.split("_")[1]}`
                        }));
                        setObservationColumns([{ id: "observation", label: "Observation" }, ...newCols]);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching inspection:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Professional Report..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center" }}>Inspection not found.</Box>;

    const { materialData, observations, summaryData, approvalData, inspectionStatus } = data;

    return (
        <Box sx={{ pb: 6, bgcolor: "#f8fafc" }}>
            {/* Professional Header Section */}
            <Box sx={{
                bgcolor: "#fff",
                borderBottom: "1px solid #e2e8f0",
                py: 3,
                px: 4,
                mb: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2
            }}>
                <Stack spacing={0.5}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: "#1172ba", width: 40, height: 40 }}>
                            <Science />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>
                                {materialData.grnNumber}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                                Inspection Report: <span style={{ color: "#1172ba" }}>{materialData.inspectionReportNumber}</span>
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Button
                        variant="soft"
                        startIcon={<PrintIcon />}
                        onClick={() => window.print()}
                        sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, bgcolor: "#f1f5f9", color: "#475569" }}
                    >
                        Export
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => router.push(`/incoming-inspection/add-material-inspection?id=${id}`)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                            bgcolor: "#1172ba",
                            boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                        }}
                    >
                        Edit Report
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    {/* Left Column: Core Info */}
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #e2e8f0", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                                <Inventory sx={{ color: "#1172ba" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Material Specifications</Typography>
                            </Box>

                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Vendor" value={materialData.supplierName} icon={People} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="PO Link" value={materialData.poNumber} icon={Receipt} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Material" value={materialData.materialName} icon={Inventory} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Lot Size" value={materialData.lotQuantity} color="#1172ba" /></Grid>

                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Invoice #" value={materialData.invoiceNumber} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Lot Number" value={materialData.lotNumber} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Recv Date" value={materialData.receivedDate} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><InfoItem label="Insp Date" value={materialData.inspectionDate} /></Grid>
                            </Grid>

                            <Divider sx={{ my: 4, borderStyle: "dashed" }} />

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                <VerifiedUser sx={{ color: "#10b981" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Validation Summary</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}><VerificationBadge label="Instruments Calibration" status={materialData.toolsUsed} /></Grid>
                                <Grid item xs={12} md={4}><VerificationBadge label="SDS Verification" status={materialData.sdsAvailable} /></Grid>
                                <Grid item xs={12} md={4}><VerificationBadge label="Quality Certification" status={materialData.qualityCertificate} /></Grid>
                            </Grid>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 0, borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                            <Box sx={{ p: 3, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Science sx={{ color: "#1172ba" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Inspection Logs</Typography>
                            </Box>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead sx={{ bgcolor: "#fff" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", py: 2 }}>Parameter</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>Control Method</TableCell>
                                            {observationColumns.map((col) => (
                                                <TableCell key={col.id} sx={{ fontWeight: 800, color: "#1172ba" }}>{col.label}</TableCell>
                                            ))}
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>Verdict/Remarks</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {observations.map((obs, index) => (
                                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { bgcolor: "#f1f5f9" } }}>
                                                <TableCell sx={{ fontWeight: 700, py: 2.5 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{obs.parameter}</Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>Spec: {obs.specification}</Typography>
                                                </TableCell>
                                                <TableCell><Chip label={obs.method} size="small" variant="outlined" sx={{ fontWeight: 600, borderRadius: 1 }} /></TableCell>
                                                {observationColumns.map((col) => (
                                                    <TableCell key={col.id} sx={{ fontWeight: 600 }}>{obs[col.id] || "-"}</TableCell>
                                                ))}
                                                <TableCell sx={{ color: "#64748b", fontStyle: "italic", fontSize: "0.85rem" }}>{obs.remarks || "No defects noted"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Right Column: Final Verdict & Approval */}
                    <Grid item xs={12} lg={4}>
                        <Paper elevation={0} sx={{
                            p: 4,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "#1172ba",
                            bgcolor: "#fff",
                            mb: 3,
                            position: "relative",
                            overflow: "hidden"
                        }}>
                            <Box sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                p: 1,
                                bgcolor: "#1172ba",
                                color: "#fff",
                                borderBottomLeftRadius: 12
                            }}>
                                <Assignment fontSize="small" />
                            </Box>

                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Inspection Results</Typography>

                            <Stack spacing={3}>
                                <Box sx={{ p: 2, bgcolor: "#ecfdf5", borderRadius: 2, border: "1px solid #10b981" }}>
                                    <Typography variant="caption" sx={{ color: "#047857", fontWeight: 800, textTransform: "uppercase" }}>Accepted Quantity</Typography>
                                    <Typography variant="h4" sx={{ color: "#065f46", fontWeight: 900 }}>{summaryData.acceptedQuantity || "0"}</Typography>
                                </Box>

                                <Box sx={{ p: 2, bgcolor: "#fef2f2", borderRadius: 2, border: "1px solid #ef4444" }}>
                                    <Typography variant="caption" sx={{ color: "#b91c1c", fontWeight: 800, textTransform: "uppercase" }}>Rejected/Scrap</Typography>
                                    <Typography variant="h4" sx={{ color: "#991b1b", fontWeight: 900 }}>{summaryData.rejectedQuantity || "0"}</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 1 }}>Decision Comments</Typography>
                                    <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#475569", bgcolor: "#f8fafc", p: 2, borderRadius: 2 }}>
                                        {summaryData.comments || "Material matches required specifications. No critical deviations observed."}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "#fff" }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Authorizations</Typography>

                            <Stack spacing={3}>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><People /></Avatar>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>PREPARED BY</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{approvalData.updatedByName}</Typography>
                                        <Typography variant="caption" sx={{ color: "#1172ba" }}>{approvalData.updatedByDate}</Typography>
                                    </Box>
                                </Box>

                                <Divider />

                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Avatar sx={{ bgcolor: "#f0fdf4", color: "#15803d" }}><CheckCircle /></Avatar>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>AUTHORIZED BY</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{approvalData.approvedByName}</Typography>
                                        <Typography variant="caption" sx={{ color: "#10b981" }}>{approvalData.approvedByDate}</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/incoming-inspection")}
                        sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
                    >
                        Return to Dashboard
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
