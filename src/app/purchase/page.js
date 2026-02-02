"use client";

export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import FilterList from "@mui/icons-material/FilterList";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import Loader from "../../components/Loader";
import axiosInstance from "@/axios/axiosInstance";

export default function PurchaseOrderTable() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/purachase");
      // Map the backend data to match table format
      const formattedData = (response.data || []).map((order) => ({
        id: order.id,
        poNumber: order.orderInfo?.orderNumber || "N/A",
        orderDate: order.orderInfo?.orderDate || "",
        vendorName: order.supplier?.companyName || "N/A",
        itemDescription: order.items?.[0]?.name || "N/A",
        quantity: order.items?.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0) || 0,
        unitPrice: order.items?.[0]?.price || 0,
        totalAmount: order.totals?.grandTotal || 0,
        status: order.status || "Pending",
      }));
      setOrders(formattedData);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Calculate paginated data
  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => (
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
          {index + 1}
        </Typography>
      ),
    },
    {
      label: "PO Number",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700, letterSpacing: -0.2 }}>
          {row.poNumber}
        </Typography>
      ),
    },
    {
      label: "Date",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ color: "#334155", fontWeight: 500 }}>
          {new Date(row.orderDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </Typography>
      ),
    },
    {
      label: "Vendor Name",
      align: "center",
      accessor: "vendorName",
      render: (row) => (
        <Typography variant="body2" sx={{ color: "#1e293b" }}>
          {row.vendorName}
        </Typography>
      ),
    },
    {
      label: "Item Description",
      align: "center",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            color: "#475569",
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {row.itemDescription}
        </Typography>
      ),
    },
    {
      label: "Qty.",
      align: "center",
      render: (row) => (
        <Chip
          label={row.quantity}
          size="small"
          sx={{ fontWeight: 700, bgcolor: "#f1f5f9", color: "#475569", borderRadius: 1.5 }}
        />
      ),
    },
    {
      label: "Unit Price",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 500, color: "#334155" }}>
          ₹{row.unitPrice.toLocaleString()}
        </Typography>
      ),
    },
    {
      label: "Total Amount",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ color: "#0f172a" }}>
          ₹{row.totalAmount.toLocaleString()}
        </Typography>
      ),
    },
    {
      label: "Status",
      align: "center",
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            borderRadius: 1.5,
            bgcolor:
              row.status === "Approved" ? "#dcfce7" :
                row.status === "Pending" ? "#fef9c3" :
                  row.status === "Rejected" ? "#fee2e2" :
                    row.status === "Completed" ? "#e0f2fe" : "#f1f5f9",
            color:
              row.status === "Approved" ? "#15803d" :
                row.status === "Pending" ? "#a16207" :
                  row.status === "Rejected" ? "#b91c1c" :
                    row.status === "Completed" ? "#0369a1" : "#475569",
          }}
        />
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/purchase/view-purchase?id=${row.id}`)}
            sx={{
              color: "#0891b2",
              bgcolor: "#ecfeff",
              "&:hover": { bgcolor: "#cffafe" }
            }}
          >
            <Visibility sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/purchase/create-purchase?id=${row.id}`)}
            disabled={row.status !== "Pending"}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
              "&.Mui-disabled": { bgcolor: "#f8fafc", color: "#cbd5e1" }
            }}
          >
            <Edit sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Purchase Orders"
        addText="Create Purchase Order"
        onAdd={() => router.push("purchase/create-purchase")}
        searchPlaceholder="Search PO, Vendor, Item..."
        searchValue={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        searchExtra={
          <Select
            size="small"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            startAdornment={<FilterList sx={{ mr: 1, color: "#6b7280" }} />}
            sx={{ borderRadius: "8px", minWidth: "150px" }}
          >
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        }
      >
        {loading ? (
          <Loader message="Loading Purchase Orders..." />
        ) : (
          <GlobalTable
            columns={columns}
            data={paginatedOrders}
            totalCount={filteredOrders.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(val) => {
              setRowsPerPage(val);
              setPage(0);
            }}
          />
        )}
      </CommonCard>
    </Box>
  );
}
