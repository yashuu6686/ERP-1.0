"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import Download from "@mui/icons-material/Download";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/CommonCard";
import GlobalTable from "../../components/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../components/Loader";

export default function GRNTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [grns, setGrns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGRNs();
  }, []);

  const fetchGRNs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/grn");
      console.log("grn:", response.data);
      setGrns(response.data || []);
    } catch (error) {
      console.error("Error fetching GRNs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = grns.filter(
    (g) =>
      g.grnNumber?.toLowerCase().includes(search.toLowerCase()) ||
      g.poNumber?.toLowerCase().includes(search.toLowerCase()) ||
      g.supplierName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => index + 1,
    },
    {
      label: "GRN Number",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ color: "#1172ba", fontWeight: 600 }}>
          {row.grnNumber}
        </Typography>
      ),
    },
    {
      label: "PO Number",
      align: "center",
      accessor: "poNumber",
    },
    {
      label: "Invoice Number",
      align: "center",
      accessor: "invoiceNumber",
    },
    {
      label: "Item",
      align: "center",
      render: (row) => row.items?.length || 0,
      sx: { maxWidth: 280 },
    },
    {
      label: "Received Date",
      align: "center",
      render: (row) => new Date(row.receivedDate).toLocaleDateString(),
    },
    {
      label: "Received By",
      align: "center",
      render: (row) => <Chip label={row.receivedBy} size="small" />,
    },
    {
      label: "Supplier",
      align: "center",
      accessor: "supplierName",
    },
    {
      label: "Quantity",
      align: "center",
      render: (row) => (
        <Chip
          label={row.items?.reduce((sum, item) => sum + (parseFloat(item.receivedQty) || 0), 0)}
          color="success"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      label: "Inspection",
      align: "center",
      render: (row) => (
        <Chip
          label={row.inspectionStatus || "Pending"}
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            borderRadius: 1.5,
            bgcolor:
              row.inspectionStatus === "Pending" ? "#fef9c3" :
                row.inspectionStatus === "Completed" ? "#e0f2fe" : "#f1f5f9",
            color:
              row.inspectionStatus === "Pending" ? "#a16207" :
                row.inspectionStatus === "Completed" ? "#0369a1" : "#475569",
          }}
        />
      ),
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/grn/view-grn?id=${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            color="warning"
            size="small"
            onClick={() => router.push(`/grn/create-grn?id=${row.id}`)}
            disabled={row.inspectionStatus === "Completed"}
            sx={{
              "&.Mui-disabled": {
                color: "#cbd5e1"
              }
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) return <Loader fullPage message="Loading GRN list..." />;

  return (
    <Box>
      <CommonCard
        title="Goods Receipt Note (GRN)"
        addText="Create GRN"
        onAdd={() => router.push("/grn/create-grn")}
        searchPlaceholder="Search GRN, PO, Supplier..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} />
      </CommonCard>
    </Box>
  );
}
