"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography as MuiTypography,
  Divider,
  Paper,
  Grid as MuiGrid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid as Grid // Keep regular Grid just in case components need it
} from "@mui/material";
import {
  Save,
  ArrowForward,
  ArrowBack,
  LocalShipping,
  Business,
  Person,
  Inventory,
} from "@mui/icons-material";
import CompanyInfoCard from "./components/CompanyInfoCard";
import DispatchInfoCard from "./components/DispatchInfoCard";
import CustomerDeliveryCard from "./components/CustomerDeliveryCard";
import ProductDetailsTable from "./components/ProductDetailsTable";
import PackagingApprovalsCard from "./components/PackagingApprovalsCard";
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "@/components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import NotificationService from "@/services/NotificationService";
import FormReviewDialog from "@/components/ui/FormReviewDialog";

const steps = ["Dispatch Info", "Customer Logistics", "Product Details", "Approvals"];

function CreateDispatchEntryContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [orders, setOrders] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const initialValues = {
    companyName: "Scanbo Engineering Pvt. Ltd.",
    officeAddress: "Mumbai, Maharashtra, India",
    email: "info@scanbo.com",
    phone: "+91 98765 43210",
    dispatchNo: "",
    dispatchDate: new Date().toISOString().split('T')[0],
    trackingNumber: "",
    customerName: "",
    deliveryAddress: "",
    contactPerson: "",
    contactNo: "",
    deliveryDate: new Date().toISOString().split('T')[0],
    courierCompany: "",
    referenceNo: "",
    salesPlatform: "",
    packedBy: "",
    approvedBy: "",
    accountingBy: "",
    products: [{ name: "", quantity: "" }],
    evidence: [],
  };

  const validationSchema = [
    // Step 0: Dispatch Info
    Yup.object({
      dispatchNo: Yup.string().required("Dispatch No is required"),
      dispatchDate: Yup.date().required("Dispatch Date is required"),
      trackingNumber: Yup.string().required("Tracking Number is required"),
    }),
    // Step 1: Customer Logistics
    Yup.object({
      customerName: Yup.string().required("Customer Name is required"),
      deliveryAddress: Yup.string().required("Delivery Address is required"),
      contactPerson: Yup.string().required("Contact Person is required"),
      contactNo: Yup.string().required("Contact No is required"),
      deliveryDate: Yup.date().required("Delivery Date is required"),
      courierCompany: Yup.string().required("Courier Company is required"),
      salesPlatform: Yup.string().required("Sales Platform is required"),
    }),
    // Step 2: Product Details
    Yup.object({
      products: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Name is required"),
          quantity: Yup.number().required("Qty is required").positive("Qty must be positive"),
        })
      ),
    }),
    // Step 3: Approvals
    Yup.object({
      packedBy: Yup.string().required("Packed By is required"),
      evidence: Yup.array().min(1, "At least one evidence file is required"),
      ...(user?.role === 'admin' ? {
        approvedBy: Yup.string().required("Approved By is required"),
        accountingBy: Yup.string().required("Accounting By is required"),
      } : {})
    }),
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema[activeStep],
    enableReinitialize: true,
    onSubmit: async (values) => {
      setShowPreview(true);
    },
  });

  const handleFinalSubmitAction = async () => {
    try {
      setLoading(true);
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

      setShowPreview(false);
      showNotification(`Dispatch Entry ${id ? "Updated" : "Saved"} Successfully!`, "success");
      router.push("/dispatch");
    } catch (error) {
      console.error("Save Error:", error);
      showNotification("Failed to save dispatch entry.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
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
          showNotification("Failed to load dispatch data.", "error");
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
    const newFiles = [...uploadedFiles, ...files];
    setUploadedFiles(newFiles);
    formik.setFieldValue("evidence", newFiles);
  };

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    formik.setFieldValue("evidence", newFiles);
  };

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setActiveStep((prev) => prev + 1);
    } else {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Allow default behavior for submit buttons and opened autocompletes
      if (e.target.type === "submit" || (e.target.ariaExpanded === "true")) {
        return;
      }

      const form = e.currentTarget;
      // Select all interactive elements
      const selector = 'input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])';
      const focusableElements = Array.from(form.querySelectorAll(selector))
        .filter(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            el.tabIndex !== -1 &&
            !el.closest('.MuiAutocomplete-popper'); // avoid elements in popups
        });

      const index = focusableElements.indexOf(e.target);
      if (index > -1) {
        // If we are in the product table or any field, move to next
        if (index < focusableElements.length - 1) {
          const nextElement = focusableElements[index + 1];

          // Skip "Back" button and "Add Product" button if focus shouldn't stop there
          if (nextElement.innerText === "Back" || nextElement.innerText === "Add Product") {
            // Proceed to next if available
            if (index + 2 < focusableElements.length) {
              e.preventDefault();
              focusableElements[index + 2].focus();
              return;
            }
          }

          e.preventDefault();
          nextElement.focus();
        } else {
          // Last field logic
          e.preventDefault();
          if (activeStep < steps.length - 1) {
            handleNext();
          } else {
            formik.handleSubmit();
          }
        }
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CompanyInfoCard />
            <DispatchInfoCard formik={formik} orders={orders} onOrderSelect={handleOrderSelect} />
          </Box>
        );
      case 1:
        return <CustomerDeliveryCard formik={formik} />;
      case 2:
        return <ProductDetailsTable formik={formik} />;
      case 3:
        return <PackagingApprovalsCard
          formik={formik}
          uploadedFiles={uploadedFiles}
          handleFileUpload={handleFileUpload}
          removeFile={removeFile}
        />;
      default: return "Unknown Step";
    }
  };

  if (loading) return <Loader fullPage message={id ? "Updating Dispatch..." : "Saving Dispatch..."} />;

  return (
    <Box onKeyDown={handleKeyDown}>
      <CommonCard title={id ? "Edit Dispatch Entry" : "Create Dispatch Entry"}>
        <Box sx={{ p: 1 }}>
          <Box sx={{ mb: 6, mt: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        '&.Mui-active': { color: '#1172ba' },
                        '&.Mui-completed': { color: '#1172ba' },
                      }
                    }}
                  >
                    <MuiTypography variant="body2" fontWeight={activeStep === index ? 700 : 500}>
                      {label}
                    </MuiTypography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ minHeight: '400px' }}>
            {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 2, borderTop: "1px solid #e0e0e0" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                color: "#64748b",
                "&:hover": { bgcolor: "#f1f5f9" }
              }}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                startIcon={<Save />}
                sx={{
                  borderRadius: 2,
                  px: 6,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#1172ba",
                  "&:hover": { bgcolor: "#0d5a94" }
                }}
              >
                {id ? "Update Dispatch" : "Complete & Ship"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "#1172ba",
                  borderRadius: 2,
                  px: 6,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Next Step
              </Button>
            )}
          </Box>
        </Box>
      </CommonCard>

      <FormReviewDialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleFinalSubmitAction}
        title="Review Dispatch Entry"
        icon={<LocalShipping />}
        headerInfo={{
          label1: "DISPATCH NO",
          value1: formik.values.dispatchNo || "N/A",
          label2: "ORDER REF",
          value2: formik.values.referenceNo || "N/A"
        }}
        confirmLabel={id ? "Confirm & Update" : "Confirm & Ship"}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, p: 1 }}>
          <MuiGrid container spacing={3}>
            {/* 1. Dispatch Details */}
            <MuiGrid size={{ xs: 12 }} >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <LocalShipping sx={{ color: 'var(--brand-primary)', fontSize: 20 }} />
                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Dispatch Details
                </MuiTypography>
              </Box>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <MuiGrid container spacing={2}>
                  {[
                    { label: 'Dispatch Date', value: formik.values.dispatchDate },
                    { label: 'Tracking #', value: formik.values.trackingNumber },
                    { label: 'Carrier', value: formik.values.courierCompany },
                    { label: 'Platform', value: formik.values.salesPlatform }
                  ].map((item, i) => (
                    <MuiGrid size={{ xs: 12 }} key={i}>
                      <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>{item.label}</MuiTypography>
                      <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{item.value || '-'}</MuiTypography>
                    </MuiGrid>
                  ))}
                </MuiGrid>
              </Paper>
            </MuiGrid>

            {/* 2. Customer Information */}
            <MuiGrid size={{ xs: 12 }} >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Business sx={{ color: 'var(--brand-primary)', fontSize: 20 }} />
                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Customer Information
                </MuiTypography>
              </Box>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <MuiGrid container spacing={2}>
                  <MuiGrid size={{ xs: 12 }} >
                    <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Customer Name</MuiTypography>
                    <MuiTypography variant="body2" sx={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{formik.values.customerName || '-'}</MuiTypography>
                  </MuiGrid>
                  <MuiGrid size={{ xs: 12 }} >
                    <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Contact Person</MuiTypography>
                    <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{formik.values.contactPerson || '-'}</MuiTypography>
                  </MuiGrid>
                  <MuiGrid size={{ xs: 12 }} >
                    <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Delivery Address</MuiTypography>
                    <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{formik.values.deliveryAddress || '-'}</MuiTypography>
                  </MuiGrid>
                </MuiGrid>
              </Paper>
            </MuiGrid>

            {/* 3. Product Summary */}
            <MuiGrid size={{ xs: 12 }} >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Inventory sx={{ color: 'var(--brand-primary)', fontSize: 20 }} />
                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Product Summary
                </MuiTypography>
              </Box>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#475569' }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Product Name</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#475569' }}>Qty</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formik.values.products.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ color: '#64748b' }}>{index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{row.name}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MuiGrid>

            {/* 4. Approvals */}
            <MuiGrid size={{ xs: 12 }} >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Person sx={{ color: 'var(--brand-primary)', fontSize: 20 }} />
                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Authorized Personnel
                </MuiTypography>
              </Box>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <MuiGrid container spacing={2}>
                  {[
                    { label: 'Packed By', value: formik.values.packedBy },
                    { label: 'Approved By', value: formik.values.approvedBy },
                    { label: 'Accounting By', value: formik.values.accountingBy }
                  ].map((item, i) => (
                    <MuiGrid size={{ xs: 12 }} >
                      <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>{item.label}</MuiTypography>
                      <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{item.value || '-'}</MuiTypography>
                    </MuiGrid>
                  ))}
                </MuiGrid>
              </Paper>
            </MuiGrid>
          </MuiGrid>
        </Box>
      </FormReviewDialog>
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
