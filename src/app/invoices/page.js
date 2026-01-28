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
import { useRouter } from "next/navigation";
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
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Invoice No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Invoice Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Paid</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Balance</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Payment Status</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.invoiceNo}
                </TableCell>
                <TableCell>{row.invoiceDate}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>
                  <Chip label={row.status} color="info" size="small" />
                </TableCell>
                <TableCell>₹{row.total.toLocaleString()}</TableCell>
                <TableCell>₹{row.paid.toLocaleString()}</TableCell>
                <TableCell>₹{row.balance.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={row.paymentStatus}
                    color={row.paymentStatus === "Paid" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.orderDate}</TableCell>
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
  );
}
