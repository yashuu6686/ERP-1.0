import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Assessment } from '@mui/icons-material';

const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2, mb: 3 }}>
        <Box sx={{ p: 2, background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)", color: "white", display: "flex", alignItems: "center", gap: 1.5 }}>
            {Icon && <Icon />}
            <Typography variant="h6" fontWeight={600} color={"white"}>{title}</Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>{children}</CardContent>
    </Card>
);

const RiskScoringSection = ({ formik }) => {
    return (
        <GradientCard title="Risk Assessment Criteria & Risk Scoring Matrix" icon={Assessment}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>Risk Scoring Definitions:</Typography>
                <Box sx={{ pl: 2, mb: 2 }}>
                    <Typography variant="body2"><strong>Probability (P):</strong> 1 = Rare occurrence, 2 = Occasional occurrence, 3 = Frequent occ</Typography>
                    <Typography variant="body2"><strong>Severity (S):</strong> 1 = Minor impact, no injury, 2 = Major but reversible injury or compliance impact, 3 = Catastrophic or irreversible injury / serious regulatory impact</Typography>
                    <Typography variant="body2"><strong>Criticality Weight (W):</strong> 1.5 = Non-Critical impact on product or QMS, 2.0 = Critical impact on product safety, performance, or compliance</Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        select
                        name="probability"
                        label="Probability (P)"
                        value={formik.values.probability}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={1}>1 - Rare</MenuItem>
                        <MenuItem value={2}>2 - Occasional</MenuItem>
                        <MenuItem value={3}>3 - Frequent</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        select
                        name="severity"
                        label="Severity (S)"
                        value={formik.values.severity}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={1}>1 - Minor</MenuItem>
                        <MenuItem value={2}>2 - Major</MenuItem>
                        <MenuItem value={3}>3 - Catastrophic</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        select
                        name="criticalityWeight"
                        label="Criticality Weight (W)"
                        value={formik.values.criticalityWeight}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={1.5}>1.5 - Non-Critical</MenuItem>
                        <MenuItem value={2.0}>2.0 - Critical</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        name="calculatedRiskScore"
                        label="Calculated Risk Score (P × S × W)"
                        value={formik.values.calculatedRiskScore}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f8fafc' }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        name="riskCategory"
                        label="Risk Category"
                        value={formik.values.riskCategory}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f8fafc' }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>Risk Interpretation:</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 4 }}><Typography variant="body2"><strong>Low Risk:</strong> ≤ 9 → Routine monitoring</Typography></Grid>
                    <Grid size={{ xs: 4 }}><Typography variant="body2"><strong>Medium Risk:</strong> 10 – 18 → Enhanced controls and monitoring</Typography></Grid>
                    <Grid size={{ xs: 4 }}><Typography variant="body2"><strong>High Risk:</strong> ≥ 19 → Audit, CAPA, or approval reconsideration</Typography></Grid>
                </Grid>
            </Box>
        </GradientCard>
    );
};

export default RiskScoringSection;
