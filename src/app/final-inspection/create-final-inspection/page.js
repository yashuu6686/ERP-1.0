"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import Assignment from "@mui/icons-material/Assignment";
import Save from "@mui/icons-material/Save";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import CheckCircle from "@mui/icons-material/CheckCircle";
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
      <Box sx={{ p: 1 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{
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
        }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={0}
          sx={{
            //   p: 3,
            // minHeight: "400px",
            bgcolor: "#fff",
            borderRadius: 3,
            // border: "1px dashed #e2e8f0",
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
                  borderRadius: 2,
                  bgcolor: "#1172ba",
                  textTransform: "none",
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



" ✓ Compiled /final-inspection/create-final-inspection in 1139ms (2902 modules)"