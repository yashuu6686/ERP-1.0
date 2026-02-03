"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CheckCircle from "@mui/icons-material/CheckCircle";
import Save from "@mui/icons-material/Save";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import ProductDetailsSection from "./components/ProductDetailsSection";
import QualityCheckDetailsTable from "./components/QualityCheckDetailsTable";
import InspectionSummarySection from "./components/InspectionSummarySection";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";

const steps = [
  "Product Details",
  "Quality Check Details",
  "Summary & Approval",
];

export default function QualityCheckForm() {
  const router = useRouter();
  const { user } = useAuth();
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
        // Add other fields if mapping exists
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
    // section is "updatedBy" or "approvedBy"
    // field is "name" or "date"
    // key becomes "updatedByName", "approvedByDate", etc.
    const key = `${section}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    setApproval((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const isHR = user?.role === 'hr';
      const status = isHR ? "Pending Approval" : "Completed";

      const formData = {
        ...productDetails,
        checkDetails,
        ...inspectionSummary,
        approval,
        id: `QC-${Math.floor(Math.random() * 10000)}`,
        status: status,
        createdAt: new Date().toISOString()
      };

      console.log("Submitting Quality Check:", formData);
      const response = await axiosInstance.post("/quality-inspection", formData);

      if (isHR && (response.status === 201 || response.status === 200)) {
        await NotificationService.createNotification({
          title: "Production Inspection Approval Required",
          message: `HR ${user.name} has submitted a production inspection for ${productDetails.productName || 'a product'} (Report: ${formData.id}).`,
          targetRole: "admin",
          type: "production_inspection_approval",
          link: `/production-inspection/view-inspection?id=${formData.id}`,
          inspectionId: formData.id
        });
      }

      // Create Batch Entry
      try {
        const batchData = {
          batchNo: `BAT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
          requestNo: productDetails.materialRequestNo || "N/A",
          checkNo: productDetails.checkNumber || "-",
          productSr: "From 001 to " + (inspectionSummary.acceptedQuantity || "000"),
          acceptedQty: inspectionSummary.acceptedQuantity || 0,
          status: "Ready",
          inspectionId: formData.id,
          date: new Date().toISOString(),
          qualityCheck: checkDetails,
          summary: inspectionSummary
        };
        await axiosInstance.post("/batches", batchData);
        console.log("Batch created successfully:", batchData);
      } catch (batchError) {
        console.error("Error creating batch:", batchError);
        // We don't block the main flow if batch creation fails, but good to note
      }

      alert("Quality Check submitted successfully!");
      router.push("/production-inspection");
    } catch (error) {
      console.error("Error submitting quality check:", error);
      alert("Failed to save quality check. Make sure '/quality-inspection' endpoint exists in your server.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProductDetailsSection
            data={productDetails}
            onChange={handleProductDetailsChange}
            materialRequests={materialRequests}
            onRequestChange={handleMaterialRequestChange}
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
          <Box >{renderStepContent(activeStep)}</Box>

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
