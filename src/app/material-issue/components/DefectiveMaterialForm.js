"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import ReportProblem from "@mui/icons-material/ReportProblem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";
import FormReviewDialog from "@/components/ui/FormReviewDialog";

import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";

export default function DefectiveMaterialForm({ request, onClose }) {
    const { showNotification } = useNotification();
    const [submitting, setSubmitting] = useState(false);
    const [bomMaterials, setBomMaterials] = useState([]);
    const [loadingBOM, setLoadingBOM] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const validationSchema = Yup.object().shape({
        returnDate: Yup.date().required("Return Date is required"),
        items: Yup.array().of(
            Yup.object().shape({
                itemName: Yup.string().required("Item Name is required"),
                quantity: Yup.number()
                    .typeError("Must be a number")
                    .positive("Qty must be positive")
                    .required("Quantity is required"),
                reason: Yup.string().required("Reason is required"),
                serialNumbers: Yup.string().required("Serial Numbers is required"),
                partNo: Yup.string().required("Part No is required"),
            })
        ).min(1, "At least one item is required"),
    });

    const formik = useFormik({
        initialValues: {
            returnDate: new Date().toISOString().split("T")[0],
            items: [{ itemName: "", quantity: "", reason: "", serialNumbers: "", partNo: "" }],
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Show preview instead of submitting directly
            setShowPreview(true);
        },
    });

    const handleFinalSubmit = async () => {
        try {
            setSubmitting(true);
            setShowPreview(false);
            const values = formik.values;

            const payload = values.items.map(item => ({
                rejectionId: `RET-${Math.floor(Math.random() * 10000)}`,
                sourceType: "Production Request",
                sourceRef: request?.requestNo || "N/A",
                product: request?.productName || request?.product || "N/A",
                goods: item.itemName,
                qty: Number(item.quantity),
                date: values.returnDate,
                reason: item.reason,
                serialNumbers: item.serialNumbers,
                partNo: item.partNo,
                status: "total",
                severity: "medium"
            }));

            const requests = payload.map(p => axiosInstance.post("/defective-returns", p));
            await Promise.all(requests);

            showNotification("Defective return submitted successfully!", "success");
            onClose(true);
        } catch (error) {
            console.error("Error submitting defective return:", error);
            showNotification("Failed to submit defective return.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchBOMDetails = async () => {
            try {
                setLoadingBOM(true);
                let activeBom = null;
                const bomNum = (request?.bomNumber || request?.bom || "").toString().trim();
                const prodName = (request?.productName || request?.product || "").toString().trim();

                if (request?.bomId) {
                    try {
                        const response = await axiosInstance.get(`/bom/${request.bomId}`);
                        if (response.data && response.data.materials) {
                            activeBom = response.data;
                        }
                    } catch (e) {
                        console.warn("DefectiveForm: ID fetch failed, falling back...");
                    }
                }

                if (!activeBom && (bomNum || prodName)) {
                    const response = await axiosInstance.get("/bom");
                    const allBoms = Array.isArray(response.data) ? response.data : [];

                    if (bomNum) {
                        activeBom = allBoms.find(b =>
                            (b.number && b.number.toString().trim().toLowerCase() === bomNum.toLowerCase()) ||
                            (b.id && b.id.toString().trim().toLowerCase() === bomNum.toLowerCase())
                        );
                    }

                    if (!activeBom && prodName) {
                        activeBom = allBoms.find(b =>
                            b.productName && b.productName.toString().trim().toLowerCase() === prodName.toLowerCase()
                        );
                    }
                }

                if (activeBom && Array.isArray(activeBom.materials)) {
                    setBomMaterials(activeBom.materials);
                } else {
                    setBomMaterials([]);
                }
            } catch (error) {
                console.error("DefectiveForm Error:", error);
                setBomMaterials([]);
            } finally {
                setLoadingBOM(false);
            }
        };
        fetchBOMDetails();
    }, [request]);

    const handleAddItem = () => {
        formik.setFieldValue("items", [
            ...formik.values.items,
            { itemName: "", quantity: "", reason: "", serialNumbers: "", partNo: "" }
        ]);
    };

    const handleRemoveItem = (index) => {
        if (formik.values.items.length > 1) {
            const newItems = formik.values.items.filter((_, i) => i !== index);
            formik.setFieldValue("items", newItems);
        }
    };

    const handleItemNameChange = (index, value) => {
        formik.setFieldValue(`items[${index}].itemName`, value);
        const material = bomMaterials.find(m => {
            const mName = (m.materialName || m.description || m.itemName || m.material || m.label || "").toString().trim();
            return mName === value;
        });
        if (material) {
            formik.setFieldValue(
                `items[${index}].partNo`,
                material.scanboPartNumber || material.scanboPartNo || material.partNo || material.partNumber || ""
            );
        }
    };

    // Handle Enter key navigation
    const handleKeyDown = (e, currentField, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // For returnDate field
            if (currentField === 'returnDate') {
                const firstItemField = document.querySelector(`[name="items[0].itemName"]`);
                if (firstItemField) {
                    firstItemField.focus();
                }
                return;
            }

            // For item fields - navigate within the row
            const fieldOrder = ['itemName', 'quantity', 'reason', 'serialNumbers'];
            const currentIndex = fieldOrder.indexOf(currentField);

            if (currentIndex !== -1) {
                // Try to move to next field in same row
                if (currentIndex < fieldOrder.length - 1) {
                    const nextField = fieldOrder[currentIndex + 1];
                    let nextInput = document.querySelector(`input[name="items[${rowIndex}].${nextField}"]`);
                    if (!nextInput) {
                        nextInput = document.querySelector(`[name="items[${rowIndex}].${nextField}"]`);
                    }
                    if (nextInput) {
                        nextInput.focus();
                        return;
                    }
                }

                // If at end of row, move to first field of next row
                if (currentIndex === fieldOrder.length - 1 && rowIndex < formik.values.items.length - 1) {
                    const nextRowInput = document.querySelector(`[name="items[${rowIndex + 1}].itemName"]`);
                    if (nextRowInput) {
                        nextRowInput.focus();
                    }
                }
            }
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: "#0f172a" }}>
                Defective Material
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 1, display: "block" }}>
                    Return Date <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="returnDate"
                    value={formik.values.returnDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'returnDate')}
                    error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
                    helperText={formik.touched.returnDate && formik.errors.returnDate}
                    sx={{ bgcolor: "#fff" }}
                    required
                />
            </Box>

            <Box sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                p: 2,
                mb: 4,
                position: "relative"
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#334155" }}>
                        Defective Items
                    </Typography>
                    <Button
                        size="small"
                        startIcon={<Add />}
                        onClick={handleAddItem}
                        sx={{ textTransform: "none", fontWeight: 600, border: "1px solid #e2e8f0", color: "#475569" }}
                    >
                        Add Items
                    </Button>
                </Box>

                {formik.values.items.map((item, index) => (
                    <Box key={index} sx={{ mb: index !== formik.values.items.length - 1 ? 4 : 0 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Item Name <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <FormControl
                                    fullWidth
                                    size="small"
                                    error={formik.touched.items?.[index]?.itemName && Boolean(formik.errors.items?.[index]?.itemName)}
                                >
                                    <Select
                                        name={`items[${index}].itemName`}
                                        value={item.itemName}
                                        onChange={(e) => handleItemNameChange(index, e.target.value)}
                                        onBlur={formik.handleBlur}
                                        onKeyDown={(e) => handleKeyDown(e, 'itemName', index)}
                                        displayEmpty
                                        disabled={loadingBOM}
                                        required
                                    >
                                        <MenuItem value="" disabled>
                                            {loadingBOM ? "Loading items..." : "Select Item"}
                                        </MenuItem>
                                        {bomMaterials.length === 0 && !loadingBOM && (
                                            <MenuItem disabled>No items found for this BOM</MenuItem>
                                        )}
                                        {bomMaterials.map((mat, idx) => {
                                            const name = (mat.materialName || mat.description || mat.itemName || mat.material || mat.label || "Unnamed Item").toString().trim();
                                            const pNo = (mat.scanboPartNumber || mat.scanboPartNo || mat.partNo || mat.partNumber || "").toString().trim();
                                            return (
                                                <MenuItem key={idx} value={name}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{name}</Typography>
                                                        {pNo && (
                                                            <Typography variant="caption" sx={{ color: "#1172ba", ml: 2, fontWeight: 700, bgcolor: "#ecfeff", px: 1, borderRadius: 0.5 }}>
                                                                {pNo}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    {formik.touched.items?.[index]?.itemName && formik.errors.items?.[index]?.itemName && (
                                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                            {formik.errors.items[index].itemName}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Defective Quantity <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="number"
                                    name={`items[${index}].quantity`}
                                    value={item.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onKeyDown={(e) => handleKeyDown(e, 'quantity', index)}
                                    error={formik.touched.items?.[index]?.quantity && Boolean(formik.errors.items?.[index]?.quantity)}
                                    helperText={formik.touched.items?.[index]?.quantity && formik.errors.items?.[index]?.quantity}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Reason for Defect <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name={`items[${index}].reason`}
                                    value={item.reason}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onKeyDown={(e) => handleKeyDown(e, 'reason', index)}
                                    error={formik.touched.items?.[index]?.reason && Boolean(formik.errors.items?.[index]?.reason)}
                                    helperText={formik.touched.items?.[index]?.reason && formik.errors.items?.[index]?.reason}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Serial Numbers <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Comma separated"
                                    name={`items[${index}].serialNumbers`}
                                    value={item.serialNumbers}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onKeyDown={(e) => handleKeyDown(e, 'serialNumbers', index)}
                                    error={formik.touched.items?.[index]?.serialNumbers && Boolean(formik.errors.items?.[index]?.serialNumbers)}
                                    helperText={formik.touched.items?.[index]?.serialNumbers && formik.errors.items?.[index]?.serialNumbers}
                                    required
                                />
                            </Grid>
                        </Grid>
                        {formik.values.items.length > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                <IconButton color="error" size="small" onClick={() => handleRemoveItem(index)}>
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        {index !== formik.values.items.length - 1 && <Divider sx={{ mt: 3 }} />}
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, px: 4, color: "#475569", borderColor: "#e2e8f0" }}
                >
                    cancel
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={formik.handleSubmit}
                    disabled={submitting}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 4,
                        color: "#475569",
                        borderColor: "#e2e8f0"
                    }}
                >
                    Preview Return
                </Button>
            </Box>

            {/* Preview Dialog */}
            <FormReviewDialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={handleFinalSubmit}
                title="Review Defective Material Return"
                icon={<ReportProblem />}
                headerInfo={{
                    label1: "REQUEST NO",
                    value1: request?.requestNo || "N/A",
                    label2: "RETURN DATE",
                    value2: formik.values.returnDate
                }}
                confirmLabel="Confirm & Submit"
            >
                <Grid container spacing={3}>
                    {/* Request Info */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                <ReportProblem sx={{ fontSize: 18 }} />
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Request Information</Typography>
                            </Box>
                            <Box sx={{ display: 'grid', gap: 1.5 }}>
                                <Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>PRODUCT</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{request?.productName || request?.product || "N/A"}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>REQUEST NUMBER</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{request?.requestNo || "N/A"}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>RETURN DATE</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formik.values.returnDate}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Summary */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                <ReportProblem sx={{ fontSize: 18 }} />
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Summary</Typography>
                            </Box>
                            <Box sx={{ display: 'grid', gap: 1.5 }}>
                                <Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>TOTAL ITEMS</Typography>
                                    <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>{formik.values.items.length}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>TOTAL QUANTITY</Typography>
                                    <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>
                                        {formik.values.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Defective Items Table */}
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                            <Box sx={{ p: 2, bgcolor: 'var(--bg-page)' }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)' }}>Defective Items</Typography>
                            </Box>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>#</TableCell>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>ITEM NAME</TableCell>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>PART NO</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>QUANTITY</TableCell>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>REASON</TableCell>
                                            <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>SERIAL NUMBERS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formik.values.items.map((item, idx) => (
                                            <TableRow key={idx} sx={{ '&:last-child td': { border: 0 } }}>
                                                <TableCell sx={{ py: 1.5 }}>{idx + 1}</TableCell>
                                                <TableCell sx={{ py: 1.5, fontWeight: 500 }}>{item.itemName}</TableCell>
                                                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{item.partNo}</TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{
                                                        display: 'inline-block',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        bgcolor: '#fff1f2',
                                                        color: '#e11d48',
                                                        fontWeight: 700,
                                                        fontSize: '0.75rem',
                                                        border: '1px solid #f43f5e'
                                                    }}>
                                                        {item.quantity}
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{item.reason}</TableCell>
                                                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>{item.serialNumbers}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </FormReviewDialog>
        </Box>
    );
}
