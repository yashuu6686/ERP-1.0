"use client";
import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Save } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import OrderInformation from "./components/OrderInformation";
import SupplierInformation from "./components/SupplierInformation";
import DeliveryInformation from "./components/DeliveryInformation";
import ItemDetailsTable from "./components/ItemDetailsTable";
import PurchaseSummary from "./components/PurchaseSummary";

export default function CreatePurchaseOrder() {
  const [items, setItems] = useState([
    { name: "", qty: "", price: "", total: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    updated[index].total =
      (parseFloat(updated[index].qty) || 0) *
      (parseFloat(updated[index].price) || 0);
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: "", price: "", total: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount;

  return (
    <Box>
      <CommonCard title="Create Purchase Order">
        <Box sx={{ p: 1 }}>
          <OrderInformation />

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <SupplierInformation />
            </Grid>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <DeliveryInformation />
            </Grid>
          </Grid>

          <ItemDetailsTable
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            handleItemChange={handleItemChange}
          />

          <PurchaseSummary
            subtotal={subtotal}
            taxRate={taxRate}
            setTaxRate={setTaxRate}
            discount={discount}
            setDiscount={setDiscount}
            taxAmount={taxAmount}
            discountAmount={discountAmount}
            grandTotal={grandTotal}
          />

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              justifyContent: "end",
              alignItems: "end",
            }}
          >
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
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              sx={{
                backgroundColor: "#1172ba",
                "&:hover": { backgroundColor: "#0d5a94" },
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Create Purchase Order
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
