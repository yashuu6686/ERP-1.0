import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Inventory from "@mui/icons-material/Inventory";

const ProductInformationSection = ({ formData = {}, onChange }) => {
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
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Product Information
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3, backgroundColor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            size="small"
                            value={formData.productName || ""}
                            onChange={(e) => onChange("productName", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Inspection Std No."
                            size="small"
                            value={formData.inspectionStdNo || ""}
                            onChange={(e) => onChange("inspectionStdNo", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            type="number"
                            size="small"
                            value={formData.quantity || ""}
                            onChange={(e) => onChange("quantity", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Check Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            value={formData.date || ""}
                            onChange={(e) => onChange("date", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Inspection No."
                            size="small"
                            value={formData.inspectionNo || ""}
                            onChange={(e) => onChange("inspectionNo", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Serial From"
                            size="small"
                            value={formData.serialFrom || ""}
                            onChange={(e) => onChange("serialFrom", e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Serial To"
                            size="small"
                            value={formData.serialTo || ""}
                            onChange={(e) => onChange("serialTo", e.target.value)}
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
