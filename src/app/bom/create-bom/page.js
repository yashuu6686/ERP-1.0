
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
import { TextField, Grid } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function BOMCreator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    materials: Yup.array().of(
      Yup.object().shape({
        scanboPartNumber: Yup.string().required("Scanbo Part Number is required"),
        supplierPartNumber: Yup.string().required("Supplier Part Number is required"),
        quantity: Yup.number().typeError("Must be a number").positive("Qty must be > 0").required("Qty is required"),
        materialName: Yup.string().required("Material Name is required"),
        manufacturerName: Yup.string().required("Manufacturer Name is required"),
        technicalDetails: Yup.string().required("Technical Details are required"),
      })
    ).min(1, "At least one material is required"),
    auth: Yup.object().shape({
      reviewedBy: Yup.string().required("Reviewer name is required"),
      approvedBy: Yup.string().required("Approver name is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      materials: [
        {
          id: Date.now(),
          scanboPartNumber: "",
          supplierPartNumber: "",
          quantity: "",
          materialName: "",
          manufacturerName: "",
          technicalDetails: "",
        },
      ],
      auth: {
        reviewedBy: "",
        approvedBy: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          number: `BOM-${new Date().getTime().toString().slice(-6)}`,
          productName: values.productName,
          date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
          approvedBy: values.auth.approvedBy,
          status: "Approved",
          materials: values.materials.map((m, idx) => ({
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
            reviewedBy: values.auth.reviewedBy,
            reviewedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
            approvedBy: values.auth.approvedBy,
            approvedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
          },
        };

        await axiosInstance.post("/bom", payload);
        alert("BOM saved successfully!");
        router.push("/bom");
      } catch (error) {
        console.error("Error saving BOM:", error);
        alert("Failed to save BOM.");
      } finally {
        setLoading(false);
      }
    },
  });

  const addMaterial = () => {
    formik.setFieldValue("materials", [
      ...formik.values.materials,
      {
        id: Date.now(),
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
    if (formik.values.materials.length > 1) {
      formik.setFieldValue(
        "materials",
        formik.values.materials.filter((m) => m.id !== id)
      );
    }
  };

  const updateMaterial = (id, field, value) => {
    formik.setFieldValue(
      "materials",
      formik.values.materials.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );
  };

  const updateAuth = (field, value) => {
    formik.setFieldValue(`auth.${field}`, value);
  };

  return (
    <Box>
      <CommonCard title="Create BOM">
        <Box sx={{ p: 0.25 }}>
          <Box sx={{ mb: 3, px: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  placeholder="Enter dynamic product name (e.g. D8 Smart Device)"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.productName && Boolean(formik.errors.productName)}
                  helperText={formik.touched.productName && formik.errors.productName}
                  size="small"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                      "&:hover > fieldset": { borderColor: "#1172ba" },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <MaterialListSpecifications
            materials={formik.values.materials}
            onAdd={addMaterial}
            onDelete={deleteMaterial}
            onUpdate={updateMaterial}
            errors={formik.errors.materials}
            touched={formik.touched.materials}
            onBlur={formik.handleBlur}
          />

          <BOMAuthorization
            reviewedBy={formik.values.auth.reviewedBy}
            approvedBy={formik.values.auth.approvedBy}
            onUpdate={updateAuth}
            errors={formik.errors.auth}
            touched={formik.touched.auth}
            onBlur={formik.handleBlur}
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
              onClick={formik.handleSubmit}
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
