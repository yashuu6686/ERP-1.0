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
import CommonCard from "../../../components/ui/CommonCard";
import ProductDetailsSection from "./components/ProductDetailsSection";
import QualityCheckDetailsTable from "./components/QualityCheckDetailsTable";
import InspectionSummarySection from "./components/InspectionSummarySection";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
import { Grid } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

const steps = [
  "Product Details",
  "Quality Check Details",
  "Summary & Approval",
];

export default function QualityCheckForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [materialRequests, setMaterialRequests] = useState([]);
  const [observationColumns, setObservationColumns] = useState([
    { id: "observation", label: "Observation" },
  ]);

  const getValidationSchema = (step, userRole) => {
    const schemas = [
      // Step 0: Product Details
      Yup.object({
        productName: Yup.string().required("Product Name is required"),
        qualityStandard: Yup.string().required("Quality Standard No is required"),
        checkedQuantity: Yup.number()
          .required("Checked Quantity is required")
          .positive("Must be positive")
          .typeError("Must be a number"),
        inspectionDate: Yup.date().required("Inspection Date is required"),
        checkNumber: Yup.string().required("Check Number is required"),
        materialRequestNo: Yup.string(),
      }),
      // Step 1: Quality Check Details
      Yup.object({
        checkDetails: Yup.array().of(
          Yup.lazy(() => {
            const shape = {
              parameters: Yup.string().required("Parameters required"),
              specification: Yup.string().required("Specification required"),
              method: Yup.string().required("Method required"),
              remarks: Yup.string(),
            };
            observationColumns.forEach((col) => {
              shape[col.id] = Yup.string().required("Observation required");
            });
            return Yup.object(shape);
          })
        ).min(1, "At least one row required"),
      }),
      // Step 2: Summary & Approval
      Yup.object({
        acceptedQuantity: Yup.number()
          .required("Accepted Qty required")
          .min(0, "Cannot be negative")
          .typeError("Must be a number"),
        rejectedQuantity: Yup.number()
          .required("Rejected Qty required")
          .min(0, "Cannot be negative")
          .typeError("Must be a number"),
        holdScrapQuantity: Yup.number()
          .required("Hold/Scrap Qty required")
          .min(0, "Cannot be negative")
          .typeError("Must be a number"),
        other: Yup.number()
          .min(0, "Cannot be negative")
          .typeError("Must be a number")
          .nullable(),
        comments: Yup.string().nullable(),
        updatedBy: Yup.object({
          name: Yup.string().required("Name is required"),
          date: Yup.date().required("Date is required"),
        }),
        approvedBy: Yup.object({
          name: userRole === 'admin'
            ? Yup.string().required("Name is required")
            : Yup.string().nullable(),
          date: userRole === 'admin'
            ? Yup.date().required("Date is required")
            : Yup.date().nullable(),
        }),
      }),
    ];
    return schemas[step];
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      qualityStandard: "",
      checkedQuantity: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      checkNumber: "",
      materialRequestNo: "",
      checkDetails: [
        {
          id: 1,
          parameters: "",
          specification: "",
          method: "",
          observation: "",
          remarks: "",
        },
      ],
      acceptedQuantity: "",
      rejectedQuantity: "",
      holdScrapQuantity: "",
      other: "",
      comments: "",
      updatedBy: { name: user?.name || "", date: new Date().toISOString().split("T")[0] },
      approvedBy: { name: "", date: "" },
    },
    validationSchema: getValidationSchema(activeStep, user?.role),
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        const isHR = user?.role === 'hr';
        const status = isHR ? "Pending Approval" : "Completed";

        const formData = {
          ...values,
          approval: {
            updatedByName: values.updatedBy.name,
            updatedByDate: values.updatedBy.date,
            approvedByName: values.approvedBy.name,
            approvedByDate: values.approvedBy.date,
          },
          id: `QC-${Math.floor(Math.random() * 10000)}`,
          status: status,
          createdAt: new Date().toISOString()
        };

        const response = await axiosInstance.post("/quality-inspection", formData);

        if (isHR && (response.status === 201 || response.status === 200)) {
          await NotificationService.createNotification({
            title: "Production Inspection Approval Required",
            message: `HR ${user.name} has submitted a production inspection for ${values.productName} (Report: ${formData.id}).`,
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
            requestNo: values.materialRequestNo || "N/A",
            checkNo: values.checkNumber || "-",
            productSr: "From 001 to " + (values.acceptedQuantity || "000"),
            acceptedQty: values.acceptedQuantity || 0,
            status: "Ready",
            inspectionId: formData.id,
            date: new Date().toISOString(),
            qualityCheck: values.checkDetails,
            summary: {
              acceptedQuantity: values.acceptedQuantity,
              rejectedQuantity: values.rejectedQuantity,
              holdScrapQuantity: values.holdScrapQuantity,
              other: values.other,
              comments: values.comments
            }
          };
          await axiosInstance.post("/batches", batchData);
        } catch (batchError) {
          console.error("Error creating batch:", batchError);
        }

        alert("Quality Check submitted successfully!");
        router.push("/production-inspection");
      } catch (error) {
        console.error("Error submitting quality check:", error);
        alert("Failed to save quality check.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Re-validate schema when activeStep or observationColumns changes
  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, observationColumns, user?.role]);

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

  const handleNext = async () => {
    const currentSchema = getValidationSchema(activeStep, user?.role);
    try {
      await currentSchema.validate(formik.values, { abortEarly: false });
      setActiveStep((prevStep) => prevStep + 1);
    } catch (err) {
      const errors = {};
      err.inner.forEach(e => {
        // Handle nested paths for checkDetails array errors
        if (e.path.startsWith('checkDetails')) {
          // e.g. checkDetails[0].observation
          // Formik expects array errors as array of objects
          // But we can use setTouched to show all fields
        }
        // Simplified: let Formik handle validation via validateForm
      });
      // Actually usage of formik.validateForm is better 
      const formikErrors = await formik.validateForm();
      if (Object.keys(formikErrors).length > 0) {
        formik.setTouched(
          Object.keys(formikErrors).reduce((acc, key) => {
            if (key === 'checkDetails') {
              // Mark all fields in all rows as touched
              return {
                ...acc, [key]: formik.values.checkDetails.map(row =>
                  Object.keys(row).reduce((rAcc, rKey) => ({ ...rAcc, [rKey]: true }), {})
                )
              };
            }
            return { ...acc, [key]: true };
          }, {})
        );
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleMaterialRequestChange = (requestNo) => {
    formik.setFieldValue("materialRequestNo", requestNo);
    if (!requestNo) {
      formik.setFieldValue("productName", "");
      formik.setFieldValue("checkedQuantity", "");
      return;
    }
    const selected = materialRequests.find(r => r.requestNo === requestNo);
    if (selected) {
      formik.setFieldValue("productName", selected.productName || selected.product || "");
      formik.setFieldValue("checkedQuantity", selected.requiredQty || selected.qty || "");
    }
  };

  const addRow = () => {
    const newId = Math.max(...formik.values.checkDetails.map((r) => r.id), 0) + 1;
    const newRow = {
      id: newId,
      parameters: "",
      specification: "",
      method: "",
      remarks: "",
    };
    observationColumns.forEach(col => {
      newRow[col.id] = "";
    });
    formik.setFieldValue("checkDetails", [
      ...formik.values.checkDetails,
      newRow,
    ]);
  };

  const deleteRow = (id) => {
    formik.setFieldValue(
      "checkDetails",
      formik.values.checkDetails.filter((row) => row.id !== id)
    );
  };

  const addObservationColumn = () => {
    const nextColNum = observationColumns.length + 1;
    const newColId = `observation_${nextColNum}`;
    setObservationColumns([
      ...observationColumns,
      { id: newColId, label: `Observation ${nextColNum}` },
    ]);

    // Add new field to existing rows
    const updatedDetails = formik.values.checkDetails.map(row => ({
      ...row,
      [newColId]: ""
    }));
    formik.setFieldValue("checkDetails", updatedDetails);
  };

  const removeObservationColumn = (colId) => {
    if (observationColumns.length > 1) {
      setObservationColumns(observationColumns.filter((col) => col.id !== colId));
      const updatedDetails = formik.values.checkDetails.map((row) => {
        const newRow = { ...row };
        delete newRow[colId];
        return newRow;
      });
      formik.setFieldValue("checkDetails", updatedDetails);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProductDetailsSection
            data={formik.values}
            onChange={(field, val) => formik.setFieldValue(field, val)}
            materialRequests={materialRequests}
            onRequestChange={handleMaterialRequestChange}
            formik={formik}
          />
        );
      case 1:
        return (
          <QualityCheckDetailsTable
            data={formik.values.checkDetails}
            onAddRow={addRow}
            onDelete={deleteRow}
            onChange={(id, field, val) => {
              const newDetails = formik.values.checkDetails.map((row) =>
                row.id === id ? { ...row, [field]: val } : row
              );
              formik.setFieldValue("checkDetails", newDetails);
            }}
            formik={formik}
            observationColumns={observationColumns}
            onAddColumn={addObservationColumn}
            onRemoveColumn={removeObservationColumn}
          />
        );
      case 2:
        return (
          <>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: user?.role === 'admin' ? 12 : 8 }}>
                <InspectionSummarySection
                  data={formik.values}
                  onChange={(field, val) => formik.setFieldValue(field, val)}
                  formik={formik}
                />
              </Grid>
              <Grid size={{ xs: 12, md: user?.role === 'admin' ? 12 : 4 }}>
                <InspectionApproval
                  approvalData={{
                    updatedByName: formik.values.updatedBy.name,
                    updatedByDate: formik.values.updatedBy.date,
                    approvedByName: formik.values.approvedBy.name,
                    approvedByDate: formik.values.approvedBy.date,
                  }}
                  onChange={(section, field, val) => {
                    formik.setFieldValue(`${section}.${field}`, val);
                  }}
                  errors={formik.errors}
                  touched={formik.touched}
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

  return (
    <Box>
      <CommonCard title="New After Production Quality Check">
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
                  onClick={formik.handleSubmit}
                  disabled={submitting}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    backgroundColor: "#1172ba",
                    "&:hover": { backgroundColor: "#0d5a94" },
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Quality Check"}
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
