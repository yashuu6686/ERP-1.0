"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Save as SaveIcon,
  Science as ScienceIcon,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import InspectionObservations from "@/components/inspection/InspectionObservations";
import InspectionSummary from "@/components/inspection/InspectionSummary";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import MaterialInformation from "./components/MaterialInformation";
import VerificationChecks from "./components/VerificationChecks";

const steps = [
  "Material Information & Verification",
  "Observations",
  "Summary & Approval",
];

export default function MaterialInspectionForm() {
  const [activeStep, setActiveStep] = useState(0);

  const [observations, setObservations] = useState([
    {
      id: 1,
      parameter: "",
      specification: "",
      method: "",
      observation: "",
      remarks: "",
    },
  ]);
  const [observationColumns, setObservationColumns] = useState([
    { id: "observation", label: "Observation" },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [summaryData, setSummaryData] = useState({
    acceptedQuantity: "",
    rejectedQuantity: "",
    holdScrapQuantity: "",
    other: "",
    comments: "",
  });
  const [approvalData, setApprovalData] = useState({
    updatedByName: "",
    updatedByDate: "",
    approvedByName: "",
    approvedByDate: "",
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSummaryChange = (field, value) => {
    setSummaryData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApprovalChange = (section, field, value) => {
    const key = `${section}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    setApprovalData((prev) => ({ ...prev, [key]: value }));
  };

  const addObservation = () => {
    const nextId =
      observations.length > 0
        ? Math.max(...observations.map((o) => o.id)) + 1
        : 1;
    const newObservation = {
      id: nextId,
      parameter: "",
      specification: "",
      method: "",
      remarks: "",
    };
    observationColumns.forEach((col) => {
      newObservation[col.id] = "";
    });

    setObservations([...observations, newObservation]);
  };

  const addObservationColumn = () => {
    const nextColNum = observationColumns.length + 1;
    const newColId = `observation_${nextColNum}`;
    setObservationColumns([
      ...observationColumns,
      { id: newColId, label: `Observation ${nextColNum}` },
    ]);
  };

  const removeObservation = (id) => {
    if (observations.length > 1) {
      setObservations(observations.filter((obs) => obs.id !== id));
    }
  };

  const handleObservationChange = (id, field, value) => {
    setObservations(
      observations.map((obs) =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    alert("Inspection Submitted Successfully!");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <MaterialInformation />
            <VerificationChecks />
          </>
        );
      case 1:
        return (
          <InspectionObservations
            observations={observations}
            observationColumns={observationColumns}
            onAdd={addObservation}
            onAddColumn={addObservationColumn}
            onRemove={removeObservation}
            onChange={handleObservationChange}
            icon={ScienceIcon}
          />
        );
      case 2:
        return (
          <>
            <InspectionSummary
              summaryData={summaryData}
              onChange={handleSummaryChange}
            />
            <InspectionApproval
              approvalData={approvalData}
              onChange={handleApprovalChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <CommonCard title="Material Inspection">
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
                color: "#10b981",
                fontWeight: 600,
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: "#1172ba",
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: "#10b981",
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
                  startIcon={<CheckCircleIcon />}
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#1172ba",
                    "&:hover": { backgroundColor: "#0d5a94" },
                  }}
                >
                  Submit Inspection
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
