"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  CheckCircle,
  Save,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import ProductDetailsSection from "./components/ProductDetailsSection";
import QualityCheckDetailsTable from "./components/QualityCheckDetailsTable";
import InspectionSummarySection from "./components/InspectionSummarySection";
import InspectionApproval from "@/components/inspection/InspectionApproval";

const steps = [
  "Product Details",
  "Quality Check Details",
  "Summary & Approval",
];

export default function QualityCheckForm() {
  const [activeStep, setActiveStep] = useState(0);

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
    reviewedBy: "",
    reviewedDate: "",
    approvedBy: "",
    approvedDate: "",
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleProductDetailsChange = (field, value) => {
    setProductDetails((prev) => ({ ...prev, [field]: value }));
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

  const handleApprovalChange = (field, value) => {
    setApproval((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const formData = {
      productDetails,
      checkDetails,
      inspectionSummary,
      approval,
    };
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProductDetailsSection
            data={productDetails}
            onChange={handleProductDetailsChange}
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
            <InspectionApproval data={approval} onChange={handleApprovalChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <CommonCard title="New After Production Quality Check">
        <Box sx={{ p: 1 }}>
          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                fontWeight: 500,
              },
              "& .MuiStepLabel-label.Mui-active": {
                color: "#1172ba",
                fontWeight: 600,
              },
              "& .MuiStepLabel-label.Mui-completed": {
                color: "#1172ba",
                fontWeight: 600,
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: "#1172ba",
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: "#1172ba",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ minHeight: 400 }}>{renderStepContent(activeStep)}</Box>

          {/* Navigation Buttons */}
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
                  Submit Quality Check
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
