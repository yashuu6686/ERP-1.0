"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import SupplierInfoSection from "../components/SupplierInfoSection";
import ClassificationSection from "../components/ClassificationSection";
import RiskScoringSection from "../components/RiskScoringSection";
import ScoringTableSection from "../components/ScoringTableSection";
import RiskAssessmentPreviewDialog from "../components/RiskAssessmentPreviewDialog";
import axiosInstance from "@/axios/axiosInstance";

const validationSchema = Yup.object({
    supplierName: Yup.string().required("Supplier Name is required"),
    addressLocation: Yup.string().required("Address/Location is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    typeOfSupplier: Yup.string().required("Type of Supplier is required"),
    suppliedProductService: Yup.string().required("Supplied Product/Service is required"),
    supplierClassification: Yup.string().required("Classification is required"),
});

function RiskAssessmentContent() {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const formik = useFormik({
        initialValues: {
            // Supplier Info
            supplierName: "",
            addressLocation: "",
            contactPerson: "",
            typeOfSupplier: "",
            suppliedProductService: "",
            qualityAgreement: "",
            supplierClassification: "Critical", // For local form tracking if needed
            classification: "Critical", // To match the list page column

            // Risk Scoring
            probability: 1,
            severity: 1,
            criticalityWeight: 2.0,
            calculatedRiskScore: 2.0,
            riskCategory: "Low",

            // Scoring Table
            qualitySystem: { score: '', tierWeight: '', weightedScore: '' },
            incomingInspection: { score: '', tierWeight: '', weightedScore: '' },
            delivery: { score: '', tierWeight: '', weightedScore: '' },
            reliability: { score: '', tierWeight: '', weightedScore: '' },
            processConsistency: { score: '', tierWeight: '', weightedScore: '' },
            traceability: { score: '', tierWeight: '', weightedScore: '' },
            changeControl: { score: '', tierWeight: '', weightedScore: '' },
            financialStability: { score: '', tierWeight: '', weightedScore: '' },
            geoPolitical: { score: '', tierWeight: '', weightedScore: '' },
            alternateSuppliers: { score: '', tierWeight: '', weightedScore: '' },
            weightedAverage: '',
            riskInterpretation: 'Low Risk',
        },
        validationSchema: validationSchema,
        onSubmit: async () => {
            setShowPreview(true);
        },
    });

    const handleActualSubmit = async () => {
        setLoading(true);
        try {
            const submissionData = {
                ...formik.values,
                classification: formik.values.supplierClassification, // Map for list page column
                assessmentDate: new Date().toISOString().split('T')[0], // Add date in YYYY-MM-DD
                status: "Completed"
            };

            console.log("Submitting Risk Assessment to API:", submissionData);
            await axiosInstance.post("/risk-assessments", submissionData);

            showNotification("Risk Assessment submitted and saved successfully!", "success");
            router.push("/risk-assessment");
        } catch (error) {
            console.error("Error submitting form:", error);
            showNotification(error.response?.data?.message || "Failed to save assessment. Please try again.", "error");
        } finally {
            setLoading(false);
            setShowPreview(false);
        }
    };

    // Auto-calculate risk score
    React.useEffect(() => {
        const score = formik.values.probability * formik.values.severity * formik.values.criticalityWeight;
        formik.setFieldValue('calculatedRiskScore', score.toFixed(1));

        if (score <= 9) formik.setFieldValue('riskCategory', 'Low');
        else if (score <= 18) formik.setFieldValue('riskCategory', 'Medium');
        else formik.setFieldValue('riskCategory', 'High');
    }, [formik.values.probability, formik.values.severity, formik.values.criticalityWeight]);

    // Auto-calculate weighted scores and weighted average
    React.useEffect(() => {
        const criteria = [
            'qualitySystem', 'incomingInspection', 'delivery', 'reliability',
            'processConsistency', 'traceability', 'changeControl', 'financialStability',
            'geoPolitical', 'alternateSuppliers'
        ];

        let totalWeightedScore = 0;
        let count = 0;

        criteria.forEach(criterion => {
            const criterionData = formik.values[criterion];
            const score = criterionData?.score;
            const weight = criterionData?.tierWeight;

            // Calculate weighted score if both score and weight are available
            if (score && score !== 'NA' && weight) {
                const weightedScore = (parseFloat(score) * parseFloat(weight)).toFixed(2);
                formik.setFieldValue(`${criterion}.weightedScore`, weightedScore);
                totalWeightedScore += parseFloat(weightedScore);
                count++;
            } else {
                formik.setFieldValue(`${criterion}.weightedScore`, '');
            }
        });

        // Calculate weighted average
        if (count > 0) {
            const average = (totalWeightedScore / count).toFixed(2);
            formik.setFieldValue('weightedAverage', average);

            // Auto-set risk interpretation based on weighted average
            const avgNum = parseFloat(average);
            if (avgNum >= 1.0 && avgNum <= 2.0) {
                formik.setFieldValue('riskInterpretation', 'Low Risk');
            } else if (avgNum >= 2.1 && avgNum <= 3.5) {
                formik.setFieldValue('riskInterpretation', 'Medium Risk');
            } else if (avgNum >= 3.6 && avgNum <= 5.0) {
                formik.setFieldValue('riskInterpretation', 'High Risk');
            }
        } else {
            formik.setFieldValue('weightedAverage', '');
        }
    }, [
        formik.values.qualitySystem,
        formik.values.incomingInspection,
        formik.values.delivery,
        formik.values.reliability,
        formik.values.processConsistency,
        formik.values.traceability,
        formik.values.changeControl,
        formik.values.financialStability,
        formik.values.geoPolitical,
        formik.values.alternateSuppliers
    ]);

    if (loading) return <Loader fullPage message="Submitting Assessment..." />;

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Button startIcon={<ArrowBack />} onClick={() => router.push("/risk-assessment")} sx={{ mr: 2 }}>
                    Back
                </Button>
                <Typography variant="h5" fontWeight={700} color="#1e293b">
                    Supplier Risk Assessment Evaluation (FRM12-11)
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <SupplierInfoSection formik={formik} />
                <ClassificationSection formik={formik} />
                <RiskScoringSection formik={formik} />
                <ScoringTableSection formik={formik} />

                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="outlined" onClick={() => router.push("/risk-assessment")}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<Save />}
                        sx={{ backgroundColor: "#1172ba", "&:hover": { backgroundColor: "#0d5a94" } }}
                    >
                        Preview & Submit
                    </Button>
                </Box>

                <RiskAssessmentPreviewDialog
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

export default function RiskAssessmentFormPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <RiskAssessmentContent />
        </Suspense>
    );
}
