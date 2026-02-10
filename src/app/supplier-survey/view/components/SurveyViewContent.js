import React from 'react';
import { Business, Contacts, FactCheck, Description, AccountBalance, LocationOn, CalendarMonth, CheckCircle, Schedule, Cancel } from '@mui/icons-material';
import { Box, Grid, Typography, Divider, Stack, Chip, Paper } from '@mui/material';

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b" }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5
        }}>
            <Icon sx={{ color: "#1172ba", fontSize: 18 }} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem" }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
);

const SurveyViewContent = ({ data }) => {
    if (!data) return null;

    const status = data.status || "Pending";
    const getStatusConfig = (s) => {
        const configs = {
            Completed: { color: "#166534", bg: "#dcfce7", border: "#bbedc2", icon: <CheckCircle /> },
            Pending: { color: "#92400e", bg: "#fef3c7", border: "#fde68a", icon: <Schedule /> },
            Rejected: { color: "#991b1b", bg: "#fee2e2", border: "#fecaca", icon: <Cancel /> },
        };
        return configs[s] || configs.Pending;
    };

    const statusConfig = getStatusConfig(status);

    const Section = ({ title, icon, children }) => (
        <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ bgcolor: 'rgba(17, 114, 186, 0.1)', p: 1, borderRadius: 2, color: '#1172ba', display: 'flex' }}>
                    {icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</Typography>
            </Box>
            {children}
            <Divider sx={{ mt: 4, opacity: 0.6 }} />
        </Box>
    );

    const SimpleInfo = ({ label, value, isLink = false, isEmail = false }) => (
        <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>{label}</Typography>
            {isLink && value ? (
                <Typography
                    variant="body2"
                    component="a"
                    href={value.startsWith('http') ? value : `https://${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: '#1172ba',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-block',
                        wordBreak: 'break-all',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    {value}
                </Typography>
            ) : isEmail && value ? (
                <Typography
                    variant="body2"
                    component="a"
                    href={`mailto:${value}`}
                    sx={{
                        color: '#1172ba',
                        fontWeight: 700,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    {value}
                </Typography>
            ) : (
                <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>{value || "N/A"}</Typography>
            )}
        </Box>
    );

    return (
        <Box>
            {/* Document Header Section */}
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                <Box>
                    <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                        SUPPLIER SURVEY
                    </Typography>
                    <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                        Official Audit & Capability Assessment
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            label={`ID: ${data.id?.substring(0, 8) || 'N/A'}`}
                            sx={{
                                fontWeight: 700,
                                bgcolor: "#f1f5f9",
                                color: "#0f172a",
                                borderRadius: '8px',
                                fontSize: '0.95rem'
                            }}
                        />
                        <Chip
                            icon={React.cloneElement(statusConfig.icon, { sx: { fontSize: '18px !important' } })}
                            label={status}
                            sx={{
                                fontWeight: 700,
                                bgcolor: statusConfig.bg,
                                color: statusConfig.color,
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                border: `1px solid ${statusConfig.border}`,
                                "& .MuiChip-icon": { color: statusConfig.color }
                            }}
                        />
                    </Stack>
                </Box>

                <Stack spacing={2} sx={{ minWidth: 280 }}>
                    <InfoItem
                        icon={CalendarMonth}
                        label="Assessment Date"
                        value={data.signOff?.date ? new Date(data.signOff.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Pending"}
                    />
                    <InfoItem
                        icon={FactCheck}
                        label="Reviewer"
                        value={data.scanboReview?.reviewedBy || "Pending Review"}
                    />
                </Stack>
            </Stack>
            <Divider sx={{ mb: 5, opacity: 0.6 }} />

            {/* Content Sections */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Section title="General Information" icon={<Business />}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1172ba', mb: 3 }}>{data.companyName}</Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <InfoItem icon={Business} label="Company Address" value={data.address} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SimpleInfo label="Phone Number" value={data.phone} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SimpleInfo label="Website" value={data.website} isLink />
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Section title="Statutory & Status" icon={<FactCheck />}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SimpleInfo label="PAN Number" value={data.pan} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SimpleInfo label="Fax Number" value={data.fax} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <SimpleInfo label="VAT/TIN Reference" value={data.vatTin} />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <SimpleInfo label="Business Status" value={
                                    Object.entries(data.businessStatus || {})
                                        .filter(([_, v]) => v)
                                        .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').trim())
                                        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                        .join(", ") || "N/A"
                                } />
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Section title="Financial Metrics & Manpower" icon={<AccountBalance />}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <InfoItem icon={CalendarMonth} label="Years in Business" value={data.financials?.yearsInBusiness} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <InfoItem icon={Contacts} label="Total Employees" value={data.financials?.totalEmployees} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <InfoItem icon={CheckCircle} label="QA/QC Employees" value={data.financials?.qaEmployees} />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 4, pt: 3, borderTop: '1px dashed #e2e8f0' }}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <SimpleInfo label="Revenue (Previous Year)" value={data.financials?.revenuePrevYear} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <SimpleInfo label="Revenue (Current Year)" value={data.financials?.revenueThisYear} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Section>
                </Grid>

                {/* Facilities Space */}
                <Grid size={{ xs: 12 }}>
                    <Section title="Operational Capacities" icon={<LocationOn />}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
                                    <SimpleInfo label="Manufacturing Area" value={data.facilities?.manufacturingSpace} />
                                </Paper>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
                                    <SimpleInfo label="Warehouse Capacity" value={data.facilities?.warehouseSpace} />
                                </Paper>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}>
                                    <SimpleInfo label="Laboratory Space" value={data.facilities?.laboratorySpace} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                {/* Capabilities */}
                <Grid size={{ xs: 12 }}>
                    <Section title="Core Capabilities" icon={<Description />}>
                        {(data.supplierType?.product || data.productCapabilities?.productsDescription || Object.values(data.productCapabilities || {}).some(v => v === true)) && (
                            <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(17, 114, 186, 0.03)', borderRadius: 3, border: '1px solid rgba(17, 114, 186, 0.1)' }}>
                                <Typography variant="subtitle2" sx={{ color: '#1172ba', fontWeight: 800, mb: 2 }}>PRODUCT RELATED CAPABILITIES</Typography>
                                <Typography variant="body2" sx={{ color: '#1e293b', mb: 2, lineHeight: 1.8, fontSize: '0.95rem' }}>
                                    {Object.entries(data.productCapabilities || {})
                                        .filter(([k, v]) => v === true && k !== 'productsDescription')
                                        .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').trim())
                                        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                        .join(" • ") || "General Product Supplier"}
                                </Typography>
                                <SimpleInfo label="Products Description" value={data.productCapabilities?.productsDescription} />
                            </Box>
                        )}
                        {(data.supplierType?.service || data.serviceCapabilities?.servicesDescription || Object.values(data.serviceCapabilities || {}).some(v => v === true)) && (
                            <Box sx={{ p: 3, bgcolor: 'rgba(17, 114, 186, 0.03)', borderRadius: 3, border: '1px solid rgba(17, 114, 186, 0.1)' }}>
                                <Typography variant="subtitle2" sx={{ color: '#1172ba', fontWeight: 800, mb: 2 }}>SERVICE RELATED CAPABILITIES</Typography>
                                <Typography variant="body2" sx={{ color: '#1e293b', mb: 2, lineHeight: 1.8, fontSize: '0.95rem' }}>
                                    {Object.entries(data.serviceCapabilities || {})
                                        .filter(([k, v]) => v === true && k !== 'servicesDescription')
                                        .map(([k, _]) => k.replace(/([A-Z])/g, ' $1').trim())
                                        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                                        .join(" • ") || "General Service Provider"}
                                </Typography>
                                <SimpleInfo label="Services Description" value={data.serviceCapabilities?.servicesDescription} />
                            </Box>
                        )}
                    </Section>
                </Grid>

                {/* References */}
                <Grid size={{ xs: 12 }}>
                    <Section title="Market Presence & References" icon={<Description />}>
                        <Box sx={{ mb: 4, p: 2, bgcolor: '#f8fafc', borderRadius: 2, borderLeft: '5px solid #1172ba' }}>
                            <SimpleInfo label="Items Under Consideration" value={data.underConsideration} />
                        </Box>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2.5, color: '#334155' }}>MAJOR CUSTOMERS</Typography>
                                {(data.majorCustomers || []).map((c, i) => (
                                    <Box key={i} sx={{ p: 1.5, mb: 1, bgcolor: '#fff', borderRadius: 2, border: '1px solid #f1f5f9', fontWeight: 600 }}>• {c}</Box>
                                ))}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2.5, color: '#334155' }}>MAJOR SUPPLIERS</Typography>
                                {(data.majorSuppliers || []).map((s, i) => (
                                    <Box key={i} sx={{ p: 1.5, mb: 1, bgcolor: '#fff', borderRadius: 2, border: '1px solid #f1f5f9', fontWeight: 600 }}>• {s}</Box>
                                ))}
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                {/* Personnel */}
                <Grid size={{ xs: 12 }}>
                    <Section title="Key Contacts" icon={<Contacts />}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" sx={{ color: '#1172ba', fontWeight: 800, mb: 2.5 }}>CUSTOMER SERVICE</Typography>
                                <InfoItem icon={Contacts} label="Contact Name" value={data.customerServiceContact?.name} />
                                <Box sx={{ mt: 1.5 }}>
                                    <SimpleInfo label="Email" value={data.customerServiceContact?.email} isEmail />
                                    <SimpleInfo label="Phone" value={data.customerServiceContact?.phone} />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" sx={{ color: '#1172ba', fontWeight: 800, mb: 2.5 }}>QUALITY ASSURANCE</Typography>
                                <InfoItem icon={FactCheck} label="Contact Name" value={data.qualityContact?.name} />
                                <Box sx={{ mt: 1.5 }}>
                                    <SimpleInfo label="Email" value={data.qualityContact?.email} isEmail />
                                    <SimpleInfo label="Phone" value={data.qualityContact?.phone} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Section>
                </Grid>

                {/* Authorization */}
                <Grid size={{ xs: 12 }}>
                    <Section title="Authorization & Sign Off" icon={<FactCheck />}>
                        <Box sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 4 }}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <SimpleInfo label="Authorized Person" value={data.signOff?.name} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <SimpleInfo label="Title / Position" value={data.signOff?.position} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <SimpleInfo label="Submission Date" value={data.signOff?.date} />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Internal Review */}
                        {(data.scanboReview?.reviewedBy || data.scanboReview?.approvedBy) && (
                            <Box sx={{ mt: 4, p: 4, borderRadius: 4, bgcolor: 'rgba(17, 114, 186, 0.05)', border: '1.5px solid rgba(17, 114, 186, 0.3)' }}>
                                <Typography variant="subtitle2" sx={{ color: "#1172ba", fontWeight: 900, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    FOR INTERNAL USE ONLY (SCANBO TECHNOLOGIES INC.)
                                </Typography>
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <SimpleInfo label="Reviewed By" value={data.scanboReview?.reviewedBy} />
                                        <SimpleInfo label="Review Date" value={data.scanboReview?.reviewedDate} />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <SimpleInfo label="Approved By" value={data.scanboReview?.approvedBy} />
                                        <SimpleInfo label="Approval Date" value={data.scanboReview?.approvedDate} />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Section>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SurveyViewContent;
