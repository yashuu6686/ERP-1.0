"use client";
import React, { useState } from "react";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import { Download, Edit, Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import EditIcon from '@mui/icons-material/Edit';

const ordersData = [
  {
    id: 1,
    orderNo: "SO-001",
    products: 5,
    customerName: "ABC Pvt Ltd",
    orderDate: "05 Jan 2026",
    contact: "9876543210",
    address: "Mumbai, India",
    deliveryDate: "15 Jan 2026",
    status: "Pending",
    reference: "REF-001",
  },
  {
    id: 2,
    orderNo: "SO-002",
    products: 3,
    customerName: "XYZ Industries",
    orderDate: "08 Jan 2026",
    contact: "9123456789",
    address: "Pune, India",
    deliveryDate: "18 Jan 2026",
    status: "Completed",
    reference: "REF-002",
  },
];

export default function CustomerOrders() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = ordersData.filter(
    (o) =>
      o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Order No.",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.orderNo}
        </span>
      ),
    },
    {
      label: "Products",
      align: "center",
      accessor: "products",
    },
    {
      label: "Customer Name",
      align: "center",
      accessor: "customerName",
    },
    {
      label: "Order Date",
      align: "center",
      accessor: "orderDate",
    },
    {
      label: "Contact Number",
      align: "center",
      accessor: "contact",
    },
    {
      label: "Customer Address",
      align: "center",
      accessor: "address",
    },
    {
      label: "Delivery Date",
      align: "center",
      accessor: "deliveryDate",
    },
    {
      label: "Order Status",
      align: "center",
      render: (row) => (
        <Chip
          label={row.status}
          color={row.status === "Completed" ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      label: "Order Reference",
      align: "center",
      accessor: "reference",
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
        title="Customer Order"
        addText="Create Order"
        onAdd={() => router.push("/orders/create-new-order")}
        searchPlaceholder="Search Order No, Customer..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
