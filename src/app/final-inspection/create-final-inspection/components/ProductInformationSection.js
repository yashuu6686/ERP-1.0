import React from "react";
import { Card, Box, Typography, CardContent, Grid, TextField } from "@mui/material";
import { Inventory } from "@mui/icons-material";

const ProductInformationSection = () => {
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
                <Inventory sx={{ color: "#fff" }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Product Information
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3, backgroundColor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Inspection Std No."
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            type="number"
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Check Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Inspection No."
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Serial From"
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Serial To"
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProductInformationSection;
