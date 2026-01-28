"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";

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

  return (
    <CommonCard
      title="Customer Order"
      addText="Create Order"
      onAdd={() => router.push("/orders/create-new-order")}
      searchPlaceholder="Search Order No, Customer..."
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Products</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Contact Number</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Customer Address</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Delivery Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order Status</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order Reference</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.orderNo}
                </TableCell>
                <TableCell>{row.products}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.orderDate}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.deliveryDate}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Completed" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.reference}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/orders/${row.id}`)}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No customer orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </CommonCard>
  );
}
