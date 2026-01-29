"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
} from "@mui/material";
import {
  LocalShipping,
  Visibility,
  Edit,
  Delete,
  Download,
  CheckCircle,
  Schedule,
  Warning,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import DispatchMobileCard from "./components/DispatchMobileCard";
import GlobalTable from "../../components/GlobalTable";

const dispatchData = [
  {
    id: 1,
    order: "SO-001",
    product: "D8 Machine",
    status: "Shipped",
    orderDate: "2026-01-10",
    shippingDate: "2026-01-12",
    platform: "Direct Sales",
    contact: "Ramesh Kumar",
    address: "Mumbai, Maharashtra, India",
    tracking: "TRK-889900",
  },
  {
    id: 2,
    order: "SO-002",
    product: "Valve System",
    status: "Pending",
    orderDate: "2026-01-11",
    shippingDate: "-",
    platform: "Online",
    contact: "Suresh Patel",
    address: "Pune, Maharashtra, India",
    tracking: "-",
  },
  {
    id: 3,
    order: "SO-003",
    product: "Hydraulic Pump",
    status: "Processing",
    orderDate: "2026-01-15",
    shippingDate: "-",
    platform: "Direct Sales",
    contact: "Amit Sharma",
    address: "Delhi, India",
    tracking: "-",
  },
  {
    id: 4,
    order: "SO-004",
    product: "Control Panel",
    status: "Delivered",
    orderDate: "2026-01-08",
    shippingDate: "2026-01-10",
    platform: "Online",
    contact: "Priya Singh",
    address: "Bangalore, Karnataka, India",
    tracking: "TRK-778899",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Shipped":
      return { bg: "#d1ecf1", color: "#0c5460" };
    case "Delivered":
      return { bg: "#d4edda", color: "#155724" };
    case "Pending":
      return { bg: "#fff3cd", color: "#856404" };
    case "Processing":
      return { bg: "#e2e3e5", color: "#383d41" };
    default:
      return { bg: "#f8d7da", color: "#721c24" };
  }
};

const formatDate = (dateString) => {
  if (dateString === "-") return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function DispatchDetails() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const filtered = dispatchData.filter(
    (item) =>
      item.order.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase()) ||
      item.tracking.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      sx: { width: "60px" },
      render: (row, index) => <span style={{ color: "#6c757d" }}>{index + 1}</span>,
    },
    {
      label: "Order Details",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1172ba" }}>
          {row.order}
        </Typography>
      ),
    },
    {
      label: "Product",
      align: "center",
      render: (row) => <span style={{ fontWeight: 500 }}>{row.product}</span>,
    },
    {
      label: "Status",
      align: "center",
      render: (row) => {
        const { bg, color } = getStatusColor(row.status);
        return (
          <Chip
            label={row.status}
            size="small"
            sx={{
              backgroundColor: bg,
              color: color,
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        );
      },
    },
    {
      label: "Order Date",
      align: "center",
      render: (row) => formatDate(row.orderDate),
    },
    {
      label: "Shipping Date",
      align: "center",
      render: (row) => formatDate(row.shippingDate),
    },
    {
      label: "Sales Platform",
      align: "center",
      accessor: "platform",
    },
    {
      label: "Contact Person",
      align: "center",
      accessor: "contact",
    },
    {
      label: "Address",
      align: "center",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            maxWidth: "130px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.address}
        </Typography>
      ),
    },
    {
      label: "Tracking Info",
      align: "center",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: row.tracking === "-" ? "#999" : "#1172ba",
          }}
        >
          {row.tracking}
        </Typography>
      ),
    },
    {
      label: "Evidence",
      align: "center",
      render: (row) => (
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
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/dispatch/${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton color="warning" size="small">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#dc2626",
              bgcolor: "#fef2f2",
              "&:hover": { bgcolor: "#fee2e2" },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Dispatch Details"
        addText={isSmall ? "Create" : "Create Dispatch Entry"}
        onAdd={() => router.push("/dispatch/create-dispatch-entry")}
        searchPlaceholder="Search Order, Product, Contact, Tracking..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        {!isMobile ? (
          <GlobalTable columns={columns} data={filtered} />
        ) : (
          <Box>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <DispatchMobileCard key={item.id} item={item} router={router} />
              ))
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LocalShipping sx={{ fontSize: 64, color: "#dee2e6" }} />
                <Typography variant="h6" sx={{ color: "#6c757d" }}>
                  No dispatch records found
                </Typography>
                <Typography variant="body2" sx={{ color: "#adb5bd" }}>
                  Try adjusting your search criteria
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CommonCard>
    </Box>
  );
}
