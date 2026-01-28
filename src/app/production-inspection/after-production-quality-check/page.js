"use client";
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

export default function QualityCheckForm() {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    qualityStandard: '',
    checkedQuantity: '',
    inspectionDate: '',
    checkNumber: ''
  });

  const [checkDetails, setCheckDetails] = useState([
    { id: 1, parameters: '', specification: '', method: '', observation: '', remarks: '' }
  ]);

  const [inspectionSummary, setInspectionSummary] = useState({
    acceptedQuantity: '',
    rejectedQuantity: '',
    holdScrapQuantity: '',
    other: '',
    comments: ''
  });

  const [approval, setApproval] = useState({
    reviewedBy: '',
    reviewedDate: '',
    approvedBy: '',
    approvedDate: ''
  });

  const handleProductDetailsChange = (field, value) => {
    setProductDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckDetailsChange = (id, field, value) => {
    setCheckDetails(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    const newId = Math.max(...checkDetails.map(r => r.id), 0) + 1;
    setCheckDetails(prev => [
      ...prev,
      { id: newId, parameters: '', specification: '', method: '', observation: '', remarks: '' }
    ]);
  };

  const deleteRow = (id) => {
    if (checkDetails.length > 1) {
      setCheckDetails(prev => prev.filter(row => row.id !== id));
    }
  };

  const handleInspectionSummaryChange = (field, value) => {
    setInspectionSummary(prev => ({ ...prev, [field]: value }));
  };

  const handleApprovalChange = (field, value) => {
    setApproval(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const formData = {
      productDetails,
      checkDetails,
      inspectionSummary,
      approval
    };
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    // <Container maxWidth="xl" sx={{ py: 4 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4, borderBottom: '3px solid #1976d2', pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          New After Production Quality Check
        </Typography>
      </Box>

      {/* Product Details Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
          Product Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              size="small"
              value={productDetails.productName}
              onChange={(e) => handleProductDetailsChange('productName', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Quality Standard No."
              variant="outlined"
              size="small"
              value={productDetails.qualityStandard}
              onChange={(e) => handleProductDetailsChange('qualityStandard', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Checked Quantity"
              variant="outlined"
              size="small"
              type="number"
              value={productDetails.checkedQuantity}
              onChange={(e) => handleProductDetailsChange('checkedQuantity', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Inspection Date"
              variant="outlined"
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={productDetails.inspectionDate}
              onChange={(e) => handleProductDetailsChange('inspectionDate', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Check Number"
              variant="outlined"
              size="small"
              value={productDetails.checkNumber}
              onChange={(e) => handleProductDetailsChange('checkNumber', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Quality Check Details Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Quality Check Details
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addRow}
              sx={{ mr: 1, textTransform: 'none' }}
            >
              Add Row
            </Button>
            <Button
              variant="contained"
              onClick={addRow}
              sx={{ textTransform: 'none' }}
            >
              Add Observation
            </Button>
          </Box>
        </Box>

        <TableContainer sx={{ backgroundColor: 'white', borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600, width: '50px' }}>SR. No</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Parameters</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Specification</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Method</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Observation</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Remarks</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, width: '80px' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checkDetails.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter Parameters"
                      value={row.parameters}
                      onChange={(e) => handleCheckDetailsChange(row.id, 'parameters', e.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter Specification"
                      value={row.specification}
                      onChange={(e) => handleCheckDetailsChange(row.id, 'specification', e.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Method"
                      value={row.method}
                      onChange={(e) => handleCheckDetailsChange(row.id, 'method', e.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Observation"
                      value={row.observation}
                      onChange={(e) => handleCheckDetailsChange(row.id, 'observation', e.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Remarks"
                      value={row.remarks}
                      onChange={(e) => handleCheckDetailsChange(row.id, 'remarks', e.target.value)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => deleteRow(row.id)}
                      disabled={checkDetails.length === 1}
                      sx={{ color: 'error.main' }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Inspection Summary Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
          Inspection Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Accepted Quantity"
              variant="outlined"
              size="small"
              type="number"
              value={inspectionSummary.acceptedQuantity}
              onChange={(e) => handleInspectionSummaryChange('acceptedQuantity', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Rejected Quantity"
              variant="outlined"
              size="small"
              type="number"
              value={inspectionSummary.rejectedQuantity}
              onChange={(e) => handleInspectionSummaryChange('rejectedQuantity', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Hold / Scrap Quantity"
              variant="outlined"
              size="small"
              type="number"
              value={inspectionSummary.holdScrapQuantity}
              onChange={(e) => handleInspectionSummaryChange('holdScrapQuantity', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Other"
              variant="outlined"
              size="small"
              value={inspectionSummary.other}
              onChange={(e) => handleInspectionSummaryChange('other', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comments (if any)"
              variant="outlined"
              multiline
              rows={3}
              value={inspectionSummary.comments}
              onChange={(e) => handleInspectionSummaryChange('comments', e.target.value)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Approval Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
          Approval
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid #ddd', backgroundColor: 'white' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Reviewed By
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Signature"
                    variant="outlined"
                    size="small"
                    placeholder="signature images"
                    value={approval.reviewedBy}
                    onChange={(e) => handleApprovalChange('reviewedBy', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={approval.reviewedDate}
                    onChange={(e) => handleApprovalChange('reviewedDate', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid #ddd', backgroundColor: 'white' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Approved By
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Signature"
                    variant="outlined"
                    size="small"
                    placeholder="signature images"
                    value={approval.approvedBy}
                    onChange={(e) => handleApprovalChange('approvedBy', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={approval.approvedDate}
                    onChange={(e) => handleApprovalChange('approvedDate', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
    // </Container>
  );
}