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
import {
  Visibility,
  Edit,
  Download,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";

export default function IncomingInspection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const inspections = [
    {
      id: 1,
      inspectionNo: "002",
      date: "20-03-2025",
      grn: "SIPL/2025019",
      supplier: "abc",
      serial: "220",
      receivedQty: 220,
      checkedQty: 220,
      notes: "description",
      accepted: 200,
      rejected: 20,
      checkedBy: "-",
    },
    {
      id: 2,
      inspectionNo: "001",
      date: "10-02-2025",
      grn: "SIPL/2025018",
      supplier: "xyz",
      serial: "330",
      receivedQty: 330,
      checkedQty: 330,
      notes: "description",
      accepted: 300,
      rejected: 30,
      checkedBy: "vk",
    },
  ];

  const filtered = inspections.filter(
    (i) =>
      i.inspectionNo.includes(search) ||
      i.grn.toLowerCase().includes(search.toLowerCase()) ||
      i.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CommonCard
      title="Incoming Inspection"
      addText="Add Material Inspection"
      onAdd={() => router.push("/incoming-inspection/add-material-inspection")}
      searchPlaceholder="Search Inspections"
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Inspection No</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Received Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>GRN Number</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Supplier</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Serial No</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Received Qty</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Checked Qty</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Visual Notes</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Accepted</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Rejected</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Checked By</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover sx={{ transition: "0.2s" }}>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.inspectionNo}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.grn}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.serial}</TableCell>
                <TableCell>
                  <Chip label={row.receivedQty} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={row.checkedQty} size="small" color="info" />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>{row.notes}</TableCell>
                <TableCell>
                  <Chip label={row.accepted} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={row.rejected} color="error" size="small" />
                </TableCell>
                <TableCell>{row.checkedBy}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton color="success">
                    <Download />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CommonCard>
  );
}
