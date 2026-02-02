import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LocalShipping from "@mui/icons-material/LocalShipping";

const DeliveryInformation = ({ data, onChange }) => {
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
                <LocalShipping />
                <Typography variant="h6" fontWeight={600} color={"white"}>
                    Delivery Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Invoice To"
                            placeholder="Company Name"

                            value={data?.invoiceTo || ""}
                            onChange={(e) => onChange("invoiceTo", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Deliver To"
                            placeholder="Warehouse/Site"
                            value={data?.deliverTo || ""}
                            onChange={(e) => onChange("deliverTo", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Delivery Address"
                            placeholder="456 Delivery Lane"
                            multiline
                            rows={1}
                            value={data?.deliveryAddress || ""}
                            onChange={(e) => onChange("deliveryAddress", e.target.value)}
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            placeholder="Jane Smith"
                            value={data?.contactPerson || ""}
                            onChange={(e) => onChange("contactPerson", e.target.value)}
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
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="delivery@company.com"
                            value={data?.email || ""}
                            onChange={(e) => onChange("email", e.target.value)}
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

export default DeliveryInformation;