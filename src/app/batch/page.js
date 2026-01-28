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
import { Visibility, Edit, NavigateNext } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

const batchData = [
  {
    id: 1,
    batchNo: "BAT-2026-01-005",
    requestNo: "Material Issue Request 2026-001",
    checkNo: "D8",
    productSr: "From to to",
    acceptedQty: 18,
    status: "Ready",
  },
  {
    id: 2,
    batchNo: "BAT-2026-01-005",
    requestNo: "Material Issue Request 2026-001",
    checkNo: "D8",
    productSr: "From to to",
    acceptedQty: 18,
    status: "Ready",
  },
];

export default function Batch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = batchData.filter(
    (b) =>
      b.batchNo.toLowerCase().includes(search.toLowerCase()) ||
      b.requestNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
     
      <CommonCard
        title="Batch"
        onAdd={null} // No add button mentioned in original
        searchPlaceholder="Search Batch No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f3f4f6" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 400 }}>S. No.</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Batch No</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>
                  Material Issue Request No.
                </TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Check Number</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Product Sr No</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Accepted Qty</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Batch Status</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={row.id} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                    {row.batchNo}
                  </TableCell>
                  <TableCell>{row.requestNo}</TableCell>
                  <TableCell>{row.checkNo}</TableCell>
                  <TableCell>{row.productSr}</TableCell>
                  <TableCell>{row.acceptedQty}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => router.push(`/batch/${row.id}`)}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton color="warning" size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CommonCard>
    </Box>
  );
}
