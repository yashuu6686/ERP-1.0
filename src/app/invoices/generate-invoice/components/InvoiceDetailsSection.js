import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Receipt from "@mui/icons-material/Receipt";

const InvoiceDetailsSection = ({ formData = {}, onChange }) => {
    return (
        <Card
            elevation={0}
            sx={{
                mb: 4,
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
                <Receipt sx={{ color: "#fff" }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Invoice Details
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Invoice No."
                            variant="outlined"
                            size="small"
                            value={formData.invoiceNumber || ""}
                            onChange={(e) => onChange?.("invoiceNumber", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "white",
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Invoice Date"
                            type="date"
                            variant="outlined"
                            size="small"
                            value={formData.invoiceDate || ""}
                            onChange={(e) => onChange?.("invoiceDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Due Date"
                            type="date"
                            variant="outlined"
                            size="small"
                            value={formData.dueDate || ""}
                            onChange={(e) => onChange?.("dueDate", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InvoiceDetailsSection;
