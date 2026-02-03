import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Person from "@mui/icons-material/Person";

const CustomerInformationSection = ({ formData = {}, lockedFields = {}, onChange }) => {
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
                <Person sx={{ color: "#fff" }} />
                <Typography color="white" variant="subtitle1" fontWeight={600}>
                    Customer Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Customer Name"
                            size="small"
                            value={formData.companyName || ""}
                            onChange={(e) => onChange?.("companyName", e.target.value)}
                            InputProps={{ readOnly: !!lockedFields.companyName }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.companyName ? "#f1f5f9" : "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Organization"
                            size="small"
                            value={formData.organization || ""}
                            onChange={(e) => onChange?.("organization", e.target.value)}
                            InputProps={{ readOnly: !!lockedFields.organization }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.organization ? "#f1f5f9" : "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            size="small"
                            value={formData.address || ""}
                            onChange={(e) => onChange?.("address", e.target.value)}
                            InputProps={{ readOnly: !!lockedFields.address }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.address ? "#f1f5f9" : "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Contact No."
                            size="small"
                            value={formData.contact || ""}
                            onChange={(e) => onChange?.("contact", e.target.value)}
                            InputProps={{ readOnly: !!lockedFields.contact }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.contact ? "#f1f5f9" : "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Drug Licence"
                            size="small"
                            value={formData.drugLicence || ""}
                            onChange={(e) => onChange?.("drugLicence", e.target.value)}
                            InputProps={{ readOnly: !!lockedFields.drugLicence }}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: lockedFields.drugLicence ? "#f1f5f9" : "white" } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CustomerInformationSection;
