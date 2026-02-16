"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Grid, Paper, Typography, Divider, Chip, Button, IconButton, Stack } from '@mui/material';
import {
    ArrowBack,
    Business,
    FactCheck,
    Assessment,
    VerifiedUser,
    FolderOpen,
    Print,
    Edit,
    CalendarMonth,
    Person
} from '@mui/icons-material';
import axiosInstance from '@/axios/axiosInstance';
import Loader from '@/components/ui/Loader';
import { useNotification } from '@/context/NotificationContext';

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

function OngoingEvaluationViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchEvaluation();
        }
    }, [id]);

    const fetchEvaluation = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/ongoing-evaluation/${id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching evaluation:", error);
            showNotification("Failed to load evaluation details", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Evaluation Details..." />;
    if (!data) return null;

    return (
        <Box sx={{ pb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }} className="no-print">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => router.push("/ongoing-evaluation")} sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0' }}>
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" fontWeight={800} color="#1e293b">
                            Ongoing Evaluation Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Record ID: {id} | Date: {data.date}
                        </Typography>
                    </Box>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                    >
                        Print Details
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/ongoing-evaluation/edit?id=${id}`)}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)"
                        }}
                    >
                        Edit Record
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
                        <SectionHeader title="Supplier Info" icon={Business} />
                        <DetailItem label="Supplier Name" value={data.supplierName} isBold textColor="#1172ba" />
                        <DetailItem label="Classification" value={data.supplierClassification} isChip color={data.supplierClassification === 'Critical' ? 'error' : 'success'} />
                        <DetailItem label="Contact Person" value={data.contactPerson} />
                        <DetailItem label="Phone" value={data.phone} />
                        <DetailItem label="Email" value={data.email} />
                        <Divider sx={{ my: 2 }} />
                        <DetailItem label="Evaluation Period" value={data.evaluationPeriod} />
                        <DetailItem label="Evaluated By" value={data.evaluatedBy} />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Performance Evaluation" icon={FactCheck} color="#059669" />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <DetailItem
                                        label="ISO / Quality Certifications Status"
                                        value={data.certificationStatus === 'Yes' ? `Yes - ${data.certificationDetails}` : data.certificationStatus}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DetailItem label="Requirements Fulfillment" value={data.meetRequirements} />
                                    <DetailItem label="Responsiveness" value={data.responsiveness} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DetailItem label="Quality of Goods" value={data.quality} />
                                    <DetailItem label="On Time Delivery" value={data.onTimeDelivery} />
                                    <DetailItem label="Cost Performance" value={data.cost} />
                                </Grid>
                            </Grid>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                            <SectionHeader title="Evaluation Result" icon={Assessment} color="#f59e0b" />
                            <DetailItem
                                label="Final Status"
                                value={data.evaluationResult}
                                isBold
                                textColor={data.evaluationResult?.includes('Not') ? '#ef4444' : '#15803d'}
                            />
                            <DetailItem
                                label="Required Actions"
                                value={[
                                    data.requiredActions.includes('AddToASL') && 'Add to Approved Supplier List',
                                    data.requiredActions.includes('RemoveFromASL') && 'Remove from ASL',
                                    data.otherAction
                                ].filter(Boolean).join(', ') || 'None'}
                            />
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Evidences & Controls" icon={FolderOpen} color="#6366f1" />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <DetailItem
                                        label="Verified Evidences"
                                        value={[
                                            data.evidences.includes('registrationCertificate') && 'Registration Certificate',
                                            data.evidences.includes('qualityInspections') && 'Quality Inspections',
                                            data.otherEvidence
                                        ].filter(Boolean).join(', ') || 'None'}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <DetailItem
                                        label="Routine Controls Applied"
                                        value={[
                                            data.routineControls.includes('purchaseOrders') && 'Purchase Orders',
                                            data.routineControls.includes('specifications') && 'Specifications',
                                            data.routineControls.includes('incomingInspections') && 'Incoming Inspections',
                                            data.routineControls.includes('reportReview') && 'Report Review',
                                            data.routineControls.includes('contract') && 'Agreement/Contract',
                                            data.otherControls
                                        ].filter(Boolean).join(', ') || 'None'}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f1f5f9' }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6 }}>
                                    <DetailItem label="Completed By" value={data.completedBy} />
                                    <DetailItem label="Completion Date" value={data.completedDate} />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <DetailItem label="Approved By" value={data.approvedBy} />
                                    <DetailItem label="Approval Date" value={data.approvedDate || 'N/A'} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; margin: 0; padding: 20px; }
                    .MuiPaper-root { border: 1px solid #eee !important; box-shadow: none !important; }
                }
            `}</style>
        </Box>
    );
}

export default function OngoingEvaluationViewPage() {
    return (
        <Suspense fallback={<Loader fullPage />}>
            <OngoingEvaluationViewContent />
        </Suspense>
    );
}
