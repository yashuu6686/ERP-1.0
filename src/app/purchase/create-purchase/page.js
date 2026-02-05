"use client";

export const dynamic = "force-dynamic";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Save from "@mui/icons-material/Save";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import CommonCard from "../../../components/ui/CommonCard";
import ItemDetailsTable from "./components/ItemDetailsTable";
import PurchaseSummary from "./components/PurchaseSummary";
import OrderInformation from "./components/OrderInformation";
import SupplierInformation from "./components/SupplierInformation";
import DeliveryInformation from "./components/DeliveryInformation";
import Loader from "../../../components/ui/Loader";
import axiosInstance from "@/axios/axiosInstance";
import NotificationService from "@/services/NotificationService";
import { useAuth } from "@/context/AuthContext";

const validationSchema = Yup.object().shape({
  orderInfo: Yup.object().shape({
    orderNumber: Yup.string().required("Required"),
    orderDate: Yup.date().required("Required"),
    expectedDelivery: Yup.date().required("Required"),
  }),
  supplier: Yup.object().shape({
    companyName: Yup.string().required("Required"),
    contactPerson: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    pan: Yup.string().required("Required"),
    gstin: Yup.string().required("Required"),
  }),
  delivery: Yup.object().shape({
    invoiceTo: Yup.string().required("Required"),
    deliverTo: Yup.string().required("Required"),
    deliveryAddress: Yup.string().required("Required"),
    contactPerson: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        qty: Yup.number().positive("Must be > 0").required("Required"),
        price: Yup.number().min(0, "Must be >= 0").required("Required"),
      })
    )
    .min(1, "At least one item required"),
  discount: Yup.number().min(0, "Invalid").default(0),
  taxRate: Yup.number().min(0, "Invalid").required("Required").default(18),
  shippingCharges: Yup.number().min(0, "Invalid").default(0),
  otherDiscount: Yup.number().min(0, "Invalid").default(0),
});

function CreatePurchaseOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = !!id;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      items: [{ name: "", qty: "", price: "", total: 0 }],
      taxRate: 18,
      discount: 0,
      shippingCharges: 0,
      otherDiscount: 0,
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
      status: "Pending",
    },
    validationSchema,
    onSubmit: async (values) => {
      const calculation = calculateTotals(values);
      const finalData = {
        ...values,
        totals: calculation.totals,
        isEdited: isEditMode,
        creatorId: user?.id,
        creatorName: user?.name,
        status: isEditMode ? values.status : "Pending",
      };

      try {
        const response = isEditMode
          ? await axiosInstance.put(`/purachase/${id}`, finalData)
          : await axiosInstance.post(`/purachase`, finalData);

        if (response.status === 200 || response.status === 201) {
          if (!isEditMode) {
            await NotificationService.createNotification({
              title: "New PO for Approval",
              message: `${user?.name} has created PO #${values.orderInfo.orderNumber}. Needs approval.`,
              targetRole: "admin",
              poId: response.data.id,
              link: `/purchase/view-purchase?id=${response.data.id}`
            });
          }
          alert(`Purchase Order ${isEditMode ? "Updated" : "Created"} Successfully!`);
          router.push("/purchase");
        } else {
          alert("Failed to save data. Please try again.");
        }
      } catch (error) {
        console.error("Save Error:", error);
        alert("Error connecting to the server.");
      }
    },
  });

  const calculateTotals = (values) => {
    const subtotal = values.items.reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.price) || 0), 0);
    const taxAmount = (subtotal * (parseFloat(values.taxRate) || 0)) / 100;
    const discountAmount = (subtotal * (parseFloat(values.discount) || 0)) / 100;
    const otherDiscountAmount = (subtotal * (parseFloat(values.otherDiscount) || 0)) / 100;
    const grandTotal = subtotal + taxAmount - discountAmount + (parseFloat(values.shippingCharges) || 0) - otherDiscountAmount;

    return {
      subtotal,
      taxAmount,
      discountAmount,
      otherDiscountAmount,
      grandTotal,
      totals: { subtotal, taxAmount, discountAmount, otherDiscountAmount, grandTotal }
    };
  };

  const totals = useMemo(() => calculateTotals(formik.values), [formik.values]);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/purachase/${id}`);
          const data = response.data;
          if (data) {
            if (data.status === "Completed") {
              alert("This purchase order is completed and cannot be edited.");
              router.push("/purchase");
              return;
            }
            formik.setValues({
              items: data.items.map(item => ({
                ...item,
                qty: item.qty || "",
                price: item.price || "",
                total: (parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0)
              })),
              taxRate: data.taxRate ?? 18,
              discount: data.discount ?? 0,
              shippingCharges: data.shippingCharges ?? 0,
              otherDiscount: data.otherDiscount ?? 0,
              orderInfo: data.orderInfo,
              supplier: data.supplier,
              delivery: data.delivery,
              status: data.status,
            });
          }
        } catch (error) {
          console.error("Fetch Error:", error);
          alert("Failed to fetch purchase order data.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (!isEditMode) {
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const day = String(new Date().getDate()).padStart(2, '0');
      const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      const poNum = `PO-${year}${month}${day}-${random}`;
      formik.setFieldValue("orderInfo.orderNumber", poNum);
    }
  }, [id, isEditMode]);

  if (loading) {
    return <Loader fullPage message="Loading Purchase Order Details..." />;
  }

  return (
    <FormikProvider value={formik}>
      <Box>
        <CommonCard title={isEditMode ? "Edit Purchase Order" : "Create Purchase Order"}>
          <Box sx={{ p: 1 }}>
            <OrderInformation />

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <SupplierInformation />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <DeliveryInformation />
              </Grid>
            </Grid>

            <ItemDetailsTable />

            <PurchaseSummary
              subtotal={totals.subtotal}
              taxAmount={totals.taxAmount}
              discountAmount={totals.discountAmount}
              otherDiscountAmount={totals.otherDiscountAmount}
              grandTotal={totals.grandTotal}
            />

            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "end", alignItems: "end" }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={formik.handleSubmit}
                sx={{ backgroundColor: "#1172ba", "&:hover": { backgroundColor: "#0d5a94" }, borderRadius: 2, px: 4, py: 1.5, textTransform: "none", fontWeight: 500 }}
              >
                {isEditMode ? "Update Purchase Order" : "Create Purchase Order"}
              </Button>
            </Box>
          </Box>
        </CommonCard >
      </Box >
    </FormikProvider>
  );
}

export default function CreatePurchaseOrder() {
  return (
    <Suspense fallback={<Loader fullPage message="Loading..." />}>
      <CreatePurchaseOrderContent />
    </Suspense>
  );
}
