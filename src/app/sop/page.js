"use client";
import React, { useState } from "react";
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Chip,
    InputAdornment,
    Stepper,
    Step,
    StepLabel,
    Fade,
    IconButton,
    Tooltip,
    Divider,
} from "@mui/material";
import {
    ArrowForward,
    Save,
    Devices,
    FactCheck,
    Inventory,
    ArrowBack,
    CalendarToday,
    Person,
    CheckCircle,
    HelpOutline,
    AssignmentTurnedIn,
    LocalShipping,
} from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";

const steps = ["Device Info", "Testing Process", "Packaging", "Review & Save"];

export default function SOPForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        deviceId: "",
        date: new Date().toISOString().split('T')[0],
        companyName: "",
        companyAddress: "",
        assistedBy: "",
        doneBy: "",
        testingBy: "",
        testingDate: new Date().toISOString().split('T')[0],
        verifiedBy: "",
        verifiedDate: new Date().toISOString().split('T')[0],
        packedBy: "",
        checkedBy: "",
        testingResults: {},
        packagingResults: {},
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleStepResultChange = (section, stepIndex, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [stepIndex]: {
                    ...prev[section][stepIndex],
                    [field]: value
                }
            }
        }));
    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const deviceTestingSteps = [
        {
            step: 1,
            task: "Preparation / Physical status",
        },
        {
            step: 2,
            task: "Temperature",
        },
        {
            step: 3,
            task: "Oxygen Saturation",
        },
        {
            step: 4,
            task: "Glucose",
        },
        {
            step: 5,
            task: "Blood Pressure"
        },
        {
            step: 6,
            task: "ECG Functionality"
        },
        {
            step: 7,
            task: "BP Cuffs"
        },
        {
            step: 8,
            task: "Large BP Cuff"
        },
        {
            step: 9,
            task: "Glucose Bottles"
        },
        {
            step: 10,
            task: "Lancet Pouch"
        },
        {
            step: 11,
            task: "USB cables"
        },
        {
            step: 12,
            task: "User Manual"
        },
        {
            step: 13,
            task: "Lancet pen"
        },
        {
            step: 14,
            task: "Plastic shield"
        },
        {
            step: 15,
            task: "Hologram stickers"
        },
        {
            step: 16,
            task: "Validity Stickers"
        },
        {
            step: 17,
            task: "Scanbo Jute bag"
        },
        {
            step: 18,
            task: "Finalize / Report"
        },
        {
            step: 19,
            task: "Final Check"
        },
    ];

    const packagingSteps = [
        {
            step: 1,
            components: "Scanbo D8 Device",
        },
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

    const renderDeviceInfo = () => (
        <Fade in={true} timeout={500}>
            <Card sx={{ mb: 4, borderRadius: 3, ...glassStyle }}>
                <Box sx={cardHeaderStyle}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Devices />
                        <Typography variant="h6" fontWeight={700}>Device Information</Typography>
                    </Box>
                    <Tooltip title="Enter basic device and company details">
                        <IconButton size="small" sx={{ color: "white" }}><HelpOutline /></IconButton>
                    </Tooltip>
                </Box>
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Device ID"
                                placeholder="e.g. SN-8821"
                                value={formData.deviceId}
                                onChange={(e) => handleInputChange("deviceId", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleInputChange("date", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldStyle}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarToday sx={{ color: "#1172ba", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange("companyName", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField
                                fullWidth
                                label="Company Address"
                                value={formData.companyAddress}
                                onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <TextField
                                fullWidth
                                label="Assisted By"
                                value={formData.assistedBy}
                                onChange={(e) => handleInputChange("assistedBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                            <TextField
                                fullWidth
                                label="Done By"
                                value={formData.doneBy}
                                onChange={(e) => handleInputChange("doneBy", e.target.value)}
                                sx={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    );

    const renderTestingProcess = () => (
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
                                        <TextField
                                            size="small"
                                            placeholder="Pass/Fail"
                                            onChange={(e) => handleStepResultChange('testingResults', idx, 'status', e.target.value)}
                                            variant="standard"
                                        />
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

    const renderPackaging = () => (
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
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700, width: 60 }}>#</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Components</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Parameter</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Expected Result</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ bgcolor: "#f1f5f9", fontWeight: 700 }}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packagingSteps.map((row, idx) => (
                                <TableRow key={row.step} sx={{ "&:hover": { bgcolor: "rgba(17, 114, 186, 0.04)" } }}>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={700} color="primary">{row.step}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{row.components}</TableCell>
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
                                        <TextField
                                            size="small" placeholder="Checked"
                                            onChange={(e) => handleStepResultChange('packagingResults', idx, 'status', e.target.value)}
                                            variant="standard"
                                        />
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

    const renderReview = () => (
        <Fade in={true} timeout={500}>
            <Box>
                <Card sx={{ mb: 4, borderRadius: 3, ...glassStyle }}>
                    <Box sx={cardHeaderStyle}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <AssignmentTurnedIn />
                            <Typography variant="h6" fontWeight={700}>Review Summary</Typography>
                        </Box>
                        <Chip label="Ready to Save" color="success" size="small" />
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="overline" color="text.secondary" fontWeight={700}>DEVICE & COMPANY</Typography>
                                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2"><strong>Device ID:</strong> {formData.deviceId || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Company:</strong> {formData.companyName || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Date:</strong> {formData.date}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="overline" color="text.secondary" fontWeight={700}>AUTHORIZATION</Typography>
                                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2"><strong>Testing By:</strong> {formData.testingBy || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Verified By:</strong> {formData.verifiedBy || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Packed By:</strong> {formData.packedBy || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 6, p: 3, bgcolor: "rgba(76, 175, 80, 0.05)", borderRadius: 2, border: "1px dashed rgba(76, 175, 80, 0.3)" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "#2e7d32" }}>
                                <CheckCircle />
                                <Typography variant="subtitle1" fontWeight={600}>Declaration</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                                I hereby certify that all testing and packaging steps have been performed according to the Standard Operating Procedures (SOP) and the device is verified for dispatch.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Fade>
    )

    const getStepContent = (step) => {
        switch (step) {
            case 0: return renderDeviceInfo();
            case 1: return renderTestingProcess();
            case 2: return renderPackaging();
            case 3: return renderReview();
            default: return "Unknown step";
        }
    };

    return (
        <Box sx={{ pb: 8 }}>
            <CommonCard title="Standard Operating Procedures (SOP)">
                <Box sx={{ px: { xs: 1, md: 4 }, py: 3 }}>
                    {/* Custom Stepper */}
                    <Box sx={{ mb: 6 }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                '&.Mui-active': { color: '#1172ba' },
                                                '&.Mui-completed': { color: '#2e7d32' },
                                            }
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight={activeStep === index ? 700 : 500}>
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    {/* Step Content */}
                    <Box sx={{ minHeight: 400 }}>
                        {getStepContent(activeStep)}
                    </Box>

                    {/* Navigation Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBack />}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                py: 1.2,
                                textTransform: "none",
                                fontWeight: 700,
                                color: "#64748b",
                                "&:hover": { bgcolor: "#f1f5f9" }
                            }}
                        >
                            Back
                        </Button>

                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                sx={{
                                    backgroundColor: "#2e7d32",
                                    borderRadius: 2,
                                    px: 6,
                                    py: 1.5,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    boxShadow: "0 4px 14px 0 rgba(46, 125, 50, 0.39)",
                                    "&:hover": { backgroundColor: "#1b5e20", boxShadow: "0 6px 20px rgba(46, 125, 50, 0.23)" },
                                }}
                            >
                                Complete & Save SOP
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<ArrowForward />}
                                sx={{
                                    backgroundColor: "#1172ba",
                                    borderRadius: 2,
                                    px: 6,
                                    py: 1.5,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    boxShadow: "0 4px 14px 0 rgba(17, 114, 186, 0.39)",
                                    "&:hover": { backgroundColor: "#0d5a94", boxShadow: "0 6px 20px rgba(17, 114, 186, 0.23)" },
                                }}
                            >
                                Next Step
                            </Button>
                        )}
                    </Box>
                </Box>
            </CommonCard>

            {/* Footer Branding */}
            <Box sx={{ mt: 4, textAlign: 'center', opacity: 0.6 }}>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <LocalShipping sx={{ fontSize: 16 }} /> Scanbo Quality Management System • Standard Operating Procedure v2.4
                </Typography>
            </Box>
        </Box>
    );
}
