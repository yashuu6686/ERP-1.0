import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Assignment from "@mui/icons-material/Assignment";

const ProductDetailsSection = ({ data, onChange }) => {
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
                <Assignment sx={{ color: "#fff", fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Product Details
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            size="small"
                            value={data.productName}
                            onChange={(e) => onChange("productName", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Quality Standard No."
                            variant="outlined"
                            size="small"
                            value={data.qualityStandard}
                            onChange={(e) => onChange("qualityStandard", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Checked Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={data.checkedQuantity}
                            onChange={(e) => onChange("checkedQuantity", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Inspection Date"
                            variant="outlined"
                            size="small"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={data.inspectionDate}
                            onChange={(e) => onChange("inspectionDate", e.target.value)}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Check Number"
                            variant="outlined"
                            size="small"
                            value={data.checkNumber}
                            onChange={(e) => onChange("checkNumber", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProductDetailsSection;
