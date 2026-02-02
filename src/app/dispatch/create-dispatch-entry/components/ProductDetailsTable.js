"use client";
import React from "react";
import {
    Card,
    Box,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    TextField,
    Tooltip,
    IconButton,
} from "@mui/material";
import { Description, Add, Delete } from "@mui/icons-material";

export default function ProductDetailsTable({ products, handleProductChange, addProduct, removeProduct, errors }) {
    return (
        <Card
            sx={{
                mb: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                borderRadius: 2,
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Description />
                    <Typography variant="h6" color="white" fontWeight={600}>
                        Product Details
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={addProduct}
                    sx={{
                        backgroundColor: "white",
                        color: "#1172ba",
                        "&:hover": {
                            backgroundColor: "#f1f5f9",
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                    }}
                >
                    Add Product
                </Button>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow
                            sx={{
                                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                            }}
                        >
                            <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Sr</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057", minWidth: 250 }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057", width: 140 }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057", width: 80 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((product, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    "&:hover": { bgcolor: "#f8f9fa" },
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <TableCell>
                                    <Chip
                                        label={i + 1}
                                        sx={{
                                            bgcolor: "#1172ba",
                                            color: "white",
                                            fontWeight: 600,
                                            minWidth: 32,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter product name..."
                                        value={product.name}
                                        onChange={(e) => handleProductChange(i, "name", e.target.value)}
                                        size="small"
                                        error={errors[`product_${i}_name`]}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#1172ba",
                                                },
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        placeholder="0"
                                        value={product.quantity}
                                        onChange={(e) => handleProductChange(i, "quantity", e.target.value)}
                                        size="small"
                                        error={errors[`product_${i}_quantity`]}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Remove product">
                                        <IconButton
                                            color="error"
                                            onClick={() => removeProduct(i)}
                                            disabled={products.length === 1}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
}
