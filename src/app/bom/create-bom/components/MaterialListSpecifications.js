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
import IconButton from "@mui/material/IconButton";

import Add from "@mui/icons-material/Add";
import Build from "@mui/icons-material/Build";
import Delete from "@mui/icons-material/Delete";

const MaterialListSpecifications = ({ materials, onAdd, onDelete, onUpdate, errors = [], touched = [], onBlur }) => {
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "white",
            "&:hover": {
                "& > fieldset": { borderColor: "#1172ba" },
            },
        },
    };

    // Handle Enter key to move to next field in the table
    const handleKeyDown = (e, materialId, currentField, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Define field order for each row
            const fieldOrder = ['scanboPartNumber', 'supplierPartNumber', 'quantity', 'materialName', 'manufacturerName', 'technicalDetails'];
            const currentIndex = fieldOrder.indexOf(currentField);

            if (currentIndex !== -1) {
                // Try to move to next field in same row
                if (currentIndex < fieldOrder.length - 1) {
                    const nextField = fieldOrder[currentIndex + 1];
                    // Try both input and textarea selectors
                    let nextInput = document.querySelector(`input[name="materials[${rowIndex}].${nextField}"]`);
                    if (!nextInput) {
                        nextInput = document.querySelector(`textarea[name="materials[${rowIndex}].${nextField}"]`);
                    }
                    if (nextInput) {
                        nextInput.focus();
                        return;
                    }
                }

                // If at end of row, move to first field of next row
                if (currentIndex === fieldOrder.length - 1 && rowIndex < materials.length - 1) {
                    const nextRowInput = document.querySelector(`input[name="materials[${rowIndex + 1}].scanboPartNumber"]`);
                    if (nextRowInput) {
                        nextRowInput.focus();
                    }
                }
            }
        }
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
                    <Typography variant="h6" fontWeight={600} color="white">
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
                                align="center"
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f8fafc",
                                    color: "#495057",
                                    minWidth: 40,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                }}
                            >
                                Sr.No.
                            </TableCell>
                            <TableCell
                                align="center"
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
                                align="center"
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
                                align="center"
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
                                align="center"
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
                                align="center"
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
                                align="center"
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
                                <TableCell align="center" sx={{ py: 0.2, fontSize: "0.75rem" }}>
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
                                        onBlur={onBlur}
                                        onKeyDown={(e) => handleKeyDown(e, material.id, 'scanboPartNumber', index)}
                                        name={`materials[${index}].scanboPartNumber`}
                                        error={touched[index]?.scanboPartNumber && Boolean(errors[index]?.scanboPartNumber)}
                                        helperText={touched[index]?.scanboPartNumber && errors[index]?.scanboPartNumber}
                                        required
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
                                        onBlur={onBlur}
                                        onKeyDown={(e) => handleKeyDown(e, material.id, 'supplierPartNumber', index)}
                                        name={`materials[${index}].supplierPartNumber`}
                                        error={touched[index]?.supplierPartNumber && Boolean(errors[index]?.supplierPartNumber)}
                                        helperText={touched[index]?.supplierPartNumber && errors[index]?.supplierPartNumber}
                                        required
                                        sx={{
                                            ...textFieldStyle,
                                            "& .MuiInputBase-input": { py: 0.5, fontSize: "0.75rem" },
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.2 }}>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={material.quantity}
                                        onChange={(e) =>
                                            onUpdate(material.id, "quantity", e.target.value)
                                        }
                                        onBlur={onBlur}
                                        onKeyDown={(e) => handleKeyDown(e, material.id, 'quantity', index)}
                                        name={`materials[${index}].quantity`}
                                        error={touched[index]?.quantity && Boolean(errors[index]?.quantity)}
                                        helperText={touched[index]?.quantity && errors[index]?.quantity}
                                        required
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
                                        onBlur={onBlur}
                                        onKeyDown={(e) => handleKeyDown(e, material.id, 'materialName', index)}
                                        name={`materials[${index}].materialName`}
                                        error={touched[index]?.materialName && Boolean(errors[index]?.materialName)}
                                        helperText={touched[index]?.materialName && errors[index]?.materialName}
                                        required
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
                                        onBlur={onBlur}
                                        onKeyDown={(e) => handleKeyDown(e, material.id, 'manufacturerName', index)}
                                        name={`materials[${index}].manufacturerName`}
                                        error={touched[index]?.manufacturerName && Boolean(errors[index]?.manufacturerName)}
                                        helperText={touched[index]?.manufacturerName && errors[index]?.manufacturerName}
                                        required
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
                                        onBlur={onBlur}
                                        onKeyDown={(e) => handleKeyDown(e, material.id, 'technicalDetails', index)}
                                        name={`materials[${index}].technicalDetails`}
                                        error={touched[index]?.technicalDetails && Boolean(errors[index]?.technicalDetails)}
                                        helperText={touched[index]?.technicalDetails && errors[index]?.technicalDetails}
                                        required
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
