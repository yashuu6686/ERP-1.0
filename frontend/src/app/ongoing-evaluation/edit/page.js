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
import SupplierDetailsSection from "../create/components/SupplierDetailsSection";
import PerformanceEvaluationsSection from "../create/components/PerformanceEvaluationsSection";
import EvaluationResultsSection from "../create/components/EvaluationResultsSection";
import EvidencesSection from "../create/components/EvidencesSection";
import RoutineControlsSection from "../create/components/RoutineControlsSection";
import RequiredActionsSection from "../create/components/RequiredActionsSection";
import SummarySection from "../create/components/SummarySection";
import OngoingEvaluationPreviewDialog from "../create/components/OngoingEvaluationPreviewDialog";

const validationSchema = Yup.object({
    supplierName: Yup.string().required("Supplier Name is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    evaluationPeriod: Yup.string().required("Evaluation Period is required"),
    evaluatedBy: Yup.string().required("Evaluated By is required"),
    date: Yup.date().required("Date is required"),
});

function OngoingEvaluationEditContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const formik = useFormik({
        initialValues: {
            supplierName: "",
            contactPerson: "",
            phone: "",
            email: "",
            supplierClassification: "Critical",
            evaluationPeriod: "",
            evaluatedBy: "",
            date: "",
            certificationStatus: "N/A",
            certificationDetails: "",
            meetRequirements: "Acceptable",
            responsiveness: "Acceptable",
            quality: "Acceptable",
            onTimeDelivery: "Acceptable",
            cost: "Acceptable",
            evaluationResult: "Approved without conditions",
            evidences: [],
            otherEvidence: "",
            routineControls: [],
            otherControls: "",
            requiredActions: ["AddToASL"],
            otherAction: "",
            completedBy: "",
            completedDate: "",
            approvedBy: "",
            approvedDate: ""
        },
        validationSchema: validationSchema,
        onSubmit: async () => {
            setShowPreview(true);
        },
    });

    useEffect(() => {
        if (id) {
            fetchEvaluation();
        }
    }, [id]);

    const fetchEvaluation = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/ongoing-evaluation/${id}`);
            if (response.data) {
                formik.setValues(response.data);
            }
        } catch (error) {
            console.error("Error loading evaluation:", error);
            showNotification("Failed to load evaluation data", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleActualSubmit = async () => {
        setSubmitting(true);
        try {
            const response = await axiosInstance.put(`/ongoing-evaluation/${id}`, formik.values);
            if (response.status === 200) {
                showNotification("Ongoing Evaluation updated successfully!", "success");
                router.push("/ongoing-evaluation");
            }
        } catch (error) {
            console.error("Error updating evaluation:", error);
            showNotification("Failed to update evaluation. Please try again.", "error");
        } finally {
            setSubmitting(false);
            setShowPreview(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Record..." />;
    if (submitting) return <Loader fullPage message="Updating Evaluation Checklist..." />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Button startIcon={<ArrowBack />} onClick={() => router.push("/ongoing-evaluation")} sx={{ mr: 2 }}>
                    Back
                </Button>
                <Typography variant="h5" fontWeight={800} color="#1e293b">
                    Edit Ongoing Evaluation (Record #{id})
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
                    <Button variant="outlined" onClick={() => router.push("/ongoing-evaluation")} sx={{ borderRadius: 2, px: 4 }}>
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
                        Preview & Update
                    </Button>
                </Box>

                <OngoingEvaluationPreviewDialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    onConfirm={handleActualSubmit}
                    data={formik.values}
                    loading={submitting}
                />
            </form>
        </Box>
    );
}

export default function OngoingEvaluationEditPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Initializing Edit Mode..." />}>
            <OngoingEvaluationEditContent />
        </Suspense>
    );
}
