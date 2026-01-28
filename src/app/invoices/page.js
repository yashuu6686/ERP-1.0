"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

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
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f3f4f6" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Invoice No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Invoice Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Due Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Customer Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Product</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Total Amount</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Paid</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Balance</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Payment Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Order Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={row.id} hover>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "#1172ba" }}>
                    {row.invoiceNo}
                  </TableCell>
                  <TableCell align="center">{row.invoiceDate}</TableCell>
                  <TableCell align="center">{row.dueDate}</TableCell>
                  <TableCell align="center">{row.customer}</TableCell>
                  <TableCell align="center">{row.product}</TableCell>
                  <TableCell align="center">
                    <Chip label={row.status} color="info" size="small" />
                  </TableCell>
                  <TableCell align="center">₹{row.total.toLocaleString()}</TableCell>
                  <TableCell align="center">₹{row.paid.toLocaleString()}</TableCell>
                  <TableCell align="center">₹{row.balance.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.paymentStatus}
                      color={row.paymentStatus === "Paid" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">{row.orderDate}</TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No invoices found
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
