"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Visibility, Edit, Add, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

export default function COAListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/coa");
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching COA data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => (
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
          {index + 1}
        </Typography>
      ),
    },
    {
      label: "COA Number",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#1172ba" }}>
          {row.coaNumber}
        </Typography>
      ),
    },
    {
      label: "Product Name",
      accessor: "productName",
      align: "center",
    },
    {
      label: "Batch No.",
      accessor: "batchNo",
      align: "center",
    },
    {
      label: "Issue Date",
      accessor: "issueDate",
      align: "center",
    },
    {
      label: "Expiry Date",
      accessor: "expiryDate",
      align: "center",
    },
    {
      label: "Status",
      align: "center",
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            fontWeight: 700,
            bgcolor:
              row.status === "Approved"
                ? "#dcfce7"
                : row.status === "Pending"
                  ? "#fef9c3"
                  : "#fee2e2",
            color:
              row.status === "Approved"
                ? "#15803d"
                : row.status === "Pending"
                  ? "#a16207"
                  : "#b91c1c",
          }}
        />
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/coa/view-coa?id=${row.id}`)}
            sx={{
              color: "#0891b2",
              bgcolor: "#ecfeff",
              "&:hover": { bgcolor: "#cffafe" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => router.push(`/coa/create-coa?id=${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => window.print()}
            sx={{
              color: "#059669",
              bgcolor: "#ecfdf5",
              "&:hover": { bgcolor: "#d1fae5" },
            }}
          >
            <Download fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) return <Loader fullPage message="Loading COA Records..." />;

  return (
    <CommonCard
      title="Certificate of Analysis - Tracking"
      actions={[
        {
          label: "Create COA",
          icon: Add,
          onClick: () => router.push("/coa/create-coa"),
          variant: "contained",
        },
      ]}
    >
      <GlobalTable data={data} columns={columns} />
    </CommonCard>
  );
}