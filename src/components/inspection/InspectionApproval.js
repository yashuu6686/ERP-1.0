import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';

const InspectionApproval = ({ approvalData, onChange }) => {
    const { user } = useAuth();

    // Support both prop patterns if needed, but prefer formData
    const data = approvalData || {};

    const handleChange = (field) => (event) => {
        onChange?.(field, event.target.value);
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
                    gap: 2,
                }}
            >
                <FactCheck sx={{ color: '#fff', fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                    Final Approval
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} size={{ xs: 12 }}>
                        <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                Updated By
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                        Name / Signature
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Enter Name"
                                        value={data.updatedBySignature || ''}
                                        onChange={handleChange('updatedBySignature')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                        Date
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={data.updatedByDate || ''}
                                        onChange={handleChange('updatedByDate')}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {user?.role === 'admin' && (
                        <Grid item xs={12} size={{ xs: 12 }}>
                            <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    Approved By
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                            Name
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter Name"
                                            value={data.approvedBy || ''}
                                            onChange={handleChange('approvedBy')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                            Date
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={data.approvalDate || ''}
                                            onChange={handleChange('approvalDate')}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default InspectionApproval;
