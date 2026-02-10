"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Tooltip from "@mui/material/Tooltip";

import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Download from "@mui/icons-material/Download";
import CreateMaterialRequest from "./components/CreateMaterialRequest";
import DefectiveMaterialForm from "./components/DefectiveMaterialForm";
import MaterialIssueTabs from "./components/MaterialIssueTabs";
import CommonCard from "../../components/ui/CommonCard";
import GlobalTable from "../../components/ui/GlobalTable";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Typography, Button } from "@mui/material";

export default function MaterialIssueRequests() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDefectiveDialog, setOpenDefectiveDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = tab === 0 ? "/material-issue" : "/defective-returns";
      const response = await axiosInstance.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setSearch("");
    setPage(0);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    fetchData(); // refresh current list
  };

  const handleDefectiveClick = (row) => {
    setSelectedRequest(row);
    setOpenDefectiveDialog(true);
  };

  const handleDefectiveClose = (refresh = false) => {
    setOpenDefectiveDialog(false);
    setSelectedRequest(null);
    if (refresh || tab === 1) {
      fetchData();
    }
  };

  const filtered = (data || []).filter((r) => {
    const searchStr = search.toLowerCase();
    if (tab === 0) {
      return r.requestNo?.toLowerCase().includes(searchStr);
    } else {
      return (
        r.rejectionId?.toLowerCase().includes(searchStr) ||
        r.goods?.toLowerCase().includes(searchStr)
      );
    }
  });

  const paginatedData = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const requestColumns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => page * rowsPerPage + index + 1,
    },
    {
      label: "Material Issue Request No.",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600, color: "#1172ba" }}>
          {row.requestNo}
        </span>
      ),
    },
    {
      label: "Product Name",
      align: "center",
      render: (row) => (
        <Chip label={row.productName || row.product || "N/A"} color="primary" size="small" />
      ),
    },
    {
      label: "BOM Number",
      align: "center",
      render: (row) => row.bomNumber || row.bom || "-",
    },
    {
      label: "Required Qty",
      align: "center",
      render: (row) => row.requiredQty || row.qty || "-",
    },
    {
      label: "Start Date",
      align: "center",
      render: (row) => row.startDate || row.start || "-",
    },
    {
      label: "End Date",
      align: "center",
      render: (row) => row.endDate || row.end || "-",
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center", alignItems: "center" }}>
          <IconButton
            size="small"
            onClick={() => router.push(`/material-issue/view-material-issue?id=${row.id}`)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" }
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <Tooltip title="Download Request">
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
          <Button
            size="small"
            onClick={() => handleDefectiveClick(row)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "#475569",
              minWidth: "auto",
            }}
          >
            Defective
          </Button>
        </Box>
      ),
    },
  ];

  const defectiveColumns = [
    {
      label: "Sr. No.",
      align: "center",
      render: (row, index) => page * rowsPerPage + index + 1,
    },
    {
      label: "Return No.",
      align: "center",
      render: (row) => (
        <span style={{ fontWeight: 600 }}>{row.rejectionId || "RET-001"}</span>
      ),
    },
    {
      label: "Original Request",
      align: "center",
      render: (row) => row.sourceRef || "2025-001",
    },
    {
      label: "Product",
      align: "center",
      render: (row) => row.product || "D8",
    },
    {
      label: "Return Date",
      align: "center",
      render: (row) => row.date || "2026-01-21",
    },
    {
      label: "Defective Items",
      align: "center",
      render: (row) => row.goods || "Battery",
    },
    {
      label: "Total Qty",
      align: "center",
      render: (row) => <strong>{row.qty || 56}</strong>,
    },
    {
      label: "Status",
      align: "center",
      render: (row) => {
        const status = row.status === "total" ? "PENDING REPLACEMENT" : row.status;
        return (
          <span style={{ fontWeight: 700, fontSize: "11px", color: "#475569" }}>
            {status}
          </span>
        );
      },
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Button
          size="small"
          sx={{ textTransform: "none", fontWeight: 700, color: "#1172ba" }}
        >
          Replace
        </Button>
      ),
    },
  ];

  const columns = tab === 0 ? requestColumns : defectiveColumns;

  return (
    <Box>
      <CommonCard
        title="Material Issue Requests"
        addText={tab === 0 ? "Create Material Request" : null}
        onAdd={tab === 0 ? () => setOpenDialog(true) : null}
        searchPlaceholder={tab === 0 ? "Search Request No..." : "Search Return No or Product..."}
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      >
        <MaterialIssueTabs value={tab} handleChange={handleTabChange} />

        <GlobalTable
          columns={columns}
          data={paginatedData}
          loading={loading}
          totalCount={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(val) => {
            setRowsPerPage(val);
            setPage(0);
          }}
        />

        {/* Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogContent dividers>
            <CreateMaterialRequest onClose={handleDialogClose} />
          </DialogContent>
        </Dialog>

        {/* Defective Dialog */}
        <Dialog open={openDefectiveDialog} onClose={handleDefectiveClose} maxWidth="md" fullWidth>
          <DialogContent dividers>
            <DefectiveMaterialForm
              request={selectedRequest}
              onClose={(refresh) => handleDefectiveClose(refresh)}
            />
          </DialogContent>
        </Dialog>
      </CommonCard>
    </Box>
  );
}
