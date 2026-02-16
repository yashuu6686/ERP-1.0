"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Save from "@mui/icons-material/Save";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import CommonCard from "../../../components/ui/CommonCard";
import Loader from "../../../components/ui/Loader";
import axiosInstance from "@/axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";

const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    bmrNo: Yup.string().required("BMR No. is required"),
    currentBatchNo: Yup.string().required("Current Batch No. is required"),
    oldBatchNo: Yup.string().required("Old Batch No. is required"),
    time: Yup.string().required("Time is required"),
    items: Yup.array().of(
        Yup.object().shape({
            response: Yup.string().required("Selection is required"),
        })
    ),
    reviewedBy: Yup.string().required("Reviewed By is required"),
    approvedBy: Yup.string().required("Approved By is required"),
});

const CHECKLIST_POINTS = [
    "Whether left Over all Previous BATCH Material at Assembly Visual In process Inspection Station cleared/removed",
    "Whether Left Over all Previous BATCH Material at the Final Inspection Station Cleared/Removed",
    "Whether Post Assembly Inspection Station Pieces Storage Tray of Previous BATCH Cleared/Removed",
    "Whether Left Overall Previous BATCH Material at Primary Packing Station Cleared/Removed.",
    "Whether Rejected Semi Assembled Material Tray Cleared /Removed.",
    "Whether Post Assembly Inspection Rejected Material Polythene Bag Cleared/Removed",
    "Whether Left Over Material at Post Assembly Inspection Station Cleared /Removed.",
    "Whether Pouch Packed Pieces of Previous BATCH Cleared /Removed.",
    "Whether Packing Paper of Previous BATCH Cleared /Removed.",
    "Whether HM Paper of Previous BATCH Cleared /Removed.",
    "Whether Over Material Pouch Packing Station Cleared /Removed.",
    "Whether Table, Fixture & Machine is Properly Cleared For the new BATCH to be Started."
];

function CreateLineClearanceChecklistContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const formik = useFormik({
        initialValues: {
            date: new Date().toISOString().split("T")[0],
            bmrNo: "",
            currentBatchNo: "",
            oldBatchNo: "",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            items: CHECKLIST_POINTS.map(point => ({ point, response: "Yes" })),
            reviewedBy: "",
            approvedBy: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                if (isEditMode) {
                    await axiosInstance.put(`/line-clearance-checklist/${id}`, values);
                    showNotification("Checklist updated successfully!", "success");
                } else {
                    await axiosInstance.post("/line-clearance-checklist", values);
                    showNotification("Checklist created successfully!", "success");
                }
                router.push("/line-clearance-checklist");
            } catch (error) {
                console.error("Save Error:", error);
                showNotification(error.response?.data?.message || "Error saving checklist.", "error");
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (isEditMode && id) {
            const fetchChecklist = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/line-clearance-checklist/${id}`);
                    formik.setValues(response.data);
                } catch (error) {
                    console.error("Fetch Error:", error);
                    showNotification("Failed to fetch checklist details.", "error");
                } finally {
                    setLoading(false);
                }
            };
            fetchChecklist();
        }
    }, [id, isEditMode]);

    if (loading) return <Loader fullPage message="Saving Checklist..." />;

    return (
        <FormikProvider value={formik}>
            <Box>
                <CommonCard
                    title={isEditMode ? "Edit Line Clearance Checklist" : "Create Line Clearance Checklist"}
                >
                    <Box sx={{ p: 3 }}>
                        {/* Summary Info Section */}
                        <Paper elevation={0} sx={{ p: 4, mb: 4, bgcolor: "#f8fafc", borderRadius: 4, border: "1px solid #e2e8f0" }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={3} size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        fullWidth
                                        label="Date"
                                        type="date"
                                        variant="outlined"
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        helperText={formik.touched.date && formik.errors.date}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        fullWidth
                                        label="BMR No."
                                        variant="outlined"
                                        name="bmrNo"
                                        value={formik.values.bmrNo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bmrNo && Boolean(formik.errors.bmrNo)}
                                        helperText={formik.touched.bmrNo && formik.errors.bmrNo}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        fullWidth
                                        label="Current Batch No."
                                        variant="outlined"
                                        name="currentBatchNo"
                                        value={formik.values.currentBatchNo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.currentBatchNo && Boolean(formik.errors.currentBatchNo)}
                                        helperText={formik.touched.currentBatchNo && formik.errors.currentBatchNo}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={3} size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        fullWidth
                                        label="Old Batch No."
                                        variant="outlined"
                                        name="oldBatchNo"
                                        value={formik.values.oldBatchNo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.oldBatchNo && Boolean(formik.errors.oldBatchNo)}
                                        helperText={formik.touched.oldBatchNo && formik.errors.oldBatchNo}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} size={{ xs: 12, md: 2.4 }}>
                                    <TextField
                                        fullWidth
                                        label="Time"
                                        type="time"
                                        variant="outlined"
                                        name="time"
                                        value={formik.values.time}
                                        onChange={formik.handleChange}
                                        error={formik.touched.time && Boolean(formik.errors.time)}
                                        helperText={formik.touched.time && formik.errors.time}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Checklist Header with Select All */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Typography variant="h6" sx={{ color: "#1172ba", fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
                                Checklist Points
                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500, bgcolor: "#f1f5f9", px: 1, py: 0.5, borderRadius: 1 }}>
                                    {CHECKLIST_POINTS.length} items
                                </Typography>
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1.5 }}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                        const newItems = formik.values.items.map(i => ({ ...i, response: "Yes" }));
                                        formik.setFieldValue("items", newItems);
                                    }}
                                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, borderColor: "#22c55e", color: "#16a34a", "&:hover": { borderColor: "#16a34a", bgcolor: "#f0fdf4" } }}
                                >
                                    Select All Yes
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                        const newItems = formik.values.items.map(i => ({ ...i, response: "No" }));
                                        formik.setFieldValue("items", newItems);
                                    }}
                                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, borderColor: "#ef4444", color: "#dc2626", "&:hover": { borderColor: "#dc2626", bgcolor: "#fef2f2" } }}
                                >
                                    Select All No
                                </Button>
                            </Box>
                        </Box>

                        <TableContainer component={Paper} elevation={0} sx={{ mb: 4, borderRadius: 3, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                            <Table>
                                <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#334155", width: "70px", py: 2 }}>S.No.</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: "#334155", py: 2 }}>Checklist Description</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 800, color: "#334155", width: "180px", py: 2 }}>Response</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formik.values.items.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                bgcolor: index % 2 === 0 ? "#fff" : "#f8fafc",
                                                "&:hover": { bgcolor: "#f1f5f9" }
                                            }}
                                        >
                                            <TableCell align="center" sx={{ color: "#64748b", fontWeight: 600 }}>{index + 1}</TableCell>
                                            <TableCell sx={{ color: "#1e293b", fontWeight: 500, fontSize: "0.95rem" }}>{item.point}</TableCell>
                                            <TableCell align="center">
                                                <RadioGroup
                                                    row
                                                    name={`items[${index}].response`}
                                                    value={item.response}
                                                    onChange={formik.handleChange}
                                                    sx={{
                                                        justifyContent: "center",
                                                        gap: 2
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="Yes"
                                                        control={<Radio size="small" sx={{ color: "#22c55e", '&.Mui-checked': { color: "#16a34a" } }} />}
                                                        label={<Typography variant="body2" sx={{ fontWeight: item.response === "Yes" ? 700 : 400, color: item.response === "Yes" ? "#16a34a" : "inherit" }}>Yes</Typography>}
                                                    />
                                                    <FormControlLabel
                                                        value="No"
                                                        control={<Radio size="small" sx={{ color: "#ef4444", '&.Mui-checked': { color: "#dc2626" } }} />}
                                                        label={<Typography variant="body2" sx={{ fontWeight: item.response === "No" ? 700 : 400, color: item.response === "No" ? "#dc2626" : "inherit" }}>No</Typography>}
                                                    />
                                                </RadioGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Approvals Section */}
                        <Box sx={{ bgcolor: "#f8fafc", p: 4, borderRadius: 4, border: "1px solid #e2e8f0", mb: 4 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Reviewed By"
                                        variant="outlined"
                                        name="reviewedBy"
                                        value={formik.values.reviewedBy}
                                        onChange={formik.handleChange}
                                        error={formik.touched.reviewedBy && Boolean(formik.errors.reviewedBy)}
                                        helperText={formik.touched.reviewedBy && formik.errors.reviewedBy}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Approved By"
                                        variant="outlined"
                                        name="approvedBy"
                                        value={formik.values.approvedBy}
                                        onChange={formik.handleChange}
                                        error={formik.touched.approvedBy && Boolean(formik.errors.approvedBy)}
                                        helperText={formik.touched.approvedBy && formik.errors.approvedBy}
                                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBack />}
                                onClick={() => router.push("/line-clearance-checklist")}
                                sx={{ borderRadius: 2, textTransform: "none" }}
                            >
                                Back to List
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={formik.handleSubmit}
                                sx={{
                                    bgcolor: "#1172ba",
                                    "&:hover": { bgcolor: "#0d5a94" },
                                    borderRadius: 2,
                                    textTransform: "none",
                                    px: 4
                                }}
                            >
                                {isEditMode ? "Update Checklist" : "Save Checklist"}
                            </Button>
                        </Box>
                    </Box>
                </CommonCard>
            </Box>
        </FormikProvider>
    );
}

export default function CreateLineClearanceChecklist() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <CreateLineClearanceChecklistContent />
        </Suspense>
    );
}
