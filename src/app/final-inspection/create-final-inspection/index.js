import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  IconButton,
  Divider,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CommonCard from '../../../src/components/CommonCard';

export default function FinalInspectionForm() {
  const [qualityRows, setQualityRows] = useState([
    { id: 1, parameter: '', specification: '', method: '', observation: '', remarks: '' },
    { id: 2, parameter: '', specification: '', method: '', observation: '', remarks: '' },
  ]);

  const [problemReport, setProblemReport] = useState('no');
  const [aqd, setAqd] = useState('no');

  const addQualityRow = () => {
    setQualityRows([...qualityRows, {
      id: qualityRows.length + 1,
      parameter: '',
      specification: '',
      method: '',
      observation: '',
      remarks: ''
    }]);
  };

  const deleteQualityRow = (id) => {
    if (qualityRows.length > 1) {
      setQualityRows(qualityRows.filter(row => row.id !== id));
    }
  };

  const handleQualityRowChange = (id, field, value) => {
    setQualityRows(qualityRows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <CommonCard title="Create Final Inspection">
      <Box sx={{ p: 1 }}>
        {/* Product Information */}
        <Card sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} mb={3} color="primary">Product Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}><TextField fullWidth label="Product Name" size="small" /></Grid>
              <Grid item xs={12} md={3}><TextField fullWidth label="Inspection Std No." size="small" /></Grid>
              <Grid item xs={12} md={3}><TextField fullWidth label="Quantity" type="number" size="small" /></Grid>
              <Grid item xs={12} md={3}><TextField fullWidth label="Check Date" type="date" InputLabelProps={{ shrink: true }} size="small" /></Grid>
              <Grid item xs={12} md={4}><TextField fullWidth label="Inspection No." size="small" /></Grid>
              <Grid item xs={12} md={4}><TextField fullWidth label="Serial From" size="small" /></Grid>
              <Grid item xs={12} md={4}><TextField fullWidth label="Serial To" size="small" /></Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quality Check Details */}
        <Card sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary">Quality Check Details</Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={addQualityRow}
              sx={{ bgcolor: "#1172ba", "&:hover": { bgcolor: "#0d5a94" } }}
            >
              Add Row
            </Button>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Sr No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Specification</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Observation</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Remarks</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {qualityRows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><TextField size="small" value={row.parameter} onChange={(e) => handleQualityRowChange(row.id, 'parameter', e.target.value)} /></TableCell>
                    <TableCell><TextField size="small" value={row.specification} onChange={(e) => handleQualityRowChange(row.id, 'specification', e.target.value)} /></TableCell>
                    <TableCell><TextField size="small" value={row.method} onChange={(e) => handleQualityRowChange(row.id, 'method', e.target.value)} /></TableCell>
                    <TableCell><TextField size="small" value={row.observation} onChange={(e) => handleQualityRowChange(row.id, 'observation', e.target.value)} /></TableCell>
                    <TableCell><TextField size="small" value={row.remarks} onChange={(e) => handleQualityRowChange(row.id, 'remarks', e.target.value)} /></TableCell>
                    <TableCell>
                      <IconButton color="error" size="small" onClick={() => deleteQualityRow(row.id)} disabled={qualityRows.length === 1}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Problem Report & AQD */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} color="primary">Problem Report</Typography>
                <RadioGroup row value={problemReport} onChange={(e) => setProblemReport(e.target.value)}>
                  <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </Box>
              {problemReport === 'yes' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}><TextField fullWidth label="Description" multiline rows={2} size="small" /></Grid>
                  <Grid item xs={12}><TextField fullWidth label="Action Taken" multiline rows={2} size="small" /></Grid>
                </Grid>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} color="primary">Acceptable Quality Diff.</Typography>
                <RadioGroup row value={aqd} onChange={(e) => setAqd(e.target.value)}>
                  <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </Box>
              {aqd === 'yes' && (
                <TextField fullWidth label="Description" multiline rows={4} size="small" />
              )}
            </Card>
          </Grid>
        </Grid>

        {/* Action Needed & Checks */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Action Items</Typography>
              <TextField fullWidth label="Action Items" multiline rows={3} size="small" sx={{ mb: 2 }} />
              <TextField fullWidth label="Finish Date" type="date" InputLabelProps={{ shrink: true }} size="small" />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Final Product Check</Typography>
              <Box sx={{ display: 'grid', gap: 1 }}>
                <FormControlLabel control={<Checkbox size="small" />} label="Label attached?" />
                <FormControlLabel control={<Checkbox size="small" />} label="Packaging proof attached?" />
                <FormControlLabel control={<Checkbox size="small" />} label="Final test done?" />
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Approval & Comments */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Approval Status</Typography>
              <Box sx={{ display: 'grid', gap: 1 }}>
                <FormControlLabel control={<Checkbox size="small" />} label="Release to Finished Goods" />
                <FormControlLabel control={<Checkbox size="small" />} label="Move to Quarantine" />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary">Comments</Typography>
              <TextField fullWidth multiline rows={3} placeholder="Enter comments..." size="small" />
            </Card>
          </Grid>
        </Grid>

        {/* Approval Names */}
        <Card variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#f8fafc' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={700} mb={2}>Updated By</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><TextField fullWidth label="Signature" size="small" /></Grid>
                <Grid item xs={6}><TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} size="small" /></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={700} mb={2}>Approved By</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><TextField fullWidth label="Signature" size="small" /></Grid>
                <Grid item xs={6}><TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} size="small" /></Grid>
              </Grid>
            </Grid>
          </Grid>
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
            Submit Inspection
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}