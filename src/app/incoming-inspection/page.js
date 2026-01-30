"use client";
import React, { useState } from "react";
import { Box, IconButton, Chip } from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

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

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Inspection No",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.inspectionNo}
        </span>
      ),
    },
    {
      label: "Received Date",
      align: "center",
      accessor: "date",
    },
    {
      label: "GRN Number",
      align: "center",
      accessor: "grn",
    },
    {
      label: "Supplier",
      align: "center",
      accessor: "supplier",
    },
    {
      label: "Serial No",
      align: "center",
      accessor: "serial",
    },
    {
      label: "Received Qty",
      align: "center",
      render: (row) => <Chip label={row.receivedQty} size="small" />,
    },
    {
      label: "Checked Qty",
      align: "center",
      render: (row) => (
        <Chip label={row.checkedQty} size="small" color="info" />
      ),
    },
    {
      label: "Visual Notes",
      align: "center",
      accessor: "notes",
      sx: { maxWidth: 200 },
    },
    {
      label: "Accepted",
      align: "center",
      render: (row) => (
        <Chip label={row.accepted} color="success" size="small" />
      ),
    },
    {
      label: "Rejected",
      align: "center",
      render: (row) => (
        <Chip label={row.rejected} color="error" size="small" />
      ),
    },
    {
      label: "Checked By",
      align: "center",
      accessor: "checkedBy",
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
          <IconButton color="warning" size="small">
            <Edit fontSize="small" />
          </IconButton>
          {/* <IconButton
            size="small"
            sx={{
              color: "#0891b2",
              bgcolor: "#ecfeff",
              "&:hover": { bgcolor: "#cffafe" }
            }}
          >
            <Download fontSize="small" />
          </IconButton> */}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Incoming Inspection"
        addText="Add Material Inspection"
        onAdd={() => router.push("/incoming-inspection/add-material-inspection")}
        searchPlaceholder="Search Inspections"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
