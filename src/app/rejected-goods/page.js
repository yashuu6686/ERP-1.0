"use client";
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import CommonCard from "../../components/CommonCard";
import AddRejectedGoodsDialog from "./components/AddRejectedGoodsDialog";
import RejectedGoodsTable from "./components/RejectedGoodsTable";
import RejectedGoodsMobileCard from "./components/RejectedGoodsMobileCard";

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
          <RejectedGoodsTable filteredData={filteredData} />
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
