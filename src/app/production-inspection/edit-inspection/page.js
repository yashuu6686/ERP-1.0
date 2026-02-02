"use client";
import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Save from "@mui/icons-material/Save";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import ProductDetailsSection from "../after-production-quality-check/components/ProductDetailsSection";
import QualityCheckDetailsTable from "../after-production-quality-check/components/QualityCheckDetailsTable";
import InspectionSummarySection from "../after-production-quality-check/components/InspectionSummarySection";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "@/components/Loader";

const steps = [
    "Product Details",
    "Quality Check Details",
    "Summary & Approval",
];

function EditInspectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true);

    const [productDetails, setProductDetails] = useState({
        productName: "",
        qualityStandard: "",
        checkedQuantity: "",
        inspectionDate: "",
        checkNumber: "",
    });

    const [checkDetails, setCheckDetails] = useState([
        {
            id: 1,
            parameters: "",
            specification: "",
            method: "",
            observation: "",
            remarks: "",
        },
    ]);

    const [inspectionSummary, setInspectionSummary] = useState({
        acceptedQuantity: "",
        rejectedQuantity: "",
        holdScrapQuantity: "",
        other: "",
        comments: "",
    });

    const [approval, setApproval] = useState({
        updatedByName: "",
        updatedByDate: "",
        approvedByName: "",
        approvedByDate: "",
    });

    const [materialRequests, setMaterialRequests] = useState([]);

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
                const response = await axiosInstance.get(`/quality-inspection?id=${id}`); // Or direct /quality-inspection/id
                // JSON server might return array for query param, or object for direct id.
                // Assuming we get the object or find it
                let data = response.data;
                if (Array.isArray(data)) {
                    data = data.find(i => i.id == id) || data[0];
                }

                if (data) {
                    setProductDetails({
                        productName: data.productName || "",
                        qualityStandard: data.qualityStandard || "",
                        checkedQuantity: data.checkedQuantity || "",
                        inspectionDate: data.inspectionDate || "",
                        checkNumber: data.checkNumber || "",
                        materialRequestNo: data.materialRequestNo || "",
                    });
                    if (data.checkDetails) setCheckDetails(data.checkDetails);
                    setInspectionSummary({
                        acceptedQuantity: data.acceptedQuantity || "",
                        rejectedQuantity: data.rejectedQuantity || "",
                        holdScrapQuantity: data.holdScrapQuantity || "",
                        other: data.other || "",
                        comments: data.comments || "",
                    });
                    if (data.approval) setApproval(data.approval);
                }
            } catch (error) {
                console.error("Error fetching inspection details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInspection();
    }, [id]);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleProductDetailsChange = (field, value) => {
        setProductDetails((prev) => ({ ...prev, [field]: value }));
    };

    const handleMaterialRequestChange = (requestNo) => {
        const selected = materialRequests.find(r => r.requestNo === requestNo);
        if (selected) {
            setProductDetails(prev => ({
                ...prev,
                materialRequestNo: requestNo,
                productName: selected.productName || selected.product || "",
                checkedQuantity: selected.requiredQty || selected.qty || "",
            }));
        } else {
            setProductDetails(prev => ({ ...prev, materialRequestNo: requestNo }));
        }
    };

    const handleCheckDetailsChange = (id, field, value) => {
        setCheckDetails((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const addRow = () => {
        const newId = Math.max(...checkDetails.map((r) => r.id), 0) + 1;
        setCheckDetails((prev) => [
            ...prev,
            {
                id: newId,
                parameters: "",
                specification: "",
                method: "",
                observation: "",
                remarks: "",
            },
        ]);
    };

    const deleteRow = (id) => {
        if (checkDetails.length > 1) {
            setCheckDetails((prev) => prev.filter((row) => row.id !== id));
        }
    };

    const handleInspectionSummaryChange = (field, value) => {
        setInspectionSummary((prev) => ({ ...prev, [field]: value }));
    };

    const handleApprovalChange = (section, field, value) => {
        const key = `${section}${field.charAt(0).toUpperCase() + field.slice(1)}`;
        setApproval((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        try {
            const formData = {
                ...productDetails,
                checkDetails,
                ...inspectionSummary,
                approval,
                id: id, // Ensure ID is preserved
                status: "Completed",
                updatedAt: new Date().toISOString()
            };

            console.log("Updating Quality Check:", formData);
            await axiosInstance.put(`/quality-inspection/${id}`, formData);
            alert("Quality Check updated successfully!");
            router.push("/production-inspection");
        } catch (error) {
            console.error("Error updating quality check:", error);
            alert("Failed to update quality check.");
        }
    };

    if (loading) return <Loader fullPage message="Loading Inspection Details..." />;

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <ProductDetailsSection
                        data={productDetails}
                        onChange={handleProductDetailsChange}
                        materialRequests={materialRequests}
                        onRequestChange={handleMaterialRequestChange}
                        isEdit={true}
                    />
                );
            case 1:
                return (
                    <QualityCheckDetailsTable
                        data={checkDetails}
                        onAdd={addRow}
                        onDelete={deleteRow}
                        onChange={handleCheckDetailsChange}
                    />
                );
            case 2:
                return (
                    <>
                        <InspectionSummarySection
                            data={inspectionSummary}
                            onChange={handleInspectionSummaryChange}
                        />
                        <InspectionApproval approvalData={approval} onChange={handleApprovalChange} />
                    </>
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
                                    variant="contained"
                                    size="large"
                                    startIcon={<CheckCircle />}
                                    onClick={handleSubmit}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        px: 4,
                                        backgroundColor: "#1172ba",
                                        "&:hover": { backgroundColor: "#0d5a94" },
                                    }}
                                >
                                    Update Quality Check
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
