import React from "react";
import { Card, Box, Typography, CardContent, Grid, TextField } from "@mui/material";
import { Summarize } from "@mui/icons-material";

const InspectionSummarySection = ({ data, onChange }) => {
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
                            value={data.acceptedQuantity}
                            onChange={(e) => onChange("acceptedQuantity", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Rejected Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={data.rejectedQuantity}
                            onChange={(e) => onChange("rejectedQuantity", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Hold / Scrap Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={data.holdScrapQuantity}
                            onChange={(e) => onChange("holdScrapQuantity", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Other"
                            variant="outlined"
                            size="small"
                            value={data.other}
                            onChange={(e) => onChange("other", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Comments (if any)"
                            variant="outlined"
                            multiline
                            rows={3}
                            value={data.comments}
                            onChange={(e) => onChange("comments", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InspectionSummarySection;
