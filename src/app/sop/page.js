"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
} from "@mui/material";
import {
    ArrowForward,
    Save,
    ArrowBack,
    LocalShipping,
} from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";
import DeviceInfoStep from "./components/DeviceInfoStep";
import TestingProcessStep from "./components/TestingProcessStep";
import PackagingDetailsStep from "./components/PackagingDetailsStep";
import ReviewSummaryStep from "./components/ReviewSummaryStep";

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

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DeviceInfoStep formData={formData} handleInputChange={handleInputChange} />;
            case 1:
                return <TestingProcessStep formData={formData} handleInputChange={handleInputChange} handleStepResultChange={handleStepResultChange} />;
            case 2:
                return <PackagingDetailsStep formData={formData} handleInputChange={handleInputChange} handleStepResultChange={handleStepResultChange} />;
            case 3:
                return <ReviewSummaryStep formData={formData} />;
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
