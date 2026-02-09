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
import CardContent from "@mui/material/CardContent";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import FactCheck from "@mui/icons-material/FactCheck";

const QualityCheckDetailsTable = ({
    data,
    onAddRow,
    onDelete,
    onChange,
    formik,
    observationColumns = [{ id: 'observation', label: 'Observation' }],
    onAddColumn,
    onRemoveColumn
}) => {

    const handleKeyDown = (e, rowId, colId, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Build the dynamic column list based on current observation columns
            const currentObservationCols = observationColumns.map(c => c.id);
            const columns = ['parameters', 'specification', 'method', ...currentObservationCols, 'remarks'];

            const currentIndex = columns.indexOf(colId);

            if (currentIndex !== -1) {
                // Try moving to next column in same row
                if (currentIndex < columns.length - 1) {
                    const nextCol = columns[currentIndex + 1];
                    const nextInput = document.querySelector(`[name="checkDetails[${rowIndex}].${nextCol}"]`);
                    if (nextInput) {
                        nextInput.focus();
                        return;
                    }
                }

                // If at end of row, move to first field of next row
                if (currentIndex === columns.length - 1 && rowIndex < data.length - 1) {
                    const nextRowInput = document.querySelector(`[name="checkDetails[${rowIndex + 1}].parameters"]`);
                    if (nextRowInput) {
                        nextRowInput.focus();
                    }
                }
            }
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                marginBottom: 4,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <FactCheck sx={{ color: "#fff", fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                        Quality Check Details
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Add />}
                        onClick={onAddColumn}
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                            borderColor: "transparent",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)", borderColor: "transparent" },
                            textTransform: "none",
                        }}
                    >
                        Add Observation
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Add />}
                        onClick={onAddRow}
                        sx={{
                            bgcolor: "#fff",
                            color: "#1172ba",
                            "&:hover": { bgcolor: "#f0f9ff" },
                            textTransform: "none",
                        }}
                    >
                        Add Row
                    </Button>
                </Box>
            </Box>

            <CardContent sx={{ p: 0 }}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow
                                sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}
                            >
                                <TableCell align="center" sx={{ fontWeight: 500, p: 2 }}>
                                    Sr.No
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, p: 2 }}>
                                    Parameters
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, p: 2 }}>
                                    Specification
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, p: 2 }}>
                                    Method
                                </TableCell>
                                {observationColumns.map((col) => (
                                    <TableCell key={col.id} align="center" sx={{ fontWeight: 500, p: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                            {col.label}
                                            {col.id !== 'observation' && (
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => onRemoveColumn(col.id)}
                                                    sx={{ p: 0.5 }}
                                                >
                                                    <Delete sx={{ fontSize: 16 }} />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                                <TableCell align="center" sx={{ fontWeight: 500, p: 2 }}>
                                    Remarks
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: 500, p: 2, textAlign: "center" }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" sx={{ p: 2 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter Parameters"
                                            name={`checkDetails[${index}].parameters`}
                                            value={row.parameters}
                                            onChange={(e) =>
                                                onChange(row.id, "parameters", e.target.value)
                                            }
                                            onBlur={formik.handleBlur}
                                            onKeyDown={(e) => handleKeyDown(e, row.id, "parameters", index)}
                                            error={formik.touched.checkDetails?.[index]?.parameters && Boolean(formik.errors.checkDetails?.[index]?.parameters)}
                                            helperText={formik.touched.checkDetails?.[index]?.parameters && formik.errors.checkDetails?.[index]?.parameters}
                                            required
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter Specification"
                                            name={`checkDetails[${index}].specification`}
                                            value={row.specification}
                                            onChange={(e) =>
                                                onChange(row.id, "specification", e.target.value)
                                            }
                                            onBlur={formik.handleBlur}
                                            onKeyDown={(e) => handleKeyDown(e, row.id, "specification", index)}
                                            error={formik.touched.checkDetails?.[index]?.specification && Boolean(formik.errors.checkDetails?.[index]?.specification)}
                                            helperText={formik.touched.checkDetails?.[index]?.specification && formik.errors.checkDetails?.[index]?.specification}
                                            required
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Method"
                                            name={`checkDetails[${index}].method`}
                                            value={row.method}
                                            onChange={(e) => onChange(row.id, "method", e.target.value)}
                                            onBlur={formik.handleBlur}
                                            onKeyDown={(e) => handleKeyDown(e, row.id, "method", index)}
                                            error={formik.touched.checkDetails?.[index]?.method && Boolean(formik.errors.checkDetails?.[index]?.method)}
                                            helperText={formik.touched.checkDetails?.[index]?.method && formik.errors.checkDetails?.[index]?.method}
                                            required
                                        />
                                    </TableCell>
                                    {observationColumns.map((col) => (
                                        <TableCell key={col.id} align="center" sx={{ p: 1 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder={col.label}
                                                name={`checkDetails[${index}].${col.id}`}
                                                value={row[col.id] || ''}
                                                onChange={(e) =>
                                                    onChange(row.id, col.id, e.target.value)
                                                }
                                                onBlur={formik.handleBlur}
                                                onKeyDown={(e) => handleKeyDown(e, row.id, col.id, index)}
                                                error={formik.touched.checkDetails?.[index]?.[col.id] && Boolean(formik.errors.checkDetails?.[index]?.[col.id])}
                                                helperText={formik.touched.checkDetails?.[index]?.[col.id] && formik.errors.checkDetails?.[index]?.[col.id]}
                                                required
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Remarks"
                                            name={`checkDetails[${index}].remarks`}
                                            value={row.remarks}
                                            onChange={(e) => onChange(row.id, "remarks", e.target.value)}
                                            onBlur={formik.handleBlur}
                                            onKeyDown={(e) => handleKeyDown(e, row.id, "remarks", index)}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1, textAlign: "center" }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(row.id)}
                                            disabled={data.length === 1}
                                            sx={{
                                                color: "#dc2626",
                                                bgcolor: "#fef2f2",
                                                "&:hover": { bgcolor: "#fee2e2" },
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default QualityCheckDetailsTable;
