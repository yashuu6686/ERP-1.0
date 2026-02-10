"use client";
import React, { useState, useEffect } from "react";
import { Box, Chip, IconButton, Typography, Tooltip } from "@mui/material";
import { Visibility, Edit, Add, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

export default function COAListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const filtered = data.filter((item) =>
    (item.coaNumber || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.productName || "").toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => (
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
          {page * rowsPerPage + index + 1}
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
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
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
          <Tooltip title="Download COA">
            <IconButton
              size="small"
              onClick={() => window.print()}
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

  if (loading) return <Loader fullPage message="Loading COA Records..." />;

  return (
    <CommonCard
      title="Certificate of Analysis - Tracking"
      addText="Create COA"
      onAdd={() => router.push("/coa/create-coa")}
      searchPlaceholder="Search COA No, Product..."
      searchValue={search}
      onSearchChange={(e) => {
        setSearch(e.target.value);
        setPage(0);
      }}
    >
      <GlobalTable
        data={paginatedData}
        columns={columns}
        totalCount={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(val) => {
          setRowsPerPage(val);
          setPage(0);
        }}
      />
    </CommonCard>
  );
}