"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Save from "@mui/icons-material/Save";
import CommonCard from "../../../components/CommonCard";
import OrderInformationSection from "./components/OrderInformationSection";
import FullKitSection from "./components/FullKitSection";
import SingleProductSection from "./components/SingleProductSection";

import { useRouter } from "next/navigation";
import axiosInstance from "../../../axios/axiosInstance";

const validationSchema = Yup.object({
  orderNo: Yup.string().required("Order Number is required"),
  customerName: Yup.string().required("Customer Name is required"),
  orderDate: Yup.date().required("Order Date is required"),
  contact: Yup.string().required("Contact Number is required"),
  address: Yup.string().required("Customer Address is required"),
  deliveryDate: Yup.date().required("Delivery Date is required"),
});

export default function CreateOrder() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      orderNo: "",
      customerName: "",
      orderDate: "",
      contact: "",
      address: "",
      deliveryDate: "",
      status: "Pending",
      reference: "",
      kitQty: 6,
      singleProducts: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const kitComponents = [
        "Scanbo D8 Device",
        "BP Cuffs",
        "Large BP Cuff",
        "Glucose Bottles",
        "Lancet Pouch",
        "Lancet Pen",
        "USB Cable",
        "Plastic Shield",
        "Scanbo Jute Bag"
      ];

      const newOrder = {
        ...values,
        products: values.singleProducts.length,
        kitQty: values.kitQty,
        singleProducts: values.singleProducts.filter(p => p.name || p.quantity),
        reference: values.reference || "REF-" + Math.floor(Math.random() * 1000),
      };

      try {
        setLoading(true);
        // 1. Save the order
        await axiosInstance.post("/orders", newOrder);

        // 2. Fetch store data to update quantities
        const storeRes = await axiosInstance.get("/store");
        const storeItems = storeRes.data;

        // 3. Update store quantities for each kit component
        const updatePromises = storeItems
          .filter(item => kitComponents.includes(item.name))
          .map(item => {
            const newQty = Math.max(0, (item.available || 0) - values.kitQty);
            return axiosInstance.patch(`/store/${item.id}`, {
              available: newQty,
              updated: new Date().toISOString().split('T')[0]
            });
          });

        // Also handle additional products if they exist in store
        const additionalUpdatePromises = values.singleProducts
          .filter(p => p.name && p.quantity)
          .map(p => {
            const matchingStoreItem = storeItems.find(item => item.name.toLowerCase() === p.name.toLowerCase());
            if (matchingStoreItem) {
              const newQty = Math.max(0, (matchingStoreItem.available || 0) - Number(p.quantity));
              return axiosInstance.patch(`/store/${matchingStoreItem.id}`, {
                available: newQty,
                updated: new Date().toISOString().split('T')[0]
              });
            }
            return null;
          })
          .filter(promise => promise !== null);

        await Promise.all([...updatePromises, ...additionalUpdatePromises]);

        router.push("/orders");
      } catch (error) {
        console.error("Error saving order or updating store:", error);
        alert("Failed to save order or update inventory");
      } finally {
        setLoading(false);
      }
    },
  });

  const [loading, setLoading] = useState(false);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>;

  return (
    <CommonCard title="Create New Order">
      <Box sx={{ p: 1 }}>
        <OrderInformationSection formik={formik} />

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <FullKitSection formik={formik} />
            </Grid>
            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
              <SingleProductSection formik={formik} />
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
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
            onClick={formik.handleSubmit}
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
