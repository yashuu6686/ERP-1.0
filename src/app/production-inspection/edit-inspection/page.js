"use client";
import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";

import CheckCircle from "@mui/icons-material/CheckCircle";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "../../../components/ui/CommonCard";
import ProductDetailsSection from "../after-production-quality-check/components/ProductDetailsSection";
import QualityCheckDetailsTable from "../after-production-quality-check/components/QualityCheckDetailsTable";
import InspectionSummarySection from "../after-production-quality-check/components/InspectionSummarySection";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import ProductionInspectionPreviewDialog from "../components/ProductionInspectionPreviewDialog";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = [
    "Product Details",
    "Quality Check Details",
    "Summary & Approval",
];

function EditInspectionContent() {
    const router = useRouter();
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [materialRequests, setMaterialRequests] = useState([]);
    const [observationColumns, setObservationColumns] = useState([
        { id: "observation", label: "Observation" },
    ]);

    const getValidationSchema = (step, userRole) => {
        const schemas = [
            // Step 0: Product Details
            Yup.object({
                productName: Yup.string().required("Product Name is required"),
                qualityStandard: Yup.string().required("Quality Standard No is required"),
                checkedQuantity: Yup.number()
                    .required("Checked Quantity is required")
                    .positive("Must be positive")
                    .typeError("Must be a number"),
                inspectionDate: Yup.date().required("Inspection Date is required"),
                checkNumber: Yup.string().required("Check Number is required"),
                materialRequestNo: Yup.string(),
            }),
            // Step 1: Quality Check Details
            Yup.object({
                checkDetails: Yup.array().of(
                    Yup.lazy(() => {
                        const shape = {
                            parameters: Yup.string().required("Parameters required"),
                            specification: Yup.string().required("Specification required"),
                            method: Yup.string().required("Method required"),
                            remarks: Yup.string(),
                        };
                        observationColumns.forEach((col) => {
                            shape[col.id] = Yup.string().required("Observation required");
                        });
                        return Yup.object(shape);
                    })
                ).min(1, "At least one row required"),
            }),
            // Step 2: Summary & Approval
            Yup.object({
                acceptedQuantity: Yup.number()
                    .required("Accepted Qty required")
                    .min(0, "Cannot be negative")
                    .typeError("Must be a number"),
                rejectedQuantity: Yup.number()
                    .required("Rejected Qty required")
                    .min(0, "Cannot be negative")
                    .typeError("Must be a number"),
                holdScrapQuantity: Yup.number()
                    .required("Hold/Scrap Qty required")
                    .min(0, "Cannot be negative")
                    .typeError("Must be a number"),
                other: Yup.number()
                    .min(0, "Cannot be negative")
                    .typeError("Must be a number")
                    .nullable(),
                comments: Yup.string().nullable(),
                updatedBy: Yup.object({
                    name: Yup.string().required("Name is required"),
                    date: Yup.date().required("Date is required"),
                }),
                approvedBy: Yup.object({
                    name: userRole === 'admin'
                        ? Yup.string().required("Name is required")
                        : Yup.string().nullable(),
                    date: userRole === 'admin'
                        ? Yup.date().required("Date is required")
                        : Yup.date().nullable(),
                }),
            }),
        ];
        return schemas[step];
    };

    const formik = useFormik({
        initialValues: {
            productName: "",
            qualityStandard: "",
            checkedQuantity: "",
            inspectionDate: "",
            checkNumber: "",
            materialRequestNo: "",
            checkDetails: [
                {
                    id: 1,
                    parameters: "",
                    specification: "",
                    method: "",
                    observation: "",
                    remarks: "",
                },
            ],
            acceptedQuantity: "",
            rejectedQuantity: "",
            holdScrapQuantity: "",
            other: "",
            comments: "",
            updatedBy: { name: "", date: "" },
            approvedBy: { name: "", date: "" },
        },
        validationSchema: getValidationSchema(activeStep, user?.role),
        onSubmit: async (values) => {
            setShowPreview(true);
        },
    });

    const handleFinalSubmit = async () => {
        try {
            setSubmitting(true);
            setShowPreview(false);
            const values = formik.values;
            const formData = {
                ...values,
                approval: {
                    updatedByName: values.updatedBy.name,
                    updatedByDate: values.updatedBy.date,
                    approvedByName: values.approvedBy.name,
                    approvedByDate: values.approvedBy.date,
                },
                id: id,
                status: (user?.role === 'hr' && !values.approvedBy.name) ? "Pending Approval" : "Completed",
                updatedAt: new Date().toISOString()
            };

            await axiosInstance.put(`/quality-inspection/${id}`, formData);
            showNotification("Quality Check updated successfully!", "success");
            router.push("/production-inspection");
        } catch (error) {
            console.error("Error updating quality check:", error);
            showNotification("Failed to update quality check.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchMaterialRequests = async () => {
            try {
                const response = await axiosInstance.get("/material-issue");
                setMaterialRequests(response.data);
            } catch (error) {
                console.error("Error fetching material requests:", error);
            }
        };
        fetchMaterialRequests();
    }, []);

    useEffect(() => {
        const fetchInspection = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/quality-inspection?id=${id}`);
                let data = response.data;
                if (Array.isArray(data)) {
                    data = data.find(i => i.id == id) || data[0];
                }

                if (data) {
                    if (data.checkDetails && data.checkDetails.length > 0) {
                        const firstRow = data.checkDetails[0];
                        const customCols = Object.keys(firstRow).filter(k =>
                            k.startsWith('observation_') || (k === 'observation' && !observationColumns.find(c => c.id === 'observation'))
                        );

                        if (customCols.length > 0) {
                            const newCols = customCols.map(id => ({
                                id,
                                label: id === 'observation' ? 'Observation' : `Observation ${id.split('_')[1]}`
                            }));
                            setObservationColumns(newCols);
                        }
                    }

                    formik.setValues({
                        productName: data.productName || "",
                        qualityStandard: data.qualityStandard || "",
                        checkedQuantity: data.checkedQuantity || "",
                        inspectionDate: data.inspectionDate || "",
                        checkNumber: data.checkNumber || "",
                        materialRequestNo: data.materialRequestNo || "",
                        checkDetails: data.checkDetails || [
                            {
                                id: 1,
                                parameters: "",
                                specification: "",
                                method: "",
                                observation: "",
                                remarks: "",
                            },
                        ],
                        acceptedQuantity: data.acceptedQuantity || "",
                        rejectedQuantity: data.rejectedQuantity || "",
                        holdScrapQuantity: data.holdScrapQuantity || "",
                        other: data.other || "",
                        comments: data.comments || "",
                        updatedBy: {
                            name: data.approval?.updatedByName || "",
                            date: data.approval?.updatedByDate || ""
                        },
                        approvedBy: {
                            name: data.approval?.approvedByName || "",
                            date: data.approval?.approvedByDate || ""
                        },
                    });
                }
            } catch (error) {
                console.error("Error fetching inspection details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInspection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleMaterialRequestChange = (requestNo) => {
        formik.setFieldValue("materialRequestNo", requestNo);
        if (!requestNo) {
            formik.setFieldValue("productName", "");
            formik.setFieldValue("checkedQuantity", "");
            return;
        }
        const selected = materialRequests.find(r => r.requestNo === requestNo);
        if (selected) {
            formik.setFieldValue("productName", selected.productName || selected.product || "");
            formik.setFieldValue("checkedQuantity", selected.requiredQty || selected.qty || "");
        }
    };

    const handleNext = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setActiveStep((prev) => prev + 1);
        } else {
            const touched = Object.keys(errors).reduce((acc, key) => {
                if (key === 'checkDetails') {
                    acc[key] = formik.values.checkDetails.map(row =>
                        Object.keys(row).reduce((rAcc, rKey) => ({ ...rAcc, [rKey]: true }), {})
                    );
                } else {
                    acc[key] = true;
                }
                return acc;
            }, {});
            formik.setTouched(touched);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const addRow = () => {
        const newId = Math.max(...formik.values.checkDetails.map((r) => r.id), 0) + 1;
        const newRow = {
            id: newId,
            parameters: "",
            specification: "",
            method: "",
            remarks: "",
        };
        observationColumns.forEach(col => {
            newRow[col.id] = "";
        });
        formik.setFieldValue("checkDetails", [...formik.values.checkDetails, newRow]);
    };

    const deleteRow = (id) => {
        if (formik.values.checkDetails.length > 1) {
            formik.setFieldValue("checkDetails", formik.values.checkDetails.filter((row) => row.id !== id));
        }
    };

    const addObservationColumn = () => {
        const nextColNum = observationColumns.length + 1;
        const newColId = `observation_${nextColNum}`;
        setObservationColumns([
            ...observationColumns,
            { id: newColId, label: `Observation ${nextColNum}` },
        ]);

        const updatedDetails = formik.values.checkDetails.map(row => ({
            ...row,
            [newColId]: ""
        }));
        formik.setFieldValue("checkDetails", updatedDetails);
    };

    const removeObservationColumn = (colId) => {
        if (observationColumns.length > 1) {
            setObservationColumns(observationColumns.filter((col) => col.id !== colId));
            const updatedDetails = formik.values.checkDetails.map((row) => {
                const newRow = { ...row };
                delete newRow[colId];
                return newRow;
            });
            formik.setFieldValue("checkDetails", updatedDetails);
        }
    };

    if (loading) return <Loader fullPage message="Loading Inspection Details..." />;

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <ProductDetailsSection
                        data={formik.values}
                        onChange={(field, val) => formik.setFieldValue(field, val)}
                        materialRequests={materialRequests}
                        onRequestChange={handleMaterialRequestChange}
                        isEdit={true}
                        formik={formik}
                    />
                );
            case 1:
                return (
                    <QualityCheckDetailsTable
                        data={formik.values.checkDetails}
                        onAddRow={addRow}
                        onDelete={deleteRow}
                        onChange={(id, field, val) => {
                            const newDetails = formik.values.checkDetails.map((row) =>
                                row.id === id ? { ...row, [field]: val } : row
                            );
                            formik.setFieldValue("checkDetails", newDetails);
                        }}
                        formik={formik}
                        observationColumns={observationColumns}
                        onAddColumn={addObservationColumn}
                        onRemoveColumn={removeObservationColumn}
                    />
                );
            case 2:
                return (
                    <Grid container spacing={1}>
                        <Grid item size={{ xs: 12, md: user?.role === 'admin' ? 12 : 8 }}>
                            <InspectionSummarySection
                                data={formik.values}
                                onChange={(field, val) => formik.setFieldValue(field, val)}
                                formik={formik}
                            />
                        </Grid>
                        <Grid item size={{ xs: 12, md: user?.role === 'admin' ? 12 : 4 }}>
                            <InspectionApproval
                                approvalData={{
                                    updatedByName: formik.values.updatedBy.name,
                                    updatedByDate: formik.values.updatedBy.date,
                                    approvedByName: formik.values.approvedBy.name,
                                    approvedByDate: formik.values.approvedBy.date,
                                }}
                                onChange={(section, field, val) => {
                                    formik.setFieldValue(`${section}.${field}`, val);
                                }}
                                errors={formik.errors}
                                touched={formik.touched}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };

    return (
        <Box>
            <CommonCard title="Edit Quality Check">
                <Box sx={{ p: 1 }}>
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
                            mb: 4,
                            "& .MuiStepLabel-label": { fontWeight: 500 },
                            "& .MuiStepLabel-label.Mui-active": { color: "#1172ba", fontWeight: 600 },
                            "& .MuiStepLabel-label.Mui-completed": { color: "#1172ba", fontWeight: 600 },
                            "& .MuiStepIcon-root.Mui-active": { color: "#1172ba" },
                            "& .MuiStepIcon-root.Mui-completed": { color: "#1172ba" },
                        }}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box>{renderStepContent(activeStep)}</Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 4,
                            pt: 3,
                            borderTop: "1px solid #e2e8f0",
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                visibility: activeStep === 0 ? "hidden" : "visible",
                            }}
                        >
                            Previous
                        </Button>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<Visibility />}
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        px: 4,
                                        color: "#475569",
                                        borderColor: "#e2e8f0",
                                        "&:hover": { borderColor: "#cbd5e1" },
                                    }}
                                >
                                    Preview & Update
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                    onClick={handleNext}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        px: 4,
                                        backgroundColor: "#1172ba",
                                        "&:hover": { backgroundColor: "#0d5a94" },
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </CommonCard>

            <ProductionInspectionPreviewDialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={handleFinalSubmit}
                values={formik.values}
                loading={submitting}
                observationColumns={observationColumns}
            />
        </Box>
    );
}

export default function EditInspectionPage() {
    return (
        <Suspense fallback={<Loader fullPage />}>
            <EditInspectionContent />
        </Suspense>
    );
}
