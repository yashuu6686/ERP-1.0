"use client";
import React from "react";
import {
  Box,
  Button,
} from "@mui/material";
import {
  Save,
} from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";
import CertificateDetailsCard from "./components/CertificateDetailsCard";
import ProductDetailsCard from "./components/ProductDetailsCard";
import TestResultsCard from "./components/TestResultsCard";
import AuthorizationCard from "./components/AuthorizationCard";

export default function CertificateOfAnalysis() {
  const [mounted, setMounted] = React.useState(false);
  const [testRows, setTestRows] = React.useState([
    {
      id: 1,
      parameters: "",
      specification: "",
      method: "",
      result: "",
      status: "",
    },
  ]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const addTestRow = () => {
    const newId = testRows.length > 0 ? Math.max(...testRows.map(row => row.id)) + 1 : 1;
    setTestRows([
      ...testRows,
      {
        id: newId,
        parameters: "",
        specification: "",
        method: "",
        result: "",
        status: "",
      },
    ]);
  };

  const deleteTestRow = (id) => {
    if (testRows.length > 1) {
      setTestRows(testRows.filter((row) => row.id !== id));
    }
  };

  const handleTestRowChange = (id, field, value) => {
    setTestRows(
      testRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  if (!mounted) return null;

  return (
    <Box>
      <CommonCard title="Certificate of Analysis">
        {/* Certificate Details Section */}
        <CertificateDetailsCard />

        {/* Product Details Section */}
        <ProductDetailsCard />

        {/* Test Results Section */}
        <TestResultsCard
          testRows={testRows}
          addTestRow={addTestRow}
          deleteTestRow={deleteTestRow}
          handleTestRowChange={handleTestRowChange}
        />

        {/* Authorization Section */}
        <AuthorizationCard />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#1172ba",
              color: "#1172ba",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#0d5a94",
                bgcolor: "#f0f7ff",
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{
              backgroundColor: "#1172ba",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#0d5a94" },
            }}
          >
            Save Certificate
          </Button>
        </Box>
      </CommonCard>
    </Box>
  );
}