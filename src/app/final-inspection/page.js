"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Visibility, Edit, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../components/Loader";

export default function FinalQualityCheck() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/final-inspections");
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter((item) =>
    (item.inspectionNo || "").toLowerCase().includes(search.toLowerCase())
  );

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
      label: "Final Inspection No",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#1172ba" }}>
          {row.inspectionNo}
        </Typography>
      ),
    },
    {
      label: "Total Checked",
      align: "center",
      accessor: "totalChecked",
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
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: "0.65rem",
            textTransform: "uppercase",
            borderRadius: 1.5,
            bgcolor: row.result === "Pass" ? "#dcfce7" : row.result === "Fail" ? "#fee2e2" : "#fef9c3",
            color: row.result === "Pass" ? "#15803d" : row.result === "Fail" ? "#b91c1c" : "#a16207",
          }}
        />
      ),
    },
    {
      label: "Checking Date",
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
            size="small"
            onClick={() => router.push(`/final-inspection/view-final-inspection?id=${row.id}`)}
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
            onClick={() => router.push(`/final-inspection/create-final-inspection?id=${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
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
        title="Final Quality Check List"
        addText="Add Final Check"
        onAdd={() => router.push("/final-inspection/create-final-inspection")}
        searchPlaceholder="Search Inspection No..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        {loading ? (
          <Loader message="Loading Inspections..." />
        ) : (
          <GlobalTable columns={columns} data={filtered} />
        )}
      </CommonCard>
    </Box>
  );
}
