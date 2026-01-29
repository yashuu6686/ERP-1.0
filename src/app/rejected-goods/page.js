"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Warning,
  CheckCircle,
  Cancel,
  NavigateNext,
} from "@mui/icons-material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

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

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <Cancel sx={{ fontSize: 18, color: "#dc3545" }} />;
      case "medium":
        return <Warning sx={{ fontSize: 18, color: "#ffc107" }} />;
      case "low":
        return <CheckCircle sx={{ fontSize: 18, color: "#28a745" }} />;
      default:
        return null;
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
        item.rejectionId.toLowerCase().includes(search.toLowerCase()) ||
        item.sourceRef.toLowerCase().includes(search.toLowerCase()) ||
        item.goods.toLowerCase().includes(search.toLowerCase())
    );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Mobile Card View
  const MobileCard = ({ item }) => {
    const statusInfo = getStatusColor(item.status);
    return (
      <Card
        sx={{
          mb: 2,
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e0e0e0",
          transition: "all 0.3s ease",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "#1172ba",
                  fontSize: "1rem",
                  mb: 0.5,
                }}
              >
                {item.rejectionId}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.875rem" }}
              >
                {item.goods}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {getSeverityIcon(item.severity)}
              <Chip
                label={statusInfo.label}
                size="small"
                sx={{
                  backgroundColor: statusInfo.bg,
                  color: statusInfo.color,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: "24px",
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Grid container spacing={1.5}>
            <Grid item xs={6} size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Source Type
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.sourceType}
              </Typography>
            </Grid>
            <Grid item xs={6} size={{ xs: 12, md: 6 }}  >
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Source Ref
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.sourceRef}
              </Typography>
            </Grid>
            <Grid item xs={6} size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Quantity
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#dc3545" }}
              >
                {item.qty} units
              </Typography>
            </Grid>
            <Grid item xs={6} size={{ xs: 12, md: 6 }}>
              <Typography

                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Date
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formatDate(item.date)}
              </Typography>
            </Grid>
            <Grid item xs={12} size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", display: "block", mb: 0.5 }}
              >
                Reason
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#333",
                  backgroundColor: "#f8f9fa",
                  p: 1,
                  borderRadius: "6px",
                }}
              >
                {item.reason}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 2,
              pt: 1.5,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Button
              size="small"
              startIcon={<Visibility />}
              sx={{
                flex: 1,
                textTransform: "none",
                fontSize: "0.8rem",
                color: "rgb(17, 114, 186)",
                bgcolor: "#f1f5f9",
                "&:hover": { bgcolor: "#e2e8f0" }
              }}
              variant="contained"
            >
              View
            </Button>
            <IconButton
              size="small"
              sx={{
                color: "#dc2626",
                bgcolor: "#fef2f2",
                "&:hover": { bgcolor: "#fee2e2" }
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#dc2626",
                bgcolor: "#fef2f2",
                "&:hover": { bgcolor: "#fee2e2" }
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  };

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
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#f8f9fa",
                    "& th": {
                      fontWeight: 600,
                      color: "#495057",
                      borderBottom: "2px solid #dee2e6",
                      py: 1.5,
                    },
                  }}
                >
                  <TableCell sx={{ width: "60px" }}>S. No.</TableCell>
                  <TableCell>Rejection ID</TableCell>
                  <TableCell>Source Type</TableCell>
                  <TableCell>Source Reference</TableCell>
                  <TableCell>Rejected Goods</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Rejection Reason</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredData.map((row, i) => {
                  const statusInfo = getStatusColor(row.status);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell sx={{ color: "#6c757d" }}>{i + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {getSeverityIcon(row.severity)}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#1172ba" }}
                          >
                            {row.rejectionId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.sourceType}</TableCell>
                      <TableCell sx={{ color: "#495057" }}>
                        {row.sourceRef}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{row.goods}</TableCell>
                      <TableCell align="center">
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
                      </TableCell>
                      <TableCell>{formatDate(row.date)}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={statusInfo.label}
                          size="small"
                          sx={{
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                          <IconButton
                            size="small"
                            sx={{
                              color: "rgb(17, 114, 186)",
                              bgcolor: "#f1f5f9",
                              "&:hover": { bgcolor: "#e2e8f0" }
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: "#dc2626",
                              bgcolor: "#fef2f2",
                              "&:hover": { bgcolor: "#fee2e2" }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: "#dc2626",
                              bgcolor: "#fef2f2",
                              "&:hover": { bgcolor: "#fee2e2" }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 8 }}>
                      <Box
                        sx={{
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
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Box>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <MobileCard key={item.id} item={item} />
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
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700 }}>Add Rejected Items</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rejection ID"
                  name="rejectionId"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Source Type"
                  name="sourceType"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Source Reference"
                  name="sourceReference"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  name="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rejected Goods"
                  name="rejectedGoods"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Rejected Quantity"
                  name="rejectedQty"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rejection Reason"
                  name="reason"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rejected By"
                  name="rejectedBy"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#1172ba",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0d5a94" },
              }}
            >
              Submit Rejection
            </Button>
          </DialogActions>
        </Dialog>
      </CommonCard>
    </Box>
  );
}
