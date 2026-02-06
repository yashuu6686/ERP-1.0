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
import { useRef } from "react";

const validationSchema = Yup.object().shape({
  orderInfo: Yup.object().shape({
    orderNumber: Yup.number().typeError("PO Number must be a number").min(10000, "PO Number must be at least 5 digits").required("Order Number is required"),
    orderDate: Yup.date().required("Order Date is required"),
    expectedDelivery: Yup.date().required("Expected Delivery Date is required"),
  }),
  supplier: Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    contactPerson: Yup.string().required("Supplier Representative Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email address").required("Supplier Email is required"),
    phone: Yup.number().typeError("Phone must be a number")
      .min(1000000000, "Phone must be exactly 10 digits")
      .max(9999999999, "Phone must be exactly 10 digits")
      .required("Supplier Phone is required"),
    pan: Yup.string().required("PAN Number is required"),
    gstin: Yup.string().required("GSTIN is required"),
  }),
  delivery: Yup.object().shape({
    invoiceTo: Yup.string().required("Invoice To is required"),
    deliverTo: Yup.string().required("Deliver To is required"),
    deliveryAddress: Yup.string().required("Delivery Address is required"),
    contactPerson: Yup.string().required("Recipient Name is required"),
    phone: Yup.number().typeError("Phone must be a number")
      .min(1000000000, "Phone must be exactly 10 digits")
      .max(9999999999, "Phone must be exactly 10 digits")
      .required("Delivery Phone is required"),
    email: Yup.string().email("Invalid email address").required("Delivery Email is required"),
  }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Item Name is required"),
        qty: Yup.number().typeError("Qty must be a number").positive("Quantity must be greater than 0").required("Quantity is required"),
        price: Yup.number().typeError("Price must be a number").min(0, "Price must be non-negative").required("Price is required"),
      })
    )
    .min(1, "At least one item is required"),
  discount: Yup.number().typeError("Must be a number").min(0, "Discount cannot be negative").default(0),
  taxRate: Yup.number().typeError("Must be a number").min(0, "Tax Rate cannot be negative").required("Tax Rate is required").default(18),
  shippingCharges: Yup.number().typeError("Must be a number").min(0, "Shipping charges cannot be negative").default(0),
  otherDiscount: Yup.number().typeError("Must be a number").min(0, "Other discount cannot be negative").default(0),
});

function CreatePurchaseOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = !!id;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const formContainerRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // If Shift + Enter is pressed in a textarea, allow a new line
      if (e.target.tagName === "TEXTAREA" && e.shiftKey) {
        return;
      }

      // Otherwise, prevent default (don't add new line) and move to next field
      if (
        (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") &&
        e.target.type !== "submit" &&
        e.target.type !== "button"
      ) {
        e.preventDefault();
        const allFocusable = Array.from( 
          formContainerRef.current.querySelectorAll("input, select, textarea")
        ).filter((el) => !el.disabled && el.tabIndex !== -1 && el.type !== "hidden" && !el.readOnly);

        const currentIndex = allFocusable.indexOf(e.target);
        if (currentIndex !== -1 && currentIndex < allFocusable.length - 1) {
          allFocusable[currentIndex + 1].focus();
        }
      }
    }
  };

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
      // Using only numbers as per user's request for proper number validation
      const poNum = `${year}${month}${day}${random}`;
      formik.setFieldValue("orderInfo.orderNumber", poNum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  if (loading) {
    return <Loader fullPage message="Loading Purchase Order Details..." />;
  }

  return (
    <FormikProvider value={formik}>
      <Box onKeyDown={handleKeyDown} ref={formContainerRef}>
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
