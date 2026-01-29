"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Save as SaveIcon,
  Science as ScienceIcon,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import InspectionObservations from "@/components/inspection/InspectionObservations";
import InspectionSummary from "@/components/inspection/InspectionSummary";
import InspectionApproval from "@/components/inspection/InspectionApproval";
import MaterialInformation from "./components/MaterialInformation";
import VerificationChecks from "./components/VerificationChecks";

export default function MaterialInspectionForm() {
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

  return (
    <Box>
      <CommonCard title="Material Inspection">
        <Box sx={{ p: 1 }}>
          <MaterialInformation />

          <VerificationChecks />

          <InspectionObservations
            observations={observations}
            observationColumns={observationColumns}
            onAdd={addObservation}
            onAddColumn={addObservationColumn}
            onRemove={removeObservation}
            onChange={handleObservationChange}
            icon={ScienceIcon}
          />

          <InspectionSummary
            summaryData={summaryData}
            onChange={handleSummaryChange}
          />

          <InspectionApproval
            approvalData={approvalData}
            onChange={handleApprovalChange}
          />

          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              Save Draft
            </Button>
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
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
