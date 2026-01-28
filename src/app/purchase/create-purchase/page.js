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
  Paper,
} from "@mui/material";
import {
  Add,
  Delete,
  Business,
  LocalShipping,
  Description,
  CalendarToday,
  Person,
  Email,
  Phone,
  Save,
  Preview,
  NavigateNext,
} from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";
import CommonCard from "../../../components/CommonCard";

export default function CreatePurchaseOrder() {
  const [items, setItems] = useState([
    { name: "", qty: "", price: "", total: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    updated[index].total =
      (parseFloat(updated[index].qty) || 0) *
      (parseFloat(updated[index].price) || 0);
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: "", price: "", total: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal + taxAmount - discountAmount;

  return (
    <Box>

      <CommonCard title="Create Purchase Order">
        <Box sx={{ p: 1 }}>
          {/* Order Info */}
          <Card
            sx={{
              mb: 4,
              background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
              border: "1px solid #e9ecef",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 3, color: "#2d3748" }}
              >
                Order Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="PO Number"
                    placeholder="PO-2024-001"
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
                    label="Order Date"
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
                    type="date"
                    label="Expected Delivery"
                    InputLabelProps={{ shrink: true }}
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

          {/* Supplier + Delivery */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Supplier */}
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
                    Supplier Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                        label="Company Name"
                        placeholder="ABC Suppliers Pvt Ltd"
                      />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Contact Person"
                        placeholder="John Doe"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}

                      />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                      <TextField
                        fullWidth
                        label="Address"
                        placeholder="123 Business Street"
                        multiline
                        rows={1}
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        placeholder="contact@supplier.com"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone"
                        placeholder="+91 98765 43210"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}

                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="PAN Number"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                        placeholder="ABCDE1234F"
                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="GSTIN"
                        placeholder="22ABCDE1234F1Z5"
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
                    Delivery Information
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Invoice To"
                        placeholder="Company Name"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Deliver To"
                        placeholder="Warehouse/Site"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                      <TextField
                        fullWidth
                        label="Delivery Address"
                        placeholder="456 Delivery Lane"
                        multiline
                        rows={1}
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Contact Person"
                        placeholder="Jane Smith"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}

                      />
                    </Grid>
                    <Grid item xs={6} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone"
                        placeholder="+91 98765 43210"
                        sx={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        }}

                      />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        placeholder="delivery@company.com"
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

          {/* Items Table */}
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: 'linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)',
                borderBottom: "2px solid #1172ba",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "white" }}
              >
                Items / Products Details
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={addItem}
                sx={{
                  backgroundColor: "white",
                  color: "#1172ba",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  px: 3,
                }}
              >
                Add Item
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
                    <TableCell align="center" sx={{ fontWeight: 500, color: "#495057" }}>
                      Sr.No
                    </TableCell>
                    <TableCell align="center"
                      sx={{
                        fontWeight: 500,
                        color: "#495057",
                        minWidth: 250,
                      }}
                    >
                      Item Name
                    </TableCell>
                    <TableCell    align="center"
                      sx={{ fontWeight: 500, color: "#495057", width: 120 }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell    align="center"
                      sx={{ fontWeight: 500, color: "#495057", width: 140 }}
                    >
                      Unit Price (₹)
                    </TableCell>
                    <TableCell    align="center"
                      sx={{ fontWeight: 500, color: "#495057", width: 140 }}
                    >
                      Total (₹)
                    </TableCell>
                    <TableCell    align="center"
                      sx={{ fontWeight: 500, color: "#495057", width: 80 }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items.map((item, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        "&:hover": { bgcolor: "#f8f9fa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell align="center">
                        <Chip
                          label={i + 1}
                          sx={{
                            bgcolor: "#1172ba",
                            color: "white",
                            fontWeight: 500,
                            minWidth: 32,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          fullWidth
                          placeholder="Enter item name..."
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(i, "name", e.target.value)
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
                      <TableCell align="center">
                        <TextField
                          type="number"
                          placeholder="0"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(i, "qty", e.target.value)
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          placeholder="0.00"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(i, "price", e.target.value)
                          }
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">₹</InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          fontWeight={600}
                          sx={{ color: "#2d3748" }}
                        >
                          ₹{item.total.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Remove item">
                          <IconButton
                            color="error"
                            onClick={() => removeItem(i)}
                            disabled={items.length === 1}
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

          {/* Summary + Actions */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} size={{ xs: 12, md: 12 }}>
              <Card sx={{ background: "#f8fafc", p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3} size={{ xs: 6, sm: 3 }}>
                    <TextField
                      fullWidth
                      label="Discount (%)"
                      type="number"
                      size="small"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      sx={{ bgcolor: "white" }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} size={{ xs: 6, sm: 3 }}>
                    <TextField
                      fullWidth
                      label="Tax Rate (%)"
                      type="number"
                      size="small"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      sx={{ bgcolor: "white" }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} size={{ xs: 6, sm: 3 }}>
                    <TextField
                      fullWidth
                      label="Tax Rate (%)"
                      type="number"
                      size="small"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      sx={{ bgcolor: "white" }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} size={{ xs: 6, sm: 3 }}>
                    <TextField
                      fullWidth
                      label="Tax Rate (%)"
                      type="number"
                      size="small"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      sx={{ bgcolor: "white" }}
                    />
                  </Grid>
                </Grid>
              </Card>

              {/* Action Buttons */}

            </Grid>
            <Grid item xs={12} md={4} size={{ xs: 12, md: 12 }}>
              <Paper sx={{ p: 3, border: "2px solid #1172ba", borderRadius: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="textSecondary">Subtotal:</Typography>
                  <Typography fontWeight={600}>₹{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="textSecondary">Tax ({taxRate}%):</Typography>
                  <Typography fontWeight={600}>₹{taxAmount.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="textSecondary">Discount ({discount}%):</Typography>
                  <Typography fontWeight={600} color="error">-₹{discountAmount.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" fontWeight={700}>Grand Total:</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary">₹{grandTotal.toFixed(2)}</Typography>
                </Box>
              </Paper>
            </Grid>

          </Grid>
          <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: 'end', alignItems: "end" }}>
            <Button
              variant="outlined"
              // startIcon={<Preview />}
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
              Clear
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
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
              Create Purchase Order
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
