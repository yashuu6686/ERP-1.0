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
import { Add, Delete } from "@mui/icons-material";

const SingleProductSection = ({
    products,
    onAddProduct,
    onRemoveProduct,
    onUpdateProduct,
}) => {
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
                                        value={product.name}
                                        onChange={(e) =>
                                            onUpdateProduct(product.id, "name", e.target.value)
                                        }
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        placeholder="Qty"
                                        size="small"
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) =>
                                            onUpdateProduct(product.id, "quantity", e.target.value)
                                        }
                                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Delete">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => onRemoveProduct(product.id)}
                                            disabled={products.length === 1}
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

export default SingleProductSection;
