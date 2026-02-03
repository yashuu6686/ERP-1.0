"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Save from "@mui/icons-material/Save";
import Close from "@mui/icons-material/Close";
import CommonCard from "../../../components/CommonCard";
import InvoiceDetailsSection from "./components/InvoiceDetailsSection";
import CustomerInformationSection from "./components/CustomerInformationSection";
import DeliveryInformationSection from "./components/DeliveryInformationSection";
import InvoiceProductsTable from "./components/InvoiceProductsTable";
import InvoiceNotesSection from "./components/InvoiceNotesSection";
import InvoiceSummarySection from "./components/InvoiceSummarySection";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

function InvoiceGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [isOrderLinked, setIsOrderLinked] = useState(false);
  const [lockedFields, setLockedFields] = useState({
    customer: {},
    delivery: {},
    items: [] // IDs of items from order
  });

  const [formData, setFormData] = useState({
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
    status: "Draft",
  });

  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      hsnSac: "",
      qty: "",
      price: "",
      taxPercent: 18,
      taxAmount: 0,
      total: 0,
    },
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders");
        setOrders(Array.isArray(response.data) ? response.data : []);
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
          setFormData({
            invoiceInfo: inv.invoiceInfo || formData.invoiceInfo,
            customer: inv.customer || formData.customer,
            delivery: inv.delivery || formData.delivery,
            notes: inv.notes || formData.notes,
            totals: inv.totals || inv.summary || formData.totals,
            status: inv.status || "Draft",
          });

          const rawItems = inv.items || inv.products || [];
          const mappedItems = rawItems.map(item => ({
            ...item,
            name: item.name || item.itemName,
            qty: item.qty || item.quantity,
            total: item.total || item.amount
          }));

          if (mappedItems.length > 0) {
            setItems(mappedItems);
          }

          if (inv.invoiceInfo?.orderNo) {
            setIsOrderLinked(true);
            const newLocked = { customer: {}, delivery: {}, items: [] };
            Object.keys(inv.customer || {}).forEach(key => {
              if (inv.customer[key]) newLocked.customer[key] = true;
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

        // Map order data to form data
        setFormData(prev => {
          const updated = {
            ...prev,
            invoiceInfo: {
              ...prev.invoiceInfo,
              orderNo: order.orderNo,
            },
            customer: {
              ...prev.customer,
              companyName: order.customerName || prev.customer.companyName,
              address: order.address || prev.customer.address,
              contact: order.contact || prev.customer.contact,
            },
            delivery: {
              ...prev.delivery,
              deliveryAddress: order.address || prev.delivery.deliveryAddress,
              contactPerson: order.customerName || prev.delivery.contactPerson,
              phone: order.contact || prev.delivery.phone,
            }
          };

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

          return updated;
        });

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

        setItems(allItems.length > 0 ? allItems : [{
          id: 1,
          name: "",
          hsnSac: "",
          qty: "",
          price: "",
          taxPercent: 18,
          taxAmount: 0,
          total: 0,
        }]);

        newLocked.items = allItems.map(p => p.id);
        setLockedFields(newLocked);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleItemChange = (itemId, field, value) => {
    setItems(
      items.map((i) => {
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
      })
    );
  };

  const handleSave = async () => {
    try {
      const subtotal = items.reduce((sum, item) => sum + ((parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0)), 0);
      const taxAmount = items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0);
      const discountAmount = parseFloat(formData.totals.discountAmount) || 0;
      const grandTotal = subtotal + taxAmount - discountAmount;

      const payload = {
        ...formData,
        items,
        totals: {
          subtotal,
          taxAmount,
          discountAmount,
          grandTotal,
        },
      };

      if (id) {
        await axiosInstance.put(`/invoices/${id}`, payload);
      } else {
        payload.invoiceInfo.invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        await axiosInstance.post("/invoices", payload);
      }
      router.push("/invoices");
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  if (loading) return <Loader fullPage message="Fetching Invoice Details..." />;

  return (
    <CommonCard title={id ? "Edit Invoice" : "Generate Invoice"}>
      <Box sx={{ p: 1 }}>
        <InvoiceDetailsSection
          formData={formData.invoiceInfo}
          orders={orders}
          selectedOrderId={selectedOrderId}
          onOrderChange={handleOrderChange}
          onChange={(field, value) => handleFieldChange("invoiceInfo", field, value)}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <CustomerInformationSection
              formData={formData.customer}
              lockedFields={lockedFields.customer}
              onChange={(field, value) => handleFieldChange("customer", field, value)}
            />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <DeliveryInformationSection
              formData={formData.delivery}
              lockedFields={lockedFields.delivery}
              onChange={(field, value) => handleFieldChange("delivery", field, value)}
            />
          </Grid>
        </Grid>

        <InvoiceProductsTable
          products={items}
          lockedProductIds={lockedFields.items}
          onProductChange={handleItemChange}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceNotesSection
              formData={formData.notes}
              onChange={(field, value) => handleFieldChange("notes", field, value)}
            />
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <InvoiceSummarySection
              formData={formData.totals}
              products={items}
              onChange={(field, value) => handleFieldChange("totals", field, value)}
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
            onClick={handleSave}
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
