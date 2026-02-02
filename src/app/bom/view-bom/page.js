"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Divider,
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
    Chip,
} from "@mui/material";
import {
    ArrowBack,
    Build,
    Assignment,
    Print as PrintIcon,
    Edit as EditIcon,
    Inventory,
    VerifiedUser,
    Person,
    HistoryEdu
} from "@mui/icons-material";
import CommonCard from "@/components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

const InfoItem = ({ label, value, icon: Icon }) => (
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
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1e293b" }}>
                {value || "-"}
            </Typography>
        </Box>
    </Box>
);

function ViewBOMContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [bom, setBom] = useState(null);

    // Initial dummy data for demonstration if API fails or ID is dummy
    const dummyBOM = {
        number: "BOM-202502-001",
        date: "02-02-2025",
        status: "Approved",
        materials: [
            {
                id: 1,
                scanboPartNumber: "SIPL.ASY.PBT.ool",
                supplierPartNumber: "lktp.20240501-0011",
                quantity: "1",
                materialName: "Upper Case",
                manufacturerName: "Xiamen Linktop Technology Co., Ltd",
                technicalDetails: "Main PCB board with sensors and integrated wireless module"
            },
            {
                id: 2,
                scanboPartNumber: "SIPL.MEC.HSG.002",
                supplierPartNumber: "SUP-MEC-992",
                quantity: "1",
                materialName: "Lower Housing",
                manufacturerName: "Precision Plastics Ltd",
                technicalDetails: "ABS Industrial Grade, Grade A finish"
            },
            {
                id: 3,
                scanboPartNumber: "SIPL.ELE.BAT.005",
                supplierPartNumber: "BAT-LI-2000",
                quantity: "1",
                materialName: "Lithium Battery",
                manufacturerName: "Energy Cell Corp",
                technicalDetails: "2000mAh, 3.7V with protection circuit"
            }
        ],
        authorization: {
            reviewedBy: "Sanjay Kumar",
            reviewedDate: "01-02-2025",
            approvedBy: "John Doe",
            approvedDate: "02-02-2025"
        }
    };

    useEffect(() => {
        const fetchBOM = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/bom/${id}`);
                setBom(response.data);
            } catch (error) {
                console.error("Error fetching BOM:", error);
                // Simulation fallback for d8 if server fails
                if (id === "d8") {
                    setBom(d8BOM);
                } else if (id === "fe82") {
                    // D8 from server might have this ID
                    setBom(d8BOM);
                } else {
                    setBom(dummyBOM);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBOM();
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Professional BOM..." />;
    if (!bom) return <Box sx={{ p: 4, textAlign: "center" }}>BOM not found.</Box>;

    return (
        <Box sx={{ pb: 6, bgcolor: "#f8fafc" }}>
            {/* Header Section */}
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
                        <Avatar sx={{ bgcolor: "#1172ba", width: 44, height: 44 }}>
                            <Build />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>
                                {bom.number}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700, mb: 0.5 }}>
                                Product: {bom.productName || "N/A"}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                                Bill of Materials • Registered on {bom.date}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Button
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={() => window.print()}
                        sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, borderColor: "#e2e8f0", color: "#475569" }}
                    >
                        Export PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => router.push(`/bom/edit-bom?id=${id}`)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                            bgcolor: "#1172ba",
                            boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                        }}
                    >
                        Edit BOM
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ px: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    {/* Material List Table */}
                    <Grid item xs={12} lg={9}>
                        <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                            <Box sx={{ p: 3, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Inventory sx={{ color: "#1172ba" }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Component Specifications</Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#fff" }}>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", width: 60 }}>SR.</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>PART NUMBER</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>MATERIAL NAME</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b", textAlign: "center" }}>QTY</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>MANUFACTURER</TableCell>
                                            <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>TECHNICAL DETAILS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bom.materials.map((item, index) => (
                                            <TableRow key={index} hover sx={{ "&:hover": { bgcolor: "#f1f5f9" } }}>
                                                <TableCell sx={{ fontWeight: 700, color: "#94a3b8" }}>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#1172ba" }}>
                                                        {item.scanboPartNumber || item.scanboPartNo}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        Supp: {item.supplierPartNumber || item.oemPartNo || "-"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>
                                                    {item.materialName || item.description}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    <Box sx={{
                                                        display: "inline-block",
                                                        px: 1.5,
                                                        py: 0.5,
                                                        bgcolor: "rgba(17, 114, 186, 0.1)",
                                                        color: "#1172ba",
                                                        borderRadius: 1,
                                                        fontWeight: 800
                                                    }}>
                                                        {item.quantity || item.qty}
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                                                    {item.manufacturerName || item.manufacturer || item.oemSupplier}
                                                </TableCell>
                                                <TableCell sx={{ color: "#64748b", fontSize: "0.85rem", maxWidth: 300 }}>
                                                    {item.technicalDetails || item.specs}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Sidebar: Authorization & Metadata */}
                    <Grid item xs={12} lg={3}>
                        <Stack spacing={3}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #e2e8f0" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                                    <VerifiedUser sx={{ color: "#10b981" }} />
                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Authorization</Typography>
                                </Box>

                                <Stack spacing={3}>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Avatar sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}><HistoryEdu /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>REVIEWED BY</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{bom.authorization.reviewedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#1172ba" }}>{bom.authorization.reviewedDate}</Typography>
                                        </Box>
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Avatar sx={{ bgcolor: "#f0fdf4", color: "#15803d" }}><Person /></Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>APPROVED BY</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{bom.authorization.approvedBy}</Typography>
                                            <Typography variant="caption" sx={{ color: "#10b981" }}>{bom.authorization.approvedDate}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: "#fff" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 2 }}>
                                    Report Details
                                </Typography>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow sx={{ "& td": { border: 0, py: 0.5, px: 0 } }}>
                                            <TableCell sx={{ color: "#64748b", fontWeight: 600 }}>Total Parts</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 800 }}>{bom.materials.length}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ "& td": { border: 0, py: 0.5, px: 0 } }}>
                                            <TableCell sx={{ color: "#64748b", fontWeight: 600 }}>Status</TableCell>
                                            <TableCell align="right">
                                                <Chip label="Certified" size="small" sx={{ bgcolor: "#dcfce7", color: "#15803d", fontWeight: 800, fontSize: "0.65rem" }} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/bom")}
                        sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
                    >
                        Back to BOM Registry
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default function ViewBOM() {
    return (
        <Suspense fallback={<Loader fullPage message="Initializing BOM Data..." />}>
            <ViewBOMContent />
        </Suspense>
    );
}
