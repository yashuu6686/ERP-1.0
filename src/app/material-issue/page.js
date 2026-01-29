"use client";
import React, { useState } from "react";
import { Box, Chip, IconButton, Dialog, DialogContent } from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import CreateMaterialRequest from "./components/CreateMaterialRequest";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

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

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Material Issue Request No.",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.requestNo}
        </span>
      ),
    },
    {
      label: "Product Name",
      align: "center",
      render: (row) => (
        <Chip label={row.product} color="primary" size="small" />
      ),
    },
    {
      label: "BOM Number",
      align: "center",
      accessor: "bom",
    },
    {
      label: "Required Qty",
      align: "center",
      accessor: "qty",
    },
    {
      label: "Start Date",
      align: "center",
      accessor: "start",
    },
    {
      label: "End Date",
      align: "center",
      accessor: "end",
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" }
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#dc2626",
              bgcolor: "#fef2f2",
              "&:hover": { bgcolor: "#fee2e2" }
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#0891b2",
              bgcolor: "#ecfeff",
              "&:hover": { bgcolor: "#cffafe" }
            }}
          >
            <Download fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Material Issue Requests"
        addText="Create Material Request"
        onAdd={() => setOpenDialog(true)}
        searchPlaceholder="Search Request No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />

        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
          <DialogContent dividers>
            <CreateMaterialRequest onClose={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </CommonCard>
    </Box>
  );
}
