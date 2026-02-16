import React from 'react';
import FormReviewDialog from '@/components/ui/FormReviewDialog';
import { FactCheck, Business, Assessment, VerifiedUser, TaskAlt, FolderOpen } from '@mui/icons-material';
import { Box, Grid, Paper, Typography, Divider, Chip } from '@mui/material';

const OngoingEvaluationPreviewDialog = ({ open, onClose, onConfirm, data, loading }) => {
    if (!data) return null;

    const sections = [
        {
            title: "Supplier Details",
            icon: <Business sx={{ fontSize: 18 }} />,
            items: [
                { label: "Supplier Name", value: data.supplierName, isBold: true },
                { label: "Contact Person", value: data.contactPerson },
                { label: "Phone", value: data.phone },
                { label: "Email", value: data.email },
                { label: "Classification", value: data.supplierClassification, isChip: true, color: data.supplierClassification === 'Critical' ? 'error' : 'success' },
                { label: "Evaluation Period", value: data.evaluationPeriod },
                { label: "Evaluated By", value: data.evaluatedBy },
                { label: "Date", value: data.date },
            ]
        },
        {
            title: "Performance Ratings",
            icon: <FactCheck sx={{ fontSize: 18 }} />,
            fullWidth: true,
            items: [
                { label: "Quality System / Certifications", value: data.certificationStatus === 'Yes' ? `Yes (Exp: ${data.certificationStatusDate})` : data.certificationStatus },
                { label: "Meet Design/Service Requirements", value: data.meetRequirements },
                { label: "Responsiveness/Management", value: data.responsiveness },
                { label: "Quality of Goods/Services", value: data.quality },
                { label: "On Time Delivery", value: data.onTimeDelivery },
                { label: "Cost", value: data.cost },
            ]
        },
        {
            title: "Evaluation Decision",
            icon: <Assessment sx={{ fontSize: 18 }} />,
            items: [
                {
                    label: "Result",
                    value: data.evaluationResult,
                    isBold: true,
                    color: data.evaluationResult.includes('Not') ? '#ef4444' : '#15803d'
                },
                {
                    label: "Required Action",
                    value: data.requiredAction === 'Other' ? data.otherAction :
                        data.requiredAction === 'AddToASL' ? 'Add to Approved Supplier List' :
                            'Remove from ASL'
                }
            ]
        },
        {
            title: "Evidence & Controls",
            icon: <FolderOpen sx={{ fontSize: 18 }} />,
            items: [
                {
                    label: "Evidences Checked",
                    value: [
                        data.evidences.includes('registrationCertificate') && 'Registration Certificate',
                        data.evidences.includes('qualityInspections') && 'Quality Inspections',
                        data.otherEvidence
                    ].filter(Boolean).join(', ') || 'None'
                },
                {
                    label: "Routine Controls",
                    value: [
                        data.routineControls.includes('purchaseOrders') && 'Purchase Orders',
                        data.routineControls.includes('partServiceSpecs') && 'Specs',
                        data.routineControls.includes('incomingInspections') && 'Incoming Inspections',
                        data.routineControls.includes('reportReview') && 'Report Review',
                        data.routineControls.includes('agreementContract') && 'Contract',
                        data.otherControls
                    ].filter(Boolean).join(', ') || 'None'
                }
            ]
        }
    ];

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            loading={loading}
            title="Review Ongoing Evaluation"
            icon={<VerifiedUser />}
            headerInfo={{
                label1: "SUPPLIER",
                value1: data.supplierName,
                label2: "RESULT",
                value2: data.evaluationResult
            }}
            confirmLabel="Confirm & Submit"
        >
            <Grid container spacing={3}>
                {sections.map((section, idx) => (
                    <Grid item xs={12} md={section.fullWidth ? 12 : 6} key={idx}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#1172ba' }}>
                                {section.icon}
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.title}</Typography>
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: section.fullWidth ? 'repeat(2, 1fr)' : '1fr', gap: 2 }}>
                                {section.items.map((item, i) => (
                                    <Box key={i}>
                                        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</Typography>
                                        {item.isChip ? (
                                            <Chip label={item.value} color={item.color} size="small" sx={{ mt: 0.5, fontWeight: 700 }} />
                                        ) : (
                                            <Typography variant="body2" sx={{
                                                fontWeight: item.isBold ? 700 : 500,
                                                color: item.color || '#1e293b'
                                            }}>
                                                {item.value || '-'}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>Completed By:</Typography>
                                <Typography variant="body2" fontWeight={600}>{data.completedBy} ({data.completedDate})</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>Approved By:</Typography>
                                <Typography variant="body2" fontWeight={600}>{data.approvedBy} ({data.approvedDate})</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
};

export default OngoingEvaluationPreviewDialog;
