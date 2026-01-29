"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useParams } from "next/navigation";
import { NavigateNext } from "@mui/icons-material";
import NextLink from "next/link";

export default function StockMovementHistory() {
  const params = useParams();
  const id = params?.id;

  const historyData = [
    {
      materialId: "SIPL.ASY.PBT.001",
      date: "10-01-2026",
      type: "IN (Purchase)",
      ref: "PO-2026-001",
      qty: 300,
      balance: 600,
      from: "Vendor A",
      remarks: "ABC",
    },
    {
      materialId: "SIPL.ASY.PBT.001",
      date: "11-01-2026",
      type: "OUT (Production)",
      ref: "MIR-2026-001",
      qty: -100,
      balance: 500,
      from: "Production",
      remarks: "XYZ",
    },
  ];


  const filtered = historyData.filter(
    (item) => item.materialId === String(id)
  );

  return (
    <Box >
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          Stock Movement History
        </Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell>Sr</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Ref</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>From</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={i} sx={{ transition: "0.2s" }}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip
                    label={row.type}
                    color={row.type.includes("IN") ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.ref}</TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: row.qty > 0 ? "green" : "red",
                  }}
                >
                  {row.qty > 0 ? `+${row.qty}` : row.qty}
                </TableCell>
                <TableCell>{row.balance}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No stock movement found for this material
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
