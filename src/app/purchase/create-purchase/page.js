"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Grid } from "@mui/material";
import { Save } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import ItemDetailsTable from "./components/ItemDetailsTable";
import PurchaseSummary from "./components/PurchaseSummary";
import OrderInformation from "./components/OrderInformation";
import SupplierInformation from "./components/SupplierInformation";
import DeliveryInformation from "./components/DeliveryInformation";
import Loader from "../../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";

export default function CreatePurchaseOrder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = !!id;

  const [items, setItems] = useState([
    { name: "", qty: "", price: "", total: 0 },
  ]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (isEditMode && id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/purachase/${id}`);
          const data = response.data;
          if (data) {
            setFormData({
              orderInfo: data.orderInfo,
              supplier: data.supplier,
              delivery: data.delivery,
            });
            setItems(data.items);
            if (data.taxRate) setTaxRate(data.taxRate);
            if (data.discount) setDiscount(data.discount);
            if (data.shippingCharges) setShippingCharges(data.shippingCharges);
            if (data.otherDiscount) setOtherDiscount(data.otherDiscount);
          }
        } catch (error) {
          console.error("Fetch Error:", error);
          alert("Failed to fetch purchase order data.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Auto-generate PO Number for new orders
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const day = String(new Date().getDate()).padStart(2, '0');
      const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      const poNum = `PO-${year}${month}${day}-${random}`;

      setFormData(prev => ({
        ...prev,
        orderInfo: {
          ...prev.orderInfo,
          orderNumber: poNum
        }
      }));
    }
  }, [id, isEditMode]);

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

  const handleManualChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const otherDiscountAmount = (subtotal * otherDiscount) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount + shippingCharges - otherDiscountAmount;

  const handleSave = async () => {
    const finalData = {
      ...formData,
      items,
      totals: { subtotal, taxAmount, discountAmount, grandTotal },
      status: "Pending", // Add status on backend side as requested
      isEdited: isEditMode, // Add isEdited on backend side as requested
    };

    try {
      const response = isEditMode
        ? await axiosInstance.put(`/purachase/${id}`, finalData)
        : await axiosInstance.post(`/purachase`, finalData);

      if (response.status === 200 || response.status === 201) {
        alert(`Purchase Order ${isEditMode ? "Updated" : "Created"} Successfully!`);
        router.push("/purchase");
      } else {
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("Error connecting to the server.");
    }
  };

  if (loading) {
    return <Loader fullPage message="Loading Purchase Order Details..." />;
  }

  return (
    <Box>
      <CommonCard title={isEditMode ? "Edit Purchase Order" : "Create Purchase Order"}>
        <Box sx={{ p: 1 }}>
          <OrderInformation
            data={formData.orderInfo}
            onChange={(field, value) => handleManualChange("orderInfo", field, value)}
          />

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SupplierInformation
                data={formData.supplier}
                onChange={(field, value) => handleManualChange("supplier", field, value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DeliveryInformation
                data={formData.delivery}
                onChange={(field, value) => handleManualChange("delivery", field, value)}
              />
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
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{ backgroundColor: "#1172ba", "&:hover": { backgroundColor: "#0d5a94" }, borderRadius: 2, px: 4, py: 1.5, textTransform: "none", fontWeight: 500 }}
            >
              {isEditMode ? "Update Purchase Order" : "Create Purchase Order"}
            </Button>
          </Box>
        </Box>
      </CommonCard >
    </Box >
  );
}
