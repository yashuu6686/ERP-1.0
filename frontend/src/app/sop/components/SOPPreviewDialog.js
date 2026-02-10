import React from "react";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import {
    Devices,
    FactCheck,
    Inventory,
    Business,
    Person,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Divider,
} from "@mui/material";

export default function SOPPreviewDialog({ open, onClose, onConfirm, values, loading }) {
    const [showAllTesting, setShowAllTesting] = React.useState(false);
    const [showAllPackaging, setShowAllPackaging] = React.useState(false);

    if (!values) return null;

    const testingKeys = Object.keys(values.testingResults || {});
    const displayedTestingKeys = showAllTesting ? testingKeys : testingKeys.slice(0, 5);

    const packagingKeys = Object.keys(values.packagingResults || {});
    const displayedPackagingKeys = showAllPackaging ? packagingKeys : packagingKeys.slice(0, 5);

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Review SOP Details"
            icon={<Devices />}
            headerInfo={{
                label1: "DEVICE ID",
                value1: values.deviceId || "N/A",
                label2: "SOP DATE",
                value2: values.date || "N/A"
            }}
            confirmLabel="Confirm & Save SOP"
            loading={loading}
        >
            <Grid container spacing={3}>
                {/* Device & Company Information */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Business sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Device & Company</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Company Name</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.companyName || "N/A"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Address</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8125rem' }}>{values.companyAddress || "N/A"}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Authorization Details */}
                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                    <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authorization</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Testing By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.testingBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Verified By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.verifiedBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Packed By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.packedBy || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Checked By</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{values.checkedBy || "N/A"}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Testing Process Summary */}
                <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <FactCheck sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Testing Process Summary</Typography>
                        </Box>
                        <Table size="small" sx={{ mt: 1 }}>
                            <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>STEP / TASK</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>STATUS</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>REMARKS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedTestingKeys.map((key, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ py: 1, fontSize: '0.8125rem' }}>Step {parseInt(key) + 1}</TableCell>
                                        <TableCell align="center">
                                            <Typography variant="caption" sx={{
                                                fontWeight: 700,
                                                color: values.testingResults[key].status === 'Pass' ? 'success.main' : 'error.main'
                                            }}>
                                                {values.testingResults[key].status || "N/A"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 1, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                                            {values.testingResults[key].remarks || "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {testingKeys.length > 5 && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ pt: 2 }}>
                                            <Box
                                                onClick={() => setShowAllTesting(!showAllTesting)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'var(--brand-primary)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                    {showAllTesting ? "Show Less" : `+ ${testingKeys.length - 5} more steps...`}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Packaging Summary */}
                <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                            <Inventory sx={{ fontSize: 18 }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Packaging Summary</Typography>
                        </Box>
                        <Table size="small" sx={{ mt: 1 }}>
                            <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>COMPONENT</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>STATUS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedPackagingKeys.map((key, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ py: 1, fontSize: '0.8125rem' }}>Component {parseInt(key) + 1}</TableCell>
                                        <TableCell align="center">
                                            <Typography variant="caption" sx={{
                                                fontWeight: 700,
                                                color: values.packagingResults[key].status === 'Pass' ? 'success.main' : 'error.main'
                                            }}>
                                                {values.packagingResults[key].status || "N/A"}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {packagingKeys.length > 5 && (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center" sx={{ pt: 2 }}>
                                            <Box
                                                onClick={() => setShowAllPackaging(!showAllPackaging)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'var(--brand-primary)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                    {showAllPackaging ? "Show Less" : `+ ${packagingKeys.length - 5} more components...`}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </FormReviewDialog>
    );
}
