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
    { step: 1, task: "Preparation / Physical status", parameter: "N/A", methodology: "Charge the device, check the software version, and its physical appearance" },
    { step: 2, task: "Temperature", parameter: "Temperature measurement", methodology: "Compared with a calibrated thermometer" },
    { step: 3, task: "Oxygen Saturation", parameter: "SpO2 measurement", methodology: "Compared with a pulse oximeter" },
    { step: 4, task: "Glucose", parameter: "Glucose measurement", methodology: "Working good" },
    { step: 5, task: "Blood Pressure", parameter: "BP count", methodology: "SR, DR" },
    { step: 6, task: "ECG Functionality", parameter: "ECG recording", methodology: "RR Min, RR Max, HR, BR, HRV" },
    { step: 7, task: "BP Cuffs", parameter: "Both working good", methodology: "Check functionality & quality" },
    { step: 8, task: "Large BP Cuff", parameter: "Both working good", methodology: "Check functionality & quality" },
    { step: 9, task: "Glucose Bottles", parameter: "Yes", methodology: "Check expiry date and stickers" },
    { step: 10, task: "Lancet Pouch", parameter: "Yes (25 Set)", methodology: "pack of 25 needles" },
    { step: 11, task: "USB cables", parameter: "Yes", methodology: "properly wrapped" },
    { step: 12, task: "User Manual", parameter: "No", methodology: "Put it above the BP cuff" },
    { step: 13, task: "Lancet pen", parameter: "Yes", methodology: "Make sure it works properly and is clean after testing" },
    { step: 14, task: "Plastic shield", parameter: "Yes", methodology: "Put it above the device" },
    { step: 15, task: "Hologram stickers", parameter: "Yes", methodology: "Stick properly at both ends." },
    { step: 16, task: "Validity Stickers", parameter: "Yes", methodology: "New Sticker" },
    { step: 17, task: "Scanbo Jute bag", parameter: "Yes", methodology: "Add the device to the Jute bag" },
    { step: 18, task: "Finalize / Report", parameter: "F2F29D.pdf", methodology: "Have you checked all the above points?" },
    { step: 19, task: "Final Check", parameter: "Review checklist", methodology: "All components included" },
];

export default function TestingProcessStep({ formik }) {
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
        // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    };

    React.useEffect(() => {
        // Initialize default values for parameters and methodology if not present
        const results = { ...formik.values.testingResults };
        let updated = false;
        deviceTestingSteps.forEach((step, idx) => {
            if (!results[idx]) {
                results[idx] = { parameter: step.parameter, methodology: step.methodology, expected: "", status: "", remarks: "" };
                updated = true;
            } else {
                if (!results[idx].parameter) { results[idx].parameter = step.parameter; updated = true; }
                if (!results[idx].methodology) { results[idx].methodology = step.methodology; updated = true; }
            }
        });
        if (updated) {
            formik.setFieldValue('testingResults', results);
        }
    }, [formik]); // Run once on mount

    const handleStepChange = (idx, field, value) => {
        const results = { ...formik.values.testingResults };
        if (!results[idx]) results[idx] = {};
        results[idx][field] = value;
        formik.setFieldValue('testingResults', results);
    };

    return (
        <Fade in={true} timeout={500}>
            <Card sx={{ mb: 4, borderRadius: 3, ...glassStyle, overflow: "hidden" }}>
                <Box sx={cardHeaderStyle}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <FactCheck />
                        <Typography variant="h6" color="white" fontWeight={700}>Testing Process</Typography>
                    </Box>
                    <Chip label={`${deviceTestingSteps.length} Tasks`} size="small" sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }} variant="outlined" />
                </Box>
                <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 600 }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500, width: 60 }}>Sr.No</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500 }}>Task</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500, width: 140 }}>Parameter</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500, width: 140 }}>Test Methodology</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500, width: 140 }}>Expected Result</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 500, width: 100 }}>Check</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deviceTestingSteps.map((row, idx) => (
                                <TableRow key={row.step} sx={{ "&:hover": { bgcolor: "rgba(17, 114, 186, 0.04)" } }}>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={500} color="primary">{row.step}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.task}</TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={formik.values.testingResults?.[idx]?.parameter || row.parameter}
                                            onChange={(e) => handleStepChange(idx, 'parameter', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={formik.values.testingResults?.[idx]?.methodology || row.methodology}
                                            onChange={(e) => handleStepChange(idx, 'methodology', e.target.value)}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            required
                                            value={formik.values.testingResults?.[idx]?.expected || ""}
                                            onChange={(e) => handleStepChange(idx, 'expected', e.target.value)}
                                            error={formik.touched.testingResults && formik.errors.testingResults && !formik.values.testingResults?.[idx]?.expected}
                                            variant="standard"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            size="small"
                                            fullWidth
                                            variant="standard"
                                            displayEmpty
                                            value={formik.values.testingResults?.[idx]?.status || ""}
                                            onChange={(e) => handleStepChange(idx, 'status', e.target.value)}
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
                                            value={formik.values.testingResults?.[idx]?.remarks || ""}
                                            onChange={(e) => handleStepChange(idx, 'remarks', e.target.value)}
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
                                name="testingBy"
                                value={formik.values.testingBy}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.testingBy && Boolean(formik.errors.testingBy)}
                                helperText={formik.touched.testingBy && formik.errors.testingBy}
                                sx={textFieldStyle}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Verified By" size="small"
                                name="verifiedBy"
                                value={formik.values.verifiedBy}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.verifiedBy && Boolean(formik.errors.verifiedBy)}
                                helperText={formik.touched.verifiedBy && formik.errors.verifiedBy}
                                sx={textFieldStyle}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Testing Date" size="small" type="date"
                                name="testingDate"
                                value={formik.values.testingDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{ shrink: true }} sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth label="Verified Date" size="small" type="date"
                                name="verifiedDate"
                                value={formik.values.verifiedDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{ shrink: true }} sx={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Fade>
    );
}
