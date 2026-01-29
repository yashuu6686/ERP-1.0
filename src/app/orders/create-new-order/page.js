"use client";
import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Save } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import OrderInformationSection from "./components/OrderInformationSection";
import FullKitSection from "./components/FullKitSection";
import SingleProductSection from "./components/SingleProductSection";

export default function CreateOrder() {
  const [kitQty, setKitQty] = useState(6);
  const [singleProducts, setSingleProducts] = useState([
    { id: Date.now(), name: "", quantity: "" },
  ]);

  const addProduct = () => {
    setSingleProducts([
      ...singleProducts,
      { id: Date.now(), name: "", quantity: "" },
    ]);
  };

  const removeProduct = (id) => {
    if (singleProducts.length > 1) {
      setSingleProducts(singleProducts.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id, field, value) => {
    setSingleProducts(
      singleProducts.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <CommonCard title="Create New Order">
      <Box sx={{ p: 1 }}>
        <OrderInformationSection />

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <FullKitSection
                kitQty={kitQty}
                setKitQty={setKitQty}
                additionalProducts={singleProducts}
              />
            </Grid>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <SingleProductSection
                products={singleProducts}
                onAddProduct={addProduct}
                onRemoveProduct={removeProduct}
                onUpdateProduct={updateProduct}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
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
            startIcon={<Save />}
            sx={{
              px: 6,
              py: 1.2,
              fontWeight: 500,
              borderRadius: 2,
              backgroundColor: "#1172ba",
              textTransform: "none",
            }}
          >
            Save Order
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
