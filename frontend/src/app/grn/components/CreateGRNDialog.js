import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Save from "@mui/icons-material/Save";

const CreateGRNDialog = ({ open, handleClose, form, handleChange, handleSubmit }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Create GRN</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="GRN Number"
                            name="grnNumber"
                            value={form.grnNumber}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="PO Number"
                            name="poNumber"
                            value={form.poNumber}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Invoice Number"
                            name="invoiceNumber"
                            value={form.invoiceNumber}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Received Date"
                            name="receivedDate"
                            value={form.receivedDate}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Item Name"
                            name="itemName"
                            value={form.itemName}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Received Quantity"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Received By"
                            name="receivedBy"
                            value={form.receivedBy}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Supplier Name"
                            name="supplierName"
                            value={form.supplierName}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} sx={{ textTransform: "none" }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: "#1172ba",
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#0d5a94" },
                    }}
                >
                    Save GRN
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateGRNDialog;
