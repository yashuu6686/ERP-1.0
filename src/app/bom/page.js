"use client";
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

const bomData = [
  {
    id: 1,
    number: "BOM-001",
    date: "02-02-2025",
    approvedBy: "Name",
  },
  {
    id: 2,
    number: "BOM-002",
    date: "02-02-2025",
    approvedBy: "Name",
  },
];

export default function BOMList() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = bomData.filter((b) =>
    b.number.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "BOM Number",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "var(--brand-primary)", fontFamily: "var(--font-manrope)" }}>
          {row.number}
        </span>
      ),
    },
    {
      label: "Created Date",
      align: "center",
      accessor: "date",
    },
    {
      label: "Approved By",
      align: "center",
      accessor: "approvedBy",
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => router.push(`/bom/${row.id}`)}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton color="warning" size="small">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="success" size="small">
            <Download fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Bill of Materials (BOM)"
        addText="Create New BOM"
        onAdd={() => router.push("/bom/create-bom")}
        searchPlaceholder="Search BOM Number"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
