import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Card,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const InspectionObservations = ({
    observations,
    observationColumns = [{ id: 'observation', label: 'Observation' }],
    onAdd,
    onAddColumn = () => { },
    onRemove,
    onChange
}) => {
    return (
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
                    gap: 2,
                }}
            >
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                    Observations
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        sx={{
                            bgcolor: "white",
                            color: "#1172ba",
                            "&:hover": { bgcolor: "#f0f0f0" },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600
                        }}
                    >
                        Add Row
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={onAddColumn}
                        sx={{
                            bgcolor: "white",
                            color: "#1172ba",
                            "&:hover": { bgcolor: "#f0f0f0" },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600
                        }}
                    >
                        Add Observation
                    </Button>
                </Box>
            </Box>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Parameter</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Specification</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                            {observationColumns.map((col) => (
                                <TableCell key={col.id} sx={{ fontWeight: 700 }}>
                                    {col.label}
                                </TableCell>
                            ))}
                            <TableCell sx={{ fontWeight: 700 }}>Remarks</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations?.map((obs, index) => (
                            <TableRow key={obs.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        value={obs.parameter || ''}
                                        onChange={(e) => onChange(obs.id, 'parameter', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        value={obs.specification || ''}
                                        onChange={(e) => onChange(obs.id, 'specification', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        value={obs.method || ''}
                                        onChange={(e) => onChange(obs.id, 'method', e.target.value)}
                                    />
                                </TableCell>
                                {observationColumns.map((col) => (
                                    <TableCell key={col.id}>
                                        <TextField
                                            size="small"
                                            value={obs[col.id] || ''}
                                            onChange={(e) => onChange(obs.id, col.id, e.target.value)}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <TextField
                                        size="small"
                                        value={obs.remarks || ''}
                                        onChange={(e) => onChange(obs.id, 'remarks', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => onRemove(obs.id)}
                                        disabled={observations.length === 1}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default InspectionObservations;
