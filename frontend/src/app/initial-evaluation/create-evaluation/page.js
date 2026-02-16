"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Divider,
    Autocomplete,
    TextField,
    CircularProgress,
    InputAdornment,
    Stack,
    Chip,
} from "@mui/material";
import {
    Save,
    ArrowForward,
    ArrowBack,
    Search,
    FactCheck as SurveyIcon,
} from "@mui/icons-material";
import CommonCard from "../../../components/ui/CommonCard";
import SupplierContactSection from "./components/SupplierContactSection";
import SupplierFacilitiesSection from "./components/SupplierFacilitiesSection";
import QuestionnaireSection from "./components/QuestionnaireSection";
import ApprovalSection from "./components/ApprovalSection";
import SupplierPreviewDialog from "./components/SupplierPreviewDialog";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";

const steps = ["Supplier Information", "Facilities & Details", "Questionnaire", "Review & Approval"];

const validationSchema = [
    // Step 0: Supplier Information
    Yup.object({
        supplierName: Yup.string().required("Supplier name is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zipCode: Yup.string()
            .required("Zip code is required")
            .matches(/^\d{5,6}$/, "Zip code must be 5 or 6 digits"),
        contactPerson: Yup.string().required("Contact person is required"),
        title: Yup.string().required("Title is required"),
        phone: Yup.string()
            .required("Phone is required")
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    }),
    // Step 1: Facilities
    Yup.object({
        yearEstablished: Yup.string()
            .required("Year established is required")
            .matches(/^\d{4}$/, "Must be a 4-digit year (e.g., 2024)"),
        totalSquareFootage: Yup.string()
            .required("Total square footage is required")
            .matches(/^\d+$/, "Must be a numeric value"),
        numberOfEmployees: Yup.number()
            .typeError("Must be a number")
            .required("Number of employees is required")
            .positive("Must be a positive number"),
        qaTitle: Yup.string().required("QA title is required"),
        numberOfQAEmployees: Yup.number()
            .typeError("Must be a number")
            .required("Number of QA employees is required")
            .positive("Must be a positive number"),
        productServices: Yup.string().required("Product/Services description is required"),
    }),
    // Step 2: Questionnaire
    Yup.object({}),
    // Step 3: Approval
    Yup.object({
        completedBy: Yup.string().required("Completed by is required"),
        completedByTitle: Yup.string().required("Title is required"),
        completedDate: Yup.date().required("Date is required"),
    }),
];

function SupplierEvaluationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();

    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [referenceData, setReferenceData] = useState([]);
    const [loadingRef, setLoadingRef] = useState(false);
    const [selectedRef, setSelectedRef] = useState(null);

    const formik = useFormik({
        initialValues: {
            evaluationNo: "",
            supplierName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            contactPerson: "",
            title: "",
            phone: "",
            yearEstablished: "",
            totalSquareFootage: "",
            numberOfEmployees: "",
            qaTitle: "",
            numberOfQAEmployees: "",
            productServices: "",
            questionnaire: {
                q1: { answer: "", certificate: "", certCopy: false },
                q2: { answer: "" },
                q3: { answer: "" },
                q4: { answer: "" },
                q5: { answer: "" },
                q6: { answer: "" },
                q7: { answer: "" },
                q8: { answer: "" },
                q9: { answer: "" },
                q10: { answer: "" },
                q11: { answer: "" },
                q12: { answer: "" },
                q13: { answer: "" },
                q14: { answer: "" },
                q15: { answer: "" },
                q16: { answer: "" },
                q17: { answer: "" },
                q18: { answer: "" },
                q19: { answer: "" },
                q20: { answer: "" },
                q21: { answer: "" },
                q22: { answer: "", description: "" },
                q23: { answer: "" },
                q24: { answer: "" },
                q25: { answer: "" },
                q26: { answer: "" },
                q27: { answer: "" },
            },
            additionalComments: "",
            completedBy: "",
            completedByTitle: "",
            completedDate: new Date().toISOString().split("T")[0],
            supplierApproved: "",
            approvalComments: "",
            reviewedBy: "",
            reviewedDate: "",
            approvedBy: "",
            approvedDate: "",
            status: "Pending",
            evaluationDate: new Date().toISOString().split("T")[0],
        },
        validationSchema: validationSchema[activeStep],
        enableReinitialize: true,
        onSubmit: async () => {
            setOpenPreview(true);
        },
    });

    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                setLoadingRef(true);
                const response = await axiosInstance.get("/risk-assessments");
                // Only get completed risk assessments
                const completed = (response.data || []).filter(s => s.status === "Completed");
                setReferenceData(completed);
            } catch (error) {
                console.error("Error fetching risk assessments:", error);
            } finally {
                setLoadingRef(false);
            }
        };

        fetchReferenceData();

        if (id) {
            const fetchEvaluation = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/evaluation/${id}`);
                    if (response.data) {
                        formik.setValues(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching evaluation:", error);
                    showNotification("Failed to load evaluation data", "error");
                } finally {
                    setLoading(false);
                }
            };
            fetchEvaluation();
        }
    }, [id]);

    const handleReferenceSelect = (event, assessment) => {
        setSelectedRef(assessment);
        if (assessment) {
            const addressParts = assessment.addressLocation?.split(",") || [];

            formik.setValues({
                ...formik.initialValues,
                supplierName: assessment.supplierName || "",
                address: assessment.addressLocation || "",
                city: addressParts[addressParts.length - 1]?.trim() || "",
                contactPerson: assessment.contactPerson || "",
                productServices: assessment.suppliedProductService || "",
                status: "Pending",
                evaluationDate: new Date().toISOString().split("T")[0],
            });
            showNotification(`Data imported from Risk Assessment: ${assessment.supplierName}`, "success");
        }
    };

    const handleActualSubmit = async () => {
        try {
            setSubmitting(true);
            const values = formik.values;

            const payload = {
                ...values,
                evaluationNo: values.evaluationNo || `FRM12-04-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            };

            if (id) {
                await axiosInstance.put(`/evaluation/${id}`, payload);
                showNotification("Supplier evaluation updated successfully!", "success");
            } else {
                await axiosInstance.post("/evaluation", payload);
                showNotification("Supplier evaluation created successfully!", "success");
            }

            setOpenPreview(false);
            router.push("/initial-evaluation");
        } catch (error) {
            console.error("Error saving evaluation:", error);
            showNotification("Failed to save evaluation", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleNext = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setActiveStep((prev) => prev + 1);
            formik.setTouched({});
        } else {
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
                return <SupplierContactSection formik={formik} />;
            case 1:
                return <SupplierFacilitiesSection formik={formik} />;
            case 2:
                return <QuestionnaireSection formik={formik} />;
            case 3:
                return <ApprovalSection formik={formik} />;
            default:
                return "Unknown step";
        }
    };

    if (loading) return <Loader fullPage message="Loading Evaluation..." />;

    return (
        <Box>
            <CommonCard title={id ? "Edit Supplier Evaluation" : "New Supplier Evaluation"}>
                <Box sx={{ p: 1 }}>
                    {/* Survey Reference Section - High Visibility Hero Box */}
                    {!id && (
                        <Box
                            sx={{
                                mb: 5,
                                p: 4,
                                borderRadius: 4,
                                bgcolor: "rgba(17, 114, 186, 0.02)",
                                border: "1px solid rgba(17, 114, 186, 0.15)",
                                position: 'relative',
                                overflow: 'hidden',
                                "&::before": {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    bgcolor: '#1172ba'
                                }
                            }}
                        >
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
                                <Box sx={{ flex: 1 }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                                        <Box sx={{
                                            p: 1,
                                            borderRadius: 1.5,
                                            bgcolor: 'rgba(17, 114, 186, 0.1)',
                                            color: '#1172ba',
                                            display: 'flex'
                                        }}>
                                            <SurveyIcon sx={{ fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 800, letterSpacing: '-0.01em' }}>
                                            Quick Start from Risk Assessment
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" sx={{ color: '#64748b', mb: { xs: 2, md: 0 }, maxWidth: '500px' }}>
                                        Search for a completed risk assessment to instantly pre-fill company details, classification, and contact information.
                                    </Typography>
                                </Box>

                                <Box sx={{ width: { xs: '100%', md: '450px' } }}>
                                    <Autocomplete
                                        options={referenceData}
                                        getOptionLabel={(option) => option.supplierName || ""}
                                        loading={loadingRef}
                                        value={selectedRef}
                                        onChange={handleReferenceSelect}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props} sx={{ borderBottom: '1px solid #f1f5f9', p: 1.5 }}>
                                                <Stack spacing={0.5}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1172ba' }}>
                                                        {option.supplierName}
                                                        <Chip label={option.riskCategory} size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.65rem' }} />
                                                    </Typography>
                                                    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />}>
                                                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                            ID: <b>{option.id?.substring(0, 8)}</b>
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                            Assessed: <b>{option.assessmentDate || 'N/A'}</b>
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Import Data from Risk Assessment"
                                                variant="outlined"
                                                placeholder="Type supplier name..."
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Search sx={{ color: '#1172ba', ml: 1 }} />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {loadingRef ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        bgcolor: 'white',
                                                        borderRadius: 3,
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                                        "&:hover": { boxShadow: '0 6px 16px rgba(17, 114, 186, 0.08)' }
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    )}

                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel
                                    StepIconProps={{
                                        sx: {
                                            "&.Mui-active": { color: "#1172ba" },
                                            "&.Mui-completed": { color: "#1172ba" },
                                        },
                                    }}
                                >
                                    <Typography variant="body2" fontWeight={700}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box>{getStepContent(activeStep)}</Box>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
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
                                "&:hover": { bgcolor: "#f1f5f9" },
                                visibility: activeStep === 0 ? "hidden" : "visible",
                            }}
                        >
                            Previous
                        </Button>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/initial-evaluation")}
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    borderColor: "#e2e8f0",
                                    color: "#64748b",
                                }}
                            >
                                Back to Initial Evaluation
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        px: 6,
                                        py: 1.2,
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                        textTransform: "none",
                                        boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)",
                                    }}
                                >
                                    {id ? "Update Evaluation" : "Submit Evaluation"}
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
                                        py: 1.2,
                                        textTransform: "none",
                                        fontWeight: 700,
                                    }}
                                >
                                    Next Step
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <SupplierPreviewDialog
                        open={openPreview}
                        onClose={() => setOpenPreview(false)}
                        onConfirm={handleActualSubmit}
                        values={formik.values}
                        loading={submitting}
                    />
                </Box>
            </CommonCard>
        </Box>
    );
}

export default function SupplierEvaluation() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <SupplierEvaluationContent />
        </Suspense>
    );
}
