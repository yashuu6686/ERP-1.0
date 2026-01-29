"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import {
  Assignment,
  Save,
  NavigateNext,
  NavigateBefore,
  CheckCircle,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import InspectionObservations from "../../../components/inspection/InspectionObservations";
import ProductInformationSection from "./components/ProductInformationSection";
import ProblemReportAQDSection from "./components/ProblemReportAQDSection";
import ActionChecklistSection from "./components/ActionChecklistSection";
import ApprovalCommentsSection from "./components/ApprovalCommentsSection";
import SignaturesApprovalSection from "./components/SignaturesApprovalSection";

const steps = [
  "General Information",
  "Observations",
  "Quality Details & Checklist",
  "Final Approval",
];

export default function FinalInspectionForm() {
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

  const [problemReport, setProblemReport] = useState("no");
  const [aqd, setAqd] = useState("no");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addObservation = () => {
    setObservations([
      ...observations,
      {
        id: observations.length + 1,
        parameter: "",
        specification: "",
        method: "",
        observation: "",
        remarks: "",
      },
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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProductInformationSection />;
      case 1:
        return (
          <InspectionObservations
            observations={observations}
            onAdd={addObservation}
            onRemove={removeObservation}
            onChange={handleObservationChange}
            icon={Assignment}
          />
        );
      case 2:
        return (
          <>
            <ProblemReportAQDSection
              problemReport={problemReport}
              setProblemReport={setProblemReport}
              aqd={aqd}
              setAqd={setAqd}
            />
            <Box sx={{ mt: 3 }}>
              <ActionChecklistSection />
            </Box>
            <Box sx={{ mt: 3 }}>
              <ApprovalCommentsSection />
            </Box>
          </>
        );
      case 3:
        return <SignaturesApprovalSection />;
      default:
        return "Unknown step";
    }
  };

  return (
    <CommonCard title="Final Inspection Verification">
      <Box sx={{ p: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="caption" fontWeight={600}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            minHeight: "400px",
            bgcolor: "#fff",
            borderRadius: 3,
            border: "1px dashed #e2e8f0",
          }}
        >
          {getStepContent(activeStep)}
        </Paper>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<NavigateBefore />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Back
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                borderColor: "#e2e8f0",
                color: "#64748b",
              }}
            >
              Cancel
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<CheckCircle />}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: 2,
                  bgcolor: "#22c55e",
                  "&:hover": { bgcolor: "#16a34a" },
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2)",
                }}
                onClick={() => alert("Inspection Submitted Successfully!")}
              >
                Complete Verification
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                endIcon={<NavigateNext />}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: 2,
                  bgcolor: "#1172ba",
                  "&:hover": { bgcolor: "#0d5a94" },
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)",
                }}
                onClick={handleNext}
              >
                Next Step
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </CommonCard>
  );
}
