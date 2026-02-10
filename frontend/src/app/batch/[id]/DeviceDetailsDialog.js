import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid,
    Chip,
    Divider,
    Stack,
    IconButton
} from '@mui/material';
import {
    Close,
    QrCode2,
    DateRange,
    Business,
    Person,
    Email,
    Phone,
    LocationOn,
    LocalShipping,
    VerifiedUser,
    Info,
    Print
} from '@mui/icons-material';

const DetailRow = ({ icon: Icon, label, value, isEmail = false }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
        <Box sx={{
            mt: 0.5,
            p: 1,
            borderRadius: '8px',
            bgcolor: 'rgba(17, 114, 186, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon sx={{ fontSize: 18, color: '#1172ba' }} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{
                color: '#0f172a',
                fontWeight: 600,
                wordBreak: isEmail ? 'break-all' : 'normal'
            }}>
                {value || '-'}
            </Typography>
        </Box>
    </Stack>
);

const SectionHeader = ({ icon: Icon, title }) => (
    <Typography variant="subtitle2" sx={{
        color: '#1172ba',
        fontWeight: 800,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.05em'
    }}>
        <Icon sx={{ fontSize: 16 }} /> {title}
    </Typography>
);

export default function DeviceDetailsDialog({ open, onClose, serialNumber, batchData }) {
    if (!serialNumber) return null;

    // Extract basic info
    const modelCode = serialNumber.substring(0, 3);
    const dateCode = serialNumber.substring(3, 7);

    // Mock customer data for demonstration (as requested)
    const mockCustomer = {
        name: "TechGlobal Solutions Pvt Ltd",
        address: "Unit 402, Business Bay, Lower Parel, Mumbai, Maharashtra 400013",
        contactPerson: "Rahul Sharma",
        email: "procurement@techglobal.com",
        phone: "+91 98765 43210",
        dispatchDate: "2026-02-12",
        status: "Dispatched",
        awb: "AWB-88779900"
    };

    // Determine status - in this new view, we might want to simulate a dispatched status 
    // for demonstration or keep it "In Stock" based on batch status.
    // For now, let's keep it "Finished Goods" unless batch is "Shipped".
    const isMockDispatched = batchData?.status === 'Shipped' || false; // Or true if we want to show the customer data as per request

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: '16px', overflow: 'hidden' }
            }}
        >
            {/* Header */}
            <Box sx={{
                p: 3,
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(to right, #f8fafc, #fff)'
            }}>
                <Box>
                    <Typography variant="h6" fontWeight={800} color="#0f172a">
                        Device Profile
                    </Typography>
                    <Typography variant="caption" color="#64748b" fontWeight={600}>
                        {serialNumber}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0' }}>
                    <Close fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Column: Device Info */}
                    <Grid item size={{xs:12, md:5}}>
                        <Box sx={{ mb: 4 }}>
                            <SectionHeader icon={QrCode2} title="Device Identification" />
                            <Box sx={{
                                p: 3,
                                bgcolor: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                textAlign: 'center',
                                mb: 3
                            }}>
                                <VerifiedUser sx={{ fontSize: 48, color: '#1172ba', mb: 1, opacity: 0.2 }} />
                                <Typography variant="h5" fontWeight={800} sx={{ fontFamily: 'monospace', color: '#1172ba', mb: 0.5 }}>
                                    {serialNumber}
                                </Typography>
                                <Chip
                                    label="VERIFIED GENUINE"
                                    size="small"
                                    sx={{
                                        bgcolor: '#dcfce7',
                                        color: '#166534',
                                        fontWeight: 800,
                                        fontSize: '0.7rem',
                                        height: 20
                                    }}
                                />
                            </Box>

                            <DetailRow icon={QrCode2} label="Model Type" value={batchData?.productName || modelCode} />
                            <DetailRow icon={Info} label="Batch Number" value={batchData?.batchNo} />
                            <DetailRow icon={DateRange} label="Manufacturing Date" value={batchData?.date ? new Date(batchData.date).toLocaleDateString() : '-'} />
                        </Box>

                        <Box>
                            <SectionHeader icon={LocationOn} title="Current Location" />
                            <DetailRow
                                icon={LocationOn}
                                label="Storage Location"
                                value="Finished Goods Store - Zone A"
                            />
                        </Box>
                    </Grid>

                    {/* Right Column: Customer/Dispatch Info */}
                    <Grid item size={{xs:12, md:7}}>
                        <Box sx={{
                            p: 3,
                            bgcolor: '#f8fafc',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            height: '100%'
                        }}>
                            <SectionHeader icon={LocalShipping} title="Customer & Dispatch Details" />

                            <Stack spacing={0.5}>
                                <DetailRow icon={Business} label="Customer Name" value={mockCustomer.name} />
                                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                <DetailRow icon={Person} label="Contact Person" value={mockCustomer.contactPerson} />
                                <DetailRow icon={Phone} label="Contact Number" value={mockCustomer.phone} />
                                <DetailRow icon={Email} label="Email Address" value={mockCustomer.email} isEmail />
                                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                <DetailRow icon={LocationOn} label="Shipping Address" value={mockCustomer.address} />
                                <Box sx={{ mt: 2 }}>
                                    <DetailRow icon={DateRange} label="Dispatched On" value={mockCustomer.dispatchDate} />
                                    <Chip
                                        label={`AWB: ${mockCustomer.awb}`}
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: '6px', fontWeight: 600, color: '#475569', borderColor: '#cbd5e1' }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
                <Button onClick={onClose} sx={{ fontWeight: 600, color: '#64748b' }}>
                    Close
                </Button>
                <Button variant="contained" startIcon={<Print />} sx={{ borderRadius: '8px', textTransform: 'none' }}>
                    Print Label
                </Button>
            </DialogActions>
        </Dialog>
    );
}
