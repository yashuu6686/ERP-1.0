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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { useFormikContext } from "formik";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import ListAlt from "@mui/icons-material/ListAlt";

const TransferSlipTable = () => {
    const { values, setFieldValue, errors, touched, handleBlur } = useFormikContext();

    const handleItemChange = (index, field, value) => {
        const items = [...values.items];
        items[index][field] = value;
        setFieldValue("items", items);
    };

    return (
        <Card
            sx={{
                mb: 4,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                borderRadius: 2,
                border: "1px solid #e9ecef",
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ListAlt />
                    <Typography variant="h6" fontWeight={600} color="white">
                        Material Details
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setFieldValue("items", [...values.items, { description: "", batchNo: "", qtyIssued: "", qtyReceived: "", remarks: "" }])}
                    sx={{
                        backgroundColor: "white",
                        color: "#1172ba",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        "&:hover": { bgcolor: "#f1f5f9" }
                    }}
                >
                    Add Row
                </Button>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
                <Table size="small" sx={{ "& .MuiTableCell-root": { border: "1px solid #e2e8f0" } }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: "#f8fafc",
                                "& .MuiTableCell-root": { fontWeight: 700, color: "#475569", fontSize: "0.85rem", textTransform: "uppercase" }
                            }}
                        >
                            <TableCell align="center" rowSpan={2} sx={{ width: 60 }}>
                                Sr.No.
                            </TableCell>
                            <TableCell align="center" rowSpan={2} sx={{ minWidth: 280 }}>
                                Description of Material
                            </TableCell>
                            <TableCell align="center" rowSpan={2} sx={{ width: 140 }}>
                                Batch No.
                            </TableCell>
                            <TableCell align="center" colSpan={2}>
                                Quantity
                            </TableCell>
                            <TableCell align="center" rowSpan={2} sx={{ minWidth: 200 }}>
                                Remarks / Action Description
                            </TableCell>
                            <TableCell align="center" rowSpan={2} sx={{ width: 70 }}>
                                Delete
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ bgcolor: "#f8fafc", "& .MuiTableCell-root": { fontWeight: 700, color: "#475569" } }}>
                            <TableCell align="center" sx={{ width: 110 }}>Issued</TableCell>
                            <TableCell align="center" sx={{ width: 110 }}>Received</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {values.items.map((item, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    "&:hover": { bgcolor: "#f1f5f9" },
                                    transition: "background-color 0.2s",
                                }}
                            >
                                <TableCell align="center">
                                    <Chip
                                        label={i + 1}
                                        size="small"
                                        sx={{
                                            bgcolor: "#1172ba",
                                            color: "white",
                                            fontWeight: 700,
                                            borderRadius: "4px"
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={1}
                                        placeholder="Enter description..."
                                        name={`items.${i}.description`}
                                        value={item.description}
                                        onChange={(e) => handleItemChange(i, "description", e.target.value)}
                                        onBlur={handleBlur}
                                        error={touched.items?.[i]?.description && Boolean(errors.items?.[i]?.description)}
                                        size="small"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ "& .MuiInputBase-root": { fontSize: "0.9rem" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        placeholder="Batch No"
                                        name={`items.${i}.batchNo`}
                                        value={item.batchNo}
                                        onChange={(e) => handleItemChange(i, "batchNo", e.target.value)}
                                        onBlur={handleBlur}
                                        size="small"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ "& .MuiInputBase-root": { fontSize: "0.9rem", textAlign: "center" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        placeholder="0"
                                        name={`items.${i}.qtyIssued`}
                                        value={item.qtyIssued}
                                        onChange={(e) => handleItemChange(i, "qtyIssued", e.target.value)}
                                        onBlur={handleBlur}
                                        size="small"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ "& .MuiInputBase-root": { fontSize: "0.9rem", textAlign: "center" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        placeholder="0"
                                        name={`items.${i}.qtyReceived`}
                                        value={item.qtyReceived}
                                        onChange={(e) => handleItemChange(i, "qtyReceived", e.target.value)}
                                        onBlur={handleBlur}
                                        size="small"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ "& .MuiInputBase-root": { fontSize: "0.9rem", textAlign: "center" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        multiline
                                        placeholder="Enter remarks..."
                                        name={`items.${i}.remarks`}
                                        value={item.remarks}
                                        onChange={(e) => handleItemChange(i, "remarks", e.target.value)}
                                        onBlur={handleBlur}
                                        size="small"
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ "& .MuiInputBase-root": { fontSize: "0.9rem" } }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Delete Row">
                                        <IconButton
                                            color="error"
                                            onClick={() => setFieldValue("items", values.items.filter((_, idx) => idx !== i))}
                                            disabled={values.items.length === 1}
                                            size="small"
                                        >
                                            <Delete fontSize="small" />
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

export default TransferSlipTable;
