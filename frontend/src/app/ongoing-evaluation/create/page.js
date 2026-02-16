"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import axiosInstance from "@/axios/axiosInstance";
import SupplierDetailsSection from "./components/SupplierDetailsSection";
import PerformanceEvaluationsSection from "./components/PerformanceEvaluationsSection";
import EvaluationResultsSection from "./components/EvaluationResultsSection";
import EvidencesSection from "./components/EvidencesSection";
import RoutineControlsSection from "./components/RoutineControlsSection";
import RequiredActionsSection from "./components/RequiredActionsSection";
import SummarySection from "./components/SummarySection";
import OngoingEvaluationPreviewDialog from "./components/OngoingEvaluationPreviewDialog";

// Validation Schema
const validationSchema = Yup.object({
    supplierName: Yup.string().required("Supplier Name is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    evaluationPeriod: Yup.string().required("Evaluation Period is required"),
    evaluatedBy: Yup.string().required("Evaluated By is required"),
    date: Yup.date().required("Date is required"),
});

function OngoingEvaluationCreateContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supplierId = searchParams.get("supplierId");
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const formik = useFormik({
        initialValues: {
            // Supplier Details
            supplierName: "",
            contactPerson: "",
            phone: "",
            email: "",
            supplierClassification: "Critical",
            evaluationPeriod: "",
            evaluatedBy: "",
            date: new Date().toISOString().split('T')[0],

            // Performance Evaluations
            certificationStatus: "N/A",
            certificationDetails: "",
            meetRequirements: "Acceptable",
            responsiveness: "Acceptable",
            quality: "Acceptable",
            onTimeDelivery: "Acceptable",
            cost: "Acceptable",

            // Evaluation Results
            evaluationResult: "Approved without conditions",

            // Evidences
            evidences: [],
            otherEvidence: "",

            // Routine Controls
            routineControls: [],
            otherControls: "",

            // Required Actions
            requiredActions: ["AddToASL"],
            otherAction: "",

            // Summary
            completedBy: "",
            completedDate: new Date().toISOString().split('T')[0],
            approvedBy: "",
            approvedDate: ""
        },
        validationSchema: validationSchema,
        onSubmit: async () => {
            setShowPreview(true);
        },
    });

    useEffect(() => {
        if (supplierId) {
            fetchSupplierInfo(supplierId);
        }
    }, [supplierId]);

    const fetchSupplierInfo = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/evaluation/${id}`);
            const data = response.data;
            if (data) {
                formik.setValues({
                    ...formik.values,
                    supplierName: data.supplierName || "",
                    contactPerson: data.contactPerson || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    supplierClassification: data.classification || "Critical",
                });
            }
        } catch (error) {
            console.error("Error auto-filling supplier info:", error);
            showNotification("Failed to auto-fill supplier details", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleActualSubmit = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/ongoing-evaluation", formik.values);

            if (response.status === 201 || response.status === 200) {
                showNotification("Ongoing Evaluation Checklist saved successfully!", "success");
                router.push("/ongoing-evaluation");
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("Error saving form:", error);
            showNotification("Failed to save evaluation form. Please try again.", "error");
        } finally {
            setLoading(false);
            setShowPreview(false);
        }
    };

    if (loading) return <Loader fullPage message="Saving Evaluation Checklist..." />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/ongoing-evaluation")}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h5" fontWeight={800} color="#1e293b">
                    Ongoing Supplier Evaluation Checklist (FRM12-05)
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <SupplierDetailsSection formik={formik} />
                <PerformanceEvaluationsSection formik={formik} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <EvaluationResultsSection formik={formik} />
                    <EvidencesSection formik={formik} />
                    <RoutineControlsSection formik={formik} />
                    <RequiredActionsSection formik={formik} />
                    <SummarySection formik={formik} />
                </Box>

                <Box sx={{ mt: 5, mb: 5, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/ongoing-evaluation")}
                        sx={{ borderRadius: 2, px: 4 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<Save />}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                            "&:hover": { background: "linear-gradient(135deg, #0d5a94 0%, #0a4674 100%)" }
                        }}
                    >
                        Preview & Submit
                    </Button>
                </Box>

                <OngoingEvaluationPreviewDialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    onConfirm={handleActualSubmit}
                    data={formik.values}
                    loading={loading}
                />
            </form>
        </Box>
    );
}

export default function OngoingEvaluationCreatePage() {
    return (
        <Suspense fallback={<Loader fullPage message="Initializing Checklist..." />}>
            <OngoingEvaluationCreateContent />
        </Suspense>
    );
}
