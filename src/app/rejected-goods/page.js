"use client";
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { Warning, Visibility, Edit, Delete } from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";
import AddRejectedGoodsDialog from "./components/AddRejectedGoodsDialog";
import RejectedGoodsMobileCard from "./components/RejectedGoodsMobileCard";
import GlobalTable from "../../components/GlobalTable";

const rejectedData = [
  {
    id: 1,
    rejectionId: "REJ-001",
    sourceType: "GRN",
    sourceRef: "GRN/2025002",
    goods: "Raw Material A",
    qty: 20,
    date: "2025-03-20",
    reason: "Surface defects",
    status: "total",
    severity: "high",
  },
  {
    id: 2,
    rejectionId: "REJ-002",
    sourceType: "GRN",
    sourceRef: "GRN/2025001",
    goods: "Component XYZ",
    qty: 50,
    date: "2025-02-10",
    reason: "Surface defects",
    status: "return",
    severity: "medium",
  },
  {
    id: 3,
    rejectionId: "REJ-003",
    sourceType: "GRN",
    sourceRef: "GRN/2025003",
    goods: "Part PQR",
    qty: 10,
    date: "2025-03-15",
    reason: "Crack found",
    status: "scrap",
    severity: "high",
  },
  {
    id: 4,
    rejectionId: "REJ-004",
    sourceType: "Production",
    sourceRef: "PROD/2025015",
    goods: "Finished Product B",
    qty: 5,
    date: "2025-03-22",
    reason: "Dimensional mismatch",
    status: "scrap",
    severity: "low",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "total":
      return { bg: "#fff3cd", color: "#856404", label: "Pending" };
    case "return":
      return { bg: "#d1ecf1", color: "#0c5460", label: "Return to Vendor" };
    case "scrap":
      return { bg: "#f8d7da", color: "#721c24", label: "Scrapped" };
    default:
      return { bg: "#e2e3e5", color: "#383d41", label: status };
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function RejectedGoods() {
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    rejectionId: "",
    rejectedGoods: "",
    sourceType: "",
    date: "",
    sourceReference: "",
    reason: "",
    rejectedQty: "",
    rejectedBy: "",
  });

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Rejected Item:", form);
    alert("Rejected Item Saved Successfully!");
    setOpenDialog(false);
  };

  const filteredData = rejectedData
    .filter((item) => {
      if (tab === 0) return item.status === "total";
      if (tab === 1) return item.status === "return";
      if (tab === 2) return item.status === "scrap";
      return true;
    })
    .filter(
      (item) =>
        item.rejectionId.toLowerCase().includes(search.toLowerCase()) ||
        item.sourceRef.toLowerCase().includes(search.toLowerCase()) ||
        item.goods.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    {
      label: "S. No.",
      align: "center",
      sx: { width: "60px" },
      render: (row, index) => <span style={{ color: "#6c757d" }}>{index + 1}</span>,
    },
    {
      label: "Rejection ID",
      align: "center",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#1172ba" }}>
          {row.rejectionId}
        </Typography>
      ),
    },
    {
      label: "Source Type",
      align: "center",
      accessor: "sourceType",
    },
    {
      label: "Source Reference",
      align: "center",
      sx: { color: "#495057" },
      accessor: "sourceRef",
    },
    {
      label: "Rejected Goods",
      align: "center",
      sx: { fontWeight: 500 },
      accessor: "goods",
    },
    {
      label: "Quantity",
      align: "center",
      render: (row) => (
        <Chip
          label={row.qty}
          size="small"
          sx={{
            bgcolor: "#fee",
            color: "#dc3545",
            fontWeight: 600,
            minWidth: "50px",
          }}
        />
      ),
    },
    {
      label: "Date",
      align: "center",
      render: (row) => formatDate(row.date),
    },
    {
      label: "Rejection Reason",
      align: "center",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.reason}
        </Typography>
      ),
    },
    {
      label: "Status",
      align: "center",
      render: (row) => {
        const { bg, color, label } = getStatusColor(row.status);
        return (
          <Chip
            label={label}
            size="small"
            sx={{
              backgroundColor: bg,
              color: color,
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        );
      },
    },
    {
      label: "Actions",
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
          <IconButton
            size="small"
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton color="warning" size="small">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#dc2626",
              bgcolor: "#fef2f2",
              "&:hover": { bgcolor: "#fee2e2" },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CommonCard
        title="Rejected Goods"
        addText={isSmall ? "Add" : "Add Rejected Items"}
        onAdd={() => setOpenDialog(true)}
        searchPlaceholder="Search Rejection ID, Source, Goods..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant={isSmall ? "scrollable" : "standard"}
          scrollButtons={isSmall ? "auto" : false}
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            minHeight: isSmall ? "40px" : "48px",
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              fontSize: isSmall ? "0.85rem" : "0.95rem",
              minHeight: isSmall ? "40px" : "48px",
              px: isSmall ? 2 : 3,
              color: "#666",
              "&.Mui-selected": {
                color: "#1172ba",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1172ba",
              height: "3px",
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab label="Total Rejected" />
          <Tab label="Return to Vendor" />
          <Tab label="Scrapped" />
        </Tabs>

        {/* Desktop Table View */}
        {!isMobile ? (
          <GlobalTable columns={columns} data={filteredData} />
        ) : (
          <Box>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <RejectedGoodsMobileCard key={item.id} item={item} />
              ))
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Warning sx={{ fontSize: 64, color: "#dee2e6" }} />
                <Typography variant="h6" sx={{ color: "#6c757d" }}>
                  No rejected goods found
                </Typography>
                <Typography variant="body2" sx={{ color: "#adb5bd" }}>
                  Try adjusting your search or filter criteria
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Add Rejected Items Dialog */}
        <AddRejectedGoodsDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </CommonCard>
    </Box>
  );
}
