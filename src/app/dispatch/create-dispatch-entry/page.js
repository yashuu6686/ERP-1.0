"use client";
import React, { useState, useEffect, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/Loader";

function CreateDispatchEntryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchDispatch = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/dispatches/${id}`);
          const data = response.data;

          setFormData({
            companyName: data.customer?.companyName || "Scanbo Engineering Pvt. Ltd.",
            officeAddress: data.customer?.address || "Mumbai, Maharashtra, India",
            email: data.customer?.email || "info@scanbo.com",
            phone: data.customer?.phone || "+91 98765 43210",
            orderNumber: data.shipmentInfo?.orderNumber || "",
            dispatchDate: data.shipmentInfo?.shippingDate || "",
            trackingNumber: data.shipmentInfo?.trackingNumber || "",
            customerName: data.customer?.companyName || "",
            deliveryAddress: data.customer?.address || "",
            contactPerson: data.customer?.contactPerson || "",
            contactNo: data.customer?.phone || "",
            deliveryDate: data.shipmentInfo?.expectedDelivery || "",
            courierCompany: data.shipmentInfo?.carrier || "",
            referenceNo: data.id || "",
            salesPlatform: data.shipmentInfo?.platform || "",
            packedBy: data.packedBy || "",
            approvedBy: data.approvedBy || "",
            accountingBy: data.accountingBy || "",
          });

          if (data.items && data.items.length > 0) {
            setProducts(data.items.map(item => ({
              name: item.name || "",
              quantity: item.qty || ""
            })));
          }
        } catch (error) {
          console.error("Failed to fetch dispatch:", error);
          alert("Failed to load dispatch data.");
        } finally {
          setLoading(false);
        }
      };
      fetchDispatch();
    }
  }, [id]);

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

  const handleSave = async () => {
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
      "salesPlatform",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === "")) {
        newErrors[field] = true;
      }
    });

    products.forEach((product, index) => {
      if (!product.name || product.name.trim() === "") {
        newErrors[`product_${index}_name`] = true;
      }
      if (!product.quantity || String(product.quantity).trim() === "") {
        newErrors[`product_${index}_quantity`] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        shipmentInfo: {
          orderNumber: formData.orderNumber,
          trackingNumber: formData.trackingNumber,
          shippingDate: formData.dispatchDate,
          expectedDelivery: formData.deliveryDate,
          carrier: formData.courierCompany,
          platform: formData.salesPlatform,
        },
        customer: {
          companyName: formData.customerName,
          contactPerson: formData.contactPerson,
          address: formData.deliveryAddress,
          phone: formData.contactNo,
          email: formData.email,
        },
        items: products.map(p => ({
          name: p.name,
          qty: parseInt(p.quantity),
          serialNo: "-",
          weight: "-"
        })),
        status: id ? "Updated" : "Shipped",
        packedBy: formData.packedBy,
        approvedBy: formData.approvedBy,
        accountingBy: formData.accountingBy,
      };

      if (id) {
        await axiosInstance.put(`/dispatches/${id}`, payload);
      } else {
        await axiosInstance.post("/dispatches", payload);
      }

      alert(`Dispatch Entry ${id ? "Updated" : "Saved"} Successfully!`);
      router.push("/dispatch");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save dispatch entry.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullPage message={id ? "Updating Dispatch..." : "Saving Dispatch..."} />;

  return (
    <Box>
      <CommonCard title={id ? "Edit Dispatch Entry" : "Create Dispatch Entry"}>
        <Box sx={{ p: 1 }}>
          <CompanyInfoCard />
          <DispatchInfoCard
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <CustomerDeliveryCard
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <ProductDetailsTable
            products={products}
            handleProductChange={handleProductChange}
            addProduct={addProduct}
            removeProduct={removeProduct}
            errors={errors}
          />
          <PackagingApprovalsCard
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />
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
              {id ? "Update Dispatch Entry" : "Save Dispatch Entry"}
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}

export default function CreateDispatchEntry() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <CreateDispatchEntryContent />
    </Suspense>
  );
}
