import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';

const SummarySection = ({ formik }) => {
    return (
        <Card sx={{ borderRadius: 2, mt: 3 }}>
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <VerifiedUser sx={{ color: "white" }} />
                <Typography variant="h6" fontWeight={600} color={"white"}>
                    Summary of Evaluation
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Completed By (Signature)"
                            name="completedBy"
                            value={formik.values.completedBy}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.completedBy && Boolean(formik.errors.completedBy)}
                            helperText={formik.touched.completedBy && formik.errors.completedBy}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            name="completedDate"
                            value={formik.values.completedDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.completedDate && Boolean(formik.errors.completedDate)}
                            helperText={formik.touched.completedDate && formik.errors.completedDate}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Approved By (Signature)"
                            name="approvedBy"
                            value={formik.values.approvedBy}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.approvedBy && Boolean(formik.errors.approvedBy)}
                            helperText={formik.touched.approvedBy && formik.errors.approvedBy}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            name="approvedDate"
                            value={formik.values.approvedDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.approvedDate && Boolean(formik.errors.approvedDate)}
                            helperText={formik.touched.approvedDate && formik.errors.approvedDate}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SummarySection;
