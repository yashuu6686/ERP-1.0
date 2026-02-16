"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Grid
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import CommonCard from "@/components/ui/CommonCard";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import SupplierDetailsSection from "./components/SupplierDetailsSection";
import EvaluationChecklistSection from "./components/EvaluationChecklistSection";
import EvaluationResultsSection from "./components/EvaluationResultsSection";
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
    certificationStatus: Yup.string().required("This field is required"),
    // Add other fields as necessary
});

function OngoingEvaluationContent() {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
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
            date: new Date().toISOString().split('T')[0],

            // Checklist
            certificationStatus: "N/A",
            certificationStatusDate: "",
            meetRequirements: "Acceptable",
            responsiveness: "Acceptable",
            quality: "Acceptable",
            onTimeDelivery: "Acceptable",
            cost: "Acceptable",

            // Results
            evaluationResult: "Approved without conditions",
            evidences: [], // Array for checkboxes
            otherEvidence: "",
            routineControls: [], // Array for checkboxes
            otherControls: "",
            requiredAction: "AddToASL",
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

    const handleActualSubmit = async () => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call
            console.log("Submitting Ongoing Evaluation:", formik.values);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API

            showNotification("Ongoing Supplier Evaluation submitted successfully!", "success");
            router.push("/suppliers");
        } catch (error) {
            console.error("Error submitting form:", error);
            showNotification("Failed to submit evaluation", "error");
        } finally {
            setLoading(false);
            setShowPreview(false);
        }
    };

    if (loading) return <Loader fullPage message="Submitting Evaluation..." />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push("/suppliers")}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h5" fontWeight={700} color="#1e293b">
                    Ongoing Supplier Evaluation Checklist (FRM12-05)
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <SupplierDetailsSection formik={formik} />

                <EvaluationChecklistSection formik={formik} />

                <EvaluationResultsSection formik={formik} />

                <SummarySection formik={formik} />

                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/suppliers")}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit" // Triggers formik.handleSubmit which opens preview
                        startIcon={<Save />}
                        sx={{
                            backgroundColor: "#1172ba",
                            "&:hover": { backgroundColor: "#0d5a94" },
                        }}
                    >
                        Preview & Submit
                    </Button>
                </Box>
            </form>

            <OngoingEvaluationPreviewDialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={handleActualSubmit}
                data={formik.values}
                loading={loading}
            />
        </Box>
    );
}

export default function OngoingEvaluationPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <OngoingEvaluationContent />
        </Suspense>
    );
}
