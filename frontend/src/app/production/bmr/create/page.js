"use client";

export const dynamic = "force-dynamic";
import React, { useState, useEffect, Suspense, useRef } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
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
import { Save, Assignment, CheckCircle } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useNotification } from "@/context/NotificationContext";
import CommonCard from "@/components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

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
    bmrNo: Yup.string().required("BMR No. is Required"),
    productName: Yup.string().required("Product Name is Required"),
    batchNo: Yup.string().required("Batch No. is Required"),
    batchQty: Yup.string().required("Batch Qty is Required"),
    manufacturingDate: Yup.string().required("Manufacturing Date is Required"),
    expiryDate: Yup.string().required("Expiry Date is Required"),
});

function CreateBMRContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const formContainerRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.target.tagName === "TEXTAREA" && e.shiftKey) {
                return;
            }

            if (
                (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") &&
                e.target.type !== "submit" &&
                e.target.type !== "button"
            ) {
                e.preventDefault();
                const allFocusable = Array.from(
                    formContainerRef.current.querySelectorAll("input, select, textarea")
                ).filter((el) => !el.disabled && el.tabIndex !== -1 && el.type !== "hidden" && !el.readOnly);

                const currentIndex = allFocusable.indexOf(e.target);
                if (currentIndex !== -1 && currentIndex < allFocusable.length - 1) {
                    allFocusable[currentIndex + 1].focus();
                }
            }
        }
    };

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
                const response = isEditMode
                    ? await axiosInstance.put(`/production-bmr/${id}`, values)
                    : await axiosInstance.post("/production-bmr", {
                        ...values,
                        createdAt: new Date().toISOString()
                    });

                if (response.data) {
                    showNotification(`BMR ${isEditMode ? "Updated" : "Saved"} Successfully`, "success");
                    const savedId = response.data.id || id;
                    router.push(`/production/bmr`);
                }
            } catch (error) {
                console.error("Save Error:", error);
                showNotification(`Failed to ${isEditMode ? "update" : "save"} BMR`, "error");
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (isEditMode && id) {
            const fetchBMR = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/production-bmr/${id}`);
                    if (response.data) {
                        const data = response.data;
                        // Format dates for input type="date" (must be YYYY-MM-DD)
                        const formattedData = {
                            ...data,
                            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
                            manufacturingDate: data.manufacturingDate ? new Date(data.manufacturingDate).toISOString().split("T")[0] : "",
                            expiryDate: data.expiryDate ? new Date(data.expiryDate).toISOString().split("T")[0] : "",
                            // Safety guard for checklist data
                            checklist: data.checklist || CHECKLIST_ITEMS.reduce((acc, item) => {
                                acc[item.id] = "Yes";
                                return acc;
                            }, {}),
                        };
                        formik.setValues(formattedData);
                    }
                } catch (error) {
                    console.error("Fetch Error:", error);
                    showNotification("Failed to load BMR data", "error");
                } finally {
                    setLoading(false);
                }
            };
            fetchBMR();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isEditMode]);

    if (loading && isEditMode) {
        return <Loader fullPage message="Loading BMR Details..." />;
    }

    return (
        <FormikProvider value={formik}>
            <Box onKeyDown={handleKeyDown} ref={formContainerRef} sx={{ pb: 6 }}>
                <CommonCard
                    title={isEditMode ? "Edit Batch Manufacturing Record" : "Create Batch Manufacturing Record"}
                    icon={<Assignment sx={{ mr: 1, color: "var(--brand-primary)" }} />}
                >
                    <Box sx={{ p: 1 }}>
                        {/* Basic Information Section */}
                        <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e2e8f0", mb: 4 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: "#1172ba", display: "flex", alignItems: "center", gap: 1 }}>
                                    <Assignment fontSize="small" /> Basic Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Date" type="date" name="date" value={formik.values.date} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="BMR No." name="bmrNo" value={formik.values.bmrNo} onChange={formik.handleChange} error={formik.touched.bmrNo && !!formik.errors.bmrNo} helperText={formik.touched.bmrNo && formik.errors.bmrNo} size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Name of Product" name="productName" value={formik.values.productName} onChange={formik.handleChange} error={formik.touched.productName && !!formik.errors.productName} helperText={formik.touched.productName && formik.errors.productName} size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Batch No." name="batchNo" value={formik.values.batchNo} onChange={formik.handleChange} error={formik.touched.batchNo && !!formik.errors.batchNo} helperText={formik.touched.batchNo && formik.errors.batchNo} size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Batch Qty" name="batchQty" value={formik.values.batchQty} onChange={formik.handleChange} error={formik.touched.batchQty && !!formik.errors.batchQty} helperText={formik.touched.batchQty && formik.errors.batchQty} size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Serial No." name="serialNo" value={formik.values.serialNo} onChange={formik.handleChange} size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Manufacturing Date" type="date" name="manufacturingDate" value={formik.values.manufacturingDate} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} size="small" error={formik.touched.manufacturingDate && !!formik.errors.manufacturingDate} helperText={formik.touched.manufacturingDate && formik.errors.manufacturingDate} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField fullWidth label="Expiry Date" type="date" name="expiryDate" value={formik.values.expiryDate} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} size="small" error={formik.touched.expiryDate && !!formik.errors.expiryDate} helperText={formik.touched.expiryDate && formik.errors.expiryDate} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Checklist Section */}
                        <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e2e8f0", mb: 4 }}>
                            <CardContent sx={{ p: 0 }}>
                                <Box sx={{ p: 4, pb: 2 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#1172ba", display: "flex", alignItems: "center", gap: 1 }}>
                                        <CheckCircle fontSize="small" /> Checklist Verification
                                    </Typography>
                                </Box>

                                <TableContainer sx={{ borderTop: "1px solid #e2e8f0" }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)" }}>
                                                <TableCell sx={{ color: "white", fontWeight: 700, width: 80 }}>S.No.</TableCell>
                                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Checklist Items</TableCell>
                                                <TableCell sx={{ color: "white", fontWeight: 700, textAlign: "center", width: 250 }}>Yes / No</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {CHECKLIST_ITEMS.map((item) => (
                                                <TableRow key={item.id} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                    <TableCell sx={{ fontWeight: 500, color: "#64748b" }}>{item.id}</TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>{item.label}</Typography>
                                                        {item.code && <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>Code: {item.code}</Typography>}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <RadioGroup
                                                            row
                                                            value={formik.values.checklist[item.id]}
                                                            onChange={(e) => formik.setFieldValue(`checklist.${item.id}`, e.target.value)}
                                                            sx={{ justifyContent: "center" }}
                                                        >
                                                            <FormControlLabel value="Yes" control={<Radio size="small" color="primary" />} label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Yes</Typography>} />
                                                            <FormControlLabel value="No" control={<Radio size="small" color="error" />} label={<Typography variant="body2" sx={{ fontWeight: 500 }}>No</Typography>} />
                                                        </RadioGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>

                        {/* Review Section */}
                        <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e2e8f0", mb: 4 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Reviewed By" name="reviewedBy" value={formik.values.reviewedBy} onChange={formik.handleChange} size="small" placeholder="Enter name" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Approved By" name="approvedBy" value={formik.values.approvedBy} onChange={formik.handleChange} size="small" placeholder="Enter name" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "end" }}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/production/bmr")}
                                sx={{ borderRadius: 2, px: 4, py: 1.2, textTransform: "none", fontWeight: 700, color: "#64748b", borderColor: "#cbd5e1", "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" } }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                disabled={loading}
                                onClick={formik.handleSubmit}
                                sx={{
                                    borderRadius: 2,
                                    px: 6,
                                    py: 1.2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                    "&:hover": { background: "linear-gradient(135deg, #0d5a94 0%, #094676 100%)" },
                                    boxShadow: "0 4px 12px rgba(17, 114, 186, 0.2)"
                                }}
                            >
                                {loading ? "Saving..." : (isEditMode ? "Update BMR" : "Save BMR Record")}
                            </Button>
                        </Box>
                    </Box>
                </CommonCard>
            </Box>
        </FormikProvider>
    );
}

export default function CreateBMR() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <CreateBMRContent />
        </Suspense>
    );
}
