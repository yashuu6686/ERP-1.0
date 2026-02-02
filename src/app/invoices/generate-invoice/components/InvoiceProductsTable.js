import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Inventory from "@mui/icons-material/Inventory";

const InvoiceProductsTable = ({ products, onAddProduct, onRemoveProduct, onProductChange }) => {
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
                    <Typography color="white" variant="subtitle1" fontWeight={600}>
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
                                        value={product.itemName || ""}
                                        onChange={(e) => onProductChange?.(product.id, "itemName", e.target.value)}
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="HSN/SAC"
                                        fullWidth
                                        value={product.hsnSac || ""}
                                        onChange={(e) => onProductChange?.(product.id, "hsnSac", e.target.value)}
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        placeholder="Qty"
                                        type="number"
                                        value={product.quantity || ""}
                                        onChange={(e) => onProductChange?.(product.id, "quantity", e.target.value)}
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
                                        type="number"
                                        value={product.price || ""}
                                        onChange={(e) => onProductChange?.(product.id, "price", e.target.value)}
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
                                        type="number"
                                        value={product.taxPercent || ""}
                                        onChange={(e) => onProductChange?.(product.id, "taxPercent", e.target.value)}
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
