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
import InspectionObservations from '@/components/inspection/InspectionObservations';
import InspectionSummary from '@/components/inspection/InspectionSummary';
import InspectionApproval from '@/components/inspection/InspectionApproval';

export default function MaterialInspectionForm() {
  const [observations, setObservations] = useState([
    { id: 1, parameter: '', specification: '', method: '', observation: '', remarks: '' },
  ]);
  const [observationColumns, setObservationColumns] = useState([
    { id: 'observation', label: 'Observation' }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [summaryData, setSummaryData] = useState({
    acceptedQuantity: '',
    rejectedQuantity: '',
    holdScrapQuantity: '',
    other: '',
    comments: ''
  });
  const [approvalData, setApprovalData] = useState({
    updatedByName: '',
    updatedByDate: '',
    approvedByName: '',
    approvedByDate: ''
  });

  const handleSummaryChange = (field, value) => {
    setSummaryData(prev => ({ ...prev, [field]: value }));
  };

  const handleApprovalChange = (section, field, value) => {
    const key = `${section}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    setApprovalData(prev => ({ ...prev, [key]: value }));
  };

  const addObservation = () => {
    const nextId = observations.length > 0 ? Math.max(...observations.map(o => o.id)) + 1 : 1;
    const newObservation = {
      id: nextId,
      parameter: '',
      specification: '',
      method: '',
      remarks: '',
    };
    // Ensure all current observation columns exist in the new row
    observationColumns.forEach(col => {
      newObservation[col.id] = '';
    });

    setObservations([...observations, newObservation]);
  };

  const addObservationColumn = () => {
    const nextColNum = observationColumns.length + 1;
    const newColId = `observation_${nextColNum}`;
    setObservationColumns([
      ...observationColumns,
      { id: newColId, label: `Observation ${nextColNum}` }
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
          <InspectionObservations
            observations={observations}
            observationColumns={observationColumns}
            onAdd={addObservation}
            onAddColumn={addObservationColumn}
            onRemove={removeObservation}
            onChange={handleObservationChange}
            icon={ScienceIcon}
          />

          <InspectionSummary
            summaryData={summaryData}
            onChange={handleSummaryChange}
          />

          <InspectionApproval
            approvalData={approvalData}
            onChange={handleApprovalChange}
          />

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