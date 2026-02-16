import React from 'react';
import { Box, Card, CardContent, Grid, Typography, FormControlLabel, Checkbox, Radio, RadioGroup, TextField } from '@mui/material';
import { FactCheck, Assessment, FolderOpen, TaskAlt } from '@mui/icons-material';

const SectionHeader = ({ title, icon: Icon }) => (
    <Box
        sx={{
            p: 2,
            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 2,
            borderRadius: '4px 4px 0 0'
        }}
    >
        {Icon && <Icon sx={{ color: 'white' }} />}
        <Typography variant="h6" fontWeight={600} color="white">
            {title}
        </Typography>
    </Box>
);

const EvaluationResultsSection = ({ formik }) => {
    return (
        <Grid container spacing={3}>
            {/* Evaluation Results */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', borderRadius: 2 }}>
                    <SectionHeader title="Evaluation Results" icon={Assessment} />
                    <CardContent>
                        <RadioGroup
                            name="evaluationResult"
                            value={formik.values.evaluationResult}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="Approved without conditions" control={<Radio />} label="Approved without conditions" />
                            <FormControlLabel value="Approved conditionally" control={<Radio />} label="Approved conditionally" />
                            <FormControlLabel value="Not approved" control={<Radio />} label="Not approved" />
                        </RadioGroup>
                    </CardContent>
                </Card>
            </Grid>

            {/* Evidences */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', borderRadius: 2 }}>
                    <SectionHeader title="Evidences" icon={FolderOpen} />
                    <CardContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.evidences.includes('registrationCertificate')}
                                    onChange={formik.handleChange}
                                    name="evidences"
                                    value="registrationCertificate"
                                />
                            }
                            label="Current quality system registration certificate/Qualification Certificate"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.evidences.includes('qualityInspections')}
                                    onChange={formik.handleChange}
                                    name="evidences"
                                    value="qualityInspections"
                                />
                            }
                            label="Perform quality Inspections at least once every 6 months, if applicable"
                        />
                        <TextField
                            fullWidth
                            label="Other Evidences"
                            name="otherEvidence"
                            value={formik.values.otherEvidence}
                            onChange={formik.handleChange}
                            placeholder="Specify other evidences if any"
                            margin="normal"
                            size="small"
                        />
                    </CardContent>
                </Card>
            </Grid>

            {/* Routine Controls */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', borderRadius: 2 }}>
                    <SectionHeader title="Routine Controls (check all that apply)" icon={FactCheck} />
                    <CardContent>
                        {[
                            { value: 'purchaseOrders', label: 'Purchase Orders' },
                            { value: 'partServiceSpecs', label: 'Part/Service Specifications' },
                            { value: 'incomingInspections', label: 'Incoming Inspections' },
                            { value: 'reportReview', label: 'Report/document review and/or approval' },
                            { value: 'agreementContract', label: 'Agreement/Contract' },
                        ].map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={formik.values.routineControls.includes(option.value)}
                                        onChange={formik.handleChange}
                                        name="routineControls"
                                        value={option.value}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                        <TextField
                            fullWidth
                            label="Other Controls"
                            name="otherControls"
                            value={formik.values.otherControls}
                            onChange={formik.handleChange}
                            placeholder="Specify other controls if any"
                            margin="normal"
                            size="small"
                        />
                    </CardContent>
                </Card>
            </Grid>

            {/* Required Actions */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', borderRadius: 2 }}>
                    <SectionHeader title="Required Actions" icon={TaskAlt} />
                    <CardContent>
                        <RadioGroup
                            name="requiredAction"
                            value={formik.values.requiredAction}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="AddToASL" control={<Radio />} label="Add to Approved Supplier List (ASL)" />
                            <FormControlLabel value="RemoveFromASL" control={<Radio />} label="Remove from ASL" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        {formik.values.requiredAction === 'Other' && (
                            <TextField
                                fullWidth
                                label="Specify Action"
                                name="otherAction"
                                value={formik.values.otherAction}
                                onChange={formik.handleChange}
                                margin="normal"
                                size="small"
                            />
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default EvaluationResultsSection;
