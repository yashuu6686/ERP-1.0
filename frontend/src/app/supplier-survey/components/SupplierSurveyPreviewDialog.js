import React from 'react';
import FormReviewDialog from '@/components/ui/FormReviewDialog';
import { Business, Contacts, FactCheck, Description, AccountBalance, LocationOn } from '@mui/icons-material';
import { Box, Grid, Paper, Typography, Divider } from '@mui/material';

const SupplierSurveyPreviewDialog = ({ open, onClose, onConfirm, data, isEdit }) => {
    if (!data) return null;

    const Section = ({ title, icon, children }) => (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#1172ba' }}>
                {icon}
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>{title}</Typography>
            </Box>
            {children}
        </Paper>
    );

    const InfoRow = ({ label, value }) => (
        <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>
            {label}: <b style={{ color: '#1e293b' }}>{value || "N/A"}</b>
        </Typography>
    );

    return (
        <FormReviewDialog
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
            title={isEdit ? "Review & Update Supplier Survey" : "Review Supplier Survey"}
            icon={<Description />}
            confirmLabel={isEdit ? "Confirm & Update" : "Confirm & Submit"}
        >
            <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Section title="Company Details" icon={<Business fontSize="small" />}>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>{data.companyName}</Typography>
                        <InfoRow label="Phone" value={data.phone} />
                        <InfoRow label="Address" value={data.address} />
                        <InfoRow label="State" value={data.state} />
                        <InfoRow label="Website" value={data.website} />
                    </Section>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Section title="Statutory Info" icon={<FactCheck fontSize="small" />}>
                        <InfoRow label="PAN" value={data.pan} />
                        <InfoRow label="Fax" value={data.fax} />
                        <InfoRow label="VAT/TIN" value={data.vatTin} />
                    </Section>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Section title="Business Status & Financials" icon={<AccountBalance fontSize="small" />}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="caption" sx={{ color: '#1172ba', fontWeight: 700, mb: 1, display: 'block' }}>ESTABLISHMENT</Typography>
                                <InfoRow label="Years in Business" value={data.financials?.yearsInBusiness} />
                                <InfoRow label="Total Employees" value={data.financials?.totalEmployees} />
                                <InfoRow label="QA Employees" value={data.financials?.qaEmployees} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="caption" sx={{ color: '#1172ba', fontWeight: 700, mb: 1, display: 'block' }}>REVENUE</Typography>
                                <InfoRow label="Revenue (Prev Year)" value={data.financials?.revenuePrevYear} />
                                <InfoRow label="Revenue (This Year)" value={data.financials?.revenueThisYear} />
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1.5, opacity: 0.5 }} />
                        <InfoRow label="Business Status" value={
                            Object.entries(data.businessStatus || {})
                                .filter(([_, v]) => v)
                                .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').trim())
                                .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                .join(", ") || "N/A"
                        } />
                    </Section>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} >
                    <Section title="Customer Service Contact" icon={<Contacts fontSize="small" />}>
                        <InfoRow label="Name" value={data.customerServiceContact?.name} />
                        <InfoRow label="Email" value={data.customerServiceContact?.email} />
                        <InfoRow label="Phone" value={data.customerServiceContact?.phone} />
                    </Section>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Section title="Quality Contact" icon={<Contacts fontSize="small" />}>
                        <InfoRow label="Name" value={data.qualityContact?.name} />
                        <InfoRow label="Email" value={data.qualityContact?.email} />
                        <InfoRow label="Phone" value={data.qualityContact?.phone} />
                    </Section>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Section title="Facility Space" icon={<LocationOn fontSize="small" />}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <InfoRow label="Manufacturing Space" value={data.facilities?.manufacturingSpace} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <InfoRow label="Warehouse Space" value={data.facilities?.warehouseSpace} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <InfoRow label="Laboratory Space" value={data.facilities?.laboratorySpace} />
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Section title="Supplier Type & Capabilities" icon={<Business fontSize="small" />}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InfoRow label="Parent Company" value={data.parentCompany} />
                                <InfoRow label="Other Locations" value={data.otherLocations} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InfoRow label="Primary Type" value={
                                    Object.entries(data.supplierType || {})
                                        .filter(([_, v]) => v)
                                        .map(([k, _]) => k.charAt(0).toUpperCase() + k.slice(1))
                                        .join(", ") || "N/A"
                                } />
                            </Grid>
                        </Grid>

                        {(data.supplierType?.product || data.productCapabilities?.productsDescription || Object.values(data.productCapabilities || {}).some(v => v === true)) && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(17, 114, 186, 0.05)', borderRadius: 2, border: '1px solid rgba(17, 114, 186, 0.1)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <Description sx={{ fontSize: 18, color: '#1172ba' }} />
                                    <Typography variant="subtitle2" sx={{ color: '#1172ba', fontWeight: 700 }}>
                                        Product Supplier Capabilities
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#1e293b', mb: 1.5, pl: 3.2, lineHeight: 1.6 }}>
                                    {Object.entries(data.productCapabilities || {})
                                        .filter(([k, v]) => v === true && k !== 'productsDescription')
                                        .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').trim())
                                        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                        .join(" • ") || "No specific items selected"}
                                </Typography>
                                {data.productCapabilities?.productsDescription && (
                                    <Box sx={{ pl: 3.2 }}>
                                        <InfoRow label="Description of Products" value={data.productCapabilities?.productsDescription} />
                                    </Box>
                                )}
                            </Box>
                        )}

                        {(data.supplierType?.service || data.serviceCapabilities?.servicesDescription || Object.values(data.serviceCapabilities || {}).some(v => v === true)) && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(17, 112, 186, 0.05)', borderRadius: 2, border: '1px solid rgba(17, 112, 186, 0.1)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <Business sx={{ fontSize: 18, color: '#1172ba' }} />
                                    <Typography variant="subtitle2" sx={{ color: '#1172ba', fontWeight: 700 }}>
                                        Service Supplier Capabilities
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#1e293b', mb: 1.5, pl: 3.2, lineHeight: 1.6 }}>
                                    {Object.entries(data.serviceCapabilities || {})
                                        .filter(([k, v]) => v === true && k !== 'servicesDescription')
                                        .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').trim())
                                        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                        .join(" • ") || "No specific services selected"}
                                </Typography>
                                {data.serviceCapabilities?.servicesDescription && (
                                    <Box sx={{ pl: 3.2 }}>
                                        <InfoRow label="Description of Services" value={data.serviceCapabilities?.servicesDescription} />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Section>
                </Grid>

                {data.management?.some(m => m.name || m.title || m.email) && (
                    <Grid size={{ xs: 12 }}>
                        <Section title="Management" icon={<Contacts fontSize="small" />}>
                            <Grid container spacing={2}>
                                {data.management
                                    .filter(m => m.name || m.title || m.email)
                                    .map((m, i) => (
                                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1172ba', mb: 1 }}>
                                                Manager {i + 1}
                                            </Typography>
                                            <InfoRow label="Name" value={m.name} />
                                            <InfoRow label="Title" value={m.title} />
                                            <InfoRow label="Email" value={m.email} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Section>
                    </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                    <Section title="References & Major Partners" icon={<Description fontSize="small" />}>
                        <Box sx={{ mb: 2 }}>
                            <InfoRow label="Items Under Consideration" value={data.underConsideration} />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" fontWeight={700}>Major Customers</Typography>
                                {(data.majorCustomers || []).map((c, i) => (
                                    <Typography key={i} variant="body2" sx={{ color: '#1e293b' }}>• {c}</Typography>
                                ))}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" fontWeight={700}>Major Suppliers</Typography>
                                {(data.majorSuppliers || []).map((s, i) => (
                                    <Typography key={i} variant="body2" sx={{ color: '#1e293b' }}>• {s}</Typography>
                                ))}
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Section title="Sign Off" icon={<FactCheck fontSize="small" />}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <InfoRow label="Authorized Person" value={data.signOff?.name} />
                            <InfoRow label="Position" value={data.signOff?.position} />
                            <InfoRow label="Date" value={data.signOff?.date} />
                        </Box>
                    </Section>
                </Grid>

                {data.scanboReview?.some?.(v => v) || (data.scanboReview?.reviewedBy || data.scanboReview?.reviewedDate || data.scanboReview?.approvedBy || data.scanboReview?.approvedDate) && (
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(17, 114, 186, 0.3)', bgcolor: 'rgba(17, 114, 186, 0.05)' }}>
                            <Typography variant="subtitle2" sx={{ color: "#1172ba", fontWeight: 700, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FactCheck fontSize="small" /> For Internal Use Only (Scanbo Technologies Inc.)
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <InfoRow label="Reviewed By" value={data.scanboReview?.reviewedBy} />
                                    <InfoRow label="Review Date" value={data.scanboReview?.reviewedDate} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <InfoRow label="Approved By" value={data.scanboReview?.approvedBy} />
                                    <InfoRow label="Approval Date" value={data.scanboReview?.approvedDate} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </FormReviewDialog>
    );
};

export default SupplierSurveyPreviewDialog;
