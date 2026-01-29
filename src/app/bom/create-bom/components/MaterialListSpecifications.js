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
    IconButton,
} from "@mui/material";
import { Add, Build, Delete } from "@mui/icons-material";

const MaterialListSpecifications = ({ materials, onAdd, onDelete, onUpdate }) => {
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "white",
            "&:hover": {
                "& > fieldset": { borderColor: "#1172ba" },
            },
        },
    };

    return (
        <Card
            sx={{
                mb: 1,
                border: "1px solid #e9ecef",
                borderRadius: 1.5,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Build />
                    <Typography variant="h6" fontWeight={600}>
                        Material List Specifications
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={onAdd}
                    sx={{
                        backgroundColor: "white",
                        color: "#1172ba",
                    }}
                >
                    Add Material
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 300, overflow: "auto" }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 40,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Sr.
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 120,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Part Number
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 120,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Supplier Part
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 60,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Qty
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 140,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Material Name
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 160,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Manufacturer
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 200,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Technical Details
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    width: 50,
                                    textAlign: "center",
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow
                                key={material.id}
                                sx={{ "&:hover": { bgcolor: "#f8f9fa" } }}
                            >
                                <TableCell sx={{ py: 0.2, fontSize: "0.75rem" }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={material.scanboPartNumber}
                                        onChange={(e) =>
                                            onUpdate(material.id, "scanboPartNumber", e.target.value)
                                        }
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={material.supplierPartNumber}
                                        onChange={(e) =>
                                            onUpdate(material.id, "supplierPartNumber", e.target.value)
                                        }
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={material.quantity}
                                        onChange={(e) =>
                                            onUpdate(material.id, "quantity", e.target.value)
                                        }
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={material.materialName}
                                        onChange={(e) =>
                                            onUpdate(material.id, "materialName", e.target.value)
                                        }
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={material.manufacturerName}
                                        onChange={(e) =>
                                            onUpdate(material.id, "manufacturerName", e.target.value)
                                        }
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        multiline
                                        maxRows={2}
                                        value={material.technicalDetails}
                                        onChange={(e) =>
                                            onUpdate(material.id, "technicalDetails", e.target.value)
                                        }
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.2 }}>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => onDelete(material.id)}
                                        disabled={materials.length === 1}
                                        sx={{ p: 0.2 }}
                                    >
                                        <Delete sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default MaterialListSpecifications;
