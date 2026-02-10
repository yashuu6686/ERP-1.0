"use client";

export const dynamic = "force-dynamic";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Save from "@mui/icons-material/Save";
import { Search, Business as SupplierIcon } from "@mui/icons-material";
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
import { useNotification } from "@/context/NotificationContext";
import { useRef } from "react";
import PurchasePreviewDialog from "./components/PurchasePreviewDialog";

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
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [approvedSuppliers, setApprovedSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
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
    onSubmit: async () => {
      // Instead of immediate submit, show the preview
      setShowPreview(true);
    },
  });

  const handleFinalSubmit = async () => {
    const values = formik.values;
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
      setLoading(true);
      setShowPreview(false);
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
            link: `/purchase/view-purchase?id=${response.data.id}`,
          });
        }
        showNotification(`Purchase Order ${isEditMode ? "Updated" : "Created"} Successfully!`, "success");
        router.push("/purchase");
      } else {
        showNotification("Failed to save data. Please try again.", "error");
      }
    } catch (error) {
      console.error("Save Error:", error);
      showNotification("Error connecting to the server.", "error");
    } finally {
      setLoading(false);
    }
  };

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
    // Fetch approved suppliers for import
    const fetchApprovedSuppliers = async () => {
      try {
        setLoadingSuppliers(true);
        const response = await axiosInstance.get("/suppliers");
        console.log("All suppliers fetched:", response.data);
        // Only get approved suppliers
        const approved = (response.data || []).filter(s => s.status === "Approved");
        console.log("Approved suppliers:", approved);

        // If no approved suppliers, show all for now
        if (approved.length === 0) {
          console.warn("No approved suppliers found, showing all suppliers");
          setApprovedSuppliers(response.data || []);
        } else {
          setApprovedSuppliers(approved);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoadingSuppliers(false);
      }
    };

    fetchApprovedSuppliers();

    if (isEditMode && id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/purachase/${id}`);
          const data = response.data;
          if (data) {
            if (data.status === "Completed") {
              showNotification("This purchase order is completed and cannot be edited.", "warning");
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
          showNotification("Failed to fetch purchase order data.", "error");
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

  const handleSupplierSelect = (event, supplier) => {
    setSelectedSupplier(supplier);
    if (supplier) {
      formik.setValues({
        ...formik.values,
        supplier: {
          companyName: supplier.supplierName || "",
          contactPerson: supplier.contactPerson || "",
          address: supplier.address || "",
          email: supplier.email || "",
          phone: supplier.phone || "",
          pan: supplier.pan || "",
          gstin: supplier.gstin || "",
        },
      });
      showNotification(`Supplier data imported: ${supplier.supplierName}`, "success");
    }
  };

  if (loading) {
    return <Loader fullPage message="Loading Purchase Order Details..." />;
  }

  return (
    <FormikProvider value={formik}>
      <Box onKeyDown={handleKeyDown} ref={formContainerRef}>
        <CommonCard title={isEditMode ? "Edit Purchase Order" : "Create Purchase Order"}>
          <Box sx={{ p: 1 }}>
            {/* Supplier Import Section - Only for new POs */}
            {!isEditMode && (
              <Box
                sx={{
                  mb: 5,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: "rgba(17, 114, 186, 0.02)",
                  border: "1px solid rgba(17, 114, 186, 0.15)",
                  position: 'relative',
                  overflow: 'hidden',
                  "&::before": {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    bgcolor: '#1172ba'
                  }
                }}
              >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                      <Box sx={{
                        p: 1,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(17, 114, 186, 0.1)',
                        color: '#1172ba',
                        display: 'flex'
                      }}>
                        <SupplierIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 800, letterSpacing: '-0.01em' }}>
                        Quick Start from Approved Supplier
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: { xs: 2, md: 0 }, maxWidth: '500px' }}>
                      Search for an approved supplier to instantly pre-fill company details, contact information, and tax identifiers.
                    </Typography>
                  </Box>

                  <Box sx={{ width: { xs: '100%', md: '450px' } }}>
                    <Autocomplete
                      options={approvedSuppliers}
                      getOptionLabel={(option) => option.supplierName || ""}
                      loading={loadingSuppliers}
                      value={selectedSupplier}
                      onChange={handleSupplierSelect}
                      renderOption={(props, option) => (
                        <Box component="li" {...props} sx={{ borderBottom: '1px solid #f1f5f9', p: 1.5 }}>
                          <Stack spacing={0.5}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1172ba' }}>
                              {option.supplierName}
                            </Typography>
                            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />}>
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Eval: <b>{option.evaluationNo}</b>
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Contact: <b>{option.contactPerson}</b>
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Import Data from Approved Supplier"
                          variant="outlined"
                          placeholder="Type supplier name to search..."
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search sx={{ color: '#1172ba', ml: 1 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <React.Fragment>
                                {loadingSuppliers ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              bgcolor: 'white',
                              borderRadius: 3,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                              "&:hover": { boxShadow: '0 6px 16px rgba(17, 114, 186, 0.08)' }
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </Stack>
              </Box>
            )}

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

        <PurchasePreviewDialog
          open={showPreview}
          onClose={() => setShowPreview(false)}
          onConfirm={handleFinalSubmit}
          data={formik.values}
          totals={totals}
          isEditMode={isEditMode}
        />
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
