import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { FactCheck } from '@mui/icons-material';

const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2, mb: 3 }}>
        <Box sx={{ p: 2, background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)", color: "white", display: "flex", alignItems: "center", gap: 1.5 }}>
            {Icon && <Icon />}
            <Typography variant="h6" fontWeight={600} color={"white"}>{title}</Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>{children}</CardContent>
    </Card>
);

const CriterionRow = ({ label, formik, fieldName }) => {
    const scores = [1, 2, 3, 4, 5];

    return (
        <Grid container spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="body2" fontWeight={600}>{label}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                    fullWidth
                    select
                    size="small"
                    name={`${fieldName}.score`}
                    label="Score (1-5/NA)"
                    value={formik.values[fieldName]?.score || ''}
                    onChange={formik.handleChange}
                >
                    {scores.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    <MenuItem value="NA">NA</MenuItem>
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                    fullWidth
                    select
                    size="small"
                    name={`${fieldName}.tierWeight`}
                    label="Tier Weight"
                    value={formik.values[fieldName]?.tierWeight || ''}
                    onChange={formik.handleChange}
                >
                    <MenuItem value={1}>1 - Low</MenuItem>
                    <MenuItem value={1.5}>1.5 - Medium</MenuItem>
                    <MenuItem value={2}>2 - High</MenuItem>
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                    fullWidth
                    size="small"
                    name={`${fieldName}.weightedScore`}
                    label="Weighted Score"
                    value={formik.values[fieldName]?.weightedScore || ''}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f8fafc' }}
                />
            </Grid>
        </Grid>
    );
};

const ScoringTableSection = ({ formik }) => {
    const criteria = [
        { label: 'Quality System Certification/Accreditation', field: 'qualitySystem' },
        { label: 'Incoming Inspection Rejection Rate', field: 'incomingInspection' },
        { label: 'Delivery', field: 'delivery' },
        { label: 'Reliability', field: 'reliability' },
        { label: 'Process/Product Consistency', field: 'processConsistency' },
        { label: 'Traceability & Documentation Control', field: 'traceability' },
        { label: 'Change Control Maturity', field: 'changeControl' },
        { label: 'Financial Stability', field: 'financialStability' },
        { label: 'Geographical/Political Stability', field: 'geoPolitical' },
        { label: 'Availability of Alternate Suppliers', field: 'alternateSuppliers' },
    ];

    return (
        <GradientCard title="Scoring and Interpretation Table" icon={FactCheck}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Fill score for each applicable criterion using objective evidence. Multiply Score × Weight → enter in Weighted Score column. Calculate the weighted average. Score each applicable criterion 1 (Low risk) to 5 (High risk) based on objective evidence. Mark NA only when not applicable, with written justification.
            </Typography>

            {criteria.map((criterion, idx) => (
                <CriterionRow key={idx} label={criterion.label} formik={formik} fieldName={criterion.field} />
            ))}

            <Box sx={{ mt: 3, p: 2, borderRadius: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            name="weightedAverage"
                            label="Weighted Average"
                            value={formik.values.weightedAverage}
                            InputProps={{ readOnly: true }}
                            sx={{ bgcolor: '#f8fafc' }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            name="riskInterpretation"
                            label="Risk Interpretation"
                            value={formik.values.riskInterpretation}
                            InputProps={{ readOnly: true }}
                            sx={{ bgcolor: '#f8fafc' }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#fff', borderRadius: 1, border: '1px solid #e2e8f0' }}>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                    Risk Interpretation Guide:
                </Typography>
                <Box sx={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, fontSize: '0.875rem' }}>Weighted Average</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, fontSize: '0.875rem' }}>Risk Interpretation</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, fontSize: '0.875rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>1.0 - 2.0</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#15803d', fontWeight: 600 }}>Low Risk</span>
                                </td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                                    Routine monitoring; minimal intervention
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>2.1 - 3.5</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#ca8a04', fontWeight: 600 }}>Medium Risk</span>
                                </td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                                    Apply moderate controls; minor trend monitoring
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>3.6 - 5.0</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#dc2626', fontWeight: 600 }}>High Risk</span>
                                </td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                                    Implement full controls; escalate if critical
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', fontSize: '0.875rem' }}>NA</td>
                                <td style={{ padding: '12px', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>NA</span>
                                </td>
                                <td style={{ padding: '12px', fontSize: '0.875rem' }}>
                                    Provide justification; skip scoring
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Box>
        </GradientCard>
    );
};

export default ScoringTableSection;
