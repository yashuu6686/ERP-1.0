"use client";
import React, { useState } from "react";
import { Box, Chip, IconButton } from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

const finalQualityData = [
  {
    id: 1,
    inspectionNo: "FIN-INS-0001",
    total: 20,
    approved: 18,
    rejected: 2,
    result: "Pass",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
    approvalDate: "20",
  },
  {
    id: 2,
    inspectionNo: "FIN-INS-0002",
    total: 20,
    approved: 18,
    rejected: 2,
    result: "Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
    approvalDate: "30",
  },
];

export default function FinalQualityCheck() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = finalQualityData.filter((item) =>
    item.inspectionNo.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Final Inspection No",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.inspectionNo}
        </span>
      ),
    },
    {
      label: "Total Checked",
      align: "center",
      accessor: "total",
    },
    {
      label: "Approved",
      align: "center",
      accessor: "approved",
    },
    {
      label: "Rejected",
      align: "center",
      accessor: "rejected",
    },
    {
      label: "Result",
      align: "center",
      render: (row) => (
        <Chip
          label={row.result}
          color={
            row.result === "Pass"
              ? "success"
              : row.result === "Fail"
                ? "error"
                : "warning"
          }
          size="small"
        />
      ),
    },
    {
      label: "Checking Date",
      align: "center",
      accessor: "date",
    },
    {
      label: "Remarks",
      align: "center",
      accessor: "remarks",
    },
    {
      label: "Approved By",
      align: "center",
      accessor: "approvedBy",
    },
    {
      label: "Approval Date",
      align: "center",
      accessor: "approvalDate",
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/final-inspection/${row.id}`)}
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
          <IconButton
            size="small"
            sx={{
              color: "#0891b2",
              bgcolor: "#ecfeff",
              "&:hover": { bgcolor: "#cffafe" },
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
        title="Final Quality Check List"
        addText="Add Final Check"
        onAdd={() => router.push("/final-inspection/create-final-inspection")}
        searchPlaceholder="Search Inspection No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
