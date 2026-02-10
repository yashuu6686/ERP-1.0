import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
} from '@mui/material';

const FIELD_ORDER = [
    "acceptedQuantity",
    "rejectedQuantity",
    "holdScrapQuantity",
    "other",
    "comments"
];

const InspectionSummary = ({ summaryData, onChange, errors = {}, touched = {}, onBlur }) => {
    const handleChange = (field) => (event) => {
        onChange?.(field, event.target.value);
    };

    const handleKeyDown = (e, fieldName) => {
        // Prevent arrow keys from changing number values
        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && fieldName !== 'comments') {
            e.preventDefault();
        }

        // Handle Enter key navigation
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentIndex = FIELD_ORDER.indexOf(fieldName);
            if (currentIndex !== -1 && currentIndex < FIELD_ORDER.length - 1) {
                const nextFieldName = FIELD_ORDER[currentIndex + 1];
                const nextField = document.querySelector(`[name="${nextFieldName}"]`);
                if (nextField) {
                    nextField.focus();
                }
            }
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
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
                    Inspection Summary <span style={{ color: 'white' }}>*</span>
                </Typography>
            </Box>

            <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                Accepted Quantity :
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '120px' }}
                                type="number"
                                name="acceptedQuantity"
                                value={summaryData?.acceptedQuantity || ''}
                                onChange={handleChange('acceptedQuantity')}
                                onBlur={onBlur}
                                onKeyDown={(e) => handleKeyDown(e, 'acceptedQuantity')}
                                required
                                error={touched.acceptedQuantity && Boolean(errors.acceptedQuantity)}
                                helperText={touched.acceptedQuantity && errors.acceptedQuantity}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                Rejected Quantity :
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '120px' }}
                                type="number"
                                name="rejectedQuantity"
                                value={summaryData?.rejectedQuantity || ''}
                                onChange={handleChange('rejectedQuantity')}
                                onBlur={onBlur}
                                onKeyDown={(e) => handleKeyDown(e, 'rejectedQuantity')}
                                required
                                error={touched.rejectedQuantity && Boolean(errors.rejectedQuantity)}
                                helperText={touched.rejectedQuantity && errors.rejectedQuantity}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                Hold / Scrap Quantity :
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '120px' }}
                                type="number"
                                name="holdScrapQuantity"
                                value={summaryData?.holdScrapQuantity || ''}
                                onChange={handleChange('holdScrapQuantity')}
                                onBlur={onBlur}
                                onKeyDown={(e) => handleKeyDown(e, 'holdScrapQuantity')}
                                required
                                error={touched.holdScrapQuantity && Boolean(errors.holdScrapQuantity)}
                                helperText={touched.holdScrapQuantity && errors.holdScrapQuantity}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} size={{ xs: 12, sm: 6, md: 2 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                other:
                            </Typography>
                            <TextField
                                size="small"
                                sx={{ width: '120px' }}
                                type="number"
                                name="other"
                                value={summaryData?.other || ''}
                                onChange={handleChange('other')}
                                onBlur={onBlur}
                                onKeyDown={(e) => handleKeyDown(e, 'other')}
                                required
                                error={touched.other && Boolean(errors.other)}
                                helperText={touched.other && errors.other}
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
                    name="comments"
                    value={summaryData?.comments || ''}
                    onChange={handleChange('comments')}
                    onBlur={onBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'comments')}
                    required
                    error={touched.comments && Boolean(errors.comments)}
                    helperText={touched.comments && errors.comments}
                />
            </CardContent>
        </Card>
    );
};

export default InspectionSummary;
