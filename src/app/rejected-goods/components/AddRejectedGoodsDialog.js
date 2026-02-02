import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button,
} from "@mui/material";

export default function AddRejectedGoodsDialog({
    open,
    onClose,
    form,
    onChange,
    onSubmit,
    mode = "add", // 'add' | 'edit' | 'view'
}) {
    const isView = mode === "view";

    const getTitle = () => {
        if (mode === "add") return "Add Rejected Items";
        if (mode === "edit") return "Edit Rejected Item";
        return "View Rejected Item";
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>{getTitle()}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejection ID"
                            name="rejectionId"
                            value={form.rejectionId}
                            onChange={onChange}
                            size="small"
                            disabled={isView || mode === "edit"} // ID usually fixed
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Source Type"
                            name="sourceType"
                            value={form.sourceType}
                            onChange={onChange}
                            size="small"
                            disabled={isView}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Source Reference"
                            name="sourceReference"
                            value={form.sourceReference}
                            onChange={onChange}
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
                            value={form.date}
                            onChange={onChange}
                            size="small"
                            disabled={isView}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejected Goods"
                            name="rejectedGoods"
                            value={form.rejectedGoods}
                            onChange={onChange}
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
                            value={form.rejectedQty}
                            onChange={onChange}
                            size="small"
                            disabled={isView}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejection Reason"
                            name="reason"
                            value={form.reason}
                            onChange={onChange}
                            size="small"
                            disabled={isView}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejected By"
                            name="rejectedBy"
                            value={form.rejectedBy}
                            onChange={onChange}
                            size="small"
                            disabled={isView}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} sx={{ textTransform: "none" }}>
                    {isView ? "Close" : "Cancel"}
                </Button>
                {!isView && (
                    <Button
                        variant="contained"
                        onClick={onSubmit}
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
