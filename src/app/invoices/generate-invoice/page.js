"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Save from "@mui/icons-material/Save";
import Close from "@mui/icons-material/Close";
import CommonCard from "../../../components/CommonCard";
import InvoiceDetailsSection from "./components/InvoiceDetailsSection";
import CustomerInformationSection from "./components/CustomerInformationSection";
import DeliveryInformationSection from "./components/DeliveryInformationSection";
import InvoiceProductsTable from "./components/InvoiceProductsTable";
import InvoiceNotesSection from "./components/InvoiceNotesSection";
import InvoiceSummarySection from "./components/InvoiceSummarySection";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

function InvoiceGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    invoiceInfo: {
      invoiceNumber: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
    },
    customer: {
      companyName: "",
      organization: "",
      address: "",
      contact: "",
      drugLicence: "",
    },
    delivery: {
      deliveryAddress: "",
      contactPerson: "",
      phone: "",
      email: "",
    },
    notes: {
      termsAndConditions: "",
      additionalNotes: "",
    },
    summary: {
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
    },
    status: "Draft",
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 0,
      amount: 0,
    },
  ]);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/invoices/${id}`);
      if (response.data) {
        setFormData({
          invoiceInfo: response.data.invoiceInfo || formData.invoiceInfo,
          customer: response.data.customer || formData.customer,
          delivery: response.data.delivery || formData.delivery,
          notes: response.data.notes || formData.notes,
          summary: response.data.summary || formData.summary,
          status: response.data.status || "Draft",
        });
        if (response.data.products) {
          setProducts(response.data.products);
        }
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addProduct = () => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 0,
      amount: 0,
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (productId) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleProductChange = (productId, field, value) => {
    setProducts(
      products.map((p) => {
        if (p.id === productId) {
          const updated = { ...p, [field]: value };
          // Calculate amounts
          if (field === "quantity" || field === "price" || field === "taxPercent") {
            const qty = parseFloat(updated.quantity) || 0;
            const price = parseFloat(updated.price) || 0;
            const taxPercent = parseFloat(updated.taxPercent) || 0;
            const subtotal = qty * price;
            updated.taxAmount = (subtotal * taxPercent) / 100;
            updated.amount = subtotal + updated.taxAmount;
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleSave = async () => {
    try {
      // Calculate summary
      const subtotal = products.reduce((sum, p) => sum + (parseFloat(p.amount) || 0) - (parseFloat(p.taxAmount) || 0), 0);
      const tax = products.reduce((sum, p) => sum + (parseFloat(p.taxAmount) || 0), 0);
      const total = subtotal + tax - (parseFloat(formData.summary.discount) || 0);

      const payload = {
        ...formData,
        products,
        summary: {
          ...formData.summary,
          subtotal,
          tax,
          total,
        },
      };

      if (id) {
        await axiosInstance.put(`/invoices/${id}`, payload);
      } else {
        payload.invoiceInfo.invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        await axiosInstance.post("/invoices", payload);
      }
      router.push("/invoices");
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  if (loading) return <Loader fullPage message="Fetching Invoice Details..." />;

  return (
    <CommonCard title={id ? "Edit Invoice" : "Generate Invoice"}>
      <Box sx={{ p: 1 }}>
        <InvoiceDetailsSection
          formData={formData.invoiceInfo}
          onChange={(field, value) => handleFieldChange("invoiceInfo", field, value)}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <CustomerInformationSection
              formData={formData.customer}
              onChange={(field, value) => handleFieldChange("customer", field, value)}
            />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <DeliveryInformationSection
              formData={formData.delivery}
              onChange={(field, value) => handleFieldChange("delivery", field, value)}
            />
          </Grid>
        </Grid>

        <InvoiceProductsTable
          products={products}
          onAddProduct={addProduct}
          onRemoveProduct={removeProduct}
          onProductChange={handleProductChange}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceNotesSection
              formData={formData.notes}
              onChange={(field, value) => handleFieldChange("notes", field, value)}
            />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceSummarySection
              formData={formData.summary}
              products={products}
              onChange={(field, value) => handleFieldChange("summary", field, value)}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Close />}
            onClick={() => router.push("/invoices")}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 500,
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
            onClick={handleSave}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 500,
              borderRadius: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              textTransform: "none",
            }}
          >
            {id ? "Update Invoice" : "Save Invoice"}
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}

export default function InvoiceGenerator() {
  return (
    <Suspense fallback={<Loader fullPage message="Loading..." />}>
      <InvoiceGeneratorContent />
    </Suspense>
  );
}
