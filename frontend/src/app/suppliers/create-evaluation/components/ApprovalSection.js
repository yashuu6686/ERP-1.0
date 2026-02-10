import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export default function ApprovalSection({ formik }) {
    const { values, handleChange, handleBlur, touched, errors } = formik;

    return (
        <Card elevation={0} sx={{ mb: 4, borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <CheckCircle sx={{ color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Review & Approval
                </Typography>
            </Box>

            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    {/* Completed By Section */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#1172ba" }}>
                            Completed By
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="completedBy"
                            size="small"
                            value={values.completedBy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.completedBy && Boolean(errors.completedBy)}
                            helperText={touched.completedBy && errors.completedBy}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="completedByTitle"
                            size="small"
                            value={values.completedByTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.completedByTitle && Boolean(errors.completedByTitle)}
                            helperText={touched.completedByTitle && errors.completedByTitle}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="completedDate"
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={values.completedDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.completedDate && Boolean(errors.completedDate)}
                            helperText={touched.completedDate && errors.completedDate}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {/* SCANBO Section */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "#1172ba" }}>
                            The below section is to be completed by SCANBO
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ fontWeight: 600, color: "#334155", mb: 1 }}>
                                Supplier Approved?
                            </FormLabel>
                            <RadioGroup
                                row
                                name="supplierApproved"
                                value={values.supplierApproved}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No (explain)" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Comments"
                            name="approvalComments"
                            multiline
                            rows={3}
                            value={values.approvalComments}
                            onChange={handleChange}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Reviewed By (QA/RA Manager)"
                            name="reviewedBy"
                            size="small"
                            value={values.reviewedBy}
                            onChange={handleChange}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="reviewedDate"
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={values.reviewedDate}
                            onChange={handleChange}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Approved By (CEO)"
                            name="approvedBy"
                            size="small"
                            value={values.approvedBy}
                            onChange={handleChange}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="approvedDate"
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={values.approvedDate}
                            onChange={handleChange}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
