"use client";
import React from "react";
import {
    Card,
    Box,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    FormControl,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import { Science, Add, Delete } from "@mui/icons-material";

export default function TestResultsCard({ testRows, addTestRow, deleteTestRow, handleTestRowChange }) {
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
                mb: 4,
                border: "1px solid #e9ecef",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                    <Science />
                    <Typography color="white" variant="h6" fontWeight={600}>
                        Test Results / Specifications
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={addTestRow}
                    sx={{
                        bgcolor:"white",
                        color:"#1172ba",
                        // backgroundColor: "rgba(255,255,255,0.15)",
                        // "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                        // textTransform: "none",
                    }}
                >
                    Add Row
                </Button>
            </Box>
            <Box sx={{ overflowX: "auto" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                            <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Step</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Parameters</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Specification</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Test Method</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057" }}>Test Result</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057", width: 120 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#495057", width: 80 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testRows.map((row, index) => (
                            <TableRow key={row.id} sx={{ "&:hover": { bgcolor: "#f8f9fa" } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.parameters}
                                        onChange={(e) =>
                                            handleTestRowChange(row.id, "parameters", e.target.value)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.specification}
                                        onChange={(e) =>
                                            handleTestRowChange(row.id, "specification", e.target.value)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.method}
                                        onChange={(e) =>
                                            handleTestRowChange(row.id, "method", e.target.value)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.result}
                                        onChange={(e) =>
                                            handleTestRowChange(row.id, "result", e.target.value)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormControl size="small" fullWidth sx={{ ...textFieldStyle, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}>
                                        <Select
                                            value={row.status}
                                            onChange={(e) =>
                                                handleTestRowChange(row.id, "status", e.target.value)
                                            }
                                            displayEmpty
                                            MenuProps={{ disableScrollLock: true }}
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="pass">Pass</MenuItem>
                                            <MenuItem value="fail">Fail</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => deleteTestRow(row.id)}
                                        disabled={testRows.length === 1}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
}
