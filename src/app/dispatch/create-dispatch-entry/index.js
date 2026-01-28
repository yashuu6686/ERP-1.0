import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CommonCard from '../../../src/components/CommonCard';

export default function DispatchEntryForm() {
  const [products, setProducts] = useState([
    { id: 1, name: '', quantity: '' }
  ]);

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, name: '', quantity: '' }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  return (
    <CommonCard title="Create Dispatch Entry">
      <Box sx={{ p: 1 }}>
        {/* Company Information */}
        <Card sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={3} color="primary">Company Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label="Company Name" size="small" defaultValue="Default Filled" /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Office Address" size="small" defaultValue="Default Filled" /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Email" size="small" defaultValue="Default Filled" /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="Phone Number" size="small" defaultValue="Default Filled" /></Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Info Grid */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Customer */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Customer Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField fullWidth label="Customer/Organisation" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Delivery Address" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Contact Person" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Contact No." size="small" sx={{ bgcolor: "#fff" }} /></Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Delivery */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Delivery Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Delivery Date" type="date" size="small" InputLabelProps={{ shrink: true }} sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Courier Company" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Tracking Number" size="small" sx={{ bgcolor: "#fff" }} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Reference No." size="small" sx={{ bgcolor: "#fff" }} /></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Product Details Table */}
        <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "#f8fafc" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary">Product Details</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={addProduct}
              sx={{ bgcolor: "#1172ba", "&:hover": { bgcolor: "#0d5a94" } }}
            >
              Add Product
            </Button>
          </Box>
          <TableContainer sx={{ bgcolor: "#fff", borderRadius: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Sr No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth size="small" placeholder="Product name"
                        value={product.name} onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth size="small" placeholder="Quantity"
                        value={product.quantity} onChange={(e) => updateProduct(product.id, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" size="small" onClick={() => deleteProduct(product.id)} disabled={products.length === 1}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Approval Names */}
        <Card variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#f8fafc' }}>
          <Typography variant="subtitle1" fontWeight={700} mb={3} color="primary">Packaging & Approvals</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Packed By" size="small" multiline rows={2} sx={{ bgcolor: "#fff" }} placeholder="Name, Sign & Date" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Approved By" size="small" multiline rows={2} sx={{ bgcolor: "#fff" }} placeholder="Name, Sign & Date" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Accounting By" size="small" multiline rows={2} sx={{ bgcolor: "#fff" }} placeholder="Name, Sign & Date" />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" sx={{ color: '#64748b', mb: 1, display: 'block' }}>Upload Evidence (Photos/Scan)</Typography>
            <Button variant="outlined" component="label" fullWidth sx={{ py: 3, borderStyle: 'dashed', bgcolor: "#fff" }}>
              Click to Upload Files
              <input type="file" hidden />
            </Button>
          </Box>
        </Card>

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
            Save Entry
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}