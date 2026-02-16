"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Chip,
    Stack,
    Divider,
    Button,
    IconButton
} from "@mui/material";
import {
    ArrowBack,
    Business,
    Person,
    Phone,
    Email,
    LocationOn,
    FactCheck,
    Print,
    Assignment,
    Verified,
    CalendarMonth
} from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";

const DetailItem = ({ label, value, isChip, color, isBold, textColor }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
        </Typography>
        <Box sx={{ mt: 0.5 }}>
            {isChip ? (
                <Chip
                    label={value}
                    color={color}
                    size="small"
                    sx={{ fontWeight: 800, fontSize: "0.65rem", textTransform: "uppercase", borderRadius: 1.5 }}
                />
            ) : (
                <Typography variant="body2" sx={{ fontWeight: isBold ? 700 : 600, color: textColor || '#1e293b' }}>
                    {value || '-'}
                </Typography>
            )}
        </Box>
    </Box>
);

const SectionHeader = ({ title, icon: Icon, color = "#1172ba" }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: `${color}15`, color: color, display: 'flex' }}>
            <Icon sx={{ fontSize: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
            {title}
        </Typography>
    </Box>
);

function ApprovedSupplierViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchSupplier();
        }
    }, [id]);

    const fetchSupplier = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/evaluation/${id}`);
            const result = Array.isArray(response.data) ? response.data[0] : response.data;

            if (result && result.id) {
                setData(result);
            } else {
                showNotification("Supplier not found", "error");
                router.push("/approved-suppliers");
            }
        } catch (error) {
            console.error("Error fetching supplier:", error);
            showNotification("Failed to load supplier details", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Supplier Profile..." />;
    if (!data) return null;

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header / Actions - Standard Site Flow */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 1 }} className="no-print">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={() => router.push("/approved-suppliers")}
                        sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', p: 1 }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" fontWeight={800} color="#1e293b" sx={{ letterSpacing: '-0.02em' }}>
                            Supplier Profile
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            ID: {id} | Registered: {data.evaluationDate || data.date}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{
                            borderRadius: 2.5,
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 3,
                            bgcolor: 'white',
                            borderColor: '#e2e8f0',
                            color: '#475569'
                        }}
                    >
                        Print PDF
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<FactCheck />}
                        onClick={() => router.push(`/ongoing-evaluation/create?supplierId=${id}`)}
                        sx={{
                            borderRadius: 2.5,
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 3,
                            boxShadow: 'none'
                        }}
                    >
                        Ongoing Evaluation
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column: Core Identity */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border: '1px solid #e2e8f0',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: '#1172ba' }} />
                        <SectionHeader title="Supplier Info" icon={Business} />

                        <DetailItem label="Legal Name" value={data.supplierName} isBold textColor="#1172ba" />
                        <DetailItem label="Evaluation No" value={data.evaluationNo} isBold />
                        <DetailItem
                            label="Classification"
                            value={data.supplierClassification || "General"}
                            isChip
                            color={data.supplierClassification === 'Critical' ? 'error' : 'success'}
                        />

                        <Divider sx={{ my: 3 }} />

                        <SectionHeader title="Contact Personnel" icon={Person} color="#6366f1" />
                        <DetailItem label="Primary Contact" value={data.contactPerson} />
                        <DetailItem label="Phone" value={data.phone} />
                        <DetailItem label="Email" value={data.email || 'N/A'} />
                    </Paper>
                </Grid>

                {/* Right Column: Master Details */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                        {/* Location Details */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Location & Facilities" icon={LocationOn} color="#f59e0b" />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12 }}>
                                    <DetailItem label="Full Registered Address" value={data.address} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <DetailItem label="City" value={data.city} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <DetailItem label="State/Province" value={data.state} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <DetailItem label="Zip/Postal Code" value={data.zipCode} />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Business Details */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Business profile" icon={Assignment} color="#9333ea" />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DetailItem label="Year Established" value={data.yearEstablished} />
                                    <DetailItem label="Workforce Size" value={data.numberOfEmployees} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DetailItem label="Products / Services" value={data.productServices} isBold />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Approval Status Card */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                            <SectionHeader title="Approval & Compliance" icon={Verified} color="#059669" />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <DetailItem label="Approval Date" value={data.approvedDate || data.evaluationDate} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <DetailItem label="Approving Authority" value={data.approvedBy || "Management"} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <DetailItem label="Next Review Due" value="Periodic" isBold textColor="#059669" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; margin: 0; padding: 20px; }
                    .MuiPaper-root { border: 1px solid #eee !important; box-shadow: none !important; margin-bottom: 20px !important; break-inside: avoid; }
                }
            `}</style>
        </Box >
    );
}

export default function ApprovedSupplierView() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ApprovedSupplierViewContent />
        </Suspense>
    );
}
