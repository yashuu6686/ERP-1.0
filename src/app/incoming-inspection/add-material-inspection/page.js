"use client";
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Paper,
  IconButton,
  Chip,
  Divider,
  Card,
  CardContent,
  Tooltip,
  Zoom,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Save as SaveIcon,
  Verified as VerifiedIcon,
  Science as ScienceIcon,
  Inventory as InventoryIcon,
  CalendarToday as CalendarIcon,
  NavigateNext,
} from '@mui/icons-material';
import { Breadcrumbs, Link } from '@mui/material';
import NextLink from 'next/link';
import CommonCard from '../../../components/CommonCard';

export default function MaterialInspectionForm() {
  const [observations, setObservations] = useState([
    { id: 1, parameter: '', specification: '', method: '', observation: '', remarks: '' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const addObservation = () => {
    setObservations([
      ...observations,
      {
        id: observations.length + 1,
        parameter: '',
        specification: '',
        method: '',
        observation: '',
        remarks: '',
      },
    ]);
  };

  const removeObservation = (id) => {
    if (observations.length > 1) {
      setObservations(observations.filter((obs) => obs.id !== id));
    }
  };

  const handleObservationChange = (id, field, value) => {
    setObservations(
      observations.map((obs) =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    alert("Inspection Submitted Successfully!");
  };

  return (
    <Box>
    
      <CommonCard title="Material Inspection">
        <Box sx={{ p: 1 }}>
          {/* Material Information Section */}
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
              <InventoryIcon sx={{ color: '#fff', fontSize: 24 }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                Material Information
              </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                  gap: 3,
                }}
              >
                <TextField label="GRN Number" variant="outlined" fullWidth size="small" />
                <TextField label="Material Name" variant="outlined" fullWidth size="small" />
                <TextField
                  label="Received Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField label="Invoice Number" variant="outlined" fullWidth size="small" />
                <TextField label="Lot Number" variant="outlined" fullWidth size="small" />
                <TextField label="Inspection Standard Number" variant="outlined" fullWidth size="small" />
                <TextField label="Supplier Name" variant="outlined" fullWidth size="small" />
                <TextField label="Lot Quantity" variant="outlined" fullWidth type="number" size="small" />
                <TextField label="Equipment ID and Description" variant="outlined" fullWidth size="small" />
                <TextField label="Sample Size" variant="outlined" fullWidth type="number" size="small" />
                <TextField label="Inspection Report Number" variant="outlined" fullWidth size="small" />
                <TextField
                  label="Inspection Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Inspection Standard"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ gridColumn: { xs: '1', md: 'span 2' } }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Verification Checks Section */}
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
              <VerifiedIcon sx={{ color: '#fff', fontSize: 24 }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                Verification Checks
              </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: 4,
                }}
              >
                <FormControl>
                  <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>Inspection Tools Used</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    <FormControlLabel value="n/a" control={<Radio size="small" />} label="N/A" />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>SDS Available</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    <FormControlLabel value="n/a" control={<Radio size="small" />} label="N/A" />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>Quality Certificate</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    <FormControlLabel value="n/a" control={<Radio size="small" />} label="N/A" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {/* Observations Section */}
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
                <ScienceIcon sx={{ color: '#fff', fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  Observations
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={addObservation}
                sx={{ bgcolor: '#fff', color: '#1172ba', '&:hover': { bgcolor: '#f0f9ff' } }}
              >
                Add Row
              </Button>
            </Box>

            <CardContent sx={{ padding: 3 }}>
              {observations.map((obs, index) => (
                <Box key={obs.id} sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip label={`#${obs.id}`} size="small" color="primary" sx={{ mr: 2 }} />
                    <Box sx={{ flex: 1 }} />
                    {observations.length > 1 && (
                      <IconButton size="small" color="error" onClick={() => removeObservation(obs.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}><TextField label="Parameter" fullWidth size="small" /></Grid>
                    <Grid item xs={12} sm={6} md={4}><TextField label="Specification" fullWidth size="small" /></Grid>
                    <Grid item xs={12} sm={6} md={4}><TextField label="Method" fullWidth size="small" /></Grid>
                    <Grid item xs={12} sm={6} md={4}><TextField label="Observation" fullWidth size="small" /></Grid>
                    <Grid item xs={12} sm={6} md={8}><TextField label="Remarks" fullWidth size="small" /></Grid>
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<CheckCircleIcon />}
              onClick={handleSubmit}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: "#1172ba",
                "&:hover": { backgroundColor: "#0d5a94" }
              }}
            >
              Submit Inspection
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}