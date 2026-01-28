

"use client"
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Tooltip,
  Breadcrumbs,
  Link,
  Paper,
  Card,
  CardContent,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  Add,
  Delete,
  Save,
  Visibility,
  CheckCircle,
  NavigateNext,
  Build,
  Person,
  FactCheck
} from '@mui/icons-material';
import NextLink from 'next/link';
import CommonCard from '../../../components/CommonCard';

export default function BOMCreator() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      scanboPartNumber: 'SIPL.ASY.PBT.ool',
      supplierPartNumber: 'lktp.20240501-0011',
      quantity: '1',
      materialName: 'upper case',
      manufacturerName: 'xiamen Linktop Technology co., Ltd',
      technicalDetails: 'main pcb board with sensors'
    },
    {
      id: 2,
      scanboPartNumber: '',
      supplierPartNumber: '',
      quantity: '',
      materialName: '',
      manufacturerName: '',
      technicalDetails: ''
    }
  ]);

  const addMaterial = () => {
    setMaterials([...materials, {
      id: materials.length + 1,
      scanboPartNumber: '',
      supplierPartNumber: '',
      quantity: '',
      materialName: '',
      manufacturerName: '',
      technicalDetails: ''
    }]);
  };

  const deleteMaterial = (id) => {
    if (materials.length > 1) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(materials.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "white",
      "&:hover": {
        "& > fieldset": { borderColor: "#1172ba" },
      },
    },
  };

  return (
    <Box>
      <CommonCard title="Create BOM">
        <Box sx={{ p: 0.25 }}>
          <Card
            sx={{
              mb: 1,
              border: "1px solid #e9ecef",
              borderRadius: 1.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Build />
                <Typography variant="h6" fontWeight={600}>
                  Material List Specifications
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={addMaterial}
                sx={{
                  backgroundColor: "white",
                  color: "#1172ba",
                }}
              >
                Add Material
              </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 300, overflow: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 40, py: 0.5, fontSize: '0.75rem' }}>Sr.</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 120, py: 0.5, fontSize: '0.75rem' }}>Part Number</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 120, py: 0.5, fontSize: '0.75rem' }}>Supplier Part</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 60, py: 0.5, fontSize: '0.75rem' }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 140, py: 0.5, fontSize: '0.75rem' }}>Material Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 160, py: 0.5, fontSize: '0.75rem' }}>Manufacturer</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", minWidth: 200, py: 0.5, fontSize: '0.75rem' }}>Technical Details</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc", color: "#495057", width: 50, textAlign: 'center', py: 0.5, fontSize: '0.75rem' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials.map((material, index) => (
                    <TableRow key={material.id} sx={{ "&:hover": { bgcolor: "#f8f9fa" } }}>
                      <TableCell sx={{ py: 0.2, fontSize: '0.75rem' }}>{index + 1}</TableCell>
                      <TableCell sx={{ py: 0.2 }}>
                        <TextField
                          fullWidth size="small"
                          value={material.scanboPartNumber}
                          onChange={(e) => updateMaterial(material.id, 'scanboPartNumber', e.target.value)}
                          sx={{ ...textFieldStyle, "& .MuiInputBase-input": { py: 0.5, fontSize: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0.2 }}>
                        <TextField
                          fullWidth size="small"
                          value={material.supplierPartNumber}
                          onChange={(e) => updateMaterial(material.id, 'supplierPartNumber', e.target.value)}
                          sx={{ ...textFieldStyle, "& .MuiInputBase-input": { py: 0.5, fontSize: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0.2 }}>
                        <TextField
                          fullWidth size="small"
                          value={material.quantity}
                          onChange={(e) => updateMaterial(material.id, 'quantity', e.target.value)}
                          sx={{ ...textFieldStyle, "& .MuiInputBase-input": { py: 0.5, fontSize: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0.2 }}>
                        <TextField
                          fullWidth size="small"
                          value={material.materialName}
                          onChange={(e) => updateMaterial(material.id, 'materialName', e.target.value)}
                          sx={{ ...textFieldStyle, "& .MuiInputBase-input": { py: 0.5, fontSize: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0.2 }}>
                        <TextField
                          fullWidth size="small"
                          value={material.manufacturerName}
                          onChange={(e) => updateMaterial(material.id, 'manufacturerName', e.target.value)}
                          sx={{ ...textFieldStyle, "& .MuiInputBase-input": { py: 0.5, fontSize: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0.2 }}>
                        <TextField
                          fullWidth size="small" multiline maxRows={2}
                          value={material.technicalDetails}
                          onChange={(e) => updateMaterial(material.id, 'technicalDetails', e.target.value)}
                          sx={{ ...textFieldStyle, "& .MuiInputBase-input": { py: 0.5, fontSize: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', py: 0.2 }}>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => deleteMaterial(material.id)}
                          disabled={materials.length === 1}
                          sx={{ p: 0.2 }}
                        >
                          <Delete sx={{ fontSize: 16 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Authorization Section */}
          <Card
            sx={{
              mb: 2,
              border: "1px solid #e9ecef",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
              <FactCheck />
              <Typography variant="h6" fontWeight={600}>
                BOM Authorization
              </Typography>
            </Box>
            <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Reviewed By"
                    placeholder="Enter reviewer name"
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Approved By"
                    placeholder="Enter approver name"
                    sx={textFieldStyle}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1172ba",
                color: "#1172ba",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#0d5a94",
                  bgcolor: "#f0f7ff",
                },
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              sx={{
                backgroundColor: "#1172ba",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#0d5a94" },
              }}
            >
              Save BOM
            </Button>
          </Box>
        </Box>
      </CommonCard>
    </Box>
  );
}
