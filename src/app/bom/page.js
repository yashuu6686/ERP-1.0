"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "../../axios/axiosInstance";
import { useEffect } from "react";

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
  const [bomData, setBomData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBOMs = async () => {
      try {
        const response = await axiosInstance.get("/bom");
        console.log(">>> ALL BOM DATA FROM SERVER:", response.data);
        setBomData(response.data);
      } catch (error) {
        console.error("Error fetching BOMs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBOMs();
  }, []);

  const filtered = (bomData || []).filter((b) =>
    b.number?.toLowerCase().includes(search.toLowerCase())
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
      label: "Product Name",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#475569" }}>
          {row.productName || "-"}
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
            size="small"
            onClick={() => router.push(`/bom/view-bom?id=${row.id}`)}
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
            onClick={() => router.push(`/bom/edit-bom?id=${row.id}`)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <Tooltip title="Download BOM">
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
        title="Bill of Materials (BOM)"
        addText="Create New BOM"
        onAdd={() => router.push("/bom/create-bom")}
        searchPlaceholder="Search BOM Number"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <GlobalTable columns={columns} data={filtered} loading={loading} />
      </CommonCard>
    </Box>
  );
}
