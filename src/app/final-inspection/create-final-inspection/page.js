"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Assignment, Save } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import InspectionObservations from "../../../components/inspection/InspectionObservations";
import ProductInformationSection from "./components/ProductInformationSection";
import ProblemReportAQDSection from "./components/ProblemReportAQDSection";
import ActionChecklistSection from "./components/ActionChecklistSection";
import ApprovalCommentsSection from "./components/ApprovalCommentsSection";
import SignaturesApprovalSection from "./components/SignaturesApprovalSection";

export default function FinalInspectionForm() {
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

  return (
    <CommonCard title="Create Final Inspection">
      <Box sx={{ p: 1 }}>
        <ProductInformationSection />

        {/* Quality Check Details - Using InspectionObservations Component */}
        <InspectionObservations
          observations={observations}
          onAdd={addObservation}
          onRemove={removeObservation}
          onChange={handleObservationChange}
          icon={Assignment}
        />

        <ProblemReportAQDSection
          problemReport={problemReport}
          setProblemReport={setProblemReport}
          aqd={aqd}
          setAqd={setAqd}
        />

        <ActionChecklistSection />

        <ApprovalCommentsSection />

        <SignaturesApprovalSection />

        {/* Action Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#e2e8f0",
              color: "#64748b",
              "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<Save />}
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
          >
            Submit Inspection
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
