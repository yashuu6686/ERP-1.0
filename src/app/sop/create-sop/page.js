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
import CommonCard from "../../../components/ui/CommonCard";
import DeviceInfoStep from "../components/DeviceInfoStep";
import TestingProcessStep from "../components/TestingProcessStep";
import PackagingDetailsStep from "../components/PackagingDetailsStep";
import ReviewSummaryStep from "../components/ReviewSummaryStep";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = ["Device Info", "Testing Process", "Packaging", "Review & Save"];

// Validation Schema
const validationSchema = [
    // Step 0: Device Info
    Yup.object({
        deviceId: Yup.string().required("Device ID is required"),
        date: Yup.date().required("Date is required"),
        companyName: Yup.string().required("Company Name is required"),
    }),
    // Step 1: Testing Process
    Yup.object({
        testingBy: Yup.string().required("Testing By is required"),
        verifiedBy: Yup.string().required("Verified By is required"),
        testingResults: Yup.object().test('expected-results', 'Expected results are required for all steps', (value) => {
            if (!value) return true;
            return Object.values(value).every(step => step.expected && step.expected.trim() !== "");
        })
    }),
    // Step 2: Packaging Details
    Yup.object({
        packedBy: Yup.string().required("Packed By is required"),
        checkedBy: Yup.string().required("Checked By is required"),
        packagingResults: Yup.object().test('expected-results', 'Expected results are required for all components', (value) => {
            if (!value) return true;
            return Object.values(value).every(step => step.expected && step.expected.trim() !== "");
        })
    }),
];

function SOPFormContent() {
    const router = useRouter();
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema: validationSchema[activeStep],
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const isHR = user?.role === 'hr';
                const status = isHR ? "Pending Approval" : "Completed";

                const payload = {
                    ...values,
                    sopNumber: values.sopNumber || `SOP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                    status: status,
                };

                let response;
                if (id) {
                    response = await axiosInstance.put(`/sops/${id}`, payload);
                } else {
                    response = await axiosInstance.post("/sops", payload);
                }

                if (isHR && (response.status === 201 || response.status === 200)) {
                    await NotificationService.createNotification({
                        title: "SOP Approval Required",
                        message: `HR ${user.name} has submitted an SOP for ${values.deviceId || 'a device'} (Report: ${payload.sopNumber}).`,
                        targetRole: "admin",
                        type: "sop_approval",
                        link: `/sop/view-sop?id=${id || response.data.id}`,
                        inspectionId: id || response.data.id
                    });
                }

                alert(`SOP ${id ? "Updated" : "Saved"} Successfully!`);
                router.push("/sop");
            } catch (error) {
                console.error("Error saving SOP:", error);
                alert("Failed to save SOP.");
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        const fetchSopDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/sops/${id}`);
                if (response.data) {
                    formik.setValues(response.data);
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
    }, [id, formik]);

    const handleNext = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setActiveStep((prev) => prev + 1);
        } else {
            // Mark all fields as touched to show errors
            formik.setTouched(
                Object.keys(errors).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            );
        }
    };
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DeviceInfoStep formik={formik} />;
            case 1:
                return <TestingProcessStep formik={formik} />;
            case 2:
                return <PackagingDetailsStep formik={formik} />;
            case 3:
                return <ReviewSummaryStep formik={formik} />;
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
                                onClick={formik.handleSubmit}
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
