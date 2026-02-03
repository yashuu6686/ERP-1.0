"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import SignaturesApprovalSection from "../../../components/inspection/InspectionApproval";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
import { ArrowBack } from "@mui/icons-material";
import InspectionSummary from "@/components/inspection/InspectionSummary";
import { Grid } from "@mui/material";

const steps = [
  "General Information",
  "Observations",
  "Quality Details & Checklist",
  "Final Approval",
];

function FinalInspectionFormContent() {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    inspectionStatus: "Approved", // Default status
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
    updatedBySignature: "",
    updatedByDate: new Date().toISOString().split("T")[0],
    problemReport: "no",
    problemDescription: "",
    problemActionTaken: "",
    aqd: "no",
    aqdDescription: "",
    actionItemsDescription: "",
    actionItemsFinishDate: "",
    checklist: {
      labelAttached: false,
      packagingProof: false,
      finalTestDone: false,
    },
    observationColumns: [{ id: "observation", label: "Observation" }],
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

  const addObservationColumn = () => {
    const newColId = `observation_${formData.observationColumns.length + 1}`;
    const newColLabel = `Obs ${formData.observationColumns.length + 1}`;

    setFormData(prev => ({
      ...prev,
      observationColumns: [...prev.observationColumns, { id: newColId, label: newColLabel }],
      observations: prev.observations.map(obs => ({ ...obs, [newColId]: "" }))
    }));
  };

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/final-inspections/${id}`);
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching inspection:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInspection();
    }
  }, [id]);

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
      setLoading(true);
      const isHR = user?.role === 'hr';
      const status = isHR ? "Pending Approval" : "Approved";

      const payload = {
        ...formData,
        inspectionStatus: status,
        inspectionNo: formData.inspectionNo || `FIN-INS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      };

      let response;
      if (id) {
        response = await axiosInstance.put(`/final-inspections/${id}`, payload);
      } else {
        response = await axiosInstance.post("/final-inspections", payload);
      }

      if (isHR && (response.status === 201 || response.status === 200)) {
        await NotificationService.createNotification({
          title: "Final Inspection Approval Required",
          message: `HR ${user.name} has submitted a final inspection for ${formData.productName || 'a product'} (Report: ${payload.inspectionNo}).`,
          targetRole: "admin",
          type: "final_inspection_approval",
          link: `/final-inspection/view-final-inspection?id=${id || response.data.id}`,
          inspectionId: id || response.data.id
        });
      }

      alert(`Inspection ${id ? "Updated" : "Submitted"} Successfully!`);
      router.push("/final-inspection");
    } catch (error) {
      console.error("Error saving inspection:", error);
      alert("Failed to save inspection.");
    } finally {
      setLoading(false);
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
            observationColumns={formData.observationColumns}
            onAdd={addObservation}
            onAddColumn={addObservationColumn}
            onRemove={removeObservation}
            onChange={handleObservationChange}
            icon={Assignment}
          />
        );
      case 2:
        return (
          <>
            <ProblemReportAQDSection
              formData={formData}
              onChange={handleInputChange}
            />
            <Box sx={{ mt: 3 }}>
              <ActionChecklistSection
                formData={formData}
                onChange={handleInputChange}
              />
            </Box>
            {user?.role === 'admin' && (
              <Box sx={{ mt: 3 }}>
                <ApprovalCommentsSection
                  value={formData.remarks}
                  onChange={(val) => handleInputChange("remarks", val)}
                />
              </Box>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Grid container spacing={2}>
              <Grid size={{ md: 8 }}>
                <InspectionSummary
                  formData={formData}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ md: 4 }}>
                <SignaturesApprovalSection
                  formData={formData}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  if (loading) return <Loader fullPage message="Processing..." />;

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