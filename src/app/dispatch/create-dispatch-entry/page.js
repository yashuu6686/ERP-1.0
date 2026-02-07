"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import DispatchPreviewDialog from "./components/DispatchPreviewDialog";
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "../../../components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";

function CreateDispatchEntryContent() {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [orders, setOrders] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    companyName: "Scanbo Engineering Pvt. Ltd.",
    officeAddress: "Mumbai, Maharashtra, India",
    email: "info@scanbo.com",
    phone: "+91 98765 43210",
    dispatchNo: "",
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
    products: [{ name: "", quantity: "" }],
  };

  const validationSchema = Yup.object().shape({
    dispatchNo: Yup.string().required("Dispatch No is required"),
    dispatchDate: Yup.date().required("Dispatch Date is required"),
    trackingNumber: Yup.string().required("Tracking Number is required"),
    customerName: Yup.string().required("Customer Name is required"),
    deliveryAddress: Yup.string().required("Delivery Address is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    contactNo: Yup.string().required("Contact No is required"),
    deliveryDate: Yup.date().required("Delivery Date is required"),
    courierCompany: Yup.string().required("Courier Company is required"),
    salesPlatform: Yup.string().required("Sales Platform is required"),
    packedBy: Yup.string().required("Packed By is required"),
    products: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required("Product name is required")
      })
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      setOpenPreview(true);
    }
  });

  const handleActualSubmit = async () => {
    try {
      setSubmitting(true);
      const values = formik.values;
      const isHR = user?.role === 'hr';
      const status = isHR ? "Pending Approval" : "Shipped";

      const payload = {
        shipmentInfo: {
          dispatchNo: values.dispatchNo,
          trackingNumber: values.trackingNumber,
          shippingDate: values.dispatchDate,
          expectedDelivery: values.deliveryDate,
          carrier: values.courierCompany,
          platform: values.salesPlatform,
        },
        customer: {
          companyName: values.customerName,
          contactPerson: values.contactPerson,
          address: values.deliveryAddress,
          phone: values.contactNo,
          email: values.email,
        },
        items: values.products.map(p => ({
          name: p.name,
          qty: parseInt(p.quantity),
          serialNo: "-",
          weight: "-"
        })),
        status: status,
        packedBy: values.packedBy,
        approvedBy: values.approvedBy,
        accountingBy: values.accountingBy,
      };

      let response;
      if (id) {
        response = await axiosInstance.put(`/dispatches/${id}`, payload);
      } else {
        response = await axiosInstance.post("/dispatches", payload);
      }

      if (isHR && (response.status === 201 || response.status === 200)) {
        await NotificationService.createNotification({
          title: "Dispatch Approval Required",
          message: `HR ${user.name} has submitted a dispatch entry for ${values.customerName || 'a customer'} (Dispatch: ${values.dispatchNo}).`,
          targetRole: "admin",
          type: "dispatch_approval",
          link: `/dispatch/view-dispatch?id=${id || response.data.id}`,
          inspectionId: id || response.data.id
        });
      }

      alert(`Dispatch Entry ${id ? "Updated" : "Saved"} Successfully!`);
      setOpenPreview(false);
      router.push("/dispatch");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save dispatch entry.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();

    if (id) {
      const fetchDispatch = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/dispatches/${id}`);
          const data = response.data;

          formik.setValues({
            companyName: data.customer?.companyName || "Scanbo Engineering Pvt. Ltd.",
            officeAddress: data.customer?.address || "Mumbai, Maharashtra, India",
            email: data.customer?.email || "info@scanbo.com",
            phone: data.customer?.phone || "+91 98765 43210",
            dispatchNo: data.shipmentInfo?.dispatchNo || data.shipmentInfo?.orderNumber || "",
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
            products: data.items && data.items.length > 0
              ? data.items.map(item => ({ name: item.name || "", quantity: item.qty || "" }))
              : [{ name: "", quantity: "" }],
          });
        } catch (error) {
          console.error("Failed to fetch dispatch:", error);
          alert("Failed to load dispatch data.");
        } finally {
          setLoading(false);
        }
      };
      fetchDispatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOrderSelect = (order) => {
    if (!order) return;

    formik.setValues({
      ...formik.values,
      customerName: order.customerName || "",
      contactPerson: order.contactPerson || "",
      email: order.email || "",
      contactNo: order.phone || "",
      deliveryAddress: order.address || "",
      referenceNo: order.orderId || order.orderNo || "",
      products: order.products && Array.isArray(order.products)
        ? order.products.map(p => ({
          name: p.productName || p.name || "",
          quantity: p.quantity || ""
        }))
        : formik.values.products,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  if (loading) return <Loader fullPage message={id ? "Updating Dispatch..." : "Saving Dispatch..."} />;

  return (
    <Box>
      <CommonCard title={id ? "Edit Dispatch Entry" : "Create Dispatch Entry"}>
        <Box sx={{ p: 1 }}>
          <CompanyInfoCard />
          <DispatchInfoCard
            formik={formik}
            orders={orders}
            onOrderSelect={handleOrderSelect}
          />
          <CustomerDeliveryCard
            formik={formik}
          />
          <ProductDetailsTable
            formik={formik}
          />
          <PackagingApprovalsCard
            formik={formik}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={formik.handleSubmit}
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

          <DispatchPreviewDialog
            open={openPreview}
            onClose={() => setOpenPreview(false)}
            onConfirm={handleActualSubmit}
            values={formik.values}
            loading={submitting}
          />
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
