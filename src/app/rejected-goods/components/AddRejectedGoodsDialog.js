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
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 700 }}>Add Rejected Items</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejection ID"
                            name="rejectionId"
                            value={form.rejectionId}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Source Type"
                            name="sourceType"
                            value={form.sourceType}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Source Reference"
                            name="sourceReference"
                            value={form.sourceReference}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            name="date"
                            InputLabelProps={{ shrink: true }}
                            value={form.date}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejected Goods"
                            name="rejectedGoods"
                            value={form.rejectedGoods}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Rejected Quantity"
                            name="rejectedQty"
                            value={form.rejectedQty}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejection Reason"
                            name="reason"
                            value={form.reason}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Rejected By"
                            name="rejectedBy"
                            value={form.rejectedBy}
                            onChange={onChange}
                            size="small"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} sx={{ textTransform: "none" }}>
                    Cancel
                </Button>
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
                    Submit Rejection
                </Button>
            </DialogActions>
        </Dialog>
    );
}
