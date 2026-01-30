"use client";
import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Edit,
  Delete,
  Download,
  FilterList,
  Visibility,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

export default function PurchaseOrderTable() {
  const router = useRouter();
  const [orders, setOrders] = useState([
    {
      id: 1,
      poNumber: "SIPL/2025019",
      orderDate: "2025-03-20",
      vendorName: "XYZ",
      itemDescription: "Tally Prime Silver Single User",
      quantity: 2,
      unitPrice: 12611,
      totalAmount: 25222,
      status: "Pending",
    },
    {
      id: 2,
      poNumber: "STC/2025018",
      orderDate: "2025-02-10",
      vendorName: "ABC",
      itemDescription: "Tally Prime Silver Single User",
      quantity: 1,
      unitPrice: 25222,
      totalAmount: 25222,
      status: "Approved",
    },
  ]);

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
                  row.status === "Rejected" ? "#fee2e2" : "#f1f5f9",
            color:
              row.status === "Approved" ? "#15803d" :
                row.status === "Pending" ? "#a16207" :
                  row.status === "Rejected" ? "#b91c1c" : "#475569",
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
            onClick={() => router.push(`/purchase/create-purchase?id=${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" }
            }}
          >
            <Edit sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" }
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#0891b2",
              bgcolor: "#ecfeff",
              "&:hover": { bgcolor: "#cffafe" }
            }}
          >
            <Download sx={{ fontSize: 16 }} />
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
      </CommonCard>
    </Box>
  );
}
