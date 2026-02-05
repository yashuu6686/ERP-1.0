import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { useFormikContext, FieldArray } from "formik";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";

const ItemDetailsTable = () => {
    const { values, setFieldValue, errors, touched, handleBlur } = useFormikContext();

    const handleItemChange = (index, field, value) => {
        const items = [...values.items];
        items[index][field] = value;
        items[index].total =
            (parseFloat(items[index].qty) || 0) *
            (parseFloat(items[index].price) || 0);
        setFieldValue("items", items);
    };

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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    borderBottom: "2px solid #1172ba",
                }}
            >
                <Typography variant="h6" fontWeight={600} sx={{ color: "white" }}>
                    Items / Products Details
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setFieldValue("items", [...values.items, { name: "", qty: "", price: "", total: 0 }])}
                    sx={{
                        backgroundColor: "white",
                        color: "#1172ba",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 500,
                        px: 3,
                    }}
                >
                    Add Item
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
                            <TableCell align="center" sx={{ fontWeight: 500, color: "#495057" }}>
                                Sr.No
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    fontWeight: 500,
                                    color: "#495057",
                                    minWidth: 250,
                                }}
                            >
                                Item Name
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 500, color: "#495057", width: 120 }}
                            >
                                Quantity
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 500, color: "#495057", width: 140 }}
                            >
                                Unit Price (₹)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 500, color: "#495057", width: 140 }}
                            >
                                Total (₹)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 500, color: "#495057", width: 80 }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {values.items.map((item, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    "&:hover": { bgcolor: "#f8f9fa" },
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <TableCell align="center">
                                    <Chip
                                        label={i + 1}
                                        sx={{
                                            bgcolor: "#1172ba",
                                            color: "white",
                                            fontWeight: 500,
                                            minWidth: 32,
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        fullWidth
                                        placeholder="Enter item name..."
                                        name={`items.${i}.name`}
                                        value={item.name}
                                        onChange={(e) => handleItemChange(i, "name", e.target.value)}
                                        onBlur={handleBlur}
                                        error={touched.items?.[i]?.name && Boolean(errors.items?.[i]?.name)}
                                        helperText={touched.items?.[i]?.name && errors.items?.[i]?.name}
                                        size="small"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#1172ba",
                                                },
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        type="number"
                                        placeholder="0"
                                        name={`items.${i}.qty`}
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(i, "qty", e.target.value)}
                                        onBlur={handleBlur}
                                        error={touched.items?.[i]?.qty && Boolean(errors.items?.[i]?.qty)}
                                        helperText={touched.items?.[i]?.qty && errors.items?.[i]?.qty}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        type="number"
                                        placeholder="0.00"
                                        name={`items.${i}.price`}
                                        value={item.price}
                                        onChange={(e) => handleItemChange(i, "price", e.target.value)}
                                        onBlur={handleBlur}
                                        error={touched.items?.[i]?.price && Boolean(errors.items?.[i]?.price)}
                                        helperText={touched.items?.[i]?.price && errors.items?.[i]?.price}
                                        size="small"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">₹</InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Typography fontWeight={600} sx={{ color: "#2d3748" }}>
                                        ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Remove item">
                                        <IconButton
                                            color="error"
                                            onClick={() => setFieldValue("items", values.items.filter((_, idx) => idx !== i))}
                                            disabled={values.items.length === 1}
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
};

export default ItemDetailsTable;
