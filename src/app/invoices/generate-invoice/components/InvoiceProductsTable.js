import React from "react";
import {
    Card,
    Box,
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Tooltip,
    IconButton,
} from "@mui/material";
import { Add, Delete, Inventory } from "@mui/icons-material";

const InvoiceProductsTable = ({ products, onAddProduct, onRemoveProduct }) => {
    return (
        <Card
            elevation={0}
            sx={{
                mb: 4,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "#fff",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Inventory sx={{ color: "#fff" }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                        Products in Order
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={onAddProduct}
                    sx={{
                        bgcolor: "white",
                        color: "#1172ba",
                        "&:hover": { bgcolor: "#f0f0f0" },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                    }}
                >
                    Add Product
                </Button>
            </Box>

            <TableContainer sx={{ bgcolor: "#f8fafc" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Sr.
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Item Name
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                HSN/SAC
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Qty
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Price
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Tax %
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Tax
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Total
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="Item Name"
                                        fullWidth
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="HSN/SAC"
                                        fullWidth
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="Qty"
                                        sx={{
                                            width: 80,
                                            "& .MuiOutlinedInput-root": { bgcolor: "white" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="Price"
                                        sx={{
                                            width: 100,
                                            "& .MuiOutlinedInput-root": { bgcolor: "white" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="Tax %"
                                        sx={{
                                            width: 80,
                                            "& .MuiOutlinedInput-root": { bgcolor: "white" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell>₹{product.taxAmount}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>₹{product.amount}</TableCell>
                                <TableCell>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => onRemoveProduct(product.id)}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default InvoiceProductsTable;
