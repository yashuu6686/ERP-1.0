import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Business from "@mui/icons-material/Business";

const SupplierInformation = ({ data, onChange }) => {
    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: 2,
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
                <Business />
                <Typography variant="h6" fontWeight={600} color={"white"}>
                    Supplier Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                            label="Company Name"
                            placeholder="ABC Suppliers Pvt Ltd"
                            value={data?.companyName || ""}
                            onChange={(e) => onChange("companyName", e.target.value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            placeholder="John Doe"
                            value={data?.contactPerson || ""}
                            onChange={(e) => onChange("contactPerson", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            placeholder="123 Business Street"
                            multiline
                            rows={1}
                            value={data?.address || ""}
                            onChange={(e) => onChange("address", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="contact@supplier.com"
                            value={data?.email || ""}
                            onChange={(e) => onChange("email", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            placeholder="+91 98765 43210"
                            value={data?.phone || ""}
                            onChange={(e) => onChange("phone", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="PAN Number"
                            value={data?.pan || ""}
                            onChange={(e) => onChange("pan", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                            placeholder="ABCDE1234F"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="GSTIN"
                            placeholder="22ABCDE1234F1Z5"
                            value={data?.gstin || ""}
                            onChange={(e) => onChange("gstin", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SupplierInformation;
