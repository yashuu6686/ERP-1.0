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
} from "@mui/material";
import CommonCard from "../../components/CommonCard";

const rejectedData = [
  {
    id: 1,
    rejectionId: "REJ-001",
    sourceType: "GRN/2025002",
    sourceRef: "GRN/2025002",
    goods: "abc",
    qty: 20,
    date: "20-03-2025",
    reason: "Surface defects",
    status: "total",
  },
  {
    id: 2,
    rejectionId: "REJ-002",
    sourceType: "GRN/2025001",
    sourceRef: "GRN/2025001",
    goods: "xyz",
    qty: 50,
    date: "10-02-2025",
    reason: "Surface defects",
    status: "return",
  },
  {
    id: 3,
    rejectionId: "REJ-003",
    sourceType: "GRN/2025003",
    sourceRef: "GRN/2025003",
    goods: "pqr",
    qty: 10,
    date: "15-03-2025",
    reason: "Crack found",
    status: "scrap",
  },
];

export default function RejectedGoods() {
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    rejectionId: "",
    rejectedGoods: "",
    sourceType: "",
    date: "",
    sourceReference: "",
    reason: "",
    rejectedQty: "",
  });

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Rejected Item:", form);
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
        item.sourceRef.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <CommonCard
      title="Rejected Goods"
      addText="Add Rejected Items"
      onAdd={() => setOpenDialog(true)}
      searchPlaceholder="Search Rejection ID, Source..."
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    >
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={{
          mb: 3,
          "& .MuiTab-root": { fontWeight: 600, textTransform: "none" },
        }}
      >
        <Tab label="Total Rejected" />
        <Tab label="Return to Vendor" />
        <Tab label="Scrapped" />
      </Tabs>

      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 400 }}>S. No.</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Rejection ID</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Source Type</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Source Reference</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Rejected Goods</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Rejected Quantity</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>Rejection Reason</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row, i) => (
              <TableRow key={row.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1172ba" }}>
                  {row.rejectionId}
                </TableCell>
                <TableCell>{row.sourceType}</TableCell>
                <TableCell>{row.sourceRef}</TableCell>
                <TableCell>{row.goods}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.reason}</TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Add Rejected Items Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
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
                label="Rejected Goods"
                name="rejectedGoods"
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
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                name="date"
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
                label="Rejection Reason"
                name="reason"
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
  );
}
