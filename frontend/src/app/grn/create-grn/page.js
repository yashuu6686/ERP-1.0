"use client";

export const dynamic = "force-dynamic";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Save from "@mui/icons-material/Save";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Description from "@mui/icons-material/Description";
import Inventory from "@mui/icons-material/Inventory";
import ReceiptLong from "@mui/icons-material/ReceiptLong";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import CommonCard from "../../../components/ui/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/ui/Loader";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import { useNotification } from "@/context/NotificationContext";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

// Helper component for the internal gradient cards
const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2 }}>
        <Box
            sx={{
                p: 2,
                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
            }}
        >
            {Icon && <Icon />}
            <Typography variant="h6" fontWeight={600} color={"white"}>
                {title}
            </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
            {children}
        </CardContent>
    </Card>
);

// Validation Schema
const validationSchema = Yup.object().shape({
    grnNumber: Yup.string().required("Required"),
    poNumber: Yup.string().required("Required"),
    invoiceNumber: Yup.string().required("Required"),
    receivedDate: Yup.date().required("Required"),
    receivedBy: Yup.string().required("Required"),
    supplierName: Yup.string().required("Required"),
    items: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Required"),
            receivedQty: Yup.number().positive("Must be > 0").required("Required"),
        })
    ).min(1, "At least one item required"),
});

function CreateGRNContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [pendingPOs, setPendingPOs] = useState([]);
    const [selectedPO, setSelectedPO] = useState(null);
    const { showNotification } = useNotification();

    const formik = useFormik({
        initialValues: {
            grnNumber: `GRN/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            poNumber: "",
            invoiceNumber: "",
            receivedDate: new Date().toISOString().split("T")[0],
            receivedBy: "",
            supplierName: "",
            items: [],
            inspectionStatus: "Pending",
        },
        validationSchema,
        onSubmit: async () => {
            setShowPreview(true);
        },
    });

    const handleFinalSubmit = async () => {
        const values = formik.values;
        try {
            setLoading(true);
            setShowPreview(false);
            const response = isEditMode
                ? await axiosInstance.put(`/grn/${id}`, values)
                : await axiosInstance.post("/grn", values);

            if (response.status === 201 || response.status === 200) {
                if (selectedPO) {
                    try {
                        await axiosInstance.put(`/purachase/${selectedPO.id}`, {
                            ...selectedPO,
                            status: "Completed",
                        });
                    } catch (poError) {
                        console.error("Failed to update PO status:", poError);
                    }
                }
                showNotification(`GRN ${isEditMode ? "Updated" : "Created"} Successfully!`, "success");
                router.push("/grn");
            }
        } catch (error) {
            console.error("Save GRN Error:", error);
            showNotification("Failed to save GRN.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchGRNDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/grn/${id}`);
                formik.setValues(response.data);
            } catch (error) {
                console.error("Fetch GRN Error:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPendingPOs = async () => {
            try {
                const response = await axiosInstance.get("/purachase");
                const pending = (response.data || []).filter(po => po.status === "Pending");
                setPendingPOs(pending);
            } catch (error) {
                console.error("Error fetching POs:", error);
            }
        };

        fetchPendingPOs();
        if (isEditMode) {
            fetchGRNDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isEditMode]);

    const handlePOChange = (event, newValue) => {
        setSelectedPO(newValue);
        if (newValue) {
            formik.setFieldValue("poNumber", newValue.orderInfo?.orderNumber || "");
            formik.setFieldValue("supplierName", newValue.supplier?.companyName || "");
            formik.setFieldValue("items", (newValue.items || []).map(item => ({
                ...item,
                orderedQty: item.qty,
                receivedQty: item.qty,
                remark: "",
            })));
        } else {
            formik.setFieldValue("poNumber", "");
            formik.setFieldValue("supplierName", "");
            formik.setFieldValue("items", []);
        }
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...formik.values.items];
        updatedItems[index][field] = value;
        formik.setFieldValue("items", updatedItems);
    };

    if (loading) return <Loader fullPage message="Processing GRN..." />;

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
            bgcolor: "white"
        }
    };

    return (
        <FormikProvider value={formik}>
            <Box>
                <CommonCard title={isEditMode ? "Edit Goods Receipt Note (GRN)" : "Create Goods Receipt Note (GRN)"}>
                    <Box sx={{ p: 1 }}>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {/* GRN Details */}
                            <Grid item xs={12} md={8} size={{ xs: 12, md: 12 }}>
                                <GradientCard title="GRN Information" icon={ReceiptLong}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="GRN Number"
                                                name="grnNumber"
                                                value={formik.values.grnNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.grnNumber && Boolean(formik.errors.grnNumber)}
                                                helperText={formik.touched.grnNumber && formik.errors.grnNumber}
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} size={{ xs: 12, md: 4 }}>
                                            <Autocomplete
                                                options={pendingPOs}
                                                getOptionLabel={(option) => option.orderInfo?.orderNumber || ""}
                                                value={pendingPOs.find(po => po.orderInfo?.orderNumber === formik.values.poNumber) || null}
                                                onChange={handlePOChange}
                                                sx={{ cursor: "pointer" }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Select PO Number"
                                                        placeholder="Search Pending POs..."
                                                        size="small"
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.poNumber && Boolean(formik.errors.poNumber)}
                                                        helperText={formik.touched.poNumber && formik.errors.poNumber}
                                                        sx={inputStyle}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Invoice Number"
                                                name="invoiceNumber"
                                                value={formik.values.invoiceNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                                                helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                label="Received Date"
                                                name="receivedDate"
                                                value={formik.values.receivedDate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.receivedDate && Boolean(formik.errors.receivedDate)}
                                                helperText={formik.touched.receivedDate && formik.errors.receivedDate}
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid item xs={12} size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Supplier Name"
                                                name="supplierName"
                                                value={formik.values.supplierName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.supplierName && Boolean(formik.errors.supplierName)}
                                                helperText={formik.touched.supplierName && formik.errors.supplierName}
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid item xs={12} size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Received By"
                                                name="receivedBy"
                                                value={formik.values.receivedBy}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.receivedBy && Boolean(formik.errors.receivedBy)}
                                                helperText={formik.touched.receivedBy && formik.errors.receivedBy}
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                    </Grid>
                                </GradientCard>
                            </Grid>

                            {/* Supplier & Receiver Info */}
                            {/* <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                            <GradientCard title="Parties Involved" icon={Description}>
                                <Grid container spacing={2}>
                                   
                                </Grid>
                            </GradientCard>
                        </Grid> */}
                        </Grid>

                        {/* Items Table */}
                        <Box sx={{ mb: 4 }}>
                            <GradientCard title="Materials Received" icon={Inventory}>
                                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}>
                                    <Table>
                                        <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Item Name</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Ordered Qty</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Received Qty</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Unit</TableCell>
                                                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Remark</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formik.values.items.length > 0 ? (
                                                formik.values.items.map((item, index) => (
                                                    <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                        <TableCell sx={{ fontWeight: 600, color: "#0f172a" }}>{item.name}</TableCell>
                                                        <TableCell align="center">{item.orderedQty}</TableCell>
                                                        <TableCell align="center">
                                                            <TextField
                                                                size="small"
                                                                type="number"
                                                                name={`items.${index}.receivedQty`}
                                                                value={item.receivedQty}
                                                                onChange={(e) => handleItemChange(index, "receivedQty", e.target.value)}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.touched.items?.[index]?.receivedQty && Boolean(formik.errors.items?.[index]?.receivedQty)}
                                                                helperText={formik.touched.items?.[index]?.receivedQty && formik.errors.items?.[index]?.receivedQty}
                                                                sx={{ width: 100, ...inputStyle }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">{item.unit || "Nos"}</TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                name={`items.${index}.remark`}
                                                                value={item.remark}
                                                                onChange={(e) => handleItemChange(index, "remark", e.target.value)}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Add note..."
                                                                sx={inputStyle}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                                        <Typography color="textSecondary">No items found. Please select a PO or add items manually.</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </GradientCard>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "end", alignItems: "end" }}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/grn")}
                                sx={{ borderRadius: 2, px: 4, textTransform: "none" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={formik.handleSubmit}
                                sx={{
                                    backgroundColor: "#1172ba",
                                    "&:hover": { backgroundColor: "#0d5a94" },
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: "none",
                                    fontWeight: 500,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)"
                                }}
                            >
                                {isEditMode ? "Update GRN" : "Save GRN"}
                            </Button>
                        </Box>
                    </Box>
                </CommonCard>

                <FormReviewDialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    onConfirm={handleFinalSubmit}
                    title="Review Goods Receipt Note"
                    icon={<ReceiptLong />}
                    headerInfo={{
                        label1: "GRN NUMBER",
                        value1: `#${formik.values.grnNumber}`,
                        label2: "RECEIVED DATE",
                        value2: formik.values.receivedDate
                    }}
                    confirmLabel={isEditMode ? "Update GRN" : "Confirm & Save GRN"}
                >
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                    <Description sx={{ fontSize: 18 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source Information</Typography>
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>INV: {formik.values.invoiceNumber}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>PO Reference: <b style={{ color: 'var(--text-primary)' }}>{formik.values.poNumber}</b></Typography>
                                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Supplier: {formik.values.supplierName}</Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                    <AssignmentTurnedIn sx={{ fontSize: 18 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Receiving Details</Typography>
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)', fontFamily: 'var(--font-manrope)' }}>Received By: {formik.values.receivedBy}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Date: {formik.values.receivedDate}</Typography>
                                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Inspection: <b style={{ color: '#a16207' }}>{formik.values.inspectionStatus}</b></Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>MATERIAL DESCRIPTION</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>ORD. QTY</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>REC. QTY</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>UNIT</TableCell>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>REMARK</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formik.values.items.map((item, index) => (
                                            <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                                                <TableCell sx={{ py: 2, fontWeight: 500 }}>{item.name}</TableCell>
                                                <TableCell align="center">{item.orderedQty}</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{item.receivedQty}</TableCell>
                                                <TableCell align="right">{item.unit || "Nos"}</TableCell>
                                                <TableCell sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{item.remark || "-"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </FormReviewDialog>
            </Box>
        </FormikProvider>
    );
}

export default function CreateGRN() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <CreateGRNContent />
        </Suspense>
    );
}
