"use client";
import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Delete,
  Download,
  FilterList,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Completed":
        return "info";
      default:
        return "default";
    }
  };

  return (
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
      <Table size="small">
        <TableHead sx={{ bgcolor: "#f3f4f6" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 400 }}>Sr</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>PO Number</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Vendor</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Item</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Qty</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredOrders.map((order, i) => (
            <TableRow key={order.id} hover>
              <TableCell>{i + 1}</TableCell>
              <TableCell sx={{ color: "#1172ba", fontWeight: 600 }}>
                {order.poNumber}
              </TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.vendorName}</TableCell>
              <TableCell>{order.itemDescription}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>₹{order.unitPrice.toLocaleString()}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                ₹{order.totalAmount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton color="primary" size="small">
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small">
                  <Delete fontSize="small" />
                </IconButton>
                <IconButton color="success" size="small">
                  <Download fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CommonCard>
  );
}
