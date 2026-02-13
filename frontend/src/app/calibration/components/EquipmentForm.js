"use client";
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Box,
    Typography,
    IconButton,
    Divider
} from "@mui/material";
import { Close, Construction, Save } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    equipmentName: Yup.string().required("Equipment name is required"),
    masterId: Yup.string().required("Master ID is required"),
    frequency: Yup.string().required("Calibration frequency is required"),
    location: Yup.string().required("Location is required"),
    lastCalibrationDate: Yup.date().required("Last calibration date is required"),
    calibratedBy: Yup.string().required("Required")
});

export default function EquipmentForm({ open, handleClose, initialValues = null }) {
    const formik = useFormik({
        initialValues: initialValues || {
            equipmentName: "",
            masterId: "",
            subDeviceId: "",
            frequency: "Annual",
            location: "",
            certificateNo: "",
            calibratedBy: "",
            lastCalibrationDate: new Date().toISOString().split('T')[0],
            remarks: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Submitting Equipment:", values);
            handleClose();
        }
    });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }
            }}
        >
            <DialogTitle sx={{ p: 3, bgcolor: "#f8fafc", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#1172ba", color: "white" }}>
                        <Construction />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={800}>Register New Equipment</Typography>
                        <Typography variant="caption" color="#64748b">Calibration Control System (FRM18-01)</Typography>
                    </Box>
                </Box>
                <IconButton onClick={handleClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Equipment Name"
                            name="equipmentName"
                            value={formik.values.equipmentName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.equipmentName && Boolean(formik.errors.equipmentName)}
                            helperText={formik.touched.equipmentName && formik.errors.equipmentName}
                            placeholder="e.g. Digital Multimeter"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Master Equipment ID"
                            name="masterId"
                            value={formik.values.masterId}
                            onChange={formik.handleChange}
                            error={formik.touched.masterId && Boolean(formik.errors.masterId)}
                            helperText={formik.touched.masterId && formik.errors.masterId}
                            placeholder="e.g. SCAN-DMM-001"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Sub Device / Gauge ID"
                            name="subDeviceId"
                            value={formik.values.subDeviceId}
                            onChange={formik.handleChange}
                            placeholder="Optional"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            label="Calibration Frequency"
                            name="frequency"
                            value={formik.values.frequency}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                            <MenuItem value="6 Months">6 Months</MenuItem>
                            <MenuItem value="Annual">Annual</MenuItem>
                            <MenuItem value="2 Years">2 Years</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Calibrated By"
                            name="calibratedBy"
                            value={formik.values.calibratedBy}
                            onChange={formik.handleChange}
                            placeholder="Internal or External Lab Name"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Last Calibration Date"
                            name="lastCalibrationDate"
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.lastCalibrationDate}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Certificate Number"
                            name="certificateNo"
                            value={formik.values.certificateNo}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Remarks"
                            name="remarks"
                            value={formik.values.remarks}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, px: 3 }}>
                    Cancel
                </Button>
                <Button
                    onClick={formik.handleSubmit}
                    variant="contained"
                    startIcon={<Save />}
                    sx={{ borderRadius: 2, px: 4, bgcolor: "#1172ba" }}
                >
                    Save Equipment
                </Button>
            </DialogActions>
        </Dialog>
    );
}
