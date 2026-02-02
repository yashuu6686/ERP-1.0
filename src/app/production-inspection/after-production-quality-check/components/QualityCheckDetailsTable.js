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

const QualityCheckDetailsTable = ({ data, onAdd, onDelete, onChange }) => {
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
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={onAdd}
                    sx={{
                        bgcolor: "#fff",
                        color: "#1172ba",
                        "&:hover": { bgcolor: "#f0f9ff" },
                        textTransform: "none",
                    }}
                >
                    Add Observation
                </Button>
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
                                <TableCell align="center" sx={{ fontWeight: 500, p: 2 }}>
                                    Observation
                                </TableCell>
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
                                            value={row.parameters}
                                            onChange={(e) =>
                                                onChange(row.id, "parameters", e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter Specification"
                                            value={row.specification}
                                            onChange={(e) =>
                                                onChange(row.id, "specification", e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Method"
                                            value={row.method}
                                            onChange={(e) => onChange(row.id, "method", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Observation"
                                            value={row.observation}
                                            onChange={(e) =>
                                                onChange(row.id, "observation", e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Remarks"
                                            value={row.remarks}
                                            onChange={(e) => onChange(row.id, "remarks", e.target.value)}
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
