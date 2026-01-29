import React from "react";
import { Card, Box, Typography, CardContent, TextField } from "@mui/material";
import { Inventory as InventoryIcon } from "@mui/icons-material";

const MaterialInformation = () => {
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
                <InventoryIcon sx={{ color: "#fff", fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Material Information
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    <TextField
                        label="GRN Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Material Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Received Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Invoice Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField label="Lot Number" variant="outlined" fullWidth size="small" />
                    <TextField
                        label="Inspection Standard Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Supplier Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Lot Quantity"
                        variant="outlined"
                        fullWidth
                        type="number"
                        size="small"
                    />
                    <TextField
                        label="Equipment ID and Description"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Sample Size"
                        variant="outlined"
                        fullWidth
                        type="number"
                        size="small"
                    />
                    <TextField
                        label="Inspection Report Number"
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Inspection Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Inspection Standard"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ gridColumn: { xs: "1", md: "span 2" } }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default MaterialInformation;
