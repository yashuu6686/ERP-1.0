import React from "react";
import { Paper, Stack, Typography, Box, Divider } from "@mui/material";
import { Science, VerifiedUser, Assignment, CheckCircle, Person, Description } from "@mui/icons-material";
import { InfoItem } from "./InspectionMainDetails";

const MetricBox = ({ label, value, color, bg, border }) => (
    <Box sx={{
        p: 2,
        bgcolor: bg,
        borderRadius: 3,
        border: `1px solid ${border}`,
        textAlign: 'center',
        flex: 1
    }}>
        <Typography variant="caption" display="block" color={color} fontWeight={800} sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            {label}
        </Typography>
        <Typography variant="h6" fontWeight={900} color={color}>
            {value || 0}
        </Typography>
    </Box>
);

const InspectionSidebar = ({ summaryData, materialData, approvalData }) => {
    return (
        <Stack spacing={2} sx={{ height: '100%' }}>
            {/* Quantity Breakdown */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Science sx={{ color: '#1172ba', fontSize: 20 }} /> Quantity Metrics
                </Typography>

                <Stack spacing={2}>
                    <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 2 }}>
                            Lot Composition
                        </Typography>
                        <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                            <MetricBox label="Accepted" value={summaryData.acceptedQuantity} color="#15803d" bg="#dcfce7" border="#bbf7d0" />
                            <MetricBox label="Rejected" value={summaryData.rejectedQuantity} color="#b91c1c" bg="#fee2e2" border="#fecaca" />
                        </Stack>
                        <Stack direction="row" spacing={1.5}>
                            <MetricBox label="Hold/Scrap" value={summaryData.holdScrapQuantity} color="#a16207" bg="#fef9c3" border="#fde68a" />
                            <MetricBox label="Other" value={summaryData.other} color="#475569" bg="#f1f5f9" border="#e2e8f0" />
                        </Stack>
                    </Box>
                </Stack>
            </Paper>

            {/* Batch Info */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> Tracking Info
                </Typography>
                <Stack spacing={2.5}>
                    <InfoItem icon={Assignment} label="Lot Number" value={materialData.lotNumber} />
                    <InfoItem icon={Description} label="PO Reference" value={materialData.poNumber} />
                    <InfoItem icon={Science} label="Standard No." value={materialData.inspectionStandardNumber} />
                </Stack>
            </Paper>

            {/* Approval Workflow */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ color: '#1172ba', fontSize: 20 }} /> Authorization
                </Typography>

                <Stack spacing={3}>
                    <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Person sx={{ color: '#1172ba', fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" fontWeight={800} color="#1e293b">{approvalData.approvedByName}</Typography>
                                <Typography variant="caption" color="#64748b" fontWeight={700}>Authorized Signatory</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', ml: 6.5 }}>
                            {approvalData.approvedByDate}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Person sx={{ color: '#64748b', fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" fontWeight={700} color="#475569">{approvalData.updatedByName}</Typography>
                                <Typography variant="caption" color="#94a3b8" fontWeight={600}>Verified By</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', ml: 6.5 }}>
                            {approvalData.updatedByDate}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default InspectionSidebar;
