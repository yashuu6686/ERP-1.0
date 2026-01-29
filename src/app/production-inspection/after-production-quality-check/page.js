"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { CheckCircle, Save } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import ProductDetailsSection from "./components/ProductDetailsSection";
import QualityCheckDetailsTable from "./components/QualityCheckDetailsTable";
import InspectionSummarySection from "./components/InspectionSummarySection";
import ApprovalSection from "./components/ApprovalSection";

export default function QualityCheckForm() {
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
    reviewedBy: "",
    reviewedDate: "",
    approvedBy: "",
    approvedDate: "",
  });

  const handleProductDetailsChange = (field, value) => {
    setProductDetails((prev) => ({ ...prev, [field]: value }));
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

  const handleApprovalChange = (field, value) => {
    setApproval((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const formData = {
      productDetails,
      checkDetails,
      inspectionSummary,
      approval,
    };
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <Box>
      <CommonCard title="New After Production Quality Check">
        <Box sx={{ p: 1 }}>
          <ProductDetailsSection
            data={productDetails}
            onChange={handleProductDetailsChange}
          />

          <QualityCheckDetailsTable
            data={checkDetails}
            onAdd={addRow}
            onDelete={deleteRow}
            onChange={handleCheckDetailsChange}
          />

          <InspectionSummarySection
            data={inspectionSummary}
            onChange={handleInspectionSummaryChange}
          />

          <ApprovalSection data={approval} onChange={handleApprovalChange} />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Save />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                color: "#1172ba",
                borderColor: "#1172ba",
              }}
            >
              Save Draft
            </Button>
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
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
