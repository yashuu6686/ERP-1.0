"use client";
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import { useNotification } from "@/context/NotificationContext";
import {
    Box,
    Button,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Card,
    CardContent
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import CommonCard from "@/components/ui/CommonCard";
import Loader from "@/components/ui/Loader";
import CalibrationPreviewDialog from "./components/CalibrationPreviewDialog";
import {
    PrecisionManufacturing,
    LocationOn,
    VerifiedUser
} from "@mui/icons-material";

// Gradient Card Component (matching GRN style)
const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 'none', border: "1px solid #e2e8f0" }}>
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

const validationSchema = Yup.object().shape({
    equipmentName: Yup.string().required("Equipment name is required"),
    masterId: Yup.string().required("Master ID is required"),
    frequency: Yup.string().required("Calibration frequency is required"),
    location: Yup.string().required("Location is required"),
    lastCalibrationDate: Yup.date().required("Last calibration date is required"),
    calibratedBy: Yup.string().required("Calibrated by is required")
});

const inputStyle = {
    "& .MuiOutlinedInput-root": {
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        bgcolor: "white"
    }
};

function RegisterEquipmentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const { showNotification } = useNotification();

    const formik = useFormik({
        initialValues: {
            equipmentName: "",
            masterId: "",
            subDeviceId: "",
            serialNumber: "",
            manufacturer: "",
            model: "",
            frequency: "Annual",
            location: "",
            department: "",
            certificateNo: "",
            calibratedBy: "",
            calibrationSource: "",
            lastCalibrationDate: new Date().toISOString().split('T')[0],
            nextDueDate: "",
            remarks: "",
            status: "Calibrated"
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                // Calculate next due date based on frequency
                const lastDate = new Date(values.lastCalibrationDate);
                let nextDate = new Date(lastDate);

                switch (values.frequency) {
                    case "Monthly":
                        nextDate.setMonth(nextDate.getMonth() + 1);
                        break;
                    case "Quarterly":
                        nextDate.setMonth(nextDate.getMonth() + 3);
                        break;
                    case "6 Months":
                        nextDate.setMonth(nextDate.getMonth() + 6);
                        break;
                    case "Annual":
                        nextDate.setFullYear(nextDate.getFullYear() + 1);
                        break;
                    case "2 Years":
                        nextDate.setFullYear(nextDate.getFullYear() + 2);
                        break;
                }

                const finalData = {
                    ...values,
                    nextDueDate: nextDate.toISOString().split('T')[0]
                };

                console.log("Registering Equipment:", finalData);

                if (id) {
                    await axiosInstance.put(`/calibration-equipment/${id}`, finalData);
                    showNotification("Equipment Updated Successfully!", "success");
                } else {
                    await axiosInstance.post("/calibration-equipment", finalData);
                    showNotification("Equipment Registered Successfully!", "success");
                }

                router.push("/calibration");
            } catch (error) {
                console.error("Registration Error:", error);
                showNotification("Error registering equipment. Please try again.", "error");
            } finally {
                setLoading(false);
            }
        }
    });



    useEffect(() => {
        const fetchEquipmentDetails = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/calibration-equipment/${id}`);
                    const equipment = response.data;

                    if (equipment) {
                        formik.setValues({
                            equipmentName: equipment.equipmentName || "",
                            masterId: equipment.masterId || "",
                            subDeviceId: equipment.subDeviceId || "",
                            serialNumber: equipment.serialNumber || "",
                            manufacturer: equipment.manufacturer || "",
                            model: equipment.model || "",
                            frequency: equipment.frequency || "Annual",
                            location: equipment.location || "",
                            department: equipment.department || "",
                            certificateNo: equipment.certificateNo || "",
                            calibratedBy: equipment.calibratedBy || "",
                            calibrationSource: equipment.calibrationSource || "",
                            lastCalibrationDate: equipment.lastCalibrationDate || new Date().toISOString().split('T')[0],
                            nextDueDate: equipment.nextDueDate || "",
                            remarks: equipment.remarks || "",
                            status: equipment.status || "Calibrated",
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch equipment details:", error);
                    showNotification("Failed to load equipment details.", "error");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEquipmentDetails();
    }, [id]);

    if (loading) return <Loader fullPage message={id ? "Updating Equipment..." : "Registering Equipment..."} />;

    const handlePreview = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setShowPreview(true);
        } else {
            // Mark all fields as touched to show errors
            const touched = {};
            Object.keys(errors).forEach(field => {
                touched[field] = true;
            });
            formik.setTouched(touched);
            showNotification("Please fill all required fields correctly.", "error");
        }
    };

    const handleConfirm = () => {
        setShowPreview(false);
        formik.handleSubmit();
    };

    return (
        <FormikProvider value={formik}>
            <Box>
                <CommonCard title={id ? "Update Equipment" : "Register New Equipment"}>
                    <Box sx={{ p: 1 }}>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {/* Equipment Identification */}
                            <Grid size={{ xs: 12 }}>
                                <GradientCard title="Equipment Identification" icon={PrecisionManufacturing}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 4 }}>
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
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Master Equipment ID"
                                                name="masterId"
                                                value={formik.values.masterId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.masterId && Boolean(formik.errors.masterId)}
                                                helperText={formik.touched.masterId && formik.errors.masterId}
                                                placeholder="e.g. SCAN-DMM-001"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Manufacturer"
                                                name="manufacturer"
                                                value={formik.values.manufacturer}
                                                onChange={formik.handleChange}
                                                placeholder="e.g. Fluke"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Sub Device / Gauge ID"
                                                name="subDeviceId"
                                                value={formik.values.subDeviceId}
                                                onChange={formik.handleChange}
                                                placeholder="Optional"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Serial Number"
                                                name="serialNumber"
                                                value={formik.values.serialNumber}
                                                onChange={formik.handleChange}
                                                placeholder="Equipment S/N"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Calibration Frequency"
                                                name="frequency"
                                                value={formik.values.frequency}
                                                onChange={formik.handleChange}
                                                size="small"
                                                sx={inputStyle}
                                            >
                                                <MenuItem value="Monthly">Monthly</MenuItem>
                                                <MenuItem value="Quarterly">Quarterly</MenuItem>
                                                <MenuItem value="6 Months">6 Months</MenuItem>
                                                <MenuItem value="Annual">Annual</MenuItem>
                                                <MenuItem value="2 Years">2 Years</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Model"
                                                name="model"
                                                value={formik.values.model}
                                                onChange={formik.handleChange}
                                                placeholder="Model number"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Location"
                                                name="location"
                                                value={formik.values.location}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.location && Boolean(formik.errors.location)}
                                                helperText={formik.touched.location && formik.errors.location}
                                                placeholder="e.g. Production Lab"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Department"
                                                name="department"
                                                value={formik.values.department}
                                                onChange={formik.handleChange}
                                                placeholder="e.g. Quality Control"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                    </Grid>
                                </GradientCard>
                            </Grid>


                            {/* Calibration Details */}
                            <Grid size={{ xs: 12 }}>
                                <GradientCard title="Calibration Details" icon={VerifiedUser}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 6 }}>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                label="Last Calibration Date"
                                                name="lastCalibrationDate"
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.lastCalibrationDate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastCalibrationDate && Boolean(formik.errors.lastCalibrationDate)}
                                                helperText={formik.touched.lastCalibrationDate && formik.errors.lastCalibrationDate}
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Calibrated By"
                                                name="calibratedBy"
                                                value={formik.values.calibratedBy}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.calibratedBy && Boolean(formik.errors.calibratedBy)}
                                                helperText={formik.touched.calibratedBy && formik.errors.calibratedBy}
                                                placeholder="Internal or External Lab"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Calibration Source/Standard"
                                                name="calibrationSource"
                                                value={formik.values.calibrationSource}
                                                onChange={formik.handleChange}
                                                placeholder="e.g. NABL Certified Lab"
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Certificate Number"
                                                name="certificateNo"
                                                value={formik.values.certificateNo}
                                                onChange={formik.handleChange}
                                                placeholder="Calibration certificate no."
                                                size="small"
                                                sx={inputStyle}
                                            />
                                        </Grid>
                                    </Grid>
                                </GradientCard>
                            </Grid>

                            {/* Remarks */}
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Remarks"
                                    name="remarks"
                                    value={formik.values.remarks}
                                    onChange={formik.handleChange}
                                    placeholder="Additional notes or observations"
                                    size="small"
                                    sx={inputStyle}
                                />
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "end", alignItems: "end" }}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/calibration")}
                                sx={{ borderRadius: 2, px: 4, textTransform: "none" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={handlePreview}
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
                                {id ? "Update Equipment" : "Register Equipment"}
                            </Button>
                        </Box>
                    </Box>
                </CommonCard>

                <CalibrationPreviewDialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    onConfirm={handleConfirm}
                    data={formik.values}
                    isEditMode={!!id}
                />
            </Box>
        </FormikProvider>
    );
}

export default function RegisterEquipment() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <RegisterEquipmentContent />
        </Suspense>
    );
}
