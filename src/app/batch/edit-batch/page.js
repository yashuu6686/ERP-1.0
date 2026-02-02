"use client";
import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "../../../components/Loader";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Save from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function EditBatchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        batchNo: "",
        requestNo: "",
        checkNo: "",
        productSr: "",
        acceptedQty: "",
        status: "",
        date: "",
        qualityCheck: [],
        summary: {}
    });

    useEffect(() => {
        const fetchBatch = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/batches/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching batch:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBatch();
    }, [id]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedLogs = [...(prev.qualityCheck || [])];
            updatedLogs[index] = { ...updatedLogs[index], [field]: value };
            return { ...prev, qualityCheck: updatedLogs };
        });
    };

    const handleAddLog = () => {
        setFormData((prev) => ({
            ...prev,
            qualityCheck: [
                ...(prev.qualityCheck || []),
                { parameters: "", specification: "", observation: "", remarks: "" }
            ]
        }));
    };

    const handleRemoveLog = (index) => {
        setFormData((prev) => {
            const updatedLogs = [...(prev.qualityCheck || [])];
            updatedLogs.splice(index, 1);
            return { ...prev, qualityCheck: updatedLogs };
        });
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            await axiosInstance.put(`/batches/${id}`, formData);
            alert("Batch updated successfully!");
            router.push("/batch");
        } catch (error) {
            console.error("Error updating batch:", error);
            alert("Failed to update batch.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loader fullPage message="Loading Batch Details..." />;

    if (!formData) return <Box sx={{ p: 4, textAlign: "center" }}>Batch not found.</Box>;

    return (
        <Box>
            <CommonCard title="Edit Batch">
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Batch Number"
                                value={formData.batchNo || ""}
                                disabled // Typically batch number shouldn't change
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Material Request No."
                                value={formData.requestNo || ""}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Check Number"
                                value={formData.checkNo || ""}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Product Serial Range"
                                value={formData.productSr || ""}
                                onChange={(e) => handleChange("productSr", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Accepted Quantity"
                                type="number"
                                value={formData.acceptedQty || ""}
                                disabled // Derived from QC
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                value={formData.status || "Ready"}
                                onChange={(e) => handleChange("status", e.target.value)}
                            >
                                <MenuItem value="Ready">Ready</MenuItem>
                                <MenuItem value="On Hold">On Hold</MenuItem>
                                <MenuItem value="Dispatched">Dispatched</MenuItem>
                                <MenuItem value="Quarantined">Quarantined</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Creation Date"
                                value={formData.date ? new Date(formData.date).toLocaleString() : ""}
                                disabled
                            />
                        </Grid>
                    </Grid>

                    {/* Quality Verification Log Editor */}
                    <Box sx={{ mt: 5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#334155" }}>
                                Quality Verification Log
                            </Typography>
                            <Button
                                startIcon={<Add />}
                                size="small"
                                variant="outlined"
                                onClick={handleAddLog}
                            >
                                Add Row
                            </Button>
                        </Box>

                        <Box sx={{ border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                        <th style={{ padding: "12px", textAlign: "left", fontSize: "0.875rem", color: "#475569" }}>Parameter</th>
                                        <th style={{ padding: "12px", textAlign: "left", fontSize: "0.875rem", color: "#475569" }}>Specification</th>
                                        <th style={{ padding: "12px", textAlign: "left", fontSize: "0.875rem", color: "#475569" }}>Observation</th>
                                        <th style={{ padding: "12px", textAlign: "left", fontSize: "0.875rem", color: "#475569" }}>Remarks</th>
                                        <th style={{ padding: "12px", textAlign: "center", fontSize: "0.875rem", color: "#475569", width: "60px" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(formData.qualityCheck || []).map((row, index) => (
                                        <tr key={index} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                            <td style={{ padding: "12px" }}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={row.parameters || ""}
                                                    onChange={(e) => handleLogChange(index, "parameters", e.target.value)}
                                                />
                                            </td>
                                            <td style={{ padding: "12px" }}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={row.specification || ""}
                                                    onChange={(e) => handleLogChange(index, "specification", e.target.value)}
                                                />
                                            </td>
                                            <td style={{ padding: "12px" }}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={row.observation || ""}
                                                    onChange={(e) => handleLogChange(index, "observation", e.target.value)}
                                                />
                                            </td>
                                            <td style={{ padding: "12px" }}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={row.remarks || ""}
                                                    onChange={(e) => handleLogChange(index, "remarks", e.target.value)}
                                                />
                                            </td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>
                                                <IconButton size="small" color="error" onClick={() => handleRemoveLog(index)}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                    {(formData.qualityCheck || []).length === 0 && (
                                        <tr>
                                            <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontStyle: "italic" }}>
                                                No logs. Click "Add Row" to start.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Box>
                    </Box>

                    {/* Inspection Summary / Observations */}
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#334155" }}>
                            Inspection Summary / Observations
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Accepted Quantity"
                                    type="number"
                                    value={formData.summary?.acceptedQuantity || formData.acceptedQty || ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            acceptedQty: val,
                                            summary: { ...prev.summary, acceptedQuantity: val }
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Rejected Quantity"
                                    type="number"
                                    value={formData.summary?.rejectedQuantity || ""}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        summary: { ...prev.summary, rejectedQuantity: e.target.value }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Hold / Scrap Quantity"
                                    type="number"
                                    value={formData.summary?.holdScrapQuantity || ""}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        summary: { ...prev.summary, holdScrapQuantity: e.target.value }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Overall Observation / Comments"
                                    value={formData.summary?.comments || ""}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        summary: { ...prev.summary, comments: e.target.value }
                                    }))}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/batch")}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSubmit}
                            disabled={submitting}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                bgcolor: "#1172ba",
                                "&:hover": { bgcolor: "#0d5a94" }
                            }}
                        >
                            {submitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
        </Box>
    );
}

export default function EditBatchPage() {
    return (
        <Suspense fallback={<Loader fullPage />}>
            <EditBatchContent />
        </Suspense>
    );
}
