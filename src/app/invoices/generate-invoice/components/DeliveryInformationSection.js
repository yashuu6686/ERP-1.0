import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import LocalShipping from "@mui/icons-material/LocalShipping";

const DeliveryInformationSection = () => {
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
                <LocalShipping sx={{ color: "#fff" }} />
                <Typography color="white" variant="subtitle1" fontWeight={600}>
                    Delivery Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Organization"
                            size="small"
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            size="small"
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Contact No."
                            size="small"
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DeliveryInformationSection;
