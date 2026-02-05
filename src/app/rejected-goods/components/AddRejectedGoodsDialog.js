import React, { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    rejectionId: Yup.string().required("Rejection ID is required"),
    sourceType: Yup.string().required("Source Type is required"),
    sourceReference: Yup.string().required("Source Reference is required"),
    date: Yup.date().required("Date is required"),
    rejectedGoods: Yup.string()
        .required("Rejected Goods is required")
        .matches(/^[a-zA-Z\s]+$/, "Rejected Goods must only contain characters"),
    rejectedQty: Yup.number()
        .required("Quantity is required")
        .positive("Quantity must be positive")
        .integer("Quantity must be an integer"),
    reason: Yup.string().required("Reason is required"),
    rejectedBy: Yup.string()
        .required("Rejected By is required")
        .matches(/^[a-zA-Z\s]+$/, "Rejected By must only contain characters"),
});

export default function AddRejectedGoodsDialog({
    open,
    onClose,
    form,
    onSubmit,
    mode = "add", // 'add' | 'edit' | 'view'
}) {
    const isView = mode === "view";

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
            onSubmit(values);
        },
    });

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
        const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
        formik.setFieldValue(name, filteredValue);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>{getTitle()}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
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
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} sx={{ textTransform: "none" }}>
                    {isView ? "Close" : "Cancel"}
                </Button>
                {!isView && (
                    <Button
                        variant="contained"
                        onClick={formik.handleSubmit}
                        sx={{
                            backgroundColor: "#1172ba",
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#0d5a94" },
                        }}
                    >
                        {mode === "edit" ? "Update Item" : "Submit Rejection"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

