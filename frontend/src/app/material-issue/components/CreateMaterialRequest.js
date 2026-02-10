"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import Assignment from "@mui/icons-material/Assignment";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import FormReviewDialog from "@/components/ui/FormReviewDialog";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateMaterialRequest({ onClose }) {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const [loadingBoms, setLoadingBoms] = useState(true);
  const [boms, setBoms] = useState([]);
  const [products, setProducts] = useState([]);
  const [availableBoms, setAvailableBoms] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    bomNumber: Yup.string().required("BOM Number is required"),
    requiredQty: Yup.number()
      .typeError("Must be a number")
      .positive("Qty must be positive")
      .required("Required Quantity is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .required("End Date is required"),
    requestedBy: Yup.string().required("Requested By is required"),
    approvedBy: user?.role === "admin" ? Yup.string().required("Approved By is required") : Yup.string(),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      bomNumber: "",
      requiredQty: "",
      startDate: "",
      endDate: "",
      requestedBy: "",
      approvedBy: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Show preview instead of submitting directly
      setShowPreview(true);
    },
  });

  const handleFinalSubmit = async () => {
    try {
      setSubmitting(true);
      setShowPreview(false);

      const values = formik.values;

      // 1. Find the full BOM object to get its materials
      const selectedBom = boms.find((b) => b.number === values.bomNumber);
      if (!selectedBom || !selectedBom.materials) {
        throw new Error("BOM details not found or materials list is empty.");
      }

      // 2. Fetch current store items to find matches
      const storeResponse = await axiosInstance.get("/store");
      const storeItems = storeResponse.data;

      // 3. Prepare inventory updates
      const requestQty = Number(values.requiredQty);
      const updates = [];

      for (const material of selectedBom.materials) {
        const bomMaterialQty = Number(material.qty || 0);
        if (bomMaterialQty === 0) continue;

        const totalNeeded = bomMaterialQty * requestQty;
        const partNo = material.scanboPartNo || material.scanboPartNumber;

        // Find matching item in store
        const storeItem = storeItems.find((item) => (item.code || item.id) === partNo);

        if (storeItem) {
          const currentAvailable = Number(storeItem.available || 0);
          const updatedItem = {
            ...storeItem,
            available: Math.max(0, currentAvailable - totalNeeded),
            updated: new Date().toISOString().split("T")[0],
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
        ...values,
        bomId: selectedBom.id,
        requestNo: `MIR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      await axiosInstance.post("/material-issue", payload);

      showNotification("Material request submitted and store inventory updated successfully!", "success");
      if (onClose) onClose();
      else router.push("/material-issue");
    } catch (error) {
      console.error("Error processing material request:", error);
      showNotification(error.message || "Failed to process request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchBoms = async () => {
      try {
        const response = await axiosInstance.get("/bom");
        const bomData = response.data;
        setBoms(bomData);

        // Extract unique products
        const uniqueProducts = [...new Set(bomData.map((b) => b.productName).filter((p) => p))];
        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching BOMs:", error);
      } finally {
        setLoadingBoms(false);
      }
    };
    fetchBoms();
  }, []);

  const handleProductChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("productName", value);

    const filtered = boms.filter((b) => b.productName === value);
    setAvailableBoms(filtered);

    // Auto-select the first BOM number found for this product
    const firstBom = filtered.length > 0 ? filtered[0].number : "";
    formik.setFieldValue("bomNumber", firstBom);
  };

  // Handle Enter key navigation
  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const fields = [
        'productName',
        'requiredQty',
        'startDate',
        'endDate',
        'requestedBy',
        ...(user?.role === 'admin' ? ['approvedBy'] : []),
        'description'
      ];
      const currentIndex = fields.indexOf(currentField);
      if (currentIndex !== -1 && currentIndex < fields.length - 1) {
        const nextField = fields[currentIndex + 1];
        // Try input, textarea, and select elements
        let nextInput = document.querySelector(`input[name="${nextField}"]`);
        if (!nextInput) {
          nextInput = document.querySelector(`textarea[name="${nextField}"]`);
        }
        if (!nextInput) {
          nextInput = document.querySelector(`[name="${nextField}"]`);
        }
        if (nextInput) {
          nextInput.focus();
        }
      }
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
        <Grid size={{ xs: 12, md: 6 }} >
          <FormControl
            fullWidth
            size="small"
            error={formik.touched.productName && Boolean(formik.errors.productName)}
          >
            <InputLabel required>Product Name</InputLabel>
            <Select
              name="productName"
              value={formik.values.productName}
              label="Product Name"
              onChange={handleProductChange}
              onBlur={formik.handleBlur}
              onKeyDown={(e) => handleKeyDown(e, 'productName')}
              disabled={loadingBoms}
              input={
                <OutlinedInput
                  label="Product Name"
                  endAdornment={
                    formik.values.productName && (
                      <InputAdornment position="end" sx={{ position: 'absolute', right: 28, zIndex: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            formik.setFieldValue("productName", "");
                            formik.setFieldValue("bomNumber", "");
                          }}
                          sx={{ p: 0.5 }}
                        >
                          <Clear sx={{ fontSize: 18 }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                />
              }
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
            {formik.touched.productName && formik.errors.productName && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {formik.errors.productName}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="BOM Number"
            name="bomNumber"
            value={formik.values.bomNumber}
            onBlur={formik.handleBlur}
            error={formik.touched.bomNumber && Boolean(formik.errors.bomNumber)}
            helperText={formik.touched.bomNumber && formik.errors.bomNumber}
            InputProps={{
              readOnly: true,
            }}
            required
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
            value={formik.values.requiredQty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => handleKeyDown(e, 'requiredQty')}
            error={formik.touched.requiredQty && Boolean(formik.errors.requiredQty)}
            helperText={formik.touched.requiredQty && formik.errors.requiredQty}
            required
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
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => handleKeyDown(e, 'startDate')}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            required
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
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => handleKeyDown(e, 'endDate')}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            required
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
            value={formik.values.requestedBy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => handleKeyDown(e, 'requestedBy')}
            error={formik.touched.requestedBy && Boolean(formik.errors.requestedBy)}
            helperText={formik.touched.requestedBy && formik.errors.requestedBy}
            required
            sx={{
              bgcolor: "#fff",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-1px)" }
            }}
          />
        </Grid>

        {user?.role === 'admin' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Approved By"
              name="approvedBy"
              value={formik.values.approvedBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={(e) => handleKeyDown(e, 'approvedBy')}
              error={formik.touched.approvedBy && Boolean(formik.errors.approvedBy)}
              helperText={formik.touched.approvedBy && formik.errors.approvedBy}
              required
              sx={{
                bgcolor: "#fff",
                transition: "all 0.2s",
                "&:hover": { transform: "translateY(-1px)" }
              }}
            />
          </Grid>
        )}

        {/* Notes/Description */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Additional Instructions / Notes"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => handleKeyDown(e, 'description')}
            placeholder="Enter any specific handling requirements or project notes..."
            sx={{
              bgcolor: "#fff",
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
          variant="outlined"
          startIcon={<Visibility />}
          onClick={formik.handleSubmit}
          disabled={submitting || loadingBoms}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          Preview Request
        </Button>
      </Box>

      {/* Preview Dialog */}
      <FormReviewDialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleFinalSubmit}
        title="Review Material Request"
        icon={<Assignment />}
        headerInfo={{
          label1: "PRODUCT",
          value1: formik.values.productName,
          label2: "BOM NUMBER",
          value2: formik.values.bomNumber
        }}
        confirmLabel="Confirm & Submit"
      >
        <Grid container spacing={3}>
          {/* Request Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                <Assignment sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Request Details</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>PRODUCT NAME</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.productName}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>BOM NUMBER</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.bomNumber}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REQUIRED QUANTITY</Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>{formik.values.requiredQty}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REQUESTED BY</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.requestedBy}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Timeline */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                <Assignment sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline & Approval</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>START DATE</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.startDate}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>END DATE</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.endDate}</Typography>
                </Box>
                {user?.role === 'admin' && formik.values.approvedBy && (
                  <Box sx={{ gridColumn: 'span 2' }}>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>APPROVED BY</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.approvedBy}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Description */}
          {formik.values.description && (
            <Grid size={{ xs: 12 }}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>ADDITIONAL INSTRUCTIONS / NOTES</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{formik.values.description}</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </FormReviewDialog>

      {/* </Paper> */}
    </Box>
  );
}
