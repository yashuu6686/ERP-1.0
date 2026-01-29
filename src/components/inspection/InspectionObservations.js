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
    onChange,
    icon: Icon = null
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {Icon && <Icon sx={{ color: '#fff' }} />}
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                        Observations
                    </Typography>
                </Box>
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
                        Add Raw
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
            <TableContainer sx={{ backgroundColor: '#f8fafc' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Sr.No</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Parameter</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Specification</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Method</TableCell>
                            {observationColumns.map((col) => (
                                <TableCell key={col.id} align="center" sx={{ fontWeight: 500 }}>
                                    {col.label}
                                </TableCell>
                            ))}
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Remarks</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations?.map((obs, index) => (
                            <TableRow key={obs.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={obs.parameter || ''}
                                        onChange={(e) => onChange(obs.id, 'parameter', e.target.value)}
                                        sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={obs.specification || ''}
                                        onChange={(e) => onChange(obs.id, 'specification', e.target.value)}
                                        sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={obs.method || ''}
                                        onChange={(e) => onChange(obs.id, 'method', e.target.value)}
                                        sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                    />
                                </TableCell>
                                {observationColumns.map((col) => (
                                    <TableCell key={col.id}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={obs[col.id] || ''}
                                            onChange={(e) => onChange(obs.id, col.id, e.target.value)}
                                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={obs.remarks || ''}
                                        onChange={(e) => onChange(obs.id, 'remarks', e.target.value)}
                                        sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
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
