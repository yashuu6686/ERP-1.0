import React from 'react';
import FormReviewDialog from '@/components/ui/FormReviewDialog';
import { Assessment, Business, FactCheck } from '@mui/icons-material';
import { Box, Grid, Paper, Typography, Chip } from '@mui/material';

const RiskAssessmentPreviewDialog = ({ open, onClose, onConfirm, data, loading }) => {
    if (!data) return null;

    const sections = [
        {
            title: "Supplier Information",
            icon: <Business sx={{ fontSize: 18 }} />,
            items: [
                { label: "Supplier Name", value: data.supplierName, isBold: true },
                { label: "Address/Location", value: data.addressLocation },
                { label: "Contact Person", value: data.contactPerson },
                { label: "Type of Supplier", value: data.typeOfSupplier },
                { label: "Supplied Product/Service", value: data.suppliedProductService },
                { label: "Quality Agreement", value: data.qualityAgreement },
                { label: "Classification", value: data.supplierClassification, isChip: true, color: data.supplierClassification === 'Critical' ? 'error' : 'success' },
            ]
        },
        {
            title: "Risk Scoring Matrix",
            icon: <Assessment sx={{ fontSize: 18 }} />,
            items: [
                { label: "Probability (P)", value: data.probability },
                { label: "Severity (S)", value: data.severity },
                { label: "Criticality Weight (W)", value: data.criticalityWeight },
                { label: "Calculated Risk Score", value: data.calculatedRiskScore, isBold: true, color: '#1172ba' },
                { label: "Risk Category", value: data.riskCategory, isChip: true, color: data.riskCategory === 'High' ? 'error' : data.riskCategory === 'Medium' ? 'warning' : 'success' },
            ]
        },
        {
            title: "Scoring Criteria Summary",
            icon: <FactCheck sx={{ fontSize: 18 }} />,
            fullWidth: true,
            items: [
                { label: "Quality System", value: `Score: ${data.qualitySystem?.score || 'N/A'}, Weight: ${data.qualitySystem?.tierWeight || 'N/A'}, Weighted: ${data.qualitySystem?.weightedScore || 'N/A'}` },
                { label: "Incoming Inspection", value: `Score: ${data.incomingInspection?.score || 'N/A'}, Weight: ${data.incomingInspection?.tierWeight || 'N/A'}, Weighted: ${data.incomingInspection?.weightedScore || 'N/A'}` },
                { label: "Delivery", value: `Score: ${data.delivery?.score || 'N/A'}, Weight: ${data.delivery?.tierWeight || 'N/A'}, Weighted: ${data.delivery?.weightedScore || 'N/A'}` },
                { label: "Reliability", value: `Score: ${data.reliability?.score || 'N/A'}, Weight: ${data.reliability?.tierWeight || 'N/A'}, Weighted: ${data.reliability?.weightedScore || 'N/A'}` },
                { label: "Process Consistency", value: `Score: ${data.processConsistency?.score || 'N/A'}, Weight: ${data.processConsistency?.tierWeight || 'N/A'}, Weighted: ${data.processConsistency?.weightedScore || 'N/A'}` },
                { label: "Traceability", value: `Score: ${data.traceability?.score || 'N/A'}, Weight: ${data.traceability?.tierWeight || 'N/A'}, Weighted: ${data.traceability?.weightedScore || 'N/A'}` },
                { label: "Change Control", value: `Score: ${data.changeControl?.score || 'N/A'}, Weight: ${data.changeControl?.tierWeight || 'N/A'}, Weighted: ${data.changeControl?.weightedScore || 'N/A'}` },
                { label: "Financial Stability", value: `Score: ${data.financialStability?.score || 'N/A'}, Weight: ${data.financialStability?.tierWeight || 'N/A'}, Weighted: ${data.financialStability?.weightedScore || 'N/A'}` },
                { label: "Geo-Political", value: `Score: ${data.geoPolitical?.score || 'N/A'}, Weight: ${data.geoPolitical?.tierWeight || 'N/A'}, Weighted: ${data.geoPolitical?.weightedScore || 'N/A'}` },
                { label: "Alternate Suppliers", value: `Score: ${data.alternateSuppliers?.score || 'N/A'}, Weight: ${data.alternateSuppliers?.tierWeight || 'N/A'}, Weighted: ${data.alternateSuppliers?.weightedScore || 'N/A'}` },
            ]
        },
        {
            title: "Final Assessment",
            icon: <Assessment sx={{ fontSize: 18 }} />,
            items: [
                { label: "Weighted Average", value: data.weightedAverage || 'N/A', isBold: true },
                { label: "Risk Interpretation", value: data.riskInterpretation, isChip: true, color: data.riskInterpretation.includes('High') ? 'error' : data.riskInterpretation.includes('Medium') ? 'warning' : 'success' },
            ]
        }
    ];

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            loading={loading}
            title="Review Risk Assessment"
            icon={<Assessment />}
            headerInfo={{
                label1: "SUPPLIER",
                value1: data.supplierName,
                label2: "RISK CATEGORY",
                value2: data.riskCategory
            }}
            confirmLabel="Confirm & Submit"
        >
            <Grid container spacing={3}>
                {sections.map((section, idx) => (
                    <Grid size={{ xs: 12, md: section.fullWidth ? 12 : 6 }} key={idx}>
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
            </Grid>
        </FormReviewDialog>
    );
};

export default RiskAssessmentPreviewDialog;
