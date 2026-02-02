"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";

const inspectionData = [
  {
    id: 1,
    checkNo: "FIN-INS-0001",
    checkedQty: 20,
    acceptedQty: 18,
    rejectedQty: 2,
    result: "Pass / Fail / Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
  },
  {
    id: 2,
    checkNo: "FIN-INS-0002",
    checkedQty: 20,
    acceptedQty: 15,
    rejectedQty: 5,
    result: "Pass / Fail / Conditional",
    date: "01 Jan 2026",
    remarks: "description",
    approvedBy: "QC Head",
  },
];

export default function AfterProductionInspection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = inspectionData.filter((i) =>
    i.checkNo.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Quality Check No.",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.checkNo}
        </span>
      ),
    },
    {
      label: "Checked Qty",
      align: "center",
      accessor: "checkedQty",
    },
    {
      label: "Accepted Qty",
      align: "center",
      render: (row) => (
        <Chip
          label={row.acceptedQty}
          size="small"
          sx={{
            bgcolor: "#dcfce7",
            color: "#166534",
            fontWeight: 700,
            minWidth: 40,
          }}
        />
      ),
    },
    {
      label: "Rejected Qty",
      align: "center",
      render: (row) => (
        <Chip
          label={row.rejectedQty}
          size="small"
          sx={{
            bgcolor: "#fee2e2",
            color: "#991b1b",
            fontWeight: 700,
            minWidth: 40,
          }}
        />
      ),
    },
    {
      label: "Inspection Result",
      align: "center",
      render: (row) => (
        <Chip
          label={row.result.split(" / ")[0]}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      label: "Inspection Date",
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
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => router.push(`/production-inspection/view-inspection?id=${row.id}`)}
              sx={{
                color: "rgb(17, 114, 186)",
                bgcolor: "#f1f5f9",
                "&:hover": { bgcolor: "#e2e8f0" },
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="warning" size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Report">
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
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="After Production Inspection Management"
        addText="Start Quality Check"
        onAdd={() =>
          router.push("/production-inspection/after-production-quality-check")
        }
        searchPlaceholder="Search Quality Check No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
