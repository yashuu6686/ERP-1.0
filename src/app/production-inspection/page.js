"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "../../axios/axiosInstance";

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

export default function ProductionInspectionPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/quality-inspection");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching inspections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInspections();
  }, []);

  const filtered = (data || []).filter((i) =>
    (i.checkNumber || "").toLowerCase().includes(search.toLowerCase())
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
          {row.checkNumber || row.id || "-"}
        </span>
      ),
    },
    {
      label: "Product",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#475569" }}>
          {row.productName || "-"}
        </span>
      ),
    },
    {
      label: "Checked Qty",
      align: "center",
      accessor: "checkedQuantity",
    },
    {
      label: "Accepted Qty",
      align: "center",
      render: (row) => (
        <Chip
          label={row.acceptedQuantity || 0}
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
          label={row.rejectedQuantity || 0}
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
      label: "Inspection Date",
      align: "center",
      render: (row) => row.inspectionDate || "-",
    },
    {
      label: "Approved By",
      align: "center",
      render: (row) => row.approval?.approvedByName || "-",
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
            <IconButton
              color="warning"
              size="small"
              onClick={() => router.push(`/production-inspection/edit-inspection?id=${row.id}`)}
            >
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