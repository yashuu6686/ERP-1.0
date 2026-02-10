"use client";
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

const InvoiceProductsTable = ({ formik, lockedProductIds = [], onProductChange }) => {
    const { values, setFieldValue, errors, touched } = formik;
    const products = values.items;

    const addItem = () => {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        setFieldValue("items", [
            ...products,
            {
                id: newId,
                name: "",
                hsnSac: "",
                qty: "",
                price: "",
                taxPercent: 18,
                taxAmount: 0,
                total: 0,
            }
        ]);
    };

    const removeItem = (id) => {
        setFieldValue("items", products.filter(p => p.id !== id));
    };

    const handleKeyDown = (e, index, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const fields = ['name', 'hsnSac', 'qty', 'price', 'taxPercent'];
            const currentIndex = fields.indexOf(field);

            if (currentIndex < fields.length - 1) {
                const nextField = fields[currentIndex + 1];
                const nextInput = document.querySelector(`[name="items[${index}].${nextField}"]`);
                if (nextInput) nextInput.focus();
            } else {
                // Last field of the row
                const nextRowInput = document.querySelector(`[name="items[${index + 1}].name"]`);
                if (nextRowInput) {
                    nextRowInput.focus();
                } else {
                    const addBtn = document.getElementById("add-item-btn");
                    if (addBtn) addBtn.focus();
                }
            }
        }
    };

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
                    id="add-item-btn"
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={addItem}
                    sx={{
                        bgcolor: "white",
                        color: "#1172ba",
                        textTransform: "none",
                    }}
                >
                    Add Item
                </Button>
            </Box>

            <TableContainer sx={{ bgcolor: "#f8fafc" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Sr. </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Item Name </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> HSN/SAC </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Qty </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Price </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Tax % </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Tax </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Total </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => {
                            const isItemFromOrder = lockedProductIds.includes(product.id);
                            const itemErrors = errors.items?.[index] || {};
                            const itemTouched = touched.items?.[index] || {};

                            return (
                                <TableRow key={product.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            placeholder="Item Name"
                                            fullWidth
                                            name={`items[${index}].name`}
                                            value={product.name || ""}
                                            onChange={(e) => onProductChange?.(product.id, "name", e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index, 'name')}
                                            error={itemTouched.name && Boolean(itemErrors.name)}
                                            helperText={itemTouched.name && itemErrors.name}
                                            InputProps={{ readOnly: isItemFromOrder }}
                                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: isItemFromOrder ? "#f1f5f9" : "white" } }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            placeholder="HSN/SAC"
                                            fullWidth
                                            name={`items[${index}].hsnSac`}
                                            value={product.hsnSac || ""}
                                            onChange={(e) => onProductChange?.(product.id, "hsnSac", e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index, 'hsnSac')}
                                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            placeholder="Qty"
                                            type="number"
                                            name={`items[${index}].qty`}
                                            value={product.qty || ""}
                                            onChange={(e) => onProductChange?.(product.id, "qty", e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index, 'qty')}
                                            error={itemTouched.qty && Boolean(itemErrors.qty)}
                                            InputProps={{ readOnly: isItemFromOrder }}
                                            sx={{
                                                width: 80,
                                                "& .MuiOutlinedInput-root": { bgcolor: isItemFromOrder ? "#f1f5f9" : "white" },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            placeholder="Price"
                                            type="number"
                                            name={`items[${index}].price`}
                                            value={product.price || ""}
                                            onChange={(e) => onProductChange?.(product.id, "price", e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index, 'price')}
                                            error={itemTouched.price && Boolean(itemErrors.price)}
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
                                            name={`items[${index}].taxPercent`}
                                            value={product.taxPercent || ""}
                                            onChange={(e) => onProductChange?.(product.id, "taxPercent", e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index, 'taxPercent')}
                                            sx={{
                                                width: 80,
                                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">₹{parseFloat(product.taxAmount || 0).toFixed(2)}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600 }}>₹{parseFloat(product.total || 0).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        {index !== 0 && (
                                            <IconButton color="error" size="small" onClick={() => removeItem(product.id)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {typeof errors.items === 'string' && (
                <Box sx={{ p: 2 }}>
                    <Typography color="error" variant="caption">{errors.items}</Typography>
                </Box>
            )}
        </Card>
    );
};

export default InvoiceProductsTable;
