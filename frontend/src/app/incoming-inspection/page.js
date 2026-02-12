"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../components/ui/Loader";
import { useAuth } from "@/context/AuthContext";

export default function IncomingInspection() {
  const router = useRouter();
  const { checkPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  const canCreate = checkPermission('incoming_inspection', 'create');
  const canEdit = checkPermission('incoming_inspection', 'edit');
  const canView = checkPermission('incoming_inspection', 'view');

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/incoming-inspection");
      setInspections(response.data || []);
    } catch (error) {
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = (inspections || []).filter(
    (i) =>
      i.materialData?.grnNumber?.toLowerCase().includes(search.toLowerCase()) ||
      i.materialData?.materialName?.toLowerCase().includes(search.toLowerCase()) ||
      i.materialData?.supplierName?.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate paginated data
  const paginatedInspections = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      render: (row, index) => page * rowsPerPage + index + 1,
    },
    {
      label: "GRN Number",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1172ba" }}>
          {row.materialData?.grnNumber}
        </Typography>
      ),
    },
    {
      label: "Material Name",
      align: "center",
      render: (row) => row.materialData?.materialName,
    },
    {
      label: "Supplier",
      align: "center",
      render: (row) => row.materialData?.supplierName,
    },
    {
      label: "Lot Qty",
      align: "center",
      render: (row) => (
        <Chip
          label={row.materialData?.lotQuantity}
          size="small"
          sx={{
            bgcolor: "#f1f5f9",
            color: "#475569",
            fontWeight: 700,
            borderRadius: 1.5
          }}
        />
      ),
    },
    {
      label: "Accepted",
      align: "center",
      render: (row) => (
        <Chip
          label={row.summaryData?.acceptedQuantity || 0}
          size="small"
          sx={{
            bgcolor: "#dcfce7",
            color: "#15803d",
            fontWeight: 700,
            borderRadius: 1.5,
            minWidth: 40
          }}
        />
      ),
    },
    {
      label: "Rejected",
      align: "center",
      render: (row) => (
        <Chip
          label={row.summaryData?.rejectedQuantity || 0}
          size="small"
          sx={{
            bgcolor: "#fee2e2",
            color: "#b91c1c",
            fontWeight: 700,
            borderRadius: 1.5,
            minWidth: 40
          }}
        />
      ),
    },
    {
      label: "Status",
      align: "center",
      render: (row) => {
        const isApproved = row.inspectionStatus === "Approved";
        return (
          <Chip
            label={row.inspectionStatus || "Draft"}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.65rem",
              textTransform: "uppercase",
              borderRadius: 1.5,
              bgcolor: isApproved ? "#dcfce7" : "#fef9c3",
              color: isApproved ? "#15803d" : "#a16207",
            }}
          />
        );
      },
    },
    {
      label: "Date",
      align: "center",
      render: (row) => row.materialData?.inspectionDate,
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          {canView && (
            <IconButton
              size="small"
              onClick={() => router.push(`/incoming-inspection/view-inspection?id=${row.id}`)}
              sx={{
                color: "rgb(17, 114, 186)",
                bgcolor: "#f1f5f9",
                "&:hover": { bgcolor: "#e2e8f0" }
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          )}
          {canEdit && (
            <IconButton
              color="warning"
              size="small"
              onClick={() => router.push(`/incoming-inspection/add-material-inspection?id=${row.id}`)}
            >
              <Edit fontSize="small" />
            </IconButton>
          )}
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

  // if (loading) return <Loader fullPage message="Loading Inspections..." />;

  return (
    <Box>
      <CommonCard
        title="Incoming Inspection"
        addText={canCreate ? "Add Material Inspection" : null}
        onAdd={canCreate ? () => router.push("/incoming-inspection/add-material-inspection") : null}
        searchPlaceholder="Search GRN, Material, Supplier..."
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      >
         {loading ? (
          <Loader message="Loading Purchase Orders..." />
        ) : (
        <GlobalTable
          columns={columns}
          data={paginatedInspections}
          totalCount={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(val) => {
            setRowsPerPage(val);
            setPage(0);
          }}
        />
        )}
      </CommonCard>
    </Box>
  );
}
