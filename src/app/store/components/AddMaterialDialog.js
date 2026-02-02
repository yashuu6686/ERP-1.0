import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";

const AddMaterialDialog = ({ open, handleClose, form, handleChange, handleSave }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Add Raw Material</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Material Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Material Code"
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            size="small"
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            size="small"
                            label="Available Quantity"
                            name="available"
                            value={form.available}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Minimum Stock Level"
                            name="minimum"
                            value={form.minimum}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Unit"
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Storage Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
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
                    onClick={handleSave}
                    sx={{
                        backgroundColor: "#1172ba",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#0d5a94" },
                    }}
                >
                    Save Material
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMaterialDialog;
