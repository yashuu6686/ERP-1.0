
"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import { useRouter } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import MaterialListSpecifications from "./components/MaterialListSpecifications";
import BOMAuthorization from "./components/BOMAuthorization";
import axiosInstance from "../../../axios/axiosInstance";

export default function BOMCreator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({
    reviewedBy: "",
    approvedBy: "",
  });
  const [materials, setMaterials] = useState([
    {
      id: 1,
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

  const updateAuth = (field, value) => {
    setAuth({ ...auth, [field]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        number: `BOM-${new Date().getTime().toString().slice(-6)}`,
        date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
        approvedBy: auth.approvedBy,
        status: "Approved",
        materials: materials.map((m, idx) => ({
          sNo: idx + 1,
          oemSupplier: m.manufacturerName,
          oemPartNo: m.supplierPartNumber,
          qty: m.quantity,
          description: m.materialName,
          bubbleNo: "-",
          manufacturer: m.manufacturerName,
          scanboPartNo: m.scanboPartNumber,
          specs: m.technicalDetails,
        })),
        authorization: {
          reviewedBy: auth.reviewedBy,
          reviewedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
          approvedBy: auth.approvedBy,
          approvedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
        },
      };

      await axiosInstance.post("/bom", payload);
      alert("BOM saved successfully to server!");
      router.push("/bom");
    } catch (error) {
      console.error("Error saving BOM:", error);
      alert("Failed to save BOM to server.");
    } finally {
      setLoading(false);
    }
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

          <BOMAuthorization
            reviewedBy={auth.reviewedBy}
            approvedBy={auth.approvedBy}
            onUpdate={updateAuth}
          />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              disabled={loading}
              onClick={() => router.push("/bom")}
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
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={loading}
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
              {loading ? "Saving..." : "Save BOM"}
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
