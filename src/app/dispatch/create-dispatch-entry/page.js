"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import {
  Save,
} from "@mui/icons-material";
import CompanyInfoCard from "./components/CompanyInfoCard";
import DispatchInfoCard from "./components/DispatchInfoCard";
import CustomerDeliveryCard from "./components/CustomerDeliveryCard";
import ProductDetailsTable from "./components/ProductDetailsTable";
import PackagingApprovalsCard from "./components/PackagingApprovalsCard";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import CommonCard from "../../../components/CommonCard";

export default function CreateDispatchEntry() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    companyName: "Scanbo Engineering Pvt. Ltd.",
    officeAddress: "Mumbai, Maharashtra, India",
    email: "info@scanbo.com",
    phone: "+91 98765 43210",
    orderNumber: "",
    dispatchDate: "",
    trackingNumber: "",
    customerName: "",
    deliveryAddress: "",
    contactPerson: "",
    contactNo: "",
    deliveryDate: "",
    courierCompany: "",
    referenceNo: "",
    salesPlatform: "",
    packedBy: "",
    approvedBy: "",
    accountingBy: "",
  });

  const [products, setProducts] = useState([
    { name: "", quantity: "" },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
    if (errors[`product_${index}_${field}`]) {
      setErrors({ ...errors, [`product_${index}_${field}`]: false });
    }
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: "" }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const newErrors = {};

    const requiredFields = [
      "orderNumber",
      "dispatchDate",
      "trackingNumber",
      "customerName",
      "deliveryAddress",
      "contactPerson",
      "contactNo",
      "deliveryDate",
      "courierCompany",
      "referenceNo",
      "salesPlatform",
      "packedBy",
      "approvedBy",
      "accountingBy",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = true;
      }
    });

    products.forEach((product, index) => {
      if (!product.name || product.name.trim() === "") {
        newErrors[`product_${index}_name`] = true;
      }
      if (!product.quantity || product.quantity.trim() === "") {
        newErrors[`product_${index}_quantity`] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Dispatch Entry Saved Successfully!");
    router.push("/dispatch");
  };

  return (
    <Box>
      <CommonCard title="Create Dispatch Entry">
        <Box sx={{ p: 1 }}>
          {/* Company Information */}
          <CompanyInfoCard />

          {/* Dispatch Info */}
          <DispatchInfoCard
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />

          {/* Customer + Delivery */}
          <CustomerDeliveryCard
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />

          {/* Product Details Table */}
          <ProductDetailsTable
            products={products}
            handleProductChange={handleProductChange}
            addProduct={addProduct}
            removeProduct={removeProduct}
            errors={errors}
          />

          {/* Packaging & Approvals */}
          <PackagingApprovalsCard
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />

          {/* Save Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{
                px: 6,
                py: 1.5,
                fontWeight: 700,
                borderRadius: 2,
                bgcolor: "#1172ba",
                "&:hover": { bgcolor: "#0d5a94" },
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(17, 114, 186, 0.3)",
              }}
            >
              Save Dispatch Entry
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
