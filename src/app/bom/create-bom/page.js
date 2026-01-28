"use client";
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
  Divider,
} from '@mui/material';
import { Add, Delete, Save, Visibility, CheckCircle } from '@mui/icons-material';
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

  return (
    <CommonCard
      title="Create New BOM"
      addText="Add Material"
      onAdd={addMaterial}
    >
      <Box sx={{ p: 1 }}>
        <TableContainer
          sx={{
            mb: 4,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            maxHeight: 600,
            overflow: 'auto'
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 60 }}>
                  Sr.
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 150 }}>
                  Part Number
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 150 }}>
                  Supplier Part
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 90 }}>
                  Qty
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 150 }}>
                  Material Name
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 180 }}>
                  Manufacturer
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', minWidth: 200 }}>
                  Technical Details
                </TableCell>
                <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 700, color: '#1172ba', width: 60 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material, index) => (
                <TableRow
                  key={material.id}
                  sx={{ '&:hover': { bgcolor: '#f8f9fa' } }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth size="small" value={material.scanboPartNumber}
                      onChange={(e) => updateMaterial(material.id, 'scanboPartNumber', e.target.value)}
                      placeholder="Part No"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth size="small" value={material.supplierPartNumber}
                      onChange={(e) => updateMaterial(material.id, 'supplierPartNumber', e.target.value)}
                      placeholder="Supplier Part"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth size="small" type="number" value={material.quantity}
                      onChange={(e) => updateMaterial(material.id, 'quantity', e.target.value)}
                      placeholder="Qty"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth size="small" value={material.materialName}
                      onChange={(e) => updateMaterial(material.id, 'materialName', e.target.value)}
                      placeholder="Material"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth size="small" value={material.manufacturerName}
                      onChange={(e) => updateMaterial(material.id, 'manufacturerName', e.target.value)}
                      placeholder="Manufacturer"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth size="small" multiline maxRows={2} value={material.technicalDetails}
                      onChange={(e) => updateMaterial(material.id, 'technicalDetails', e.target.value)}
                      placeholder="Details"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => deleteMaterial(material.id)}
                      disabled={materials.length === 1}
                      color="error" size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Actions */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 3,
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Visibility />}
              sx={{ borderColor: '#1172ba', color: '#1172ba', textTransform: 'none', fontWeight: 600 }}
            >
              Reviewed By:
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CheckCircle />}
              sx={{ borderColor: '#2e7d32', color: '#1b5e20', textTransform: 'none', fontWeight: 600 }}
            >
              Approved By:
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{
              backgroundColor: '#1172ba',
              "&:hover": { backgroundColor: "#0d5a94" },
              px: 4,
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            Save BOM
          </Button>
        </Box>
      </Box>
    </CommonCard>
  );
}