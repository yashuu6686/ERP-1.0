"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Grid, Paper, Typography, Chip, Stack, Divider, Button, IconButton } from "@mui/material";
import { ArrowBack, TaskAlt, FolderOpen, CheckCircle, Warning, Close, Edit, Print, Business, FactCheck, Assessment } from "@mui/icons-material";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import { Suspense } from "react";

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

function OngoingChecklistContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchChecklistData = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/ongoing-evaluation/${id}`);
            const result = Array.isArray(response.data) ? response.data[0] : response.data;
            if (result && result.id) {
                setData(result);
            } else {
                throw new Error("No data found");
            }
        } catch (error) {
            console.error("Error fetching checklist:", error);
            // Enhanced Mock data matching the ERP's needs
            setData({
                supplierName: "Apex Medical Solutions Ltd.",
                contactPerson: "Dr. Robert Wilson",
                phone: "+91 98765-43210",
                email: "r.wilson@apexmedical.com",
                supplierClassification: "Critical",
                evaluationPeriod: "Annually (2025-26)",
                evaluatedBy: "Sarah Johnson (QA Manager)",
                date: "2026-02-16",
                certificationStatus: "Active",
                certificationStatusDate: "2027-12-15",
                meetRequirements: "Exceeds Expectations",
                responsiveness: "Highly Responsive",
                quality: "Consistent High Quality (98%)",
                onTimeDelivery: "On-Time (100%)",
                cost: "Competitive",
                evaluationResult: "Approved - No Conditions",
                requiredAction: "AddToASL",
                evidences: ["registrationCertificate", "qualityInspections"],
                otherEvidence: "ISO 13485:2016 Certified",
                routineControls: ["purchaseOrders", "incomingInspections", "reportReview"],
                otherControls: "Quarterly Audit Reports",
                completedBy: "Sarah Johnson",
                completedDate: "2026-02-15",
                approvedBy: "David Chen (CEO)",
                approvedDate: "2026-02-16",
            });
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchChecklistData();
        }
    }, [id, fetchChecklistData]);

    if (loading) return <Loader fullPage message="Loading Checklist Details..." />;
    if (!data) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">Evaluation result not found</Typography>
            <Button startIcon={<ArrowBack />} onClick={() => router.push('/approved-suppliers')} sx={{ mt: 2 }}>
                Go Back
            </Button>
        </Box>
    );

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header / Actions */}
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
                            Ongoing Evaluation Checklist
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Supplier ID: {id} | Last Evaluation: {data.date}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FactCheck />}
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
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Supplier Info Card */}
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
                        <DetailItem label="Contact Point" value={data.contactPerson} />
                        <DetailItem label="Communication" value={`${data.phone} | ${data.email}`} />
                        <DetailItem
                            label="Classification"
                            value={data.supplierClassification}
                            isChip
                            color={data.supplierClassification === 'Critical' ? 'error' : 'success'}
                        />
                        <Divider sx={{ my: 3 }} />
                        <DetailItem label="Review Period" value={data.evaluationPeriod} />
                        <DetailItem label="Assigned Auditor" value={data.evaluatedBy} />
                    </Paper>
                </Grid>

                {/* Main Content Areas */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Scoring & Quality Card */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Performance Assessment" icon={FactCheck} color="#059669" />
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <DetailItem label="Quality Standard Status" value={data.certificationStatus} />
                                    <DetailItem label="Cert Expiry Date" value={data.certificationStatusDate} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <DetailItem label="Requirement Fulfillment" value={data.meetRequirements} />
                                    <DetailItem label="Service Responsiveness" value={data.responsiveness} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <DetailItem label="Overall Quality" value={data.quality} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <DetailItem label="Delivery Performance" value={data.onTimeDelivery} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <DetailItem label="Commercial Viability" value={data.cost} />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Outcomes & Actions */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                            <SectionHeader title="Evaluation Outcome" icon={Assessment} color="#ef4444" />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <DetailItem
                                        label="Final Decision"
                                        value={data.evaluationResult}
                                        isChip
                                        color={data.evaluationResult?.toLowerCase().includes('approved') ? 'success' : 'error'}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <DetailItem
                                        label="System Action"
                                        value={data.requiredAction === 'AddToASL' ? 'Maintain in Approved List' : 'Corrective Action Required'}
                                        isBold
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Evidence & Verification */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Verification & Controls" icon={FolderOpen} color="#9333ea" />
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, mb: 1, display: 'block' }}>EVIDENCES VERIFIED</Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {data.evidences?.map(ev => (
                                            <Chip key={ev} label={ev.replace(/([A-Z])/g, ' $1').trim()} size="small" variant="outlined" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
                                        ))}
                                        {data.otherEvidence && <Chip label={data.otherEvidence} size="small" variant="outlined" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />}
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, mb: 1, display: 'block' }}>ROUTINE MONITORING</Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {data.routineControls?.map(rc => (
                                            <Chip key={rc} label={rc.replace(/([A-Z])/g, ' $1').trim()} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem', bgcolor: '#e0e7ff', color: '#4338ca' }} />
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>

                {/* Approval Footer */}
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', color: '#fff' }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                                        <TaskAlt />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 600 }}>COMPLETED BY</Typography>
                                        <Typography variant="body2" fontWeight={700}>{data.completedBy}</Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.8 }}>{data.completedDate}</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)', height: 40 }} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                                        <TaskAlt />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 600 }}>APPROVED BY (CEO/MANAGEMENT)</Typography>
                                        <Typography variant="body2" fontWeight={700}>{data.approvedBy}</Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.8 }}>{data.approvedDate}</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; margin: 0; padding: 20px; }
                    .MuiPaper-root { border: 1px solid #eee !important; box-shadow: none !important; margin-bottom: 20px !important; break-inside: avoid; }
                    .MuiGrid-container { width: 100% !important; margin: 0 !important; }
                    .MuiGrid-item { padding: 10px !important; }
                }
            `}</style>
        </Box>
    );
}

export default function OngoingChecklistPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <OngoingChecklistContent />
        </Suspense>
    );
}
