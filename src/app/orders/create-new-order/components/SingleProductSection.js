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

const SingleProductSection = ({ formik }) => {
    const { values, setFieldValue } = formik;
    const products = values.singleProducts;

    const onAddProduct = () => {
        setFieldValue("singleProducts", [
            ...products,
            { id: Date.now(), name: "", quantity: "" },
        ]);
    };

    const onRemoveProduct = (id) => {
        setFieldValue("singleProducts", products.filter((p) => p.id !== id));
    };

    const onUpdateProduct = (id, field, value) => {
        setFieldValue("singleProducts", products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    };

    const handleKeyDown = (e, index, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (field === 'name') {
                const qtyInput = document.querySelector(`[name="singleProducts[${index}].quantity"]`);
                if (qtyInput) qtyInput.focus();
            } else if (field === 'quantity') {
                const nextNameInput = document.querySelector(`[name="singleProducts[${index + 1}].name"]`);
                if (nextNameInput) {
                    nextNameInput.focus();
                } else {
                    onAddProduct();
                    setTimeout(() => {
                        const newInput = document.querySelector(`[name="singleProducts[${index + 1}].name"]`);
                        if (newInput) newInput.focus();
                    }, 100);
                }
            }
        }
    };

    return (
        <Card
            sx={{
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                height: "100%",
                boxShadow: "none",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                }}
            >
                <Typography variant="subtitle2" fontWeight={700} color="#475569">
                    Single Products
                </Typography>
                <Button
                    size="small"
                    startIcon={<Add />}
                    variant="contained"
                    onClick={onAddProduct}
                    id="add-product-btn"
                    sx={{
                        textTransform: "none",
                        bgcolor: "#1172ba",
                        "&:hover": { bgcolor: "#0d5a94" },
                        borderRadius: 1.5,
                    }}
                >
                    Add Product
                </Button>
            </Box>

            <TableContainer sx={{ p: 0 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                            <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Sr.</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 120 }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 700, width: 60 }} align="center">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={product.id} hover>
                                <TableCell sx={{ color: "text.secondary" }}>{index + 1}</TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        placeholder="Select Product"
                                        size="small"
                                        name={`singleProducts[${index}].name`}
                                        value={product.name}
                                        onChange={(e) =>
                                            onUpdateProduct(product.id, "name", e.target.value)
                                        }
                                        onBlur={formik.handleBlur}
                                        onKeyDown={(e) => handleKeyDown(e, index, 'name')}
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        placeholder="Qty"
                                        size="small"
                                        type="number"
                                        name={`singleProducts[${index}].quantity`}
                                        value={product.quantity}
                                        onChange={(e) =>
                                            onUpdateProduct(product.id, "quantity", e.target.value)
                                        }
                                        onBlur={formik.handleBlur}
                                        onKeyDown={(e) => handleKeyDown(e, index, 'quantity')}
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Delete">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => onRemoveProduct(product.id)}
                                            disabled={products.length === 0}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                    No single products added.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default SingleProductSection;
