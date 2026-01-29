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
import { Inventory } from "@mui/icons-material";

const packagingSteps = [
    { step: 1, components: "Scanbo D8 Device" },
    { step: 2, components: "BP Cuffs" },
    { step: 3, components: "Large BP Cuff" },
    { step: 4, components: "Glucose Bottles" },
    { step: 5, components: "Lancet Pouch" },
    { step: 6, components: "Lancet Pen" },
    { step: 7, components: "USB Cable" },
    { step: 8, components: "Plastic Shield" },
    { step: 9, components: "Scanbo Jute Bag" },
    { step: 10, components: "All Assemble Component" },
    { step: 11, components: "Seal Package" },
    { step: 12, components: "Validity Stickers" },
    { step: 13, components: "Picture / Video" },
    { step: 14, components: "Final Check" },
];

export default function PackagingDetailsStep({ formData, handleInputChange, handleStepResultChange }) {
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
                        <Inventory />
                        <Typography variant="h6" fontWeight={700}>Packaging Details</Typography>
                    </Box>
                    <Chip label={`${packagingSteps.length} Components`} size="small" sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }} variant="outlined" />
                </Box>
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500, width: 60 }}>Sr.No</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500 }}>Components</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500 }}>Parameter</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500 }}>Expected Result</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500 }}>Status</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500 }}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packagingSteps.map((row, idx) => (
                                <TableRow key={row.step} sx={{ "&:hover": { bgcolor: "rgba(17, 114, 186, 0.04)" } }}>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={700} color="primary">{row.step}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.components}</TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small" fullWidth defaultValue={row.parameter}
                                            onChange={(e) => handleStepResultChange('packagingResults', idx, 'parameter', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small" fullWidth defaultValue={row.expected}
                                            onChange={(e) => handleStepResultChange('packagingResults', idx, 'expected', e.target.value)}
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
                                            onChange={(e) => handleStepResultChange('packagingResults', idx, 'status', e.target.value)}
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
                                            size="small" fullWidth placeholder="Notes..."
                                            onChange={(e) => handleStepResultChange('packagingResults', idx, 'remarks', e.target.value)}
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
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth label="Packed By" size="small"
                                value={formData.packedBy}
                                onChange={(e) => handleInputChange("packedBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth label="Checked By" size="small"
                                value={formData.checkedBy}
                                onChange={(e) => handleInputChange("checkedBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Fade>
    );
}5