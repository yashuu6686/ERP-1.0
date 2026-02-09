import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid as MuiGrid,
    TextField,
    Button,
    Box,
    Paper,
    Typography as MuiTypography,
    Divider
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Warning, History, Assignment, Person, Inventory, CheckCircle, Close } from "@mui/icons-material";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import { useState } from "react";

const validationSchema = Yup.object().shape({
    rejectionId: Yup.string().required("Rejection ID is required"),
    sourceType: Yup.string().required("Source Type is required"),
    sourceReference: Yup.string().required("Source Reference is required"),
    date: Yup.date().required("Date is required"),
    rejectedGoods: Yup.string()
        .required("Rejected Goods is required"),
    rejectedQty: Yup.number()
        .required("Quantity is required")
        .positive("Quantity must be positive")
        .integer("Quantity must be an integer"),
    reason: Yup.string().required("Reason is required"),
    rejectedBy: Yup.string()
        .required("Rejected By is required"),
});

export default function AddRejectedGoodsDialog({
    open,
    onClose,
    form,
    onSubmit,
    mode = "add", // 'add' | 'edit' | 'view'
}) {
    const isView = mode === "view";
    const [showPreview, setShowPreview] = useState(false);

    const formik = useFormik({
        initialValues: {
            rejectionId: form.rejectionId || "",
            sourceType: form.sourceType || "GRN",
            sourceReference: form.sourceReference || "",
            date: form.date || "",
            rejectedGoods: form.rejectedGoods || "",
            rejectedQty: form.rejectedQty || "",
            reason: form.reason || "",
            rejectedBy: form.rejectedBy || "",
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            setShowPreview(true);
        },
    });

    const handleFinalSubmit = () => {
        onSubmit(formik.values);
        setShowPreview(false);
    };

    const getTitle = () => {
        if (mode === "add") return "Add Rejected Items";
        if (mode === "edit") return "Edit Rejected Item";
        return "View Rejected Item";
    };

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleCharacterOnlyChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const formElement = e.currentTarget;
            const selector = 'input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])';
            const focusableElements = Array.from(formElement.querySelectorAll(selector))
                .filter(el => {
                    const style = window.getComputedStyle(el);
                    return style.display !== 'none' && style.visibility !== 'hidden' && el.tabIndex !== -1;
                });

            const index = focusableElements.indexOf(e.target);
            if (index > -1) {
                if (index < focusableElements.length - 1) {
                    const nextElement = focusableElements[index + 1];
                    if (nextElement.innerText === "Cancel" || nextElement.innerText === "Close") {
                        if (index + 2 < focusableElements.length) {
                            e.preventDefault();
                            focusableElements[index + 2].focus();
                            return;
                        }
                    }
                    e.preventDefault();
                    nextElement.focus();
                } else {
                    e.preventDefault();
                    formik.handleSubmit();
                }
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth onKeyDown={handleKeyDown}>
            <DialogTitle sx={{
                fontWeight: 700,
                bgcolor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: '#1e293b'
            }}>
                <Warning sx={{ color: '#1172ba' }} />
                {getTitle()}
            </DialogTitle>
            <DialogContent dividers sx={{ bgcolor: '#f1f5f9', py: 3 }}>
                <MuiGrid container spacing={2}>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejection ID"
                            name="rejectionId"
                            value={formik.values.rejectionId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rejectionId && Boolean(formik.errors.rejectionId)}
                            helperText={formik.touched.rejectionId && formik.errors.rejectionId}
                            size="small"
                            disabled={isView || mode === "edit"}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Source Type"
                            name="sourceType"
                            value={formik.values.sourceType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sourceType && Boolean(formik.errors.sourceType)}
                            helperText={formik.touched.sourceType && formik.errors.sourceType}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Source Reference"
                            name="sourceReference"
                            value={formik.values.sourceReference}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sourceReference && Boolean(formik.errors.sourceReference)}
                            helperText={formik.touched.sourceReference && formik.errors.sourceReference}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            name="date"
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejected Goods"
                            name="rejectedGoods"
                            value={formik.values.rejectedGoods}
                            onChange={handleCharacterOnlyChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rejectedGoods && Boolean(formik.errors.rejectedGoods)}
                            helperText={formik.touched.rejectedGoods && formik.errors.rejectedGoods}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Rejected Quantity"
                            name="rejectedQty"
                            value={formik.values.rejectedQty}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rejectedQty && Boolean(formik.errors.rejectedQty)}
                            helperText={formik.touched.rejectedQty && formik.errors.rejectedQty}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejection Reason"
                            name="reason"
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.reason && Boolean(formik.errors.reason)}
                            helperText={formik.touched.reason && formik.errors.reason}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                    <MuiGrid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejected By"
                            name="rejectedBy"
                            value={formik.values.rejectedBy}
                            onChange={handleCharacterOnlyChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rejectedBy && Boolean(formik.errors.rejectedBy)}
                            helperText={formik.touched.rejectedBy && formik.errors.rejectedBy}
                            size="small"
                            disabled={isView}
                            sx={{ borderRadius: 1 }}
                        />
                    </MuiGrid>
                </MuiGrid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <Button onClick={handleClose} sx={{ textTransform: "none", fontWeight: 600, color: '#64748b' }}>
                    {isView ? "Close" : "Cancel"}
                </Button>
                {!isView && (
                    <Button
                        variant="contained"
                        onClick={formik.handleSubmit}
                        sx={{
                            backgroundColor: "#1172ba",
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            py: 1,
                            "&:hover": { backgroundColor: "#0d5a94" },
                        }}
                    >
                        {mode === "edit" ? "Update Item" : "Submit Rejection"}
                    </Button>
                )}
            </DialogActions>

            <FormReviewDialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={handleFinalSubmit}
                title="Review Rejection Details"
                icon={<Warning />}
                headerInfo={{
                    label1: "REJECTION ID",
                    value1: formik.values.rejectionId || "N/A",
                    label2: "DATE",
                    value2: formik.values.date || "N/A"
                }}
                confirmLabel={mode === "edit" ? "Confirm Update" : "Confirm Rejection"}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 0.5 }}>
                    <MuiGrid container spacing={2.5}>
                        {/* 1. Source Context */}
                        <MuiGrid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <History sx={{ color: 'var(--brand-primary)', fontSize: 18 }} />
                                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Source Reference
                                </MuiTypography>
                            </Box>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                                <MuiGrid container spacing={2}>
                                    <MuiGrid item xs={6}>
                                        <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Source Type</MuiTypography>
                                        <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{formik.values.sourceType}</MuiTypography>
                                    </MuiGrid>
                                    <MuiGrid item xs={6}>
                                        <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Reference #</MuiTypography>
                                        <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1172ba' }}>{formik.values.sourceReference}</MuiTypography>
                                    </MuiGrid>
                                </MuiGrid>
                            </Paper>
                        </MuiGrid>

                        {/* 2. Goods Information */}
                        <MuiGrid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <Inventory sx={{ color: 'var(--brand-primary)', fontSize: 18 }} />
                                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Rejected Goods Info
                                </MuiTypography>
                            </Box>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                                <MuiGrid container spacing={2}>
                                    <MuiGrid item xs={8}>
                                        <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Item/Goods Name</MuiTypography>
                                        <MuiTypography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{formik.values.rejectedGoods}</MuiTypography>
                                    </MuiGrid>
                                    <MuiGrid item xs={4}>
                                        <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Qty</MuiTypography>
                                        <MuiTypography variant="h6" sx={{ fontWeight: 800, color: '#dc2626' }}>{formik.values.rejectedQty}</MuiTypography>
                                    </MuiGrid>
                                    <MuiGrid item xs={12}>
                                        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
                                    </MuiGrid>
                                    <MuiGrid item xs={12}>
                                        <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Reason for Rejection</MuiTypography>
                                        <MuiTypography variant="body2" sx={{ fontWeight: 500, color: '#475569', fontStyle: 'italic' }}>
                                            "{formik.values.reason}"
                                        </MuiTypography>
                                    </MuiGrid>
                                </MuiGrid>
                            </Paper>
                        </MuiGrid>

                        {/* 3. Personnel */}
                        <MuiGrid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <Person sx={{ color: 'var(--brand-primary)', fontSize: 18 }} />
                                <MuiTypography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Authorized Information
                                </MuiTypography>
                            </Box>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                                <MuiTypography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>Rejected By</MuiTypography>
                                <MuiTypography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{formik.values.rejectedBy}</MuiTypography>
                            </Paper>
                        </MuiGrid>
                    </MuiGrid>
                </Box>
            </FormReviewDialog>
        </Dialog>
    );
}

