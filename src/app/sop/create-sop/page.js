"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import DeviceInfoStep from "../components/DeviceInfoStep";
import TestingProcessStep from "../components/TestingProcessStep";
import PackagingDetailsStep from "../components/PackagingDetailsStep";
import ReviewSummaryStep from "../components/ReviewSummaryStep";

import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const steps = ["Device Info", "Testing Process", "Packaging", "Review & Save"];

function SOPFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        const fetchSopDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/sops/${id}`);
                if (response.data) {
                    setFormData(response.data);
                }
            } catch (error) {
                console.error("Error fetching SOP details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSopDetails();
        }
    }, [id]);

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

    const handleSave = async () => {
        try {
            if (id) {
                await axiosInstance.put(`/sops/${id}`, formData);
            } else {
                const payload = {
                    ...formData,
                    sopNumber: `SOP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                    status: "Completed",
                };
                await axiosInstance.post("/sops", payload);
            }
            router.push("/sop");
        } catch (error) {
            console.error("Error saving SOP:", error);
        }
    };

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

    if (loading) return <Loader fullPage message="Fetching SOP Details..." />;

    return (
        <Box sx={{ pb: 8 }}>
            <CommonCard title={id ? "Edit Standard Operating Procedure" : "Standard Operating Procedures (SOP)"}>
                <Box sx={{ px: { xs: 1, }, py: 3 }}>
                    <Box sx={{ mb: 6 }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                '&.Mui-active': { color: '#1172ba' },
                                                '&.Mui-completed': { color: '#1172ba' },
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

                    <Box>
                        {getStepContent(activeStep)}
                    </Box>

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
                                onClick={handleSave}
                                startIcon={<Save />}
                                sx={{
                                    borderRadius: 2,
                                    px: 6,
                                    py: 1.5,
                                    textTransform: "none",
                                    bgcolor: "#1172ba",
                                    "&:hover": { bgcolor: "#0d5a94" }
                                }}
                            >
                                {id ? "Update SOP" : "Complete & Save SOP"}
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
                                }}
                            >
                                Next Step
                            </Button>
                        )}
                    </Box>
                </Box>
            </CommonCard>
        </Box>
    );
}

export default function SOPForm() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <SOPFormContent />
        </Suspense>
    );
}
