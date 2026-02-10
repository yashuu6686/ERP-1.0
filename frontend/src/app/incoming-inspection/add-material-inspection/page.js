"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import ScienceIcon from "@mui/icons-material/Science";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import CommonCard from "../../../components/ui/CommonCard";
import InspectionObservations from "@/components/inspection/InspectionObservations";
import InspectionSummary from "@/components/inspection/InspectionSummary";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import MaterialInformation from "./components/MaterialInformation";
import VerificationChecks from "./components/VerificationChecks";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import NotificationService from "@/services/NotificationService";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

const steps = [
  "Material Information & Verification",
  "Observations",
  "Summary & Approval",
];

// Validation Schemas for each step
function MaterialInspectionFormContent() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pendingGRNs, setPendingGRNs] = useState([]);
  const [selectedGRN, setSelectedGRN] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = !!id;

  const [observationColumns, setObservationColumns] = useState([
    { id: "observation", label: "Observation" },
  ]);

  // Validation Schemas for each step
  const getValidationSchema = (step, userRole) => {
    const schemas = [
      Yup.object().shape({
        materialData: Yup.object().shape({
          grnNumber: Yup.string().required("GRN Number is required"),
          materialName: Yup.string().required("Material Name is required"),
          poNumber: Yup.string().required("PO Number is required"),
          receivedDate: Yup.date().required("Received Date is required").typeError("Invalid date"),
          invoiceNumber: Yup.string().required("Invoice Number is required"),
          lotNumber: Yup.number().typeError("Must be a number").positive("Lot Number must be greater than 0").required("Lot Number is required"),
          inspectionStandardNumber: Yup.number().typeError("Must be a number").positive("Inspection Standard Number must be greater than 0").required("Inspection Standard Number is required"),
          supplierName: Yup.string().required("Supplier Name is required"),
          lotQuantity: Yup.number().typeError("Must be a number").positive("Lot Quantity must be greater than 0").required("Lot Quantity is required"),
          sampleSize: Yup.number().typeError("Must be a number").positive("Sample Size must be greater than 0").required("Sample Size is required"),
          inspectionReportNumber: Yup.string().required("Report Number is required"),
          inspectionDate: Yup.date().required("Inspection Date is required").typeError("Invalid date"),
          inspectionStandard: Yup.string().required("Inspection Standard is required"),
          equipmentId: Yup.string().required("Equipment ID is required"),
          toolsUsed: Yup.string().required("Please select if tools were used"),
          sdsAvailable: Yup.string().required("Please select SDS availability"),
          qualityCertificate: Yup.string().required("Please select Quality Certificate availability"),
        }),
      }),
      Yup.object().shape({
        observations: Yup.array().of(
          Yup.lazy(() => {
            const shape = {
              parameter: Yup.string().required("Parameter is required"),
              specification: Yup.string().required("Specification is required"),
              method: Yup.string().required("Method is required"),
              remarks: Yup.string(),
            };
            // Dynamically require all visible observation columns
            observationColumns.forEach((col) => {
              shape[col.id] = Yup.string().required("Observation is required");
            });
            return Yup.object().shape(shape);
          })
        ).min(1, "At least one observation is required"),
      }),
      Yup.object().shape({
        summaryData: Yup.object().shape({
          acceptedQuantity: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Accepted Quantity is required"),
          rejectedQuantity: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Rejected Quantity is required"),
          holdScrapQuantity: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Hold/Scrap Quantity is required"),
          other: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Other Quantity is required"),
          comments: Yup.string().required("Comments are required"),
        }),
        approvalData: Yup.object().shape({
          updatedByName: Yup.string().required("Updated By name is required"),
          updatedByDate: Yup.date().required("Update date is required").typeError("Invalid date"),
          approvedByName: userRole === 'admin'
            ? Yup.string().required("Approved By name is required")
            : Yup.string().nullable(),
          approvedByDate: userRole === 'admin'
            ? Yup.date().required("Approval date is required").typeError("Invalid date")
            : Yup.date().nullable(),
        })
      }),
    ];
    return schemas[step];
  };

  const formik = useFormik({
    initialValues: {
      materialData: {
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
      },
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
      summaryData: {
        acceptedQuantity: "",
        rejectedQuantity: "",
        holdScrapQuantity: "",
        other: "",
        comments: "",
      },
      approvalData: {
        updatedByName: "",
        updatedByDate: "",
        approvedByName: "",
        approvedByDate: "",
      },
    },
    validationSchema: getValidationSchema(activeStep, user?.role),
    onSubmit: async () => {
      setShowPreview(true);
    },
  });

  // Re-validate schema when activeStep or user.role or observationColumns changes
  useEffect(() => {
    formik.setValues(formik.values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, user?.role, observationColumns]);

  useEffect(() => {
    const fetchPendingGRNs = async (currentGrnNumber = null) => {
      try {
        const response = await axiosInstance.get("/grn");
        const targetGrn = currentGrnNumber || formik.values.materialData.grnNumber;
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
          const grnResponse = await axiosInstance.get("/grn");
          const allGRNs = grnResponse.data || [];
          const matchingGRN = allGRNs.find(g => g.grnNumber === data.materialData.grnNumber);

          if (matchingGRN) setSelectedGRN(matchingGRN);

          const materialDataLoaded = {
            ...data.materialData,
            poNumber: data.materialData.poNumber || matchingGRN?.poNumber || "",
            materialName: data.materialData.materialName || matchingGRN?.items?.[0]?.name || "",
            supplierName: data.materialData.supplierName || matchingGRN?.supplierName || "",
            ...(data.materialData.verificationChecks || {})
          };

          formik.setValues({
            materialData: materialDataLoaded,
            observations: data.observations || [],
            summaryData: data.summaryData,
            approvalData: data.approvalData,
          });

          if (data.observations?.length > 0) {
            const firstObs = data.observations[0];
            const dynamicKeys = Object.keys(firstObs).filter(k => k.startsWith("observation_"));
            if (dynamicKeys.length > 0) {
              const newCols = dynamicKeys.map(k => ({
                id: k,
                label: `Observation ${k.split("_")[1]}`
              }));
              const allCols = [{ id: "observation", label: "Observation" }, ...newCols];
              const uniqueCols = Array.from(new Map(allCols.map(c => [c.id, c])).values());
              setObservationColumns(uniqueCols);
            }
          }
          fetchPendingGRNs(data.materialData.grnNumber);
        }
      } catch (error) {
        console.error("Error fetching inspection data:", error);
        showNotification("Failed to load inspection data.", "error");
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

      formik.setFieldValue("materialData", {
        ...formik.values.materialData,
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
      formik.setFieldValue("materialData", {
        ...formik.values.materialData,
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
    formik.setFieldValue(`materialData.${field}`, value);
  };

  const handleNext = async () => {
    const errors = await formik.validateForm();

    // Check if there are errors in the current section
    const currentStepErrors = Object.keys(errors).some(key => {
      if (activeStep === 0) return key === 'materialData';
      if (activeStep === 1) return key === 'observations';
      if (activeStep === 2) return key === 'summaryData' || key === 'approvalData';
      return false;
    });

    if (currentStepErrors) {
      formik.setTouched({
        materialData: activeStep === 0 ? Object.fromEntries(Object.keys(formik.values.materialData).map(k => [k, true])) : formik.touched.materialData,
        observations: activeStep === 1 ? formik.values.observations.map(obs => Object.fromEntries(Object.keys(obs).map(k => [k, true]))) : formik.touched.observations,
        summaryData: activeStep === 2 ? Object.fromEntries(Object.keys(formik.values.summaryData).map(k => [k, true])) : formik.touched.summaryData,
        approvalData: activeStep === 2 ? Object.fromEntries(Object.keys(formik.values.approvalData).map(k => [k, true])) : formik.touched.approvalData,
      });
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSummaryChange = (field, value) => {
    formik.setFieldValue(`summaryData.${field}`, value);
  };

  const handleApprovalChange = (section, field, value) => {
    const key = `${section}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    formik.setFieldValue(`approvalData.${key}`, value);
  };

  const addObservation = () => {
    const nextId =
      formik.values.observations.length > 0
        ? Math.max(...formik.values.observations.map((o) => o.id)) + 1
        : 1;
    const newObservation = {
      id: nextId,
      parameter: "",
      specification: "",
      method: "",
      observation: "",
      remarks: "",
    };
    observationColumns.forEach((col) => {
      newObservation[col.id] = "";
    });

    formik.setFieldValue("observations", [...formik.values.observations, newObservation]);
  };

  const addObservationColumn = () => {
    const nextColNum = observationColumns.length + 1;
    const newColId = `observation_${nextColNum}`;
    setObservationColumns([
      ...observationColumns,
      { id: newColId, label: `Observation ${nextColNum}` },
    ]);
  };

  const removeObservationColumn = (colId) => {
    if (observationColumns.length > 1) {
      setObservationColumns(observationColumns.filter((col) => col.id !== colId));
      // Also clean up data in formik values if needed, 
      // though Yup lazy schema handles existence checks.
      const updatedObservations = formik.values.observations.map(obs => {
        const newObs = { ...obs };
        delete newObs[colId];
        return newObs;
      });
      formik.setFieldValue("observations", updatedObservations);
    }
  };

  const removeObservation = (id) => {
    if (formik.values.observations.length > 1) {
      formik.setFieldValue("observations", formik.values.observations.filter((obs) => obs.id !== id));
    }
  };

  const handleObservationChange = (id, field, value) => {
    formik.setFieldValue("observations",
      formik.values.observations.map((obs) =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  };

  const handleFinalSubmit = async () => {
    const values = formik.values;
    try {
      setLoading(true);
      setShowPreview(false);
      const isHR = user?.role === 'hr';
      const inspectionData = {
        ...values,
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
            message: `HR ${user.name} has submitted an inspection for ${values.materialData.materialName} (Report: ${values.materialData.inspectionReportNumber}).`,
            targetRole: "admin",
            type: "inspection_approval",
            link: `/incoming-inspection/view-inspection?id=${isEditMode ? id : response.data.id}`,
            inspectionId: isEditMode ? id : response.data.id
          });
        }
        // Automatic Rejection Record Integration
        const rejQty = parseInt(values.summaryData.rejectedQuantity) || 0;
        if (rejQty > 0) {
          try {
            // Prepare rejection payload
            const rejectionPayload = {
              rejectionId: values.materialData.inspectionReportNumber,
              sourceType: "Incoming Inspection",
              sourceRef: values.materialData.grnNumber,
              goods: values.materialData.materialName,
              qty: rejQty,
              date: values.materialData.inspectionDate,
              reason: values.summaryData.comments || "Rejected during incoming inspection",
              status: "total", // Default to Pending
              severity: "medium", // Default
              rejectedBy: values.approvalData.updatedByName || "Automated",
            };

            // Check if a rejection record already exists for this inspection report
            const existingRejResponse = await axiosInstance.get(`/rejected-goods?rejectionId=${values.materialData.inspectionReportNumber}`);
            const existingRej = existingRejResponse.data?.[0];

            if (existingRej) {
              // Update existing rejection
              await axiosInstance.put(`/rejected-goods/${existingRej.id}`, rejectionPayload);
            } else {
              // Create new rejection
              await axiosInstance.post("/rejected-goods", rejectionPayload);
            }
          } catch (rejError) {
            console.error("Failed to manage rejection record:", rejError);
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

        // Update Store Inventory Logic
        try {
          const acceptedQty = Number(values.summaryData.acceptedQuantity) || 0;
          if (acceptedQty > 0) {
            const storeEndpoints = ["/store", "/it-goods", "/finish-goods", "/other-goods"];
            let isMaterialFoundAcrossTabs = false;

            for (const endpoint of storeEndpoints) {
              const storeRes = await axiosInstance.get(endpoint);
              const storeItems = storeRes.data || [];

              // Find matching material by name (case insensitive)
              const existingItem = storeItems.find(item =>
                (item.name || item.itemName || "").toLowerCase() === values.materialData.materialName.toLowerCase() ||
                (item.code || item.id || "").toLowerCase() === values.materialData.grnNumber.toLowerCase()
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
                break;
              }
            }

            // If material was not found in any existing tab, add it to 'Other Goods'
            if (!isMaterialFoundAcrossTabs) {
              const newOtherItem = {
                name: values.materialData.materialName,
                code: values.materialData.grnNumber || `MAT-${Math.floor(Math.random() * 1000)}`,
                category: "Other Goods",
                available: acceptedQty,
                minimum: 10,
                updated: new Date().toISOString().split("T")[0]
              };
              await axiosInstance.post("/other-goods", newOtherItem);
            }
          }
        } catch (storeError) {
          console.error("Failed to sync with store inventory:", storeError);
        }

        showNotification(`Inspection ${isEditMode ? "Updated" : "Submitted"} Successfully!`, "success");
        router.push("/incoming-inspection");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      showNotification("Failed to submit inspection.", "error");
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
              data={formik.values.materialData}
              onChange={handleMaterialDataChange}
              pendingGRNs={pendingGRNs}
              selectedGRN={selectedGRN}
              onGRNChange={handleGRNChange}
              errors={formik.errors.materialData}
              touched={formik.touched.materialData}
              onBlur={formik.handleBlur}
            />
            <VerificationChecks
              data={formik.values.materialData}
              onChange={handleMaterialDataChange}
              errors={formik.errors.materialData}
              touched={formik.touched.materialData}
              onBlur={formik.handleBlur}
            />
          </>
        );
      case 1:
        return (
          <InspectionObservations
            observations={formik.values.observations}
            observationColumns={observationColumns}
            onAdd={addObservation}
            onAddColumn={addObservationColumn}
            onRemoveColumn={removeObservationColumn}
            onRemove={removeObservation}
            onChange={handleObservationChange}
            icon={ScienceIcon}
            errors={formik.errors.observations}
            touched={formik.touched.observations}
            onBlur={formik.handleBlur}
          />
        );
      case 2:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={user?.role === 'admin' ? 12 : 8}>
                <InspectionSummary
                  summaryData={formik.values.summaryData}
                  onChange={handleSummaryChange}
                  errors={formik.errors.summaryData}
                  touched={formik.touched.summaryData}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} md={user?.role === 'admin' ? 12 : 4}>
                <InspectionApproval
                  approvalData={formik.values.approvalData}
                  onChange={handleApprovalChange}
                  errors={formik.errors.approvalData}
                  touched={formik.touched.approvalData}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  if (loading) return <Loader fullPage message="Processing Inspection..." />;

  return (
    <FormikProvider value={formik}>
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
                    onClick={formik.handleSubmit}
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

        {/* Review Dialog */}
        <FormReviewDialog
          open={showPreview}
          onClose={() => setShowPreview(false)}
          onConfirm={handleFinalSubmit}
          title={isEditMode ? "Review & Update Inspection" : "Review Material Inspection"}
          icon={<ScienceIcon />}
          headerInfo={{
            label1: "REPORT NUMBER",
            value1: `#${formik.values.materialData.inspectionReportNumber}`,
            label2: "INSPECTION DATE",
            value2: formik.values.materialData.inspectionDate
          }}
          confirmLabel={isEditMode ? "Confirm & Update" : "Confirm & Submit"}
        >
          <Grid container spacing={3}>
            {/* Material Details - Expanded */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                  <ScienceIcon sx={{ fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Material Information</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>{formik.values.materialData.materialName}</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>GRN NUMBER</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.grnNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>PO NUMBER</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.poNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>SUPPLIER</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.supplierName}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>INVOICE NO</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.invoiceNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>RECEIVED DATE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.receivedDate}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>LOT NUMBER</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.lotNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>LOT QUANTITY</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.lotQuantity}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>SAMPLE SIZE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.sampleSize}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Inspection Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inspection Details</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 2 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>INSPECTION DATE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.inspectionDate}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>EQUIPMENT ID</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.equipmentId}</Typography>
                  </Box>
                  <Box sx={{ gridColumn: 'span 2' }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>INSPECTION STANDARD</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.inspectionStandard}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>STANDARD NUMBER</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.materialData.inspectionStandardNumber}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Summary & Quantities */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inspection Summary</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>ACCEPTED</Typography>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>{formik.values.summaryData.acceptedQuantity}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REJECTED</Typography>
                    <Typography variant="h6" color="error.main" sx={{ fontWeight: 700 }}>{formik.values.summaryData.rejectedQuantity}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>HOLD/SCRAP</Typography>
                    <Typography variant="h6" color="warning.main" sx={{ fontWeight: 700 }}>{formik.values.summaryData.holdScrapQuantity}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>OTHER</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{formik.values.summaryData.other}</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>COMMENTS</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5 }}>{formik.values.summaryData.comments || '-'}</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Approval Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                  <VerifiedIcon sx={{ fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Approval Information</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>UPDATED BY</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{formik.values.approvalData.updatedByName}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>UPDATE DATE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{formik.values.approvalData.updatedByDate}</Typography>
                  </Box>
                  {user?.role === 'admin' && (
                    <>
                      <Box>
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>APPROVED BY</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{formik.values.approvalData.approvedByName || '-'}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>APPROVAL DATE</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{formik.values.approvalData.approvedByDate || '-'}</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Verification Checks */}
            <Grid size={{ xs: 12 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                  <VerifiedIcon sx={{ fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verification Checks</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={4} size={{ xs: 4 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>TOOLS USED</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', color: formik.values.materialData.toolsUsed === 'yes' ? 'success.main' : 'text.primary' }}>
                      {formik.values.materialData.toolsUsed || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} size={{ xs: 4 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>SDS AVAILABLE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', color: formik.values.materialData.sdsAvailable === 'yes' ? 'success.main' : 'text.primary' }}>
                      {formik.values.materialData.sdsAvailable || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} size={{ xs: 4 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>QUALITY CERTIFICATE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', color: formik.values.materialData.qualityCertificate === 'yes' ? 'success.main' : 'text.primary' }}>
                      {formik.values.materialData.qualityCertificate || '-'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Observations Table */}
            <Grid size={{ xs: 12 }}>
              <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                <Box sx={{ p: 2, bgcolor: 'var(--bg-page)' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)' }}>Observations</Typography>
                </Box>
                <Table size="small">
                  <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>PARAMETER</TableCell>
                      <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>SPECIFICATION</TableCell>
                      <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>METHOD</TableCell>
                      {observationColumns.map((col) => (
                        <TableCell key={col.id} align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>{col.label.toUpperCase()}</TableCell>
                      ))}
                      <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>REMARKS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formik.values.observations.map((obs, idx) => (
                      <TableRow key={idx} sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell sx={{ py: 1.5, fontWeight: 500 }}>{obs.parameter}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{obs.specification}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{obs.method}</TableCell>
                        {observationColumns.map((col) => (
                          <TableCell key={col.id} align="center">
                            <Box sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: obs[col.id]?.toLowerCase() === 'ok' ? '#ecfdf5' : '#fff1f2',
                              color: obs[col.id]?.toLowerCase() === 'ok' ? '#059669' : '#e11d48',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              border: '1px solid',
                              borderColor: obs[col.id]?.toLowerCase() === 'ok' ? '#10b981' : '#f43f5e'
                            }}>
                              {obs[col.id]?.toUpperCase() || '-'}
                            </Box>
                          </TableCell>
                        ))}
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{obs.remarks || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </FormReviewDialog>
      </Box>
    </FormikProvider>
  );
}

export default function MaterialInspectionForm() {
  return (
    <Suspense fallback={<Loader fullPage message="Loading..." />}>
      <MaterialInspectionFormContent />
    </Suspense>
  );
}
