"use client"
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Paper,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Delete,
  Receipt,
  Person,
  LocalShipping,
  Inventory,
  LocalOffer,
  Assessment,
  Save,
  Close,
} from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";

export default function InvoiceGenerator() {
  const [products, setProducts] = useState([
    {
      id: 1,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 1000,
      amount: 5000,
    },
    {
      id: 2,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 1000,
      amount: 5000,
    },
  ]);

  const addProduct = () => {
    const newProduct = {
      id: products.length + 1,
      itemName: "",
      hsnSac: "",
      quantity: "",
      price: "",
      taxPercent: "",
      taxAmount: 0,
      amount: 0,
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <CommonCard title="Generate Invoice">
      <Box sx={{ p: 1 }}>
        {/* Invoice Details */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              padding: 2,
              background: 'linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Receipt sx={{ color: '#fff' }} />
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
              Invoice Details
            </Typography>
          </Box>
          <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Invoice No."
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Invoice Date"
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": { bgcolor: "white" },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Info Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Customer */}
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
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
                <Person sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Customer Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Customer Name"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Organization"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Contact No."
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Drug Licence"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Delivery */}
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
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
                <LocalShipping sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Delivery Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Organization"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Contact No."
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Products Table */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: 'linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)',
              color: "#fff"
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Inventory sx={{ color: '#fff' }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Products in Order
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={addProduct}
              sx={{
                bgcolor: "white",
                color: "#1172ba",
                "&:hover": { bgcolor: "#f0f0f0" },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3
              }}
            >
              Add Product
            </Button>
          </Box>

          <TableContainer sx={{ bgcolor: "#f8fafc" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Sr.</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Item Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>HSN/SAC</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Qty</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Tax %</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Tax</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Total</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Item Name"
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="HSN/SAC"
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Qty"
                        sx={{ width: 80, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Price"
                        sx={{ width: 100, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Tax %"
                        sx={{ width: 80, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                      />
                    </TableCell>
                    <TableCell>₹{product.taxAmount}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₹{product.amount}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton color="error" size="small" onClick={() => removeProduct(product.id)}>
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

        {/* Summary & Notes */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Discounts & Notes */}
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
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
                <LocalOffer sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Discounts & Notes
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Discount"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Other Discount"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Paid Amount"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={12} size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Note"
                      multiline
                      rows={3}
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Summary */}
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
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
                <Assessment sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Invoice Summary
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2, border: '1px dashed #cbd5e1' }}>
                  {[
                    { label: "Subtotal", value: "₹1,125" },
                    { label: "Discount", value: "-₹21,335" },
                    { label: "Other Discount", value: "-₹3,847" },
                    { label: "GST", value: "₹0" },
                  ].map((item, idx) => (
                    <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                      <Typography color="textSecondary" variant="body2">{item.label}</Typography>
                      <Typography fontWeight={500}>{item.value}</Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0 }}>
                    <Typography variant="h6" fontWeight={700}>Grand Total</Typography>
                    <Typography variant="h6" fontWeight={700} color="primary">₹25,222.50</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Close />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 500,
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
            size="large"
            startIcon={<Save />}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 500,
              borderRadius: 2,
              bgcolor: "#1172ba",
              textTransform: "none",
            }}
          >
            Save Invoice
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
