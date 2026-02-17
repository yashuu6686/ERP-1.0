"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    Card,
    CardContent,
} from "@mui/material";
import { Save, ChevronLeft, Assignment, CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import NotificationService from "@/services/NotificationService";

const CHECKLIST_ITEMS = [
    { id: 1, label: "Batch Manufacturing Record", code: "" },
    { id: 2, label: "Line Clearance Checklist", code: "FRM13-03" },
    { id: 3, label: "Rejection Material Transfer Slip", code: "FRM13-04" },
    { id: 4, label: "Final Inspection Report", code: "FRM23-07" },
    { id: 5, label: "Product Transfer Slip", code: "FRM13-05" },
    { id: 6, label: "Packaging & Labeling Verification Form", code: "FRM22-02" },
    { id: 7, label: "COA (Certificates of Analysis)", code: "FRM13-07" },
];

const validationSchema = Yup.object().shape({
    bmrNo: Yup.string().required("Required"),
    productName: Yup.string().required("Required"),
    batchNo: Yup.string().required("Required"),
    batchQty: Yup.string().required("Required"),
    manufacturingDate: Yup.string().required("Required"),
    expiryDate: Yup.string().required("Required"),
});

export default function CreateBMR() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            date: new Date().toISOString().split("T")[0],
            batchQty: "",
            bmrNo: "",
            serialNo: "",
            productName: "",
            batchNo: "",
            manufacturingDate: "",
            expiryDate: "",
            checklist: CHECKLIST_ITEMS.reduce((acc, item) => {
                acc[item.id] = "Yes";
                return acc;
            }, {}),
            reviewedBy: "",
            approvedBy: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                console.log("Submitting BMR:", values);
                await new Promise(r => setTimeout(r, 1000));
                NotificationService.notify("Success", "BMR Saved Successfully", "success");
                router.push("/production/bmr");
            } catch (error) {
                NotificationService.notify("Error", "Failed to save BMR", "error");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Box sx={{ pb: 6 }}>
            {/* Header Info */}
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Button
                        startIcon={<ChevronLeft />}
                        onClick={() => router.push("/production/bmr")}
                        sx={{ mb: 1, color: "var(--text-secondary)" }}
                    >
                        Back to List
                    </Button>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "var(--text-primary)" }}>
                        Batch Manufacturing Record
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => router.push("/production/bmr")} sx={{ borderRadius: 2 }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        disabled={loading}
                        onClick={formik.handleSubmit}
                        sx={{ px: 4, borderRadius: 2, bgcolor: "var(--brand-primary)" }}
                    >
                        {loading ? "Saving..." : "Save Record"}
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: "var(--brand-primary)", display: "flex", alignItems: "center", gap: 1 }}>
                                <Assignment /> Basic Information
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Date" type="date" name="date" value={formik.values.date} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="BMR No." name="bmrNo" value={formik.values.bmrNo} onChange={formik.handleChange} error={formik.touched.bmrNo && !!formik.errors.bmrNo} helperText={formik.touched.bmrNo && formik.errors.bmrNo} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Name of Product" name="productName" value={formik.values.productName} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Batch No." name="batchNo" value={formik.values.batchNo} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Batch Qty" name="batchQty" value={formik.values.batchQty} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Serial No." name="serialNo" value={formik.values.serialNo} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Manufacturing Date" type="date" name="manufacturingDate" value={formik.values.manufacturingDate} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField fullWidth label="Expiry Date" type="date" name="expiryDate" value={formik.values.expiryDate} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "var(--brand-primary)", display: "flex", alignItems: "center", gap: 1 }}>
                                <CheckCircle /> Checklist Verification
                            </Typography>

                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800, width: 80 }}>S.No.</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Checklist Items</TableCell>
                                            <TableCell sx={{ fontWeight: 800, align: "center", width: 250 }}>Yes / No</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {CHECKLIST_ITEMS.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.label}</Typography>
                                                    {item.code && <Typography variant="caption" color="textSecondary">{item.code}</Typography>}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <RadioGroup
                                                        row
                                                        value={formik.values.checklist[item.id]}
                                                        onChange={(e) => formik.setFieldValue(`checklist.${item.id}`, e.target.value)}
                                                    >
                                                        <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                                                    </RadioGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Reviewed By" name="reviewedBy" value={formik.values.reviewedBy} onChange={formik.handleChange} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Approved By" name="approvedBy" value={formik.values.approvedBy} onChange={formik.handleChange} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
