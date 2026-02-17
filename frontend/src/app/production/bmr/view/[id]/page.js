"use client";
import React from "react";
import {
    Box,
    Typography,
    Grid,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
    Chip,
} from "@mui/material";
import { ChevronLeft, Print, Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const MOCK_BMR = {
    bmrNo: "BMR/2025/001",
    batchNo: "BN20250210",
    productName: "Device Alpha",
    date: "2025-02-10",
    batchQty: "500 Units",
    serialNo: "SN-001 to SN-500",
    mfgDate: "2025-02-10",
    expDate: "2027-02-09",
    checklist: [
        { label: "Batch Manufacturing Record", code: "", status: "Yes" },
        { label: "Line Clearance Checklist", code: "FRM13-03", status: "Yes" },
        { label: "Rejection Material Transfer Slip", code: "FRM13-04", status: "Yes" },
        { label: "Final Inspection Report", code: "FRM23-07", status: "Yes" },
        { label: "Product Transfer Slip", code: "FRM13-05", status: "Yes" },
        { label: "Packaging & Labeling Verification Form", code: "FRM22-02", status: "Yes" },
        { label: "COA (Certificates of Analysis)", code: "FRM13-07", status: "Yes" },
    ],
    reviewedBy: "Sarvang Shiroya",
    approvedBy: "Yash Virani",
};

export default function ViewBMR() {
    const router = useRouter();

    return (
        <Box sx={{ pb: 6 }}>
            {/* Action Bar */}
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Button
                        startIcon={<ChevronLeft />}
                        onClick={() => router.push("/production/bmr")}
                        sx={{ mb: 1, color: "var(--text-secondary)" }}
                    >
                        Back to List
                    </Button>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        BMR Report: {MOCK_BMR.bmrNo}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{ "@media print": { display: "none" } }}>
                    <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>
                        Download PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Print />}
                        onClick={() => window.print()}
                        sx={{ px: 4, borderRadius: 2, bgcolor: "var(--brand-primary)" }}
                    >
                        Print Record
                    </Button>
                </Stack>
            </Box>

            {/* Report Container */}
            <Paper sx={{ p: 6, borderRadius: 4, boxShadow: "0 10px 40px rgba(0,0,0,0.08)", border: "1px solid #eef1f6" }}>
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, textTransform: "uppercase", letterSpacing: 2, mb: 1 }}>
                        Batch Manufacturing Record
                    </Typography>
                    <Divider sx={{ width: 100, mx: "auto", borderBottomWidth: 3, borderColor: "var(--brand-primary)" }} />
                </Box>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={6}>
                        <report-field>
                            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>BMR NUMBER</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{MOCK_BMR.bmrNo}</Typography>
                        </report-field>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>PRODUCT NAME</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 900, color: "var(--brand-primary)" }}>{MOCK_BMR.productName}</Typography>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>BATCH QUANTITY</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{MOCK_BMR.batchQty}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <report-field>
                            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>BATCH NUMBER</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{MOCK_BMR.batchNo}</Typography>
                        </report-field>
                        <Box container sx={{ mt: 3, display: "flex", gap: 4 }}>
                            <Box>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>MFG DATE</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>{MOCK_BMR.mfgDate}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>EXP DATE</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: "error.main" }}>{MOCK_BMR.expDate}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>SERIAL NUMBERS</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{MOCK_BMR.serialNo}</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    Verification Checklist
                </Typography>

                <TableContainer component={Paper} variant="outlined" sx={{ mb: 6 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#fafafa" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800 }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Checklist Item</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align="center">Compliance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MOCK_BMR.checklist.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.label}</Typography>
                                        <Typography variant="caption" color="textSecondary">{item.code}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={item.status}
                                            color={item.status === "Yes" ? "success" : "error"}
                                            size="small"
                                            sx={{ fontWeight: 700, px: 2 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={10} sx={{ mt: 4 }}>
                    <Grid item xs={6}>
                        <Divider sx={{ mb: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "center" }}>Reviewed By: {MOCK_BMR.reviewedBy}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Divider sx={{ mb: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "center" }}>Approved By: {MOCK_BMR.approvedBy}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
