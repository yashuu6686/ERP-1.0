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
  NavigateNext,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
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
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f1f5f9" }}>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Sr.No.</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>PO Number</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Vendor Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Item Description</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Qty.</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Unit Price</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Total Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders.map((order, i) => (
              <TableRow
                key={order.id}
                sx={{
                  transition: "background-color 0.2s"
                }}
              >
                <TableCell align="center" sx={{ color: "#64748b", fontWeight: 500 }}>{i + 1}</TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 700, letterSpacing: -0.2 }}>
                    {order.poNumber}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ color: "#334155", fontWeight: 500 }}>
                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {order.vendorName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
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
                    {order.itemDescription}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.quantity}
                    size="small"
                    sx={{ fontWeight: 700, bgcolor: "#f1f5f9", color: "#475569", borderRadius: 1.5 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "#334155" }}>
                    ₹{order.unitPrice.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ color: "#0f172a" }}>
                    ₹{order.totalAmount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      borderRadius: 1.5,
                      bgcolor:
                        order.status === "Approved" ? "#dcfce7" :
                          order.status === "Pending" ? "#fef9c3" :
                            order.status === "Rejected" ? "#fee2e2" : "#f1f5f9",
                      color:
                        order.status === "Approved" ? "#15803d" :
                          order.status === "Pending" ? "#a16207" :
                            order.status === "Rejected" ? "#b91c1c" : "#475569",
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <IconButton
                      size="small"
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
                        color: "#dc2626",
                        bgcolor: "#fef2f2",
                        "&:hover": { bgcolor: "#fee2e2" }
                      }}
                    >
                      <Delete sx={{ fontSize: 16 }} />
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CommonCard>
    </Box>
  );
}
