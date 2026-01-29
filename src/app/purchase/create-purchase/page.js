"use client";
import React, { useState } from "react";
import { Box, Button, Grid, Typography, Card } from "@mui/material";
import { Save, Description, CalendarToday, LocalShipping, Business } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import ItemDetailsTable from "./components/ItemDetailsTable";
import PurchaseSummary from "./components/PurchaseSummary";
import CommonForm from "../../../components/CommonForm/CommonForm";

export default function CreatePurchaseOrder() {
  const [items, setItems] = useState([
    { name: "", qty: "", price: "", total: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [otherDiscount, setOtherDiscount] = useState(0);
  const [formData, setFormData] = useState({
    orderInfo: {
      orderNumber: "",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDelivery: "",
    },
    supplier: {
      companyName: "",
      contactPerson: "",
      address: "",
      email: "",
      phone: "",
      pan: "",
      gstin: "",
    },
    delivery: {
      invoiceTo: "",
      deliverTo: "",
      deliveryAddress: "",
      contactPerson: "",
      phone: "",
      email: "",
    },
  });

  const orderConfig = [
    {
      name: "orderInfo.orderNumber",
      label: "PO Number",
      type: "text",
      size: { xs: 12, md: 4 },
      placeholder: "PO-2024-001",
    },
    {
      name: "orderInfo.orderDate",
      label: "Order Date",
      type: "date",
      size: { xs: 12, md: 4 },
    },
    {
      name: "orderInfo.expectedDelivery",
      label: "Expected Delivery",
      type: "date",
      size: { xs: 12, md: 4 },
    },
  ];

  const supplierConfig = [
    { name: "supplier.companyName", label: "Company Name", type: "text", size: { xs: 12, md: 6 }, placeholder: "ABC Suppliers Pvt Ltd" },
    { name: "supplier.contactPerson", label: "Contact Person", type: "text", size: { xs: 12, md: 6 }, placeholder: "John Doe" },
    { name: "supplier.address", label: "Address", type: "text", size: { xs: 12 }, placeholder: "123 Business Street", multiline: true, rows: 1 },
    { name: "supplier.email", label: "Email", type: "email", size: { xs: 12, md: 6 }, placeholder: "contact@supplier.com" },
    { name: "supplier.phone", label: "Phone", type: "text", size: { xs: 12, md: 6 }, placeholder: "+91 98765 43210" },
    { name: "supplier.pan", label: "PAN Number", type: "text", size: { xs: 12, md: 6 }, placeholder: "ABCDE1234F" },
    { name: "supplier.gstin", label: "GSTIN", type: "text", size: { xs: 12, md: 6 }, placeholder: "22ABCDE1234F1Z5" },
  ];

  const deliveryConfig = [
    { name: "delivery.invoiceTo", label: "Invoice To", type: "text", size: { xs: 12, md: 6 }, placeholder: "Company Name" },
    { name: "delivery.deliverTo", label: "Deliver To", type: "text", size: { xs: 12, md: 6 }, placeholder: "Warehouse/Site" },
    { name: "delivery.deliveryAddress", label: "Delivery Address", type: "text", size: { xs: 12 }, placeholder: "456 Delivery Lane", multiline: true, rows: 1 },
    { name: "delivery.contactPerson", label: "Contact Person", type: "text", size: { xs: 12, md: 6 }, placeholder: "Jane Smith" },
    { name: "delivery.phone", label: "Phone", type: "text", size: { xs: 12, md: 6 }, placeholder: "+91 98765 43210" },
    { name: "delivery.email", label: "Email", type: "email", size: { xs: 12, md: 6 }, placeholder: "delivery@company.com" },
  ];

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

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const clearForm = () => {
    setFormData({
      orderInfo: { orderNumber: "", orderDate: new Date().toISOString().split("T")[0], expectedDelivery: "" },
      supplier: { companyName: "", contactPerson: "", address: "", email: "", phone: "", pan: "", gstin: "" },
      delivery: { invoiceTo: "", deliverTo: "", deliveryAddress: "", contactPerson: "", phone: "", email: "" },
    });
    setItems([{ name: "", qty: "", price: "", total: 0 }]);
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const otherDiscountAmount = (subtotal * otherDiscount) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount + shippingCharges - otherDiscountAmount;

  return (
    <Box>
      <CommonCard title="Create Purchase Order">
        <Box sx={{ p: 1 }}>
          <Card sx={{ mb: 4, background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", border: "1px solid #e9ecef", borderRadius: 2 }}>
            <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid #e9ecef" }}>
              <Description sx={{ color: "#1172ba" }} />
              <Typography variant="h6" fontWeight={600} sx={{ color: "#2d3748" }}>Order Information</Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <CommonForm config={orderConfig} initialValues={formData} onChange={handleFormChange} hideSubmit />
            </Box>
          </Card>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <Box sx={{ p: 2, background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)", color: "white", display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Business />
                  <Typography variant="h6" fontWeight={600}>Supplier Information</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <CommonForm config={supplierConfig} initialValues={formData} onChange={handleFormChange} hideSubmit />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <Box sx={{ p: 2, background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)", color: "white", display: "flex", alignItems: "center", gap: 1.5 }}>
                  <LocalShipping />
                  <Typography variant="h6" fontWeight={600}>Delivery Information</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <CommonForm config={deliveryConfig} initialValues={formData} onChange={handleFormChange} hideSubmit />
                </Box>
              </Card>
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
            shippingCharges={shippingCharges}
            setShippingCharges={setShippingCharges}
            otherDiscount={otherDiscount}
            setOtherDiscount={setOtherDiscount}
            otherDiscountAmount={otherDiscountAmount}
          />

          <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "end", alignItems: "end" }}>
            <Button
              variant="outlined"
              onClick={clearForm}
              sx={{ borderColor: "#1172ba", color: "#1172ba", borderRadius: 2, px: 4, py: 1.5, textTransform: "none", fontWeight: 500 }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={() => console.log("Final Data:", { ...formData, items, totals: { subtotal, taxAmount, discountAmount, grandTotal } })}
              sx={{ backgroundColor: "#1172ba", "&:hover": { backgroundColor: "#0d5a94" }, borderRadius: 2, px: 4, py: 1.5, textTransform: "none", fontWeight: 500 }}
            >
              Create Purchase Order
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
