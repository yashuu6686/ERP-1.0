"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
    Divider,
} from "@mui/material";
import { Visibility, Edit, Assignment, Close, Save, Thermostat } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import CommonCard from "@/components/ui/CommonCard";
import GlobalTable from "@/components/ui/GlobalTable";
import Loader from "@/components/ui/Loader";
import NotificationService from "@/services/NotificationService";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/axios/axiosInstance";

const LOCATIONS = [
    "Finish Goods Store (FGS)",
    "Raw Material Store",
    "Assemble",
    "QA",
    "Packing",
];

const validationSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    location: Yup.string().required("Location is required"),
    temperature: Yup.number()
        .typeError("Must be a number")
        .required("Required")
        .min(-50, "Value too low")
        .max(100, "Value too high"),
    humidity: Yup.number()
        .typeError("Must be a number")
        .required("Required")
        .min(0, "Cannot be less than 0")
        .max(100, "Cannot exceed 100"),
    checkedBy: Yup.string().required("Required"),
    verifiedBy: Yup.string().required("Verified By is required"),
    status: Yup.string().required("Required"),
});

export default function MonitoringLogPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    const fetchLogs = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/environmental-monitoring-logs");
            setLogs(response.data || []);
        } catch (error) {
            console.error("[Environment] Failed to fetch logs:", error);
            NotificationService.notify("Error", "Failed to load monitoring logs", "error");
            setLogs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const formik = useFormik({
        initialValues: {
            date: new Date().toISOString().split("T")[0],
            time: new Date().toTimeString().split(" ")[0].slice(0, 5), // HH:mm format
            location: "",
            temperature: "",
            humidity: "",
            checkedBy: user?.name || "",
            verifiedBy: "",
            status: "Pending",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setSubmitting(true);
            setDialogOpen(false); // Close dialog immediately on click
            try {
                if (selectedLog) {
                    // Update existing log
                    const response = await axiosInstance.put(`/environmental-monitoring-logs/${selectedLog.id}`, {
                        ...values,
                        updatedAt: new Date().toISOString()
                    });

                    if (response.data) {
                        setLogs(prev => prev.map(log => log.id === selectedLog.id ? response.data : log));
                        NotificationService.notify("Success", "Environment reading updated", "success");
                    }
                } else {
                    // Create new log
                    const response = await axiosInstance.post("/environmental-monitoring-logs", {
                        ...values,
                        createdAt: new Date().toISOString()
                    });

                    if (response.data) {
                        setLogs(prev => [response.data, ...prev]);
                        NotificationService.notify("Success", "Environment reading recorded", "success");
                    }
                }
                resetForm();
                setSelectedLog(null);
            } catch (error) {
                console.error("[Environment] Save Error:", error);
                NotificationService.notify("Error", `Failed to ${selectedLog ? 'update' : 'record'} reading`, "error");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleEdit = (log) => {
        setSelectedLog(log);
        formik.setValues({
            date: log.date,
            time: log.time,
            location: log.location,
            temperature: log.temperature,
            humidity: log.humidity,
            checkedBy: log.checkedBy,
            verifiedBy: log.verifiedBy,
            status: log.status,
        });
        setDialogOpen(true);
    };

    const columns = useMemo(() => [
        {
            label: "Sr.No.",
            align: "center",
            render: (row, index) => (
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                    {index + 1}
                </Typography>
            ),
        },
        {
            label: "Date",
            align: "center",
            render: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {new Date(row.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
                </Typography>
            ),
        },
        { label: "Time", align: "center", accessor: "time" },
        { label: "Location", align: "center", accessor: "location" },
        { label: "Temp (°C)", align: "center", render: (row) => `${row.temperature}°C` },
        { label: "Humidity (%)", align: "center", render: (row) => `${row.humidity}%` },
        { label: "Checked By", align: "center", accessor: "checkedBy" },
        { label: "Verified By", align: "center", accessor: "verifiedBy" },
        {
            label: "Status",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.status}
                    size="small"
                    sx={{
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        borderRadius: 1.5,
                        bgcolor: row.status === "Verified" ? "#dcfce7" : "#fef9c3",
                        color: row.status === "Verified" ? "#15803d" : "#a16207",
                    }}
                />
            ),
        },
        {
            label: "Actions",
            align: "center",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                    <IconButton
                        size="small"
                        sx={{ color: "var(--brand-primary)", bgcolor: "#f1f5f9" }}
                        onClick={() => handleEdit(row)}
                    >
                        <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            ),
        },
    ], []);

    return (
        <Box>
            <CommonCard
                title="Environmental Monitoring Logs"
                icon={<Assignment sx={{ mr: 1, color: "var(--brand-primary)" }} />}
                addText="Record New Reading"
                onAdd={() => {
                    setSelectedLog(null);
                    formik.resetForm();
                    setDialogOpen(true);
                }}
            >
                {loading ? (
                    <Loader message="Loading logs..." />
                ) : (
                    <GlobalTable
                        columns={columns}
                        data={logs}
                        totalCount={logs.length}
                        page={0}
                        rowsPerPage={10}
                        onPageChange={() => { }}
                        onRowsPerPageChange={() => { }}
                    />
                )}
            </CommonCard>

            {/* Record Reading Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => !submitting && setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Thermostat color="primary" /> {selectedLog ? "Edit Environment Reading" : "Record Environment Reading"}
                    </Box>
                    <IconButton onClick={() => setDialogOpen(false)} disabled={submitting}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ mt: 1 }}>
                    <FormikProvider value={formik}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Time"
                                    type="time"
                                    name="time"
                                    value={formik.values.time}
                                    onChange={formik.handleChange}
                                    error={formik.touched.time && Boolean(formik.errors.time)}
                                    helperText={formik.touched.time && formik.errors.time}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Location"
                                    name="location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location}
                                >
                                    {LOCATIONS.map((loc) => (
                                        <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Temperature (°C)"
                                    name="temperature"
                                    placeholder="e.g. 23"
                                    value={formik.values.temperature}
                                    onChange={formik.handleChange}
                                    error={formik.touched.temperature && Boolean(formik.errors.temperature)}
                                    helperText={formik.touched.temperature && formik.errors.temperature}
                                />
                            </Grid>
                            <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Humidity (%)"
                                    name="humidity"
                                    placeholder="e.g. 45"
                                    value={formik.values.humidity}
                                    onChange={formik.handleChange}
                                    error={formik.touched.humidity && Boolean(formik.errors.humidity)}
                                    helperText={formik.touched.humidity && formik.errors.humidity}
                                />
                            </Grid>
                            <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Checked By"
                                    name="checkedBy"
                                    value={formik.values.checkedBy}
                                    onChange={formik.handleChange}
                                    error={formik.touched.checkedBy && Boolean(formik.errors.checkedBy)}
                                    helperText={formik.touched.checkedBy && formik.errors.checkedBy}
                                />
                            </Grid>
                            <Grid item xs={12} size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Verified By"
                                    name="verifiedBy"
                                    value={formik.values.verifiedBy}
                                    onChange={formik.handleChange}
                                    error={formik.touched.verifiedBy && Boolean(formik.errors.verifiedBy)}
                                    helperText={formik.touched.verifiedBy && formik.errors.verifiedBy}
                                />
                            </Grid>

                        </Grid>
                    </FormikProvider>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setDialogOpen(false)} color="inherit" sx={{ px: 3 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={formik.handleSubmit}
                        variant="contained"
                        startIcon={<Save />}
                        disabled={submitting}
                        sx={{ px: 4, bgcolor: 'var(--brand-primary)', borderRadius: 2 }}
                    >
                        {submitting ? "Saving..." : selectedLog ? "Update Reading" : "Record Reading"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
