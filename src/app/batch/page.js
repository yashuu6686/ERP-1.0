"use client";
import React, { useState } from "react";
import { Box, Chip, IconButton } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

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

  const columns = [
    {
      label: "S. No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Batch No",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.batchNo}
        </span>
      ),
    },
    {
      label: "Material Issue Request No.",
      align: "center",
      accessor: "requestNo",
    },
    {
      label: "Check Number",
      align: "center",
      accessor: "checkNo",
    },
    {
      label: "Product Sr No",
      align: "center",
      accessor: "productSr",
    },
    {
      label: "Accepted Qty",
      align: "center",
      accessor: "acceptedQty",
    },
    {
      label: "Batch Status",
      align: "center",
      render: (row) => (
        <Chip label={row.status} color="success" size="small" />
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/batch/${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#dc2626",
              bgcolor: "#fef2f2",
              "&:hover": { bgcolor: "#fee2e2" },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Batch"
        onAdd={null}
        searchPlaceholder="Search Batch No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
