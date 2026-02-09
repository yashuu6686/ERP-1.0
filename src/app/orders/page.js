"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Download, Edit, Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import EditIcon from '@mui/icons-material/Edit';

import axiosInstance from "../../axios/axiosInstance";
import Loader from "../../components/ui/Loader";

export default function CustomerOrders() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/orders");
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.orderNo?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase())
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
              onClick={() => router.push(`/orders/${row.id}`)}
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
            <IconButton
              color="warning"
              size="small"
              onClick={() => router.push(`/orders/edit-order?id=${row.id}`)}
              sx={{
                bgcolor: "#fff7ed",
                "&:hover": { bgcolor: "#ffedd5" },
              }}
            >
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
        {loading ? (
          <Loader message="Loading orders from server..." />
        ) : (
          <GlobalTable columns={columns} data={filtered} />
        )}
      </CommonCard>
    </Box>
  );
}
