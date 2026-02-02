
"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import CommonCard from "../../../components/CommonCard";
import MaterialListSpecifications from "./components/MaterialListSpecifications";
import BOMAuthorization from "./components/BOMAuthorization";

export default function BOMCreator() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      scanboPartNumber: "SIPL.ASY.PBT.ool",
      supplierPartNumber: "lktp.20240501-0011",
      quantity: "1",
      materialName: "upper case",
      manufacturerName: "xiamen Linktop Technology co., Ltd",
      technicalDetails: "main pcb board with sensors",
    },
    {
      id: 2,
      scanboPartNumber: "",
      supplierPartNumber: "",
      quantity: "",
      materialName: "",
      manufacturerName: "",
      technicalDetails: "",
    },
  ]);

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        id: materials.length + 1,
        scanboPartNumber: "",
        supplierPartNumber: "",
        quantity: "",
        materialName: "",
        manufacturerName: "",
        technicalDetails: "",
      },
    ]);
  };

  const deleteMaterial = (id) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <Box>
      <CommonCard title="Create BOM">
        <Box sx={{ p: 0.25 }}>
          <MaterialListSpecifications
            materials={materials}
            onAdd={addMaterial}
            onDelete={deleteMaterial}
            onUpdate={updateMaterial}
          />

          <BOMAuthorization />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1172ba",
                color: "#1172ba",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
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
                fontWeight: 500,
                "&:hover": { backgroundColor: "#0d5a94" },
              }}
            >
              Save BOM
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
