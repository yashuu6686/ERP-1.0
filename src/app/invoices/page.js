"use client";
import React, { useState } from "react";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import { Download, Edit, Visibility } from "@mui/icons-material";

const invoicesData = [
  {
    id: 1,
    invoiceNo: "INV-001",
    invoiceDate: "10 Jan 2026",
    dueDate: "20 Jan 2026",
    customer: "ABC Pvt Ltd",
    product: "Product A",
    status: "Generated",
    total: 25000,
    paid: 15000,
    balance: 10000,
    paymentStatus: "Partial",
    orderDate: "05 Jan 2026",
  },
  {
    id: 2,
    invoiceNo: "INV-002",
    invoiceDate: "12 Jan 2026",
    dueDate: "22 Jan 2026",
    customer: "XYZ Industries",
    product: "Product B",
    status: "Generated",
    total: 18000,
    paid: 18000,
    balance: 0,
    paymentStatus: "Paid",
    orderDate: "08 Jan 2026",
  },
];

export default function Invoices() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = invoicesData.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase())
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
          {row.invoiceNo}
        </span>
      ),
    },
    {
      label: "Invoice Date",
      align: "center",
      accessor: "invoiceDate",
    },
    {
      label: "Due Date",
      align: "center",
      accessor: "dueDate",
    },
    {
      label: "Customer Name",
      align: "center",
      accessor: "customer",
    },
    {
      label: "Product",
      align: "center",
      accessor: "product",
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
      render: (row) => `₹${row.total.toLocaleString()}`,
    },
    {
      label: "Paid",
      align: "center",
      render: (row) => `₹${row.paid.toLocaleString()}`,
    },
    {
      label: "Balance",
      align: "center",
      render: (row) => `₹${row.balance.toLocaleString()}`,
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
      label: "Order Date",
      align: "center",
      accessor: "orderDate",
    },
     {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => router.push(`/production-inspection/${row.id}`)}
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
