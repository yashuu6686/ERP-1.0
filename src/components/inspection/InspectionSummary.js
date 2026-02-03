import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
} from '@mui/material';

const InspectionSummary = ({ summaryData, onChange }) => {
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
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                    Inspection Summary
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                Accepted Quantity :
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '80px' }}
                                value={summaryData?.acceptedQuantity || ''}
                                onChange={handleChange('acceptedQuantity')}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                Rejected Quantity :
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '80px' }}
                                value={summaryData?.rejectedQuantity || ''}
                                onChange={handleChange('rejectedQuantity')}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                Hold / Scrap Quantity :
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '80px' }}
                                value={summaryData?.holdScrapQuantity || ''}
                                onChange={handleChange('holdScrapQuantity')}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                other:
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '80px' }}
                                value={summaryData?.other || ''}
                                onChange={handleChange('other')}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Comments (if any)
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={1}
                    variant="outlined"
                    value={summaryData?.comments || ''}
                    onChange={handleChange('comments')}
                />
            </CardContent>
        </Card>
    );
};

export default InspectionSummary;
