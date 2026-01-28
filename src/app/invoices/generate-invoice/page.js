"use client";
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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
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
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Invoice No." variant="outlined" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Invoice Date"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Info Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Customer */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Customer Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Customer Name" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Organization" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Contact No." size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Drug Licence" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Delivery */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Delivery Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField fullWidth label="Organization" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Address" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Contact No." size="small" sx={{ bgcolor: "#fff" }} /></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Products Table */}
        <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "#f8fafc" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary">Products in Order</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={addProduct}
              sx={{ bgcolor: "#1172ba", "&:hover": { bgcolor: "#0d5a94" } }}
            >
              Add Product
            </Button>
          </Box>

          <TableContainer sx={{ bgcolor: "#fff", borderRadius: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Item Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>HSN/SAC</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tax %</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tax</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><TextField size="small" placeholder="Item" /></TableCell>
                    <TableCell><TextField size="small" placeholder="HSN" /></TableCell>
                    <TableCell><TextField size="small" placeholder="Qty" sx={{ width: 80 }} /></TableCell>
                    <TableCell><TextField size="small" placeholder="Price" sx={{ width: 100 }} /></TableCell>
                    <TableCell><TextField size="small" placeholder="Tax %" sx={{ width: 80 }} /></TableCell>
                    <TableCell>₹{product.taxAmount}</TableCell>
                    <TableCell fontWeight={600}>₹{product.amount}</TableCell>
                    <TableCell>
                      <IconButton color="error" size="small" onClick={() => removeProduct(product.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Summary */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Discounts & Notes</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Discount" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Other Discount" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Paid Amount" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Note" multiline rows={3} sx={{ bgcolor: "#fff" }} /></Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Summary</Typography>
              <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 1 }}>
                {[
                  { label: "Subtotal", value: "₹1,125" },
                  { label: "Discount", value: "-₹21,335" },
                  { label: "Other Discount", value: "-₹3,847" },
                  { label: "GST", value: "₹0" },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Typography color="textSecondary">{item.label}</Typography>
                    <Typography fontWeight={500}>{item.value}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                  <Typography variant="h6" fontWeight={700}>Grand Total</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary">₹25,222.50</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 2,
              bgcolor: "#1172ba",
              "&:hover": { bgcolor: "#0d5a94" },
              textTransform: "none"
            }}
          >
            Save Invoice
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}
