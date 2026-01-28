"use client"
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  IconButton,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  Assignment,
  ShoppingBag,
  ListAlt,
  Save,
  ChevronRight,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";

export default function CreateOrder() {
  const [kitQty, setKitQty] = useState(6);
  const [singleProducts, setSingleProducts] = useState([
    { id: Date.now(), name: "", quantity: "" },
  ]);

  const addProduct = () => {
    setSingleProducts([
      ...singleProducts,
      { id: Date.now(), name: "", quantity: "" },
    ]);
  };

  const removeProduct = (id) => {
    if (singleProducts.length > 1) {
      setSingleProducts(singleProducts.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id, field, value) => {
    setSingleProducts(
      singleProducts.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <CommonCard title="Create New Order">
      <Box sx={{ p: 1 }}>
        {/* Order Details Section */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 2,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Assignment sx={{ color: "#fff" }} />
            <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
              Order Information
            </Typography>
          </Box>
          <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
            <Grid container spacing={3}>
              {[
                { label: "Order Number", placeholder: "ORD-2024-001" },
                { label: "Customer Name", placeholder: "Enter customer name" },
                { label: "Order Date", type: "date" },
                { label: "Contact Number", placeholder: "Enter contact number" },
                { label: "Customer Address", placeholder: "Enter address", fullWidth: true },
                { label: "Delivery Date", type: "date" },
                { label: "Order Status", placeholder: "Pending" },
              ].map((field, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={field.fullWidth ? 6 : 3}
                  size={{ xs: 12, sm: 6, md: field.fullWidth ? 6 : 3 }}
                  key={i}
                >
                  <TextField
                    fullWidth
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                    variant="outlined"
                    size="small"
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        "&:hover fieldset": { borderColor: "#1172ba" },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Products Selection Section */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 2,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ShoppingBag sx={{ color: "#fff" }} />
            <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
              Products Selection
            </Typography>
          </Box>
          <CardContent sx={{ p: 3, bgcolor: "#f1f5f9" }}>
            <Grid container spacing={4}>
              {/* Full Kit Selection */}
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <Card sx={{ borderRadius: 2, border: "1px solid #e2e8f0", height: "100%", boxShadow: "none" }}>
                  <Box sx={{ p: 2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <Typography variant="subtitle2" fontWeight={700} color="#475569">
                      Full Kit Details
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        border: "1px solid #e2e8f0",
                        borderRadius: 2,
                        bgcolor: "white",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={600} color="#1e293b">
                          D8 Kit
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Standard diagnostic assembly
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <IconButton
                          onClick={() => setKitQty(Math.max(0, kitQty - 1))}
                          size="small"
                          sx={{ border: "1px solid #e2e8f0", bgcolor: "#f8fafc" }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography fontWeight={700} sx={{ minWidth: 24, textAlign: "center" }}>
                          {kitQty}
                        </Typography>
                        <IconButton
                          onClick={() => setKitQty(kitQty + 1)}
                          size="small"
                          sx={{ border: "1px solid #e2e8f0", bgcolor: "#f8fafc", color: "#1172ba" }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 3, p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px dashed #cbd5e1" }}>
                      <Typography variant="subtitle2" fontWeight={700} mb={2} color="#475569" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ListAlt fontSize="small" /> Order Summary
                      </Typography>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="textSecondary">Standard Kit (D8):</Typography>
                        <Typography variant="body2" fontWeight={600} color="#0f172a">{kitQty} units</Typography>
                      </Box>

                      {singleProducts.some((p) => p.name || p.quantity) && (
                        <>
                          <Divider sx={{ my: 1.5 }} />
                          <Typography variant="body2" fontWeight={700} color="#475569" sx={{ mb: 1 }}>
                            Additional Products:
                          </Typography>
                          {singleProducts.map(
                            (product, idx) =>
                              (product.name || product.quantity) && (
                                <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                  <Typography variant="body2" color="textSecondary">
                                    {product.name || `Product ${idx + 1}`}:
                                  </Typography>
                                  <Typography variant="body2" fontWeight={600}>
                                    {product.quantity || 0} units
                                  </Typography>
                                </Box>
                              )
                          )}
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Single Product Selection */}
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <Card sx={{ borderRadius: 2, border: "1px solid #e2e8f0", height: "100%", boxShadow: "none" }}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#f8fafc",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={700} color="#475569">
                      Single Products
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Add />}
                      variant="contained"
                      onClick={addProduct}
                      sx={{
                        textTransform: "none",
                        bgcolor: "#1172ba",
                        "&:hover": { bgcolor: "#0d5a94" },
                        borderRadius: 1.5,
                      }}
                    >
                      Add Product
                    </Button>
                  </Box>

                  <TableContainer sx={{ p: 0 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                          <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Sr.</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: 120 }}>Quantity</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: 60 }} align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {singleProducts.map((product, index) => (
                          <TableRow key={product.id} hover>
                            <TableCell sx={{ color: "text.secondary" }}>{index + 1}</TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                placeholder="Select Product"
                                size="small"
                                value={product.name}
                                onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                placeholder="Qty"
                                size="small"
                                type="number"
                                value={product.quantity}
                                onChange={(e) => updateProduct(product.id, "quantity", e.target.value)}
                                sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeProduct(product.id)}
                                  disabled={singleProducts.length === 1}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#e2e8f0",
              color: "#64748b",
              "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{
              px: 6,
              py: 1.2,
              fontWeight: 500,
              borderRadius: 2,
              backgroundColor: "#1172ba",
            
              textTransform: "none",
            }}
          >
            Save Order
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
