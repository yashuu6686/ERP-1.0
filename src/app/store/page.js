
"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { Visibility, Save, NavigateNext } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import CommonCard from "../../components/CommonCard";

const materialsData = [
  {
    code: "SIPL.ASY.PBT.001",
    name: "Upper Case",
    category: "Raw Material",
    available: 600,
    minimum: 100,
    updated: "-",
  },
  {
    code: "SIPL.ASY.PBT.002",
    name: "Screws",
    category: "Raw Material",
    available: 300,
    minimum: 100,
    updated: "-",
  },
  {
    code: "SIPL.ASY.PC.A.001",
    name: "Mainboard With Components",
    category: "Raw Material",
    available: 600,
    minimum: 100,
    updated: "-",
  },
  {
    code: "SIPL.ASY.MC.002",
    name: "Silicon T-shaped tube",
    category: "Raw Material",
    available: 300,
    minimum: 100,
    updated: "-",
  },
];

export default function Store() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    category: "",
    available: "",
    minimum: "",
    unit: "",
    location: "",
  });

  const router = useRouter();

  const handleTabChange = (e, newValue) => setTab(newValue);

  const filtered = materialsData.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Material Saved:", form);
    setOpenDialog(false);
  };

  return (
    <Box>

      <CommonCard
        title="Store"
        addText="Add Material"
        onAdd={() => setOpenDialog(true)}
        searchPlaceholder="Search Materials"
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      >
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            mb: 3,
            minHeight: "45px",
            borderBottom: "1px solid #e2e8f0",
            "& .MuiTab-root": {
              fontWeight: 500,
              textTransform: "none",
              fontSize: "15px",
              minHeight: "45px",
              px: 3,
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
          <Tab label="Raw Materials" />
          <Tab label="IT Items" />
          <Tab label="Finished Products" />
          <Tab label="Other Items" />
        </Tabs>

        {/* Table */}
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f3f4f6" }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Sr. No.</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Material Code</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Material Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Category</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Available Qty</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Minimum Qty</TableCell>
                <TableCell align="center" sx={{ fontWeight: 400 }}>Last Updated</TableCell>
                <TableCell sx={{ fontWeight: 400 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={i} sx={{ transition: "0.2s" }}>
                  <TableCell align="center" sx={{ fontWeight: 600, }}>
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "#1172ba" }}>
                    {row.code}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.available}
                      color={row.available <= row.minimum ? "error" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">{row.minimum}</TableCell>
                  <TableCell align="center">{row.updated}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/store/${row.code}`)}
                      sx={{
                        color: "rgb(17, 114, 186)",
                        bgcolor: "#f1f5f9",
                        "&:hover": { bgcolor: "#e2e8f0" }
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Add Raw Material</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Material Name"
                  name="name"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Material Code"
                  name="code"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  label="Available Quantity"
                  name="available"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Minimum Stock Level"
                  name="minimum"
                  onChange={handleChange}
                // size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Unit"
                  name="unit"
                  onChange={handleChange}
                // size="small"
                />
              </Grid>
              <Grid item xs={12} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Storage Location"
                  name="location"
                  onChange={handleChange}
                // size="small"
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
              startIcon={<Save />}
              onClick={handleSave}
              sx={{
                backgroundColor: "#1172ba",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0d5a94" },
              }}
            >
              Save Material
            </Button>
          </DialogActions>
        </Dialog>
      </CommonCard>
    </Box>
  );
}
