"use client";
import React from "react";
import {
    Card,
    Box,
    Typography,
    Chip,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Divider,
    Grid,
    Fade,
    Paper,
    Select,
    MenuItem,
} from "@mui/material";
import { FactCheck } from "@mui/icons-material";

const deviceTestingSteps = [
    { step: 1, task: "Preparation / Physical status" },
    { step: 2, task: "Temperature" },
    { step: 3, task: "Oxygen Saturation" },
    { step: 4, task: "Glucose" },
    { step: 5, task: "Blood Pressure" },
    { step: 6, task: "ECG Functionality" },
    { step: 7, task: "BP Cuffs" },
    { step: 8, task: "Large BP Cuff" },
    { step: 9, task: "Glucose Bottles" },
    { step: 10, task: "Lancet Pouch" },
    { step: 11, task: "USB cables" },
    { step: 12, task: "User Manual" },
    { step: 13, task: "Lancet pen" },
    { step: 14, task: "Plastic shield" },
    { step: 15, task: "Hologram stickers" },
    { step: 16, task: "Validity Stickers" },
    { step: 17, task: "Scanbo Jute bag" },
    { step: 18, task: "Finalize / Report" },
    { step: 19, task: "Final Check" },
];

export default function TestingProcessStep({ formData, handleInputChange, handleStepResultChange }) {
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            transition: "all 0.3s ease",
            "&:hover": {
                "& > fieldset": { borderColor: "#1172ba" },
            },
            "&.Mui-focused fieldset": {
                borderColor: "#1172ba",
                borderWidth: "2px",
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#1172ba",
        }
    };

    const cardHeaderStyle = {
        background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
        color: "white",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
    };

    const glassStyle = {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    };

    return (
        <Fade in={true} timeout={500}>
            <Card sx={{ mb: 4, borderRadius: 3, ...glassStyle, overflow: "hidden" }}>
                <Box sx={cardHeaderStyle}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <FactCheck />
                        <Typography variant="h6" fontWeight={700}>Testing Process</Typography>
                    </Box>
                    <Chip label={`${deviceTestingSteps.length} Tasks`} size="small" sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }} variant="outlined" />
                </Box>
                <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 600 }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700, width: 60 }}>#</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Task</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700, width: 140 }}>Parameter</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700, width: 140 }}>Methodology</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700, width: 140 }}>Expected</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700, width: 100 }}>Check</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deviceTestingSteps.map((row, idx) => (
                                <TableRow key={row.step} sx={{ "&:hover": { bgcolor: "rgba(17, 114, 186, 0.04)" } }}>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={700} color="primary">{row.step}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{row.task}</TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            defaultValue={row.parameter}
                                            onChange={(e) => handleStepResultChange('testingResults', idx, 'parameter', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            defaultValue={row.methodology}
                                            onChange={(e) => handleStepResultChange('testingResults', idx, 'methodology', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            defaultValue={row.expected}
                                            onChange={(e) => handleStepResultChange('testingResults', idx, 'expected', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            size="small"
                                            fullWidth
                                            variant="standard"
                                            displayEmpty
                                            defaultValue=""
                                            onChange={(e) => handleStepResultChange('testingResults', idx, 'status', e.target.value)}
                                            sx={{
                                                fontSize: "0.875rem",
                                                "& .MuiSelect-select": { py: 0.5 }
                                            }}
                                        >
                                            <MenuItem value="" disabled sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                                                Select
                                            </MenuItem>
                                            <MenuItem value="Pass" sx={{ color: "success.main", fontSize: "0.85rem" }}>Pass</MenuItem>
                                            <MenuItem value="Fail" sx={{ color: "error.main", fontSize: "0.85rem" }}>Fail</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Notes..."
                                            onChange={(e) => handleStepResultChange('testingResults', idx, 'remarks', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider />

                <Box sx={{ p: 3, bgcolor: "rgba(17, 114, 186, 0.02)" }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Testing By" size="small"
                                value={formData.testingBy}
                                onChange={(e) => handleInputChange("testingBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Verified By" size="small"
                                value={formData.verifiedBy}
                                onChange={(e) => handleInputChange("verifiedBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Testing Date" size="small" type="date"
                                value={formData.testingDate}
                                onChange={(e) => handleInputChange("testingDate", e.target.value)}
                                InputLabelProps={{ shrink: true }} sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Verified Date" size="small" type="date"
                                value={formData.verifiedDate}
                                onChange={(e) => handleInputChange("verifiedDate", e.target.value)}
                                InputLabelProps={{ shrink: true }} sx={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Fade>
    );
}
