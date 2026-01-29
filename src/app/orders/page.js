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
import { Visibility, NavigateNext } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
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
    <Box>

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
                <TableCell align="center" sx={{ fontWeight: 400 }}>Sr.No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Order No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Products</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Customer Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Order Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Contact Number</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Customer Address</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Delivery Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Order Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Order Reference</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "#1172ba" }}>
                    {row.orderNo}
                  </TableCell>
                  <TableCell align="center">{row.products}</TableCell>
                  <TableCell align="center">{row.customerName}</TableCell>
                  <TableCell align="center">{row.orderDate}</TableCell>
                  <TableCell align="center">{row.contact}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.deliveryDate}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.status}
                      color={row.status === "Completed" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">{row.reference}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/orders/${row.id}`)}
                      sx={{
                        color: "rgb(17, 114, 186)",
                        bgcolor: "#f1f5f9",
                        "&:hover": { bgcolor: "#e2e8f0" }
                      }}
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
    </Box>
  );
}
