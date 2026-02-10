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
    onRemoveColumn = () => { },
    onRemove,
    onChange,
    icon: Icon = null,
    errors = [],
    touched = [],
    onBlur = () => { }
}) => {

    // Handle Enter key to move to next field in the table
    const handleKeyDown = (e, obsId, currentField, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Define field order for each row
            const fieldOrder = ['parameter', 'specification', 'method', ...observationColumns.map(col => col.id), 'remarks'];
            const currentIndex = fieldOrder.indexOf(currentField);

            if (currentIndex !== -1) {
                // Try to move to next field in same row
                if (currentIndex < fieldOrder.length - 1) {
                    const nextField = fieldOrder[currentIndex + 1];
                    const nextInput = document.querySelector(`input[name="observations[${rowIndex}].${nextField}"]`);
                    if (nextInput) {
                        nextInput.focus();
                        return;
                    }
                }

                // If at end of row, move to first field of next row
                if (currentIndex === fieldOrder.length - 1 && rowIndex < observations.length - 1) {
                    const nextRowInput = document.querySelector(`input[name="observations[${rowIndex + 1}].parameter"]`);
                    if (nextRowInput) {
                        nextRowInput.focus();
                    }
                }
            }
        }
    };

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
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                        {col.label}
                                        {col.id !== 'observation' && (
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => onRemoveColumn(col.id)}
                                                sx={{ p: 0.5 }}
                                            >
                                                <DeleteIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        )}
                                    </Box>
                                </TableCell>
                            ))}
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Remarks</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 500 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations?.map((obs, index) => {
                            const rowError = Array.isArray(errors) ? errors[index] : null;
                            const rowTouched = Array.isArray(touched) ? touched[index] : null;

                            return (
                                <TableRow key={obs.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            required
                                            name={`observations[${index}].parameter`}
                                            value={obs.parameter || ''}
                                            onChange={(e) => onChange(obs.id, 'parameter', e.target.value)}
                                            onBlur={onBlur}
                                            onKeyDown={(e) => handleKeyDown(e, obs.id, 'parameter', index)}
                                            error={rowTouched?.parameter && Boolean(rowError?.parameter)}
                                            helperText={rowTouched?.parameter && rowError?.parameter}
                                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            required
                                            name={`observations[${index}].specification`}
                                            value={obs.specification || ''}
                                            onChange={(e) => onChange(obs.id, 'specification', e.target.value)}
                                            onBlur={onBlur}
                                            onKeyDown={(e) => handleKeyDown(e, obs.id, 'specification', index)}
                                            error={rowTouched?.specification && Boolean(rowError?.specification)}
                                            helperText={rowTouched?.specification && rowError?.specification}
                                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            required
                                            name={`observations[${index}].method`}
                                            value={obs.method || ''}
                                            onChange={(e) => onChange(obs.id, 'method', e.target.value)}
                                            onBlur={onBlur}
                                            onKeyDown={(e) => handleKeyDown(e, obs.id, 'method', index)}
                                            error={rowTouched?.method && Boolean(rowError?.method)}
                                            helperText={rowTouched?.method && rowError?.method}
                                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                        />
                                    </TableCell>
                                    {observationColumns.map((col) => (
                                        <TableCell key={col.id}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                required
                                                name={`observations[${index}].${col.id}`}
                                                value={obs[col.id] || ''}
                                                onChange={(e) => onChange(obs.id, col.id, e.target.value)}
                                                onBlur={onBlur}
                                                onKeyDown={(e) => handleKeyDown(e, obs.id, col.id, index)}
                                                error={rowTouched?.[col.id] && Boolean(rowError?.[col.id])}
                                                helperText={rowTouched?.[col.id] && rowError?.[col.id]}
                                                sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            required
                                            name={`observations[${index}].remarks`}
                                            value={obs.remarks || ''}
                                            onChange={(e) => onChange(obs.id, 'remarks', e.target.value)}
                                            onBlur={onBlur}
                                            onKeyDown={(e) => handleKeyDown(e, obs.id, 'remarks', index)}
                                            error={rowTouched?.remarks && Boolean(rowError?.remarks)}
                                            helperText={rowTouched?.remarks && rowError?.remarks}
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
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {typeof errors === 'string' && (
                <Box sx={{ p: 2, bgcolor: '#fff5f5' }}>
                    <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
                        {errors}
                    </Typography>
                </Box>
            )}
        </Card>
    );
};

export default InspectionObservations;
