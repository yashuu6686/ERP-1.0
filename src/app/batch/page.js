"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "../../axios/axiosInstance";

export default function Batch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/batches");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const filtered = (data || []).filter(
    (b) =>
      (b.batchNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.requestNo || "").toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "SR.No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "Batch No",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.batchNo || "-"}
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
        <Chip label={row.status || "Ready"} color="success" size="small" />
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
          {/* <IconButton
            color="warning"
            size="small"
            onClick={() => router.push(`/batch/edit-batch?id=${row.id}`)}
          >
            <Edit fontSize="small" />
          </IconButton> */}
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
