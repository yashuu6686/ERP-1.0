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
import CommonCard from "../../../components/CommonCard";
import InspectionObservations from "../../../components/inspection/InspectionObservations";
import ProductInformationSection from "./components/ProductInformationSection";
import ProblemReportAQDSection from "./components/ProblemReportAQDSection";
import ActionChecklistSection from "./components/ActionChecklistSection";
import ApprovalCommentsSection from "./components/ApprovalCommentsSection";
import SignaturesApprovalSection from "./components/SignaturesApprovalSection";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import { Suspense, useEffect } from "react";

const steps = [
  "General Information",
  "Observations",
  "Quality Details & Checklist",
  "Final Approval",
];

function FinalInspectionFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    inspectionNo: "",
    productName: "",
    inspectionStdNo: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
    serialFrom: "",
    serialTo: "",
    totalChecked: "",
    approved: "",
    rejected: "",
    result: "Pass",
    remarks: "",
    approvedBy: "",
    approvalDate: new Date().toISOString().split("T")[0],
    observations: [
      {
        id: 1,
        parameter: "",
        specification: "",
        method: "",
        observation: "",
        remarks: "",
      },
    ],
  });

  const [problemReport, setProblemReport] = useState("no");
  const [aqd, setAqd] = useState("no");

  useEffect(() => {
    if (id) {
      fetchInspection();
    }
  }, [id]);

  const fetchInspection = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/final-inspections/${id}`);
      if (response.data) {
        setFormData(response.data);
        if (response.data.observations) {
          setObservations(response.data.observations);
        }
      }
    } catch (error) {
      console.error("Error fetching inspection:", error);
    } finally {
      setLoading(false);
    }
  };

  const setObservations = (obs) => {
    setFormData(prev => ({ ...prev, observations: obs }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addObservation = () => {
    setObservations([
      ...formData.observations,
      {
        id: Date.now(),
        parameter: "",
        specification: "",
        method: "",
        observation: "",
        remarks: "",
      },
    ]);
  };

  const removeObservation = (id) => {
    if (formData.observations.length > 1) {
      setObservations(formData.observations.filter((obs) => obs.id !== id));
    }
  };

  const handleObservationChange = (id, field, value) => {
    setObservations(
      formData.observations.map((obs) =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  };

  const handleSave = async () => {
    try {
      if (id) {
        await axiosInstance.put(`/final-inspections/${id}`, formData);
      } else {
        const payload = {
          ...formData,
          inspectionNo: formData.inspectionNo || `FIN-INS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        };
        await axiosInstance.post("/final-inspections", payload);
      }
      router.push("/final-inspection");
    } catch (error) {
      console.error("Error saving inspection:", error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProductInformationSection formData={formData} onChange={handleInputChange} />;
      case 1:
        return (
          <InspectionObservations
            observations={formData.observations}
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
              <ApprovalCommentsSection
                value={formData.remarks}
                onChange={(val) => handleInputChange("remarks", val)}
              />
            </Box>
          </>
        );
      case 3:
        return (
          <SignaturesApprovalSection
            formData={formData}
            onChange={handleInputChange}
          />
        );
      default:
        return "Unknown step";
    }
  };

  if (loading) return <Loader fullPage message="Fetching Details..." />;

  return (
    <CommonCard title={id ? "Edit Final Inspection" : "Final Inspection Verification"}>
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
                <Typography variant="body2" fontWeight={700}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper elevation={0} sx={{ bgcolor: "#fff", borderRadius: 3 }}>
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
              py: 1.2,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
              color: "#64748b",
              "&:hover": { bgcolor: "#f1f5f9" }
            }}
          >
            Back
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => router.push("/final-inspection")}
              sx={{
                px: 4,
                py: 1.2,
                fontWeight: 700,
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
                startIcon={<Save />}
                sx={{
                  px: 6,
                  py: 1.2,
                  fontWeight: 700,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)",
                }}
                onClick={handleSave}
              >
                {id ? "Update Inspection" : "Complete Verification"}
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<NavigateNext />}
                sx={{
                  px: 6,
                  py: 1.2,
                  fontWeight: 700,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
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

export default function FinalInspectionForm() {
  return (
    <Suspense fallback={<Loader fullPage message="Loading..." />}>
      <FinalInspectionFormContent />
    </Suspense>
  );
}



" ✓ Compiled /final-inspection/create-final-inspection in 1139ms (2902 modules)"