import React from 'react';
import { Box, Card, CardContent, Grid, Typography, RadioGroup, FormControlLabel, Radio, TextField, MenuItem, Divider } from '@mui/material';
import { FactCheck } from '@mui/icons-material';

const ChecklistItem = ({ formik, name, label, type = 'rating', showDate = false }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {label}
            </Typography>
            {type === 'rating' ? (
                <TextField
                    fullWidth
                    select
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    size="small"
                >
                    <MenuItem value="Unsatisfactory">Unsatisfactory</MenuItem>
                    <MenuItem value="Marginal">Marginal</MenuItem>
                    <MenuItem value="Acceptable">Acceptable</MenuItem>
                    <MenuItem value="Excellent">Excellent</MenuItem>
                </TextField>
            ) : type === 'yes_no_na' ? (
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: showDate ? 8 : 12 }}>
                        <RadioGroup
                            row
                            name={name}
                            value={formik.values[name]}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                            <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                        </RadioGroup>
                    </Grid>
                    {showDate && formik.values[name] === 'Yes' && (
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Expiry Date"
                                InputLabelProps={{ shrink: true }}
                                name={`${name}Date`}
                                value={formik.values[`${name}Date`]}
                                onChange={formik.handleChange}
                                size="small"
                            />
                        </Grid>
                    )}
                </Grid>
            ) : null}
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

const EvaluationChecklistSection = ({ formik }) => {
    return (
        <Card sx={{ borderRadius: 2, mb: 3 }}>
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <FactCheck sx={{ color: "white" }} />
                <Typography variant="h6" fontWeight={600} color={"white"}>
                    Ongoing Supplier Evaluation Checklist
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <ChecklistItem
                    formik={formik}
                    name="certificationStatus"
                    label="If the Supplier has Qualification certification and /or other registrations, ISO Certified, Trained Certifications – check documents for current dates and to ensure they are not expired. Obtain updated documents and place in file."
                    type="yes_no_na"
                    showDate={true}
                />

                <ChecklistItem
                    formik={formik}
                    name="meetRequirements"
                    label="Meet Specified Design/Service Requirements"
                />

                <ChecklistItem
                    formik={formik}
                    name="responsiveness"
                    label="Responsiveness/Management Capabilities in satisfying needs"
                />

                <ChecklistItem
                    formik={formik}
                    name="quality"
                    label="Quality of goods/Services delivered"
                />

                <ChecklistItem
                    formik={formik}
                    name="onTimeDelivery"
                    label="On Time Delivery of goods/services"
                />

                <ChecklistItem
                    formik={formik}
                    name="cost"
                    label="Cost of goods/services delivered"
                />
            </CardContent>
        </Card>
    );
};

export default EvaluationChecklistSection;
