"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import { useRouter } from "next/navigation";

export default function CreateMaterialRequest({ onClose }) {
  const router = useRouter();

  const [form, setForm] = useState({
    productName: "",
    bomNumber: "",
    requiredQty: "",
    startDate: "",
    endDate: "",
    requestedBy: "",
    approvedBy: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Material Request:", form);
    router.push("/material-issue"); // back to list
  };

  return (
    <Box >
      <Typography
        variant="h6"
        fontWeight={500}
        sx={{ mb: 4, borderBottom: "1px solid #e5e7eb", pb: 1 }}
      >
        Create Material Request
      </Typography>

      {/* Form */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            fullWidth
            label="Product Name"
            name="productName"
            value={form.productName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="BOM Number"
            name="bomNumber"
            value={form.bomNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="Required Quantity"
            name="requiredQty"
            value={form.requiredQty}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            fullWidth
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Requested By"
            name="requestedBy"
            value={form.requestedBy}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Approved By"
            name="approvedBy"
            value={form.approvedBy}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => onClose()}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSubmit}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            px: 4,
          }}
        >
          Submit Request
        </Button>
      </Box>

      {/* </Paper> */}
    </Box>
  );
}
