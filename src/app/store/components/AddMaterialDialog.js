import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";

const AddMaterialDialog = ({ open, handleClose, formik }) => {
    const getLabel = () => {
        const mapping = {
            "/store": "Raw Material",
            "/it-goods": "IT Item",
            "/finish-goods": "Finished Product",
            "/other-goods": "Other Good"
        };
        return mapping[formik.values.category] || "Material";
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Add {getLabel()}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            size="small"
                            required
                        >
                            <MenuItem value="/store">Raw Materials</MenuItem>
                            <MenuItem value="/it-goods">IT Items</MenuItem>
                            <MenuItem value="/finish-goods">Finished Products</MenuItem>
                            <MenuItem value="/other-goods">Other Goods</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Material Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Material Code"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                            size="small"
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            size="small"
                            label="Available Quantity"
                            name="available"
                            value={formik.values.available}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.available && Boolean(formik.errors.available)}
                            helperText={formik.touched.available && formik.errors.available}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Minimum Stock Level"
                            name="minimum"
                            value={formik.values.minimum}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.minimum && Boolean(formik.errors.minimum)}
                            helperText={formik.touched.minimum && formik.errors.minimum}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Unit"
                            name="unit"
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                            helperText={formik.touched.unit && formik.errors.unit}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Storage Location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                            required
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
                    onClick={formik.handleSubmit}
                    sx={{
                        backgroundColor: "#1172ba",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#0d5a94" },
                    }}
                >
                    Save {getLabel()}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMaterialDialog;
