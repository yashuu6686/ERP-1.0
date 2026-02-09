"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as Yup from "yup";

import Save from "@mui/icons-material/Save";
import Close from "@mui/icons-material/Close";
import CommonCard from "../../../components/ui/CommonCard";
import InvoiceDetailsSection from "./components/InvoiceDetailsSection";
import CustomerInformationSection from "./components/CustomerInformationSection";
import DeliveryInformationSection from "./components/DeliveryInformationSection";
import InvoiceProductsTable from "./components/InvoiceProductsTable";
import InvoiceNotesSection from "./components/InvoiceNotesSection";
import InvoiceSummarySection from "./components/InvoiceSummarySection";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import { Receipt, Person, LocalShipping, Inventory, Assignment } from "@mui/icons-material";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import FormReviewDialog from "@/components/ui/FormReviewDialog";

const validationSchema = Yup.object({
  invoiceInfo: Yup.object({
    orderNo: Yup.string().required("Order Number is required"),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    invoiceDate: Yup.date().required("Invoice Date is required"),
    dueDate: Yup.date().required("Due Date is required"),
  }),
  customer: Yup.object({
    companyName: Yup.string().required("Customer Name is required"),
    organization: Yup.string().required("Organization is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string().required("Contact No. is required"),
  }),
  delivery: Yup.object({
    deliveryAddress: Yup.string().required("Delivery Address is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    phone: Yup.string().required("Phone is required"),
  }),
  items: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Item Name is required"),
      qty: Yup.number().required("Qty is required").positive("Qty must be positive"),
      price: Yup.number().required("Price is required").positive("Price must be positive"),
    })
  ).min(1, "At least one product is required"),
});

function InvoiceGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const orderIdParam = searchParams.get("orderId");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [isOrderLinked, setIsOrderLinked] = useState(false);
  const [lockedFields, setLockedFields] = useState({
    customer: {},
    delivery: {},
    items: [] // IDs of items from order
  });
  const [showPreview, setShowPreview] = useState(false);

  const formik = useFormik({
    initialValues: {
      invoiceInfo: {
        invoiceNumber: "",
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        orderNo: "",
      },
      customer: {
        companyName: "",
        organization: "",
        address: "",
        contact: "",
        drugLicence: "",
      },
      delivery: {
        deliveryAddress: "",
        contactPerson: "",
        phone: "",
        email: "",
      },
      notes: {
        termsAndConditions: "",
        additionalNotes: "",
      },
      totals: {
        subtotal: 0,
        taxAmount: 0,
        discountAmount: 0,
        grandTotal: 0,
      },
      items: [{
        id: 1,
        name: "",
        hsnSac: "",
        qty: "",
        price: "",
        taxPercent: 18,
        taxAmount: 0,
        total: 0,
      }],
      status: "Draft",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setShowPreview(true);
    },
  });

  const handleFinalSubmit = async () => {
    const values = formik.values;
    try {
      setLoading(true);
      setShowPreview(false);
      const subtotal = values.items.reduce((sum, item) => sum + ((parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0)), 0);
      const taxAmount = values.items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0);
      const discountAmount = parseFloat(values.totals.discountAmount) || 0;
      const grandTotal = subtotal + taxAmount - discountAmount;

      const payload = {
        ...values,
        notes: values.notes,
        totals: {
          subtotal,
          taxAmount,
          discountAmount,
          grandTotal,
        },
      };

      console.log("Saving Invoice Payload:", payload);

      if (id) {
        await axiosInstance.put(`/invoices/${id}`, payload);
      } else {
        if (!payload.invoiceInfo.invoiceNumber) {
          payload.invoiceInfo.invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        }
        await axiosInstance.post("/invoices", payload);
      }

      if (selectedOrderId) {
        try {
          await axiosInstance.patch(`/orders/${selectedOrderId}`, {
            status: "Confirmed"
          });
        } catch (orderError) {
          console.error("Error updating order status:", orderError);
        }
      }

      router.push("/invoices");
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders");
        const allOrders = Array.isArray(response.data) ? response.data : [];
        setOrders(allOrders.filter(order => order.status === "Pending"));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/invoices/${id}`);
        if (response.data) {
          const inv = response.data;

          const rawItems = inv.items || inv.products || [];
          const mappedItems = rawItems.map(item => ({
            ...item,
            name: item.name || item.itemName,
            qty: item.qty || item.quantity,
            total: item.total || item.amount
          }));

          formik.setValues({
            id: inv.id,
            _isEdit: true,
            invoiceInfo: inv.invoiceInfo || formik.initialValues.invoiceInfo,
            customer: inv.customer || formik.initialValues.customer,
            delivery: inv.delivery || formik.initialValues.delivery,
            notes: inv.notes || formik.initialValues.notes,
            totals: inv.totals || inv.summary || formik.initialValues.totals,
            items: mappedItems.length > 0 ? mappedItems : formik.initialValues.items,
            status: inv.status || "Draft",
          });

          if (inv.invoiceInfo?.orderNo) {
            setIsOrderLinked(true);
            const newLocked = { customer: {}, delivery: {}, items: [] };
            Object.keys(inv.customer || {}).forEach(key => {
              if (inv.customer[key] && key !== 'organization' && key !== 'drugLicence') {
                newLocked.customer[key] = true;
              }
            });
            Object.keys(inv.delivery || {}).forEach(key => {
              if (inv.delivery[key]) newLocked.delivery[key] = true;
            });
            newLocked.items = mappedItems.map(p => p.id);
            setLockedFields(newLocked);
          }
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    if (id) {
      fetchInvoice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOrderChange = async (orderId) => {
    setSelectedOrderId(orderId);
    if (!orderId) {
      setIsOrderLinked(false);
      setLockedFields({ customer: {}, delivery: {}, items: [] });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/orders/${orderId}`);
      const order = response.data;

      if (order) {
        setIsOrderLinked(true);
        const newLocked = { customer: {}, delivery: {}, items: [] };

        // Combine Kit and Single Products
        let allItems = [];
        let currentId = 1;

        if (order.kitQty && order.kitQty > 0) {
          allItems.push({
            id: currentId++,
            name: "Standard Kit Allocation (D8)",
            hsnSac: "",
            qty: order.kitQty,
            price: "",
            taxPercent: 18,
            taxAmount: 0,
            total: 0,
          });
        }

        if (order.singleProducts && order.singleProducts.length > 0) {
          order.singleProducts.forEach(p => {
            allItems.push({
              id: currentId++,
              name: p.name || "",
              hsnSac: "",
              qty: p.quantity || "",
              price: "",
              taxPercent: 18,
              taxAmount: 0,
              total: 0,
            });
          });
        }

        formik.setValues({
          ...formik.values,
          invoiceInfo: {
            ...formik.values.invoiceInfo,
            orderNo: order.orderNo,
          },
          customer: {
            ...formik.values.customer,
            companyName: order.customerName || formik.values.customer.companyName,
            address: order.address || formik.values.customer.address,
            contact: order.contact || formik.values.customer.contact,
          },
          delivery: {
            ...formik.values.delivery,
            deliveryAddress: order.address || formik.values.delivery.deliveryAddress,
            contactPerson: order.customerName || formik.values.delivery.contactPerson,
            phone: order.contact || formik.values.delivery.phone,
          },
          items: allItems.length > 0 ? allItems : formik.initialValues.items,
        });

        if (order.customerName) newLocked.customer.companyName = true;
        if (order.address) {
          newLocked.customer.address = true;
          newLocked.delivery.deliveryAddress = true;
        }
        if (order.customerName) newLocked.delivery.contactPerson = true;
        if (order.contact) {
          newLocked.customer.contact = true;
          newLocked.delivery.phone = true;
        }

        newLocked.items = (allItems.length > 0 ? allItems : [{ id: 1 }]).map(p => p.id);
        setLockedFields(newLocked);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section, field, value) => {
    formik.setFieldValue(`${section}.${field}`, value);
  };

  const handleItemChange = (itemId, field, value) => {
    const updatedItems = formik.values.items.map((i) => {
      if (i.id === itemId) {
        const updated = { ...i, [field]: value };
        if (field === "qty" || field === "price" || field === "taxPercent") {
          const qty = parseFloat(updated.qty) || 0;
          const price = parseFloat(updated.price) || 0;
          const taxPercent = parseFloat(updated.taxPercent) || 0;
          const subtotal = qty * price;
          updated.taxAmount = (subtotal * taxPercent) / 100;
          updated.total = subtotal + updated.taxAmount;
        }
        return updated;
      }
      return i;
    });
    formik.setFieldValue("items", updatedItems);
  };

  useEffect(() => {
    if (orderIdParam && !id) {
      handleOrderChange(orderIdParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderIdParam, id]);

  if (loading) return <Loader fullPage message="Fetching Invoice Details..." />;

  return (
    <CommonCard title={id ? "Edit Invoice" : "Generate Invoice"}>
      <Box sx={{ p: 1 }}>
        <InvoiceDetailsSection
          formik={formik}
          orders={orders}
          selectedOrderId={selectedOrderId}
          onOrderChange={handleOrderChange}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <CustomerInformationSection
              formik={formik}
              lockedFields={lockedFields.customer}
            />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <DeliveryInformationSection
              formik={formik}
              lockedFields={lockedFields.delivery}
            />
          </Grid>
        </Grid>

        <InvoiceProductsTable
          formik={formik}
          lockedProductIds={lockedFields.items}
          onProductChange={handleItemChange}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceNotesSection
              formik={formik}
            />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceSummarySection
              formik={formik}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Close />}
            onClick={() => router.push("/invoices")}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 500,
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
            size="large"
            startIcon={<Save />}
            onClick={formik.handleSubmit}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 500,
              borderRadius: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              textTransform: "none",
            }}
          >
            {id ? "Update Invoice" : "Save Invoice"}
          </Button>
        </Box>
      </Box>
      <FormReviewDialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleFinalSubmit}
        title="Review Invoice"
        icon={<Receipt />}
        headerInfo={{
          label1: "INVOICE NO",
          value1: formik.values.invoiceInfo.invoiceNumber || "Auto-Generated",
          label2: "INVOICE DATE",
          value2: formik.values.invoiceInfo.invoiceDate
        }}
        confirmLabel={id ? "Confirm & Update" : "Confirm & Save"}
      >
        <Grid container spacing={3}>
          {/* Order & Due Date Info */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 4, mb: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 0.5 }}>ORDER NUMBER</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {orders.find(o => o.id === selectedOrderId)?.orderNo || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 0.5 }}>DUE DATE</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formik.values.invoiceInfo.dueDate}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Customer & Delivery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: 'white', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#1172ba' }}>
                <Person sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Customer Details</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>{formik.values.customer.companyName}</Typography>
                <Typography variant="caption" color="textSecondary">Org: {formik.values.customer.organization}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{formik.values.customer.address}</Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>Ph: {formik.values.customer.contact}</Typography>
                  {formik.values.customer.drugLicence && (
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>DL: {formik.values.customer.drugLicence}</Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: 'white', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#1172ba' }}>
                <LocalShipping sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Delivery To</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>{formik.values.delivery.contactPerson}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{formik.values.delivery.deliveryAddress}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>Ph: {formik.values.delivery.phone}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Items Table */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Item</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>HSN</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Qty</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Price</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Tax %</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formik.values.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{item.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="textSecondary">{item.hsnSac}</Typography>
                      </TableCell>
                      <TableCell align="right">{item.qty}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.taxPercent}%</TableCell>
                      <TableCell align="right" fontWeight={600}>{parseFloat(item.total || 0).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* Notes Section */}
          {(formik.values.notes.termsAndConditions || formik.values.notes.additionalNotes) && (
            <Grid size={{ xs: 12 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#1172ba' }}>
                  <Assignment sx={{ fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Notes & Terms</Typography>
                </Box>
                <Grid container spacing={2}>
                  {formik.values.notes.termsAndConditions && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>TERMS & CONDITIONS</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{formik.values.notes.termsAndConditions}</Typography>
                    </Grid>
                  )}
                  {formik.values.notes.additionalNotes && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>ADDITIONAL NOTES</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{formik.values.notes.additionalNotes}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          )}

          {/* Totals */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary" display="block">Subtotal</Typography>
                <Typography variant="body2" fontWeight={600}>{parseFloat(formik.values.totals.subtotal || 0).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary" display="block">Discount</Typography>
                <Typography variant="body2" fontWeight={600}>{parseFloat(formik.values.totals.discountAmount || 0).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary" display="block">Tax</Typography>
                <Typography variant="body2" fontWeight={600}>{parseFloat(formik.values.totals.taxAmount || 0).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary" display="block">Total</Typography>
                <Typography variant="h6" color="#1172ba" fontWeight={700}>{parseFloat(formik.values.totals.grandTotal || 0).toFixed(2)}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FormReviewDialog>
    </CommonCard>
  );
}

export default function InvoiceGenerator() {
  return (
    <Suspense fallback={<Loader fullPage message="Loading..." />}>
      <InvoiceGeneratorContent />
    </Suspense>
  );
}
