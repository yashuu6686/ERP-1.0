"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Button,
    Grid,
    Typography,
    TextField,
    Autocomplete,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Save, ArrowBack, LocalShipping, Description, Inventory } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/Loader";

export default function CreateGRN() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [pendingPOs, setPendingPOs] = useState([]);
    const [selectedPO, setSelectedPO] = useState(null);

    const [formData, setFormData] = useState({
        grnNumber: `GRN/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        poNumber: "",
        invoiceNumber: "",
        receivedDate: new Date().toISOString().split("T")[0],
        receivedBy: "",
        supplierName: "",
        items: [],
        inspectionStatus: "Pending", // New field for incoming inspection workflow
    });

    useEffect(() => {
        fetchPendingPOs();
        if (isEditMode) {
            fetchGRNDetails();
        }
    }, [id, isEditMode]);

    const fetchGRNDetails = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/grn/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Fetch GRN Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingPOs = async () => {
        try {
            const response = await axiosInstance.get("/purachase");
            // Filter for Pending orders
            const pending = (response.data || []).filter(po => po.status === "Pending");
            setPendingPOs(pending);
        } catch (error) {
            console.error("Error fetching POs:", error);
        }
    };

    const handlePOChange = (event, newValue) => {
        setSelectedPO(newValue);
        if (newValue) {
            // Auto-populate from PO
            setFormData({
                ...formData,
                poNumber: newValue.orderInfo?.orderNumber || "",
                supplierName: newValue.supplier?.companyName || "",
                items: (newValue.items || []).map(item => ({
                    ...item,
                    orderedQty: item.qty,
                    receivedQty: item.qty, // Default to ordered qty
                    remark: "",
                })),
            });
        } else {
            // Reset if cleared
            setFormData({
                ...formData,
                poNumber: "",
                supplierName: "",
                items: [],
            });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...formData.items];
        updatedItems[index][field] = value;
        setFormData(prev => ({ ...prev, items: updatedItems }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = isEditMode
                ? await axiosInstance.put(`/grn/${id}`, formData)
                : await axiosInstance.post("/grn", formData);

            if (response.status === 201 || response.status === 200) {
                // Update PO status if a PO was selected
                if (selectedPO) {
                    try {
                        await axiosInstance.put(`/purachase/${selectedPO.id}`, {
                            ...selectedPO,
                            status: "Completed",
                        });
                    } catch (poError) {
                        console.error("Failed to update PO status:", poError);
                        // We continue because the GRN was already saved
                    }
                }

                alert(`GRN ${isEditMode ? "Updated" : "Created"} Successfully!`);
                router.push("/grn");
            }
        } catch (error) {
            console.error("Save GRN Error:", error);
            alert("Failed to save GRN.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullPage message="Processing GRN..." />;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ color: "#64748b" }}>
                    Back to List
                </Button>
                <Typography variant="h5" fontWeight={700} color="primary">
                    {isEditMode ? "Edit Goods Receipt Note (GRN)" : "Create Goods Receipt Note (GRN)"}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* GRN & PO Selection */}
                <Grid item xs={12} md={8}>
                    <CommonCard title="GRN Details">
                        <Grid container spacing={2} sx={{ p: 1 }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="GRN Number"
                                    value={formData.grnNumber}
                                    onChange={(e) => handleInputChange("grnNumber", e.target.value)}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Autocomplete
                                    options={pendingPOs}
                                    getOptionLabel={(option) => option.orderInfo?.orderNumber || ""}
                                    value={selectedPO}
                                    onChange={handlePOChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select PO Number"
                                            placeholder="Search Pending POs..."
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Invoice Number"
                                    value={formData.invoiceNumber}
                                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Received Date"
                                    value={formData.receivedDate}
                                    onChange={(e) => handleInputChange("receivedDate", e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                    </CommonCard>
                </Grid>

                {/* Supplier & Receiver Info */}
                <Grid item xs={12} md={4}>
                    <CommonCard title="Information">
                        <Grid container spacing={2} sx={{ p: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Supplier Name"
                                    value={formData.supplierName}
                                    onChange={(e) => handleInputChange("supplierName", e.target.value)}
                                    size="small"
                                    InputProps={{
                                        startAdornment: <Description sx={{ color: "#1172ba", mr: 1, fontSize: 20 }} />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Received By"
                                    value={formData.receivedBy}
                                    onChange={(e) => handleInputChange("receivedBy", e.target.value)}
                                    size="small"
                                    InputProps={{
                                        startAdornment: <Inventory sx={{ color: "#1172ba", mr: 1, fontSize: 20 }} />
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CommonCard>
                </Grid>

                {/* Items Table */}
                <Grid item xs={12}>
                    <CommonCard title="Materials Received">
                        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}>
                            <Table>
                                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Item Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700 }}>Ordered Qty</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700 }}>Received Qty</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700 }}>Unit</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Remark</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formData.items.length > 0 ? (
                                        formData.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell align="center">{item.orderedQty}</TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        size="small"
                                                        type="number"
                                                        value={item.receivedQty}
                                                        onChange={(e) => handleItemChange(index, "receivedQty", e.target.value)}
                                                        sx={{ width: 100 }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">{item.unit || "Nos"}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        value={item.remark}
                                                        onChange={(e) => handleItemChange(index, "remark", e.target.value)}
                                                        placeholder="Add note..."
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                                <Typography color="textSecondary">No items found. Please select a PO or add items manually.</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CommonCard>
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/grn")}
                        sx={{ borderRadius: 2, px: 4 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)"
                        }}
                    >
                        {isEditMode ? "Update GRN" : "Save GRN"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
