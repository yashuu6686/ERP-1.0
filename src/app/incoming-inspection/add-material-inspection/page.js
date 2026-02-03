"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import ScienceIcon from "@mui/icons-material/Science";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CommonCard from "../../../components/CommonCard";
import InspectionObservations from "@/components/inspection/InspectionObservations";
import InspectionSummary from "@/components/inspection/InspectionSummary";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import MaterialInformation from "./components/MaterialInformation";
import VerificationChecks from "./components/VerificationChecks";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
import { Grid } from "@mui/material";

const steps = [
  "Material Information & Verification",
  "Observations",
  "Summary & Approval",
];

function MaterialInspectionFormContent() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pendingGRNs, setPendingGRNs] = useState([]);
  const [selectedGRN, setSelectedGRN] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = !!id;

  const [materialData, setMaterialData] = useState({
    grnNumber: "",
    poNumber: "",
    materialName: "",
    receivedDate: "",
    invoiceNumber: "",
    lotNumber: "",
    inspectionStandardNumber: "",
    supplierName: "",
    lotQuantity: "",
    equipmentId: "",
    sampleSize: "",
    inspectionReportNumber: "",
    inspectionDate: new Date().toISOString().split("T")[0],
    inspectionStandard: "",
    toolsUsed: "",
    sdsAvailable: "",
    qualityCertificate: "",
  });

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

  useEffect(() => {
    const fetchPendingGRNs = async (currentGrnNumber = null) => {
      try {
        const response = await axiosInstance.get("/grn");
        const targetGrn = currentGrnNumber || materialData.grnNumber;
        const pending = (response.data || []).filter(g =>
          g.inspectionStatus === "Pending" || (isEditMode && targetGrn === g.grnNumber)
        );
        setPendingGRNs(pending);
      } catch (error) {
        console.error("Error fetching GRNs:", error);
      }
    };

    const fetchInspectionData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/incoming-inspection/${id}`);
        const data = response.data;
        if (data) {
          // 1. Fetch all GRNs to find the matching one
          const grnResponse = await axiosInstance.get("/grn");
          const allGRNs = grnResponse.data || [];
          const matchingGRN = allGRNs.find(g => g.grnNumber === data.materialData.grnNumber);

          if (matchingGRN) setSelectedGRN(matchingGRN);

          // 2. Flatten and merge data, using matchingGRN as a fallback for missing fields
          const materialDataLoaded = {
            ...data.materialData,
            poNumber: data.materialData.poNumber || matchingGRN?.poNumber || "",
            materialName: data.materialData.materialName || matchingGRN?.items?.[0]?.name || "",
            supplierName: data.materialData.supplierName || matchingGRN?.supplierName || "",
            ...(data.materialData.verificationChecks || {})
          };

          setMaterialData(materialDataLoaded);
          setObservations(data.observations || []);
          setSummaryData(data.summaryData);
          setApprovalData(data.approvalData);

          // Update observation columns if dynamic ones exist
          if (data.observations?.length > 0) {
            const firstObs = data.observations[0];
            const dynamicKeys = Object.keys(firstObs).filter(k => k.startsWith("observation_"));
            if (dynamicKeys.length > 0) {
              const newCols = dynamicKeys.map(k => ({
                id: k,
                label: `Observation ${k.split("_")[1]}`
              }));
              const allCols = [{ id: "observation", label: "Observation" }, ...newCols];
              // Remove duplicates just in case
              const uniqueCols = Array.from(new Map(allCols.map(c => [c.id, c])).values());
              setObservationColumns(uniqueCols);
            }
          }

          // Re-fetch pending GRNs lists for the dropdown
          fetchPendingGRNs(data.materialData.grnNumber);
        }
      } catch (error) {
        console.error("Error fetching inspection data:", error);
        alert("Failed to load inspection data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingGRNs();
    if (isEditMode) {
      fetchInspectionData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  const handleGRNChange = (event, newValue) => {
    setSelectedGRN(newValue);
    if (newValue) {
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      const reportNum = `IRN-${year}${month}-${random}`;

      setMaterialData({
        ...materialData,
        grnNumber: newValue.grnNumber || "",
        poNumber: newValue.poNumber || "",
        materialName: newValue.items?.[0]?.name || "",
        receivedDate: newValue.receivedDate ? newValue.receivedDate.split("T")[0] : "",
        invoiceNumber: newValue.invoiceNumber || "",
        supplierName: newValue.supplierName || "",
        lotQuantity: newValue.items?.[0]?.receivedQty || "",
        inspectionReportNumber: reportNum,
      });
    } else {
      setMaterialData({
        ...materialData,
        grnNumber: "",
        poNumber: "",
        materialName: "",
        receivedDate: "",
        invoiceNumber: "",
        supplierName: "",
        lotQuantity: "",
        inspectionReportNumber: "",
      });
    }
  };

  const handleMaterialDataChange = (field, value) => {
    setMaterialData(prev => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const isHR = user?.role === 'hr';
      const inspectionData = {
        materialData,
        observations,
        summaryData,
        approvalData,
        inspectionStatus: isHR ? "Pending Approval" : "Approved",
        grnId: selectedGRN?.id,
      };

      const response = isEditMode
        ? await axiosInstance.put(`/incoming-inspection/${id}`, inspectionData)
        : await axiosInstance.post("/incoming-inspection", inspectionData);

      if (response.status === 201 || response.status === 200) {
        // Send notification to Admin if HR is submitting
        if (user?.role === 'hr') {
          await NotificationService.createNotification({
            title: "Inspection Approval Required",
            message: `HR ${user.name} has submitted an inspection for ${materialData.materialName} (Report: ${materialData.inspectionReportNumber}).`,
            targetRole: "admin",
            type: "inspection_approval",
            link: `/incoming-inspection/view-inspection?id=${isEditMode ? id : response.data.id}`,
            inspectionId: isEditMode ? id : response.data.id
          });
        }
        // Automatic Rejection Record Integration
        const rejQty = parseInt(summaryData.rejectedQuantity) || 0;
        if (rejQty > 0) {
          try {
            // Prepare rejection payload
            const rejectionPayload = {
              rejectionId: materialData.inspectionReportNumber,
              sourceType: "Incoming Inspection",
              sourceRef: materialData.grnNumber,
              goods: materialData.materialName,
              qty: rejQty,
              date: materialData.inspectionDate,
              reason: summaryData.comments || "Rejected during incoming inspection",
              status: "total", // Default to Pending
              severity: "medium", // Default
              rejectedBy: approvalData.updatedByName || "Automated",
            };

            // Check if a rejection record already exists for this inspection report
            const existingRejResponse = await axiosInstance.get(`/rejected-goods?rejectionId=${materialData.inspectionReportNumber}`);
            const existingRej = existingRejResponse.data?.[0];

            if (existingRej) {
              // Update existing rejection
              await axiosInstance.put(`/rejected-goods/${existingRej.id}`, rejectionPayload);
              // console.log("Rejection record updated.");
            } else {
              // Create new rejection
              await axiosInstance.post("/rejected-goods", rejectionPayload);
              // console.log("Rejection record created.");
            }
          } catch (rejError) {
            console.error("Failed to manage rejection record:", rejError);
            // We don't alert here to not interrupt the main flow, just log it.
          }
        }

        // Update GRN inspection status to Completed
        if (selectedGRN) {
          try {
            await axiosInstance.put(`/grn/${selectedGRN.id}`, {
              ...selectedGRN,
              inspectionStatus: "Completed",
            });
          } catch (grnError) {
            console.error("Failed to update GRN inspection status:", grnError);
          }
        }

        // --- NEW: Update Store Inventory Logic ---
        try {
          const acceptedQty = Number(summaryData.acceptedQuantity) || 0;
          if (acceptedQty > 0) {
            const storeEndpoints = ["/store", "/it-goods", "/finish-goods", "/other-goods"];
            let isMaterialFoundAcrossTabs = false;

            for (const endpoint of storeEndpoints) {
              const storeRes = await axiosInstance.get(endpoint);
              const storeItems = storeRes.data || [];

              // Find matching material by name (case insensitive)
              const existingItem = storeItems.find(item =>
                (item.name || item.itemName || "").toLowerCase() === materialData.materialName.toLowerCase() ||
                (item.code || item.id || "").toLowerCase() === materialData.grnNumber.toLowerCase()
              );

              if (existingItem) {
                // Found existing material, update its quantity
                const currentQty = Number(existingItem.available || existingItem.stock || 0);
                const updatedItem = {
                  ...existingItem,
                  available: currentQty + acceptedQty,
                  updated: new Date().toISOString().split("T")[0]
                };

                await axiosInstance.put(`${endpoint}/${existingItem.id}`, updatedItem);
                isMaterialFoundAcrossTabs = true;
                console.log(`Updated stock for ${materialData.materialName} in ${endpoint}`);
                break;
              }
            }

            // If material was not found in any existing tab, add it to 'Other Goods'
            if (!isMaterialFoundAcrossTabs) {
              const newOtherItem = {
                name: materialData.materialName,
                code: materialData.grnNumber || `MAT-${Math.floor(Math.random() * 1000)}`,
                category: "Other Goods",
                available: acceptedQty,
                minimum: 10,
                updated: new Date().toISOString().split("T")[0]
              };
              await axiosInstance.post("/other-goods", newOtherItem);
              console.log(`Added new material ${materialData.materialName} to Other Goods`);
            }
          }
        } catch (storeError) {
          console.error("Failed to sync with store inventory:", storeError);
        }
        // ------------------------------------------

        alert(`Inspection ${isEditMode ? "Updated" : "Submitted"} Successfully!`);
        router.push("/incoming-inspection");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit inspection.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <MaterialInformation
              isEditMode={isEditMode}
              data={materialData}
              onChange={handleMaterialDataChange}
              pendingGRNs={pendingGRNs}
              selectedGRN={selectedGRN}
              onGRNChange={handleGRNChange}
            />
            <VerificationChecks
              data={materialData}
              onChange={handleMaterialDataChange}
            />
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
          <Grid container spacing={2}>
            <Grid size={{xs:12, md:8}}>
              <InspectionSummary
              summaryData={summaryData}
              onChange={handleSummaryChange}
            />
            </Grid>
            <Grid size={{xs:12, md:4}}>
            <InspectionApproval
              approvalData={approvalData}
              onChange={handleApprovalChange}
            />
            </Grid>
          </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <CommonCard title={isEditMode ? "Edit Material Inspection" : "Add Material Inspection"}>
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
          <Box>{renderStepContent(activeStep)}</Box>

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
                  {isEditMode ? "Update Inspection" : "Submit Inspection"}
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

export default function MaterialInspectionForm() {
  return (
    <Suspense fallback={<Loader fullPage message="Loading..." />}>
      <MaterialInspectionFormContent />
    </Suspense>
  );
}
