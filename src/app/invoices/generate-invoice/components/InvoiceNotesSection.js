import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import LocalOffer from "@mui/icons-material/LocalOffer";

const InvoiceNotesSection = ({ formik }) => {
    const { values, setFieldValue } = formik;

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <LocalOffer sx={{ color: "#fff" }} />
                <Typography color="white" variant="subtitle1" fontWeight={600}>
                    Discounts & Notes
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Terms & Conditions"
                            size="small"
                            value={values.notes.termsAndConditions || ""}
                            onChange={(e) => setFieldValue("notes.termsAndConditions", e.target.value)}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Additional Notes"
                            size="small"
                            value={values.notes.additionalNotes || ""}
                            onChange={(e) => setFieldValue("notes.additionalNotes", e.target.value)}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InvoiceNotesSection;
