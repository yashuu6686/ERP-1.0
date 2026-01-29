"use client"
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
  Checkbox,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import {
  Inventory,
  Info,
  ReportProblem,
  CheckCircle,
  Assignment,
  Verified,
  Comment,
  Edit,
  Save,
} from '@mui/icons-material';

import CommonCard from '../../../components/CommonCard';
import InspectionObservations from '../../../components/inspection/InspectionObservations';

export default function FinalInspectionForm() {
  const [observations, setObservations] = useState([
    { id: 1, parameter: '', specification: '', method: '', observation: '', remarks: '' },
  ]);

  const [problemReport, setProblemReport] = useState('no');
  const [aqd, setAqd] = useState('no');

  const addObservation = () => {
    setObservations([...observations, {
      id: observations.length + 1,
      parameter: '',
      specification: '',
      method: '',
      observation: '',
      remarks: ''
    }]);
  };

  const removeObservation = (id) => {
    if (observations.length > 1) {
      setObservations(observations.filter(obs => obs.id !== id));
    }
  };

  const handleObservationChange = (id, field, value) => {
    setObservations(observations.map(obs =>
      obs.id === id ? { ...obs, [field]: value } : obs
    ));
  };

  return (
    <CommonCard title="Create Final Inspection">
      <Box sx={{ p: 1 }}>
        {/* Product Information */}
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
            <Inventory sx={{ color: '#fff' }} />
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
              Product Information
            </Typography>
          </Box>

          <CardContent sx={{ padding: 3, backgroundColor: '#f8fafc' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Inspection Std No."
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Check Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Inspection No."
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Serial From"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  label="Serial To"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quality Check Details - Using InspectionObservations Component */}
        <InspectionObservations
          observations={observations}
          onAdd={addObservation}
          onRemove={removeObservation}
          onChange={handleObservationChange}
          icon={Assignment}
        />

        {/* Problem Report & AQD */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '100%'
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  background: 'linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ReportProblem sx={{ color: '#fff' }} />
                  <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                    Problem Report
                  </Typography>
                </Box>
                <RadioGroup row value={problemReport} onChange={(e) => setProblemReport(e.target.value)}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio size="small" sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                    label={<Typography sx={{ color: '#fff' }}>Yes</Typography>}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio size="small" sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                    label={<Typography sx={{ color: '#fff' }}>No</Typography>}
                  />
                </RadioGroup>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                {problemReport === 'yes' ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={2}
                        size="small"
                        sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                      />
                    </Grid>
                    <Grid item xs={12} size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Action Taken"
                        multiline
                        rows={2}
                        size="small"
                        sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Box sx={{ py: 2, textAlign: 'center' }}>
                    <Typography color="textSecondary" variant="body2 italic">
                      No problem reported
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '100%'
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  background: 'linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Info sx={{ color: '#fff' }} />
                  <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                    Acceptable Quality Diff.
                  </Typography>
                </Box>
                <RadioGroup row value={aqd} onChange={(e) => setAqd(e.target.value)}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio size="small" sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                    label={<Typography sx={{ color: '#fff' }}>Yes</Typography>}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio size="small" sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                    label={<Typography sx={{ color: '#fff' }}>No</Typography>}
                  />
                </RadioGroup>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                {aqd === 'yes' ? (
                  <TextField
                    fullWidth
                    label="AQD Description"
                    multiline
                    rows={4.5}
                    size="small"
                    sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                  />
                ) : (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography color="textSecondary" variant="body2 italic">
                      No AQD reported
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Needed & Checks */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '100%'
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
                <Edit sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Action Items
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <TextField
                  fullWidth
                  label="Action Items Description"
                  multiline
                  rows={3}
                  size="small"
                  sx={{ mb: 3, "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                />
                <TextField
                  fullWidth
                  label="Finish Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '100%'
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
                <CheckCircle sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Final Product Check
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  {[
                    "Label attached?",
                    "Packaging proof attached?",
                    "Final test done?"
                  ].map((label, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#f1f5f9' }
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox size="small" color="primary" />}
                        label={label}
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Approval & Comments */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '100%'
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
                <Verified sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Approval Status
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  {[
                    "Release to Finished Goods",
                    "Move to Quarantine"
                  ].map((label, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#f1f5f9' }
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox size="small" color="primary" />}
                        label={label}
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '100%'
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
                <Comment sx={{ color: '#fff' }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Comments
                </Typography>
              </Box>
              <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={5.5}
                  placeholder="Enter additional comments here..."
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Approval Names */}
        <Card
          elevation={0}
          sx={{
            p: 0,
            mb: 4,
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
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
            <Verified sx={{ color: '#fff' }} />
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
              Signatures & Approval
            </Typography>
          </Box>
          <CardContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" fontWeight={700} mb={2} color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Updated By
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Signature"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" fontWeight={700} mb={2} color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Approved By
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Signature"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                    />
                  </Grid>
                  <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Button */}
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
            size="large"
            startIcon={<Save />}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 2,
              bgcolor: "#1172ba",
              "&:hover": { bgcolor: "#0d5a94" },
              textTransform: "none",
              boxShadow: '0 4px 12px rgba(17, 114, 186, 0.2)'
            }}
          >
            Submit Inspection
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}