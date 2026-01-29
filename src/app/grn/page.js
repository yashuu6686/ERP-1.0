"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Add, Save, NavigateNext } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

export default function GRNTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    grnNumber: "",
    poNumber: "",
    invoiceNumber: "",
    receivedDate: "",
    itemName: "",
    quantity: "",
    receivedBy: "",
    supplierName: "",
  });

  const [open, setOpen] = useState(false);

  const grnData = [
    {
      id: 1,
      grn: "GRN/2025002",
      po: "SIPL/2025019",
      invoice: "SIPL/2025019",
      item: "Tally Prime Silver Single User (Virtual License)",
      date: "20-03-2025",
      receivedBy: "aj",
      supplier: "ABC",
      qty: 2,
    },
    {
      id: 2,
      grn: "GRN/2025001",
      po: "STC/2025018",
      invoice: "STC/2025018",
      item: "Tally Prime Silver Single User (Virtual License)",
      date: "10-02-2025",
      receivedBy: "vk",
      supplier: "XYZ",
      qty: 1,
    },
  ];

  const filtered = grnData.filter(
    (g) =>
      g.grn.toLowerCase().includes(search.toLowerCase()) ||
      g.po.toLowerCase().includes(search.toLowerCase()) ||
      g.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("GRN Data:", form);
    alert("GRN Saved Successfully!");
  };

  return (
    <Box>

      <CommonCard
        title="Goods Receipt Note (GRN)"
        addText="Create GRN"
        onAdd={() => setOpen(true)}
        searchPlaceholder="Search GRN"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f3f4f6" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Sr.No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>GRN Number</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>PO Number</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Invoice Number</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Item Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Received Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Received By</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Supplier</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Quantity</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{
                    transition: "0.2s",
                  }}
                >
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center" sx={{ color: "#1172ba", fontWeight: 600 }}>
                    {row.grn}
                  </TableCell>
                  <TableCell align="center">{row.po}</TableCell>
                  <TableCell align="center">{row.invoice}</TableCell>
                  <TableCell align="center" sx={{ maxWidth: 280 }}>{row.item}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                    <Chip label={row.receivedBy} size="small" />
                  </TableCell>
                  <TableCell align="center">{row.supplier}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.qty}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Create GRN</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="GRN Number"
                  name="grnNumber"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="PO Number"
                  name="poNumber"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  name="invoiceNumber"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Received Date"
                  name="receivedDate"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Item Name"
                  name="itemName"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Received Quantity"
                  name="quantity"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Received By"
                  name="receivedBy"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Supplier Name"
                  name="supplierName"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#1172ba",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0d5a94" },
              }}
            >
              Save GRN
            </Button>
          </DialogActions>
        </Dialog>
      </CommonCard>
    </Box>
  );
}
