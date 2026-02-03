"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../components/Loader";

const getStatusColor = (status) => {
  switch (status) {
    case "total":
      return { bg: "#fef9c3", color: "#a16207", label: "Pending" };
    case "return":
      return { bg: "#ecfeff", color: "#0891b2", label: "Return to Vendor" };
    case "scrap":
      return { bg: "#fee2e2", color: "#b91c1c", label: "Scrapped" };
    default:
      return { bg: "#f1f5f9", color: "#475569", label: status };
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

export default function RejectedGoods() {
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [rejectedData, setRejectedData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchRejectedGoods = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/rejected-goods");
      setRejectedData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch rejected goods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRejectedGoods();
  }, []);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setDialogMode("add");
    setForm({
      rejectionId: `REJ-${Date.now().toString().slice(-4)}`,
      rejectedGoods: "",
      sourceType: "GRN",
      date: new Date().toISOString().split("T")[0],
      sourceReference: "",
      reason: "",
      rejectedQty: "",
      rejectedBy: "",
    });
    setOpenDialog(true);
  };

  const router = useRouter();

  const handleView = (item) => {
    router.push(`/rejected-goods/view-rejected-goods?id=${item.id || 'rej_1'}`);
  };

  const handleEdit = (item) => {
    setDialogMode("edit");
    setSelectedId(item.id);
    setForm({
      rejectionId: item.rejectionId,
      rejectedGoods: item.goods,
      sourceType: item.sourceType,
      date: item.date,
      sourceReference: item.sourceRef,
      reason: item.reason,
      rejectedQty: item.qty,
      rejectedBy: item.rejectedBy || "-",
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this rejection record?")) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/rejected-goods/${id}`);
        await fetchRejectedGoods();
        alert("Record deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete record.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        rejectionId: form.rejectionId,
        sourceType: form.sourceType,
        sourceRef: form.sourceReference,
        goods: form.rejectedGoods,
        qty: parseInt(form.rejectedQty),
        date: form.date,
        reason: form.reason,
        status: tab === 0 ? "total" : tab === 1 ? "return" : "scrap",
        rejectedBy: form.rejectedBy,
      };

      if (dialogMode === "add") {
        await axiosInstance.post("/rejected-goods", payload);
        alert("Rejected Item Added Successfully!");
      } else {
        await axiosInstance.put(`/rejected-goods/${selectedId}`, payload);
        alert("Rejected Item Updated Successfully!");
      }

      setOpenDialog(false);
      await fetchRejectedGoods();
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Failed to save record.");
    } finally {
      setLoading(false);
    }
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
        (item.rejectionId || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.sourceRef || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.goods || "").toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    {
      label: "Sr.No.",
      align: "center",
      sx: { width: "60px" },
      render: (row, index) => <span style={{ color: "#6c757d" }}>{index + 1}</span>,
    },
    {
      label: "Rejection No.",
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
      accessor: "sourceRef",
    },
    {
      label: "Rejected Goods",
      align: "center",
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
            bgcolor: "#fee2e2",
            color: "#b91c1c",
            fontWeight: 700,
            borderRadius: 1.5,
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
            onClick={() => handleView(row)}
            sx={{
              color: "rgb(17, 114, 186)",
              bgcolor: "#f1f5f9",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton color="warning" size="small" onClick={() => handleEdit(row)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(row.id)}
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
        onAdd={handleAdd}
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
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            mb: 3,
            minHeight: isSmall ? "40px" : "48px",
            borderBottom: "1px solid #e2e8f0",
            "& .MuiTab-root": {
              fontWeight: 400,
              textTransform: "none",
              fontSize: isSmall ? "0.85rem" : "0.95rem",
              minHeight: isSmall ? "40px" : "48px",
              px: isSmall ? 2 : 3,
              color: "#64748b",
              borderRadius: "10px 10px 0 0",
              transition: "all 0.2s",
              "&:hover": {
                color: "#1172ba",
                backgroundColor: "rgba(17, 114, 186, 0.04)",
              },
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "#1172ba",
              },
            },
          }}
        >
          <Tab label="Total Rejected" />
          <Tab label="Return to Vendor" />
          <Tab label="Scrapped" />
        </Tabs>

        {loading ? (
          <Loader message="Fetching rejected goods..." />
        ) : !isMobile ? (
          <GlobalTable columns={columns} data={filteredData} />
        ) : (
          <Box>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <RejectedGoodsMobileCard
                  key={item.id}
                  item={item}
                  onView={() => handleView(item)}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                />
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

        <AddRejectedGoodsDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          form={form}
          mode={dialogMode}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </CommonCard>
    </Box>
  );
}
