"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import { Download, Edit, Visibility } from "@mui/icons-material";
import axiosInstance from "@/axios/axiosInstance";

export default function Invoices() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      console.log("Fetching invoices from API...");
      const response = await axiosInstance.get("/invoices");
      console.log("Invoices fetched:", response.data);
      setInvoices(response.data || []);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      alert("Error fetching invoices: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filtered = invoices.filter(
    (inv) =>
      inv.invoiceInfo?.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer?.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Invoice No.",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.invoiceInfo?.invoiceNumber}
        </span>
      ),
    },
    {
      label: "Invoice Date",
      align: "center",
      render: (row) => row.invoiceInfo?.invoiceDate
    },
    {
      label: "Due Date",
      align: "center",
      render: (row) => row.invoiceInfo?.dueDate
    },
    {
      label: "Customer Name",
      align: "center",
      render: (row) => row.customer?.companyName
    },
    {
      label: "Status",
      align: "center",
      render: (row) => (
        <Chip label={row.status} color="info" size="small" />
      ),
    },
    {
      label: "Total Amount",
      align: "center",
      render: (row) => `₹${row.totals?.grandTotal?.toLocaleString() || 0}`,
    },
    {
      label: "Payment Status",
      align: "center",
      render: (row) => (
        <Chip
          label={row.paymentStatus}
          color={row.paymentStatus === "Paid" ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => router.push(`/invoices/view-invoice?id=${row.id}`)}
              sx={{
                color: "rgb(17, 114, 186)",
                bgcolor: "#f1f5f9",
                "&:hover": { bgcolor: "#e2e8f0" },
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="warning" size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Report">
            <IconButton
              size="small"
              sx={{
                color: "#0891b2",
                bgcolor: "#ecfeff",
                "&:hover": { bgcolor: "#cffafe" },
              }}
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Invoices"
        addText="Generate Invoice"
        onAdd={() => router.push("/invoices/generate-invoice")}
        searchPlaceholder="Search Invoice No, Customer..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
