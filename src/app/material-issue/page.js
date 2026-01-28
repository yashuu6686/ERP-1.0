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
  Dialog,
  DialogContent,
} from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import CreateMaterialRequest from "./CreateMaterialRequest";
import CommonCard from "../../components/CommonCard";

const requestsData = [
  {
    id: 1,
    requestNo: "Material Issue Request 2026-001",
    product: "D8",
    bom: "BOM-001",
    qty: 20,
    start: "01 Jan 2026",
    end: "25 Jan 2026",
  },
  {
    id: 2,
    requestNo: "Material Issue Request 2026-002",
    product: "D8",
    bom: "BOM-002",
    qty: 25,
    start: "01 Jan 2026",
    end: "25 Jan 2026",
  },
];

export default function MaterialIssueRequests() {
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = requestsData.filter((r) =>
    r.requestNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CommonCard
      title="Material Issue Requests"
      addText="Create Material Request"
      onAdd={() => setOpenDialog(true)}
      searchPlaceholder="Search Request No..."
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>
                Material Issue Request No.
              </TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>BOM Number</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Required Qty</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.requestNo}
                </TableCell>
                <TableCell>
                  <Chip label={row.product} color="primary" size="small" />
                </TableCell>
                <TableCell>{row.bom}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>{row.start}</TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton color="warning" size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="success" size="small">
                    <Download fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
        <DialogContent dividers>
          <CreateMaterialRequest onClose={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </CommonCard>
  );
}
