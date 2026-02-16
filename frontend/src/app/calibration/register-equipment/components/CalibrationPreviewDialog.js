import React from 'react';
import FormReviewDialog from '@/components/ui/FormReviewDialog';
import { PrecisionManufacturing, LocationOn, VerifiedUser } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';

const CalibrationPreviewDialog = ({ open, onClose, onConfirm, data, isEditMode }) => {
    if (!data) return null;

    const sections = [
        {
            title: "Equipment Identification",
            icon: <PrecisionManufacturing sx={{ fontSize: 18 }} />,
            fullWidth: true,
            items: [
                { label: "Name", value: data.equipmentName, isBold: true },
                { label: "Master ID", value: data.masterId, isBold: true },
                { label: "Serial No", value: data.serialNumber },
                { label: "Manufacturer", value: data.manufacturer },
                { label: "Model", value: data.model },
                { label: "Frequency", value: data.frequency },
            ]
        },
        {
            title: "Location Information",
            icon: <LocationOn sx={{ fontSize: 18 }} />,
            items: [
                { label: "Location", value: data.location },
                { label: "Department", value: data.department },
            ]
        },
        {
            title: "Calibration Details",
            icon: <VerifiedUser sx={{ fontSize: 18 }} />,
            items: [
                { label: "Last Calibrated", value: data.lastCalibrationDate },
                { label: "Calibrated By", value: data.calibratedBy },
                { label: "Certificate No", value: data.certificateNo },
                { label: "Status", value: data.status, isBold: true, color: data.status === 'Calibrated' ? 'success' : 'warning' },
            ]
        }
    ];

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title={isEditMode ? "Review Update" : "Review Registration"}
            icon={<VerifiedUser />}
            headerInfo={{
                label1: "EQUIPMENT",
                value1: data.equipmentName,
                label2: "STATUS",
                value2: data.status
            }}
            confirmLabel={isEditMode ? "Confirm & Update" : "Confirm & Register"}
        >
            <Grid container spacing={3}>
                {sections.map((section, idx) => (
                    <Grid size={{ xs: 12, md: section.fullWidth ? 12 : 6 }} key={idx}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#1172ba' }}>
                                {section.icon}
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.title}</Typography>
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                                {section.items.map((item, i) => (
                                    <Box key={i}>
                                        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</Typography>
                                        <Typography variant="body2" sx={{
                                            fontWeight: item.isBold ? 700 : 500,
                                            color: item.color === 'success' ? '#15803d' : item.color === 'warning' ? '#b45309' : '#1e293b'
                                        }}>
                                            {item.value || '-'}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                {data.remarks && (
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', mb: 1, display: 'block' }}>Remarks</Typography>
                            <Typography variant="body2" sx={{ color: '#334155' }}>{data.remarks}</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </FormReviewDialog>
    );
};

export default CalibrationPreviewDialog;
