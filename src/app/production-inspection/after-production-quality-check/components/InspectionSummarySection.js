import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Summarize from "@mui/icons-material/Summarize";

const InspectionSummarySection = ({ data, onChange, formik }) => {
    return (
        <Card
            elevation={0}
            sx={{
                marginBottom: 4,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Summarize sx={{ color: "#fff", fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Inspection Summary
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Accepted Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            name="acceptedQuantity"
                            value={data.acceptedQuantity}
                            onChange={(e) => onChange("acceptedQuantity", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.acceptedQuantity && Boolean(formik.errors.acceptedQuantity)}
                            helperText={formik.touched.acceptedQuantity && formik.errors.acceptedQuantity}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Rejected Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            name="rejectedQuantity"
                            value={data.rejectedQuantity}
                            onChange={(e) => onChange("rejectedQuantity", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rejectedQuantity && Boolean(formik.errors.rejectedQuantity)}
                            helperText={formik.touched.rejectedQuantity && formik.errors.rejectedQuantity}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Hold / Scrap Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            name="holdScrapQuantity"
                            value={data.holdScrapQuantity}
                            onChange={(e) => onChange("holdScrapQuantity", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.holdScrapQuantity && Boolean(formik.errors.holdScrapQuantity)}
                            helperText={formik.touched.holdScrapQuantity && formik.errors.holdScrapQuantity}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Other"
                            variant="outlined"
                            size="small"
                            name="other"
                            value={data.other}
                            onChange={(e) => onChange("other", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.other && Boolean(formik.errors.other)}
                            helperText={formik.touched.other && formik.errors.other}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Comments (if any)"
                            variant="outlined"
                            multiline
                            rows={3}
                            name="comments"
                            value={data.comments}
                            onChange={(e) => onChange("comments", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.comments && Boolean(formik.errors.comments)}
                            helperText={formik.touched.comments && formik.errors.comments}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InspectionSummarySection;
