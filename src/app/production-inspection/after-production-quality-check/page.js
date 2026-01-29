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
  Divider,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Delete,
  NavigateNext,
  Assignment,
  AppRegistration,
  FactCheck,
  Summarize,
  CheckCircle,
  Save,
} from '@mui/icons-material';
import NextLink from 'next/link';
import CommonCard from '../../../components/CommonCard';

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
    <Box>

      <CommonCard title="New After Production Quality Check">
        <Box sx={{ p: 1 }}>
          {/* Product Details Section */}
          <Card
            elevation={0}
            sx={{
              marginBottom: 4,
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
              <Assignment sx={{ color: '#fff', fontSize: 24 }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                Product Details
              </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    size="small"
                    value={productDetails.productName}
                    onChange={(e) => handleProductDetailsChange('productName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <TextField
                    fullWidth
                    label="Quality Standard No."
                    variant="outlined"
                    size="small"
                    value={productDetails.qualityStandard}
                    onChange={(e) => handleProductDetailsChange('qualityStandard', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <TextField
                    fullWidth
                    label="Checked Quantity"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={productDetails.checkedQuantity}
                    onChange={(e) => handleProductDetailsChange('checkedQuantity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <TextField
                    fullWidth
                    label="Inspection Date"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={productDetails.inspectionDate}
                    onChange={(e) => handleProductDetailsChange('inspectionDate', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <TextField
                    fullWidth
                    label="Check Number"
                    variant="outlined"
                    size="small"
                    value={productDetails.checkNumber}
                    onChange={(e) => handleProductDetailsChange('checkNumber', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Quality Check Details Section */}
          <Card
            elevation={0}
            sx={{
              marginBottom: 4,
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
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FactCheck sx={{ color: '#fff', fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Quality Check Details
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={addRow}
                sx={{ bgcolor: '#fff', color: '#1172ba', '&:hover': { bgcolor: '#f0f9ff' }, textTransform: 'none' }}
              >
                Add Observation
              </Button>
            </Box>

            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2 }}>Sr.No</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2 }}>Parameters</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2 }}>Specification</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2 }}>Method</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2 }}>Observation</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2 }}>Remarks</TableCell>
                      <TableCell align='center' sx={{ fontWeight: 500, p: 2, textAlign: 'center' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkDetails.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align='center' sx={{ p: 2 }}>{index + 1}</TableCell>
                        <TableCell align='center' sx={{ p: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Parameters"
                            value={row.parameters}
                            onChange={(e) => handleCheckDetailsChange(row.id, 'parameters', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ p: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Specification"
                            value={row.specification}
                            onChange={(e) => handleCheckDetailsChange(row.id, 'specification', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ p: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Method"
                            value={row.method}
                            onChange={(e) => handleCheckDetailsChange(row.id, 'method', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ p: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Observation"
                            value={row.observation}
                            onChange={(e) => handleCheckDetailsChange(row.id, 'observation', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ p: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Remarks"
                            value={row.remarks}
                            onChange={(e) => handleCheckDetailsChange(row.id, 'remarks', e.target.value)}
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ p: 1, textAlign: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => deleteRow(row.id)}
                            disabled={checkDetails.length === 1}
                            sx={{
                              color: "#dc2626",
                              bgcolor: "#fef2f2",
                              "&:hover": { bgcolor: "#fee2e2" }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Inspection Summary Section */}
          <Card
            elevation={0}
            sx={{
              marginBottom: 4,
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
              <Summarize sx={{ color: '#fff', fontSize: 24 }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                Inspection Summary
              </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Accepted Quantity"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={inspectionSummary.acceptedQuantity}
                    onChange={(e) => handleInspectionSummaryChange('acceptedQuantity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Rejected Quantity"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={inspectionSummary.rejectedQuantity}
                    onChange={(e) => handleInspectionSummaryChange('rejectedQuantity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Hold / Scrap Quantity"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={inspectionSummary.holdScrapQuantity}
                    onChange={(e) => handleInspectionSummaryChange('holdScrapQuantity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Other"
                    variant="outlined"
                    size="small"
                    value={inspectionSummary.other}
                    onChange={(e) => handleInspectionSummaryChange('other', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Comments (if any)"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={inspectionSummary.comments}
                    onChange={(e) => handleInspectionSummaryChange('comments', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Approval Section */}
          <Card
            elevation={0}
            sx={{
              marginBottom: 4,
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
              <AppRegistration sx={{ color: '#fff', fontSize: 24 }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                Approval
              </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: '#475569' }}>
                      Reviewed By
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Signature"
                          size="small"
                          placeholder="signature images"
                          value={approval.reviewedBy}
                          onChange={(e) => handleApprovalChange('reviewedBy', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Date"
                          size="small"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={approval.reviewedDate}
                          onChange={(e) => handleApprovalChange('reviewedDate', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: '#475569' }}>
                      Approved By
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Signature"
                          size="small"
                          placeholder="signature images"
                          value={approval.approvedBy}
                          onChange={(e) => handleApprovalChange('approvedBy', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Date"
                          size="small"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={approval.approvedDate}
                          onChange={(e) => handleApprovalChange('approvedDate', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Save />}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 4, color: '#1172ba', borderColor: '#1172ba' }}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<CheckCircle />}
              onClick={handleSubmit}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                backgroundColor: "#1172ba",
                "&:hover": { backgroundColor: "#0d5a94" }
              }}
            >
              Submit Quality Check
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}