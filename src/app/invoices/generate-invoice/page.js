"use client";
import React, { useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

export default function InvoiceGenerator() {
  const [products, setProducts] = useState([
    {
      id: 1,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 1000,
      amount: 5000,
    },
    {
      id: 2,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 1000,
      amount: 5000,
    },
  ]);

  const addProduct = () => {
    const newProduct = {
      id: products.length + 1,
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

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <CommonCard title="Generate Invoice">
      <Box sx={{ p: 1 }}>
        <InvoiceDetailsSection />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <CustomerInformationSection />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <DeliveryInformationSection />
          </Grid>
        </Grid>

        <InvoiceProductsTable
          products={products}
          onAddProduct={addProduct}
          onRemoveProduct={removeProduct}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceNotesSection />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceSummarySection />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Close />}
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
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 500,
              borderRadius: 2,
              bgcolor: "#1172ba",
              textTransform: "none",
            }}
          >
            Save Invoice
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
