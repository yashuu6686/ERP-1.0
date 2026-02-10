import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Divider,
    IconButton
} from '@mui/material';
import { Close, CheckCircle, Edit } from '@mui/icons-material';

const FormReviewDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Review Details",
    icon,
    headerInfo,
    confirmLabel = "Confirm & Create",
    cancelLabel = "Back to Edit",
    maxWidth = "md",
    children
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 'var(--card-radius)',
                    overflow: 'hidden',
                    boxShadow: 'var(--card-shadow)',
                    fontFamily: 'var(--font-manrope)'
                }
            }}
        >
            {/* Header */}
            <DialogTitle sx={{
                bgcolor: 'var(--brand-primary)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2.5,
                px: 3
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {icon && React.cloneElement(icon, { sx: { fontSize: 20 } })}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontFamily: 'var(--font-manrope)', letterSpacing: '-0.01em', color: 'white' }}>
                        {title}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, bgcolor: 'var(--bg-page)' }}>
                <Grid container spacing={3}>
                    {/* Top Header Information (e.g. PO Number & Date) */}
                    {headerInfo && (
                        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                            <Paper elevation={0} sx={{
                                p: 2,
                                mt: headerInfo.mt || 0,
                                borderRadius: 'var(--input-radius)',
                                border: '1px solid var(--border-default)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                bgcolor: 'var(--bg-surface)'
                            }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{headerInfo.label1}</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--brand-primary)', fontFamily: 'var(--font-manrope)' }}>{headerInfo.value1}</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{headerInfo.label2}</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontFamily: 'var(--font-manrope)' }}>{headerInfo.value2}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    )}

                    {/* Main Content Area */}
                    <Grid size={{ xs: 12 }}>
                        {children}
                    </Grid>
                </Grid>
            </DialogContent>

            {/* Sticky Actions Footer */}
            <DialogActions sx={{ px: 3, py: 2, bgcolor: 'var(--bg-surface)', borderTop: '1px solid var(--border-default)', gap: 1.5 }}>
                <Button
                    variant="text"
                    onClick={onClose}
                    startIcon={<Edit />}
                    sx={{
                        borderRadius: 'var(--btn-radius)',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 3,
                        py: 1,
                        color: 'var(--text-secondary)',
                        '&:hover': { bgcolor: 'var(--bg-page)', color: 'var(--text-primary)' }
                    }}
                >
                    {cancelLabel}
                </Button>
                <Button
                    variant="contained"
                    onClick={onConfirm}
                    startIcon={<CheckCircle />}
                    sx={{
                        borderRadius: 'var(--btn-radius)',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 4,
                        py: 1,
                        bgcolor: 'var(--brand-primary)',
                        '&:hover': { bgcolor: '#0d5a94', boxShadow: '0 4px 12px rgba(17, 114, 186, 0.2)' }
                    }}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default FormReviewDialog;
