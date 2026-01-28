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
import { Visibility, Download } from "@mui/icons-material";
import { useRouter } from "next/router";
import CommonCard from "../../src/components/CommonCard";

const dispatchData = [
  {
    id: 1,
    order: "SO-001",
    product: "D8 Machine",
    status: "Shipped",
    orderDate: "10 Jan 2026",
    shippingDate: "12 Jan 2026",
    platform: "Direct Sales",
    contact: "Ramesh",
    address: "Mumbai, India",
    tracking: "TRK-889900",
  },
  {
    id: 2,
    order: "SO-002",
    product: "Valve System",
    status: "Pending",
    orderDate: "11 Jan 2026",
    shippingDate: "-",
    platform: "Online",
    contact: "Suresh",
    address: "Pune, India",
    tracking: "-",
  },
];

export default function DispatchDetails() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = dispatchData.filter(
    (item) =>
      item.order.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CommonCard
      title="Dispatch Details"
      addText="Create Dispatch Entry"
      onAdd={() => router.push("/dispatch/create-dispatch-entry")}
      searchPlaceholder="Search Order, Product..."
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order Details</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Order Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Shipping Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Sales Platform</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Contact Person</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Tracking Info</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Evidence</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.order}
                </TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Shipped" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.orderDate}</TableCell>
                <TableCell>{row.shippingDate}</TableCell>
                <TableCell>{row.platform}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.tracking}</TableCell>
                <TableCell>
                  <IconButton color="secondary" size="small">
                    <Download fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/dispatch/${row.id}`)}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No dispatch records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </CommonCard>
  );
}
