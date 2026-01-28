"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Delete,
  Business,
  LocalShipping,
  Description,
  CalendarToday,
  Person,
  Save,
  CloudUpload,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CommonCard from "../../../components/CommonCard";

export default function CreateDispatchEntry() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    companyName: "Scanbo Engineering Pvt. Ltd.",
    officeAddress: "Mumbai, Maharashtra, India",
    email: "info@scanbo.com",
    phone: "+91 98765 43210",
    orderNumber: "",
    dispatchDate: "",
    trackingNumber: "",
    customerName: "",
    deliveryAddress: "",
    contactPerson: "",
    contactNo: "",
    deliveryDate: "",
    courierCompany: "",
    referenceNo: "",
    salesPlatform: "",
    packedBy: "",
    approvedBy: "",
    accountingBy: "",
  });

  const [products, setProducts] = useState([
    { name: "", quantity: "" },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
    // Clear product errors when user starts typing
    if (errors[`product_${index}_${field}`]) {
      setErrors({ ...errors, [`product_${index}_${field}`]: false });
    }
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: "" }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const newErrors = {};

    // Validate all required fields
    const requiredFields = [
      "orderNumber",
      "dispatchDate",
      "trackingNumber",
      "customerName",
      "deliveryAddress",
      "contactPerson",
      "contactNo",
      "deliveryDate",
      "courierCompany",
      "referenceNo",
      "salesPlatform",
      "packedBy",
      "approvedBy",
      "accountingBy",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = true;
      }
    });

    // Validate products
    products.forEach((product, index) => {
      if (!product.name || product.name.trim() === "") {
        newErrors[`product_${index}_name`] = true;
      }
      if (!product.quantity || product.quantity.trim() === "") {
        newErrors[`product_${index}_quantity`] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all validations pass
    alert("Dispatch Entry Saved Successfully!");
    router.push("/dispatch");
  };

  return (
    <CommonCard title="Create Dispatch Entry">
      <Box sx={{ p: 1 }}>
        {/* Company Information */}
        <Card
          sx={{
            mb: 4,
            border: "1px solid #e9ecef",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Business />
            <Typography variant="h6" fontWeight={600}>
              Company Information
            </Typography>
          </Box>
          <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Company Name"
                  defaultValue="Scanbo Engineering Pvt. Ltd."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                      "&:hover": {
                        "& > fieldset": { borderColor: "#1172ba" },
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Office Address"
                  defaultValue="Mumbai, Maharashtra, India"
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Email"
                  type="email"
                  defaultValue="info@scanbo.com"
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Phone Number"
                  defaultValue="+91 98765 43210"
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Dispatch Info */}
        <Card
          sx={{
            mb: 4,
            border: "1px solid #e9ecef",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Description />
            <Typography variant="h6" fontWeight={600}>
              Dispatch Information
            </Typography>
          </Box>
          <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Order Number"
                  placeholder="SO-001"
                  value={formData.orderNumber}
                  onChange={(e) => handleChange("orderNumber", e.target.value)}
                  required
                  error={errors.orderNumber}
                  helperText={errors.orderNumber && "This field is required"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description sx={{ color: "#1172ba" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                      "&:hover": {
                        "& > fieldset": { borderColor: "#1172ba" },
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Dispatch Date"
                  value={formData.dispatchDate}
                  onChange={(e) => handleChange("dispatchDate", e.target.value)}
                  required
                  error={errors.dispatchDate}
                  helperText={errors.dispatchDate && "This field is required"}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: "#1172ba" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Tracking Number"
                  placeholder="TRK-889900"
                  value={formData.trackingNumber}
                  onChange={(e) => handleChange("trackingNumber", e.target.value)}
                  required
                  error={errors.trackingNumber}
                  helperText={errors.trackingNumber && "This field is required"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalShipping sx={{ color: "#1172ba" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Customer + Delivery */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Customer */}
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Business />
                <Typography variant="h6" fontWeight={600}>
                  Customer Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                    <TextField
                      fullWidth
                      value={formData.customerName}
                      onChange={(e) => handleChange("customerName", e.target.value)}
                      required
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                      label="Customer/Organisation"
                      placeholder="Enter customer name"
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                    <TextField
                      fullWidth
                      value={formData.deliveryAddress}
                      onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                      required
                      label="Delivery Address"
                      placeholder="Enter complete delivery address"
                      multiline
                      rows={2}
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      value={formData.contactPerson}
                      onChange={(e) => handleChange("contactPerson", e.target.value)}
                      required
                      label="Contact Person"
                      placeholder="Contact name"
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      value={formData.contactNo}
                      onChange={(e) => handleChange("contactNo", e.target.value)}
                      required
                      label="Contact No."
                      placeholder="+91 98765 43210"
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Delivery */}
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <LocalShipping />
                <Typography variant="h6" fontWeight={600}>
                  Delivery Details
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => handleChange("deliveryDate", e.target.value)}
                      required
                      label="Delivery Date"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      value={formData.courierCompany}
                      onChange={(e) => handleChange("courierCompany", e.target.value)}
                      required
                      label="Courier Company"
                      placeholder="e.g., Blue Dart"
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      value={formData.referenceNo}
                      onChange={(e) => handleChange("referenceNo", e.target.value)}
                      required
                      label="Reference No."
                      placeholder="Internal reference"
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      value={formData.salesPlatform}
                      onChange={(e) => handleChange("salesPlatform", e.target.value)}
                      required
                      label="Sales Platform"
                      placeholder="Direct Sales / Online"
                      sx={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Products Table */}
        <Card
          sx={{
            mb: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)", // Blue gradient
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Description />
              <Typography variant="h6" fontWeight={600}>
                Product Details
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addProduct}
              sx={{
                backgroundColor: "white",
                color: "#1172ba",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
              }}
            >
              Add Product
            </Button>
          </Box>

          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, color: "#495057" }}>
                    Sr
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#495057",
                      minWidth: 250,
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, color: "#495057", width: 140 }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, color: "#495057", width: 80 }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:hover": { bgcolor: "#f8f9fa" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={i + 1}
                        sx={{
                          bgcolor: "#1172ba",
                          color: "white",
                          fontWeight: 600,
                          minWidth: 32,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        placeholder="Enter product name..."
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(i, "name", e.target.value)
                        }
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "#1172ba",
                            },
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        placeholder="0"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(i, "quantity", e.target.value)
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Remove product">
                        <IconButton
                          color="error"
                          onClick={() => removeProduct(i)}
                          disabled={products.length === 1}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Card>

        {/* Packaging & Approvals */}
        <Card sx={{ mb: 4, borderRadius: 2 }}>
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Person />
            <Typography variant="h6" fontWeight={600}>
              Packaging & Approvals
            </Typography>
          </Box>
          <CardContent sx={{ p: 3, background: "#f8fafc" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  value={formData.packedBy}
                  onChange={(e) => handleChange("packedBy", e.target.value)}
                  required
                  label="Packed By"
                  multiline
                  rows={2}
                  sx={{ bgcolor: "white" }}
                  placeholder="Name, Sign & Date"
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  value={formData.approvedBy}
                  onChange={(e) => handleChange("approvedBy", e.target.value)}
                  required
                  label="Approved By"
                  multiline
                  rows={2}
                  sx={{ bgcolor: "white" }}
                  placeholder="Name, Sign & Date"
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  value={formData.accountingBy}
                  onChange={(e) => handleChange("accountingBy", e.target.value)}
                  required
                  label="Accounting By"
                  multiline
                  rows={2}
                  sx={{ bgcolor: "white" }}
                  placeholder="Name, Sign & Date"
                />
              </Grid>
            </Grid>

            {/* File Upload */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#495057", mb: 1.5, fontWeight: 600 }}
              >
                Upload Evidence (Photos/Documents)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                sx={{
                  py: 3,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  bgcolor: "white",
                  borderColor: "#1172ba",
                  color: "#1172ba",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#e3f2fd",
                    borderColor: "#0d5a94",
                  },
                }}
              >
                Click to Upload Files or Drag & Drop
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
              </Button>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6c757d", mb: 1, display: "block" }}
                  >
                    Uploaded Files ({uploadedFiles.length})
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {uploadedFiles.map((file, index) => (
                      <Chip
                        key={index}
                        label={file.name}
                        onDelete={() => removeFile(index)}
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1172ba",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "end" }}>
          <Button
            variant="outlined"
            onClick={() => router.push("/dispatch")}
            sx={{
              borderColor: "#1172ba",
              color: "#1172ba",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{
              backgroundColor: "#1172ba",
              "&:hover": { backgroundColor: "#0d5a94" },
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Save Dispatch Entry
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
