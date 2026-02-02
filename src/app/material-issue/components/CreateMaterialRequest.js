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
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

export default function CreateMaterialRequest({ onClose }) {
  const router = useRouter();
  const [loadingBoms, setLoadingBoms] = useState(true);
  const [boms, setBoms] = useState([]);
  const [products, setProducts] = useState([]);
  const [availableBoms, setAvailableBoms] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    bomNumber: "",
    requiredQty: "",
    startDate: "",
    endDate: "",
    requestedBy: "",
    approvedBy: "",
  });

  useEffect(() => {
    const fetchBoms = async () => {
      try {
        const response = await axiosInstance.get("/bom");
        const bomData = response.data;
        setBoms(bomData);

        // Extract unique products
        const uniqueProducts = [...new Set(bomData.map(b => b.productName).filter(p => p))];
        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching BOMs:", error);
      } finally {
        setLoadingBoms(false);
      }
    };
    fetchBoms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "productName") {
      const filtered = boms.filter(b => b.productName === value);
      setAvailableBoms(filtered);
      // Auto-select the first BOM number found for this product
      const firstBom = filtered.length > 0 ? filtered[0].number : "";
      setForm(prev => ({ ...prev, bomNumber: firstBom }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!form.productName || !form.bomNumber || !form.requiredQty) {
        alert("Please fill in Product, BOM, and Quantity");
        return;
      }

      setSubmitting(true);

      // 1. Find the full BOM object to get its materials
      const selectedBom = boms.find(b => b.number === form.bomNumber);
      if (!selectedBom || !selectedBom.materials) {
        throw new Error("BOM details not found or materials list is empty.");
      }

      // 2. Fetch current store items to find matches
      const storeResponse = await axiosInstance.get("/store");
      const storeItems = storeResponse.data;

      // 3. Prepare inventory updates
      const requestQty = Number(form.requiredQty);
      const updates = [];

      for (const material of selectedBom.materials) {
        const bomMaterialQty = Number(material.qty || 0);
        if (bomMaterialQty === 0) continue;

        const totalNeeded = bomMaterialQty * requestQty;
        const partNo = material.scanboPartNo || material.scanboPartNumber;

        // Find matching item in store
        const storeItem = storeItems.find(item => (item.code || item.id) === partNo);

        if (storeItem) {
          const currentAvailable = Number(storeItem.available || 0);
          const updatedItem = {
            ...storeItem,
            available: Math.max(0, currentAvailable - totalNeeded),
            updated: new Date().toISOString().split("T")[0]
          };

          // Store the update promise
          updates.push(axiosInstance.put(`/store/${storeItem.id}`, updatedItem));
        } else {
          console.warn(`Material ${partNo} not found in store inventory.`);
        }
      }

      // 4. Execute all inventory updates
      if (updates.length > 0) {
        try {
          await Promise.all(updates);
        } catch (updateError) {
          throw new Error(`Failed to update store inventory: ${updateError.message}`);
        }
      }

      // 5. Finally, create the material issue request
      const payload = {
        ...form,
        bomId: selectedBom.id, // Save the actual BOM ID for direct fetching later
        requestNo: `MIR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        status: "Pending",
        createdAt: new Date().toISOString()
      };

      try {
        await axiosInstance.post("/material-issue", payload);
      } catch (postError) {
        throw new Error(`Inventory updated, but failed to save issue request: ${postError.message}. Check if /material-issue endpoint exists.`);
      }

      alert("Material request submitted and store inventory updated successfully!");
      if (onClose) onClose();
      else router.push("/material-issue");
    } catch (error) {
      console.error("Error processing material request:", error);
      alert(error.message || "Failed to process request and update inventory.");
    } finally {
      setSubmitting(false);
    }
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
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Product Name</InputLabel>
            <Select
              name="productName"
              value={form.productName}
              label="Product Name"
              onChange={handleChange}
              disabled={loadingBoms}
              sx={{
                bgcolor: "#fff",
                transition: "all 0.2s",
                "&:hover": { transform: "translateY(-1px)" }
              }}
            >
              {products.map((p, idx) => (
                <MenuItem key={idx} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="BOM Number"
            name="bomNumber"
            value={form.bomNumber}
            InputProps={{
              readOnly: true,
            }}
            placeholder="Select product first"
            sx={{
              bgcolor: "#f8fafc",
              transition: "all 0.2s",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#e2e8f0" },
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="Required Quantity"
            name="requiredQty"
            value={form.requiredQty}
            onChange={handleChange}
            sx={{
              bgcolor: "#fff",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-1px)" }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            fullWidth
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            sx={{
              bgcolor: "#fff",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-1px)" }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            sx={{
              bgcolor: "#fff",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-1px)" }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Requested By"
            name="requestedBy"
            value={form.requestedBy}
            onChange={handleChange}
            sx={{
              bgcolor: "#fff",
              transition: "#fff",
              "&:hover": { transform: "translateY(-1px)" }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Approved By"
            name="approvedBy"
            value={form.approvedBy}
            onChange={handleChange}
            sx={{
              bgcolor: "#fff",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-1px)" }
            }}
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
          startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
          onClick={handleSubmit}
          disabled={submitting || loadingBoms}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            px: 4,
          }}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </Box>

      {/* </Paper> */}
    </Box>
  );
}
