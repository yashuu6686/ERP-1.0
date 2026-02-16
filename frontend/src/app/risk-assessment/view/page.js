"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Grid, Paper, Typography, Chip, Button, Divider, IconButton } from '@mui/material';
import { ArrowBack, Business, Assessment, FactCheck, Print, Edit } from '@mui/icons-material';
import axiosInstance from '@/axios/axiosInstance';
import Loader from '@/components/ui/Loader';
import CommonCard from '@/components/ui/CommonCard';

const DetailItem = ({ label, value, isChip, color, isBold, textColor }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
        </Typography>
        <Box sx={{ mt: 0.5 }}>
            {isChip ? (
                <Chip label={value} color={color} size="small" sx={{ fontWeight: 700 }} />
            ) : (
                <Typography variant="body2" sx={{ fontWeight: isBold ? 700 : 500, color: textColor || '#1e293b' }}>
                    {value || '-'}
                </Typography>
            )}
        </Box>
    </Box>
);

const SectionHeader = ({ title, icon: Icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, color: '#1172ba' }}>
        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(17, 114, 186, 0.1)', display: 'flex' }}>
            <Icon sx={{ fontSize: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
            {title}
        </Typography>
    </Box>
);

function RiskAssessmentViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchAssessment(id);
        }
    }, [id]);

    const fetchAssessment = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/risk-assessments/${id}`);
            // Handle if server returns an array or a single object
            const result = Array.isArray(response.data) ? response.data[0] : response.data;

            if (result && result.id) {
                setData(result);
            } else {
                // fallback to searching list if direct ID access fails (common with some mock servers)
                const listResp = await axiosInstance.get('/risk-assessments');
                const found = listResp.data.find(item => item.id === id);
                if (found) setData(found);
                else setData(null);
            }
        } catch (error) {
            console.error("Error fetching assessment:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Fetching Risk Assessment..." />;
    if (!data) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">Assessment not found</Typography>
            <Button startIcon={<ArrowBack />} onClick={() => router.push('/risk-assessment')} sx={{ mt: 2 }}>
                Go Back
            </Button>
        </Box>
    );

    return (
        <Box>
            {/* Header Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center gap: 2' }}>
                    <IconButton onClick={() => router.back()} sx={{ mr: 1, bgcolor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <ArrowBack />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color="#1e293b">
                            Risk Assessment Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ID: {id} | Created: {data.assessmentDate}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ bgcolor: '#fff' }}
                    >
                        Print PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/risk-assessment/edit?id=${id}`)}
                        sx={{ bgcolor: '#1172ba' }}
                    >
                        Edit Assessment
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column - Supplier Info & Classification */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
                        <SectionHeader title="Supplier Information" icon={Business} />
                        <DetailItem label="Supplier Name" value={data.supplierName} isBold />
                        <DetailItem label="Address/Location" value={data.addressLocation} />
                        <DetailItem label="Contact Person" value={data.contactPerson} />
                        <DetailItem label="Type of Supplier" value={data.typeOfSupplier} />
                        <DetailItem label="Product/Service" value={data.suppliedProductService} />
                        <DetailItem label="Quality Agreement" value={data.qualityAgreement} />

                        <Divider sx={{ my: 3 }} />

                        <SectionHeader title="Classification" icon={Assessment} />
                        <DetailItem
                            label="Supplier Classification"
                            value={data.supplierClassification}
                            isChip
                            color={data.supplierClassification === 'Critical' ? 'error' : 'success'}
                        />
                    </Paper>
                </Grid>

                {/* Right Column - Scoring Matrix & Results */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Risk Scoring Matrix */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Risk Scoring Matrix" icon={Assessment} />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <DetailItem label="Probability (P)" value={data.probability} />
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <DetailItem label="Severity (S)" value={data.severity} />
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <DetailItem label="Criticality Weight (W)" value={data.criticalityWeight} />
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <DetailItem label="Risk Score" value={data.calculatedRiskScore} isBold textColor="#1172ba" />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <DetailItem
                                        label="Final Risk Category"
                                        value={data.riskCategory}
                                        isChip
                                        color={data.riskCategory === 'High' ? 'error' : data.riskCategory === 'Medium' ? 'warning' : 'success'}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Scoring Table Summary */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <SectionHeader title="Scoring Criteria Summary" icon={FactCheck} />
                            <Box sx={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: '#f8fafc' }}>
                                        <tr>
                                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>CRITERIA</th>
                                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>SCORE</th>
                                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>WEIGHT</th>
                                            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>WEIGHTED</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { label: 'Quality System', field: 'qualitySystem' },
                                            { label: 'Incoming Inspection', field: 'incomingInspection' },
                                            { label: 'Delivery', field: 'delivery' },
                                            { label: 'Reliability', field: 'reliability' },
                                            { label: 'Process Consistency', field: 'processConsistency' },
                                            { label: 'Traceability', field: 'traceability' },
                                            { label: 'Change Control', field: 'changeControl' },
                                            { label: 'Financial Stability', field: 'financialStability' },
                                            { label: 'Geo-Political', field: 'geoPolitical' },
                                            { label: 'Alternate Suppliers', field: 'alternateSuppliers' },
                                        ].map((criterion, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: '0.875rem', fontWeight: 500 }}>{criterion.label}</td>
                                                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: '0.875rem' }}>{data[criterion.field]?.score || 'NA'}</td>
                                                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: '0.875rem' }}>{data[criterion.field]?.tierWeight || '-'}</td>
                                                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600 }}>{data[criterion.field]?.weightedScore || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot style={{ backgroundColor: '#f8fafc' }}>
                                        <tr>
                                            <td colSpan={3} style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>Weighted Average:</td>
                                            <td style={{ padding: '12px', textAlign: 'right', color: '#1172ba', fontWeight: 800 }}>{data.weightedAverage || 'N/A'}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Box>

                            <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: '#f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle2" fontWeight={700}>FINAL RISK INTERPRETATION</Typography>
                                <Chip
                                    label={data.riskInterpretation || "N/A"}
                                    color={data.riskInterpretation?.includes('High') ? 'error' : data.riskInterpretation?.includes('Medium') ? 'warning' : 'success'}
                                    sx={{ fontWeight: 800, px: 1 }}
                                />
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default function RiskAssessmentViewPage() {
    return (
        <Suspense fallback={<Loader fullPage />}>
            <RiskAssessmentViewContent />
        </Suspense>
    );
}
