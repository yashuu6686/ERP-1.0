"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";

export default function DefectiveMaterialForm({ request, onClose }) {
    const [returnDate, setReturnDate] = useState(new Date().toISOString().split("T")[0]);
    const [items, setItems] = useState([
        { itemName: "", quantity: "", reason: "", serialNumbers: "", partNo: "" }
    ]);
    const [submitting, setSubmitting] = useState(false);
    const [bomMaterials, setBomMaterials] = useState([]);
    const [loadingBOM, setLoadingBOM] = useState(false);

    useEffect(() => {
        const fetchBOMDetails = async () => {
            try {
                setLoadingBOM(true);
                let activeBom = null;
                const bomNum = (request?.bomNumber || request?.bom || "").toString().trim();
                const prodName = (request?.productName || request?.product || "").toString().trim();

                console.log(`DefectiveForm: Searching for BOM "${bomNum}" (Prod: "${prodName}")`);

                // 1. Try fetching directly by ID if available
                if (request?.bomId) {
                    try {
                        const response = await axiosInstance.get(`/bom/${request.bomId}`);
                        if (response.data && response.data.materials) {
                            activeBom = response.data;
                            console.log("DefectiveForm: Found BOM via ID");
                        }
                    } catch (e) {
                        console.warn("DefectiveForm: ID fetch failed, falling back...");
                    }
                }

                // 2. Try matching by Number (Exact or Fuzzy)
                if (!activeBom && (bomNum || prodName)) {
                    const response = await axiosInstance.get("/bom");
                    const allBoms = Array.isArray(response.data) ? response.data : [];

                    // Match by number first
                    if (bomNum) {
                        activeBom = allBoms.find(b =>
                            (b.number && b.number.toString().trim().toLowerCase() === bomNum.toLowerCase()) ||
                            (b.id && b.id.toString().trim().toLowerCase() === bomNum.toLowerCase())
                        );
                    }

                    // If still no match, match by product name as a last resort
                    if (!activeBom && prodName) {
                        activeBom = allBoms.find(b =>
                            b.productName && b.productName.toString().trim().toLowerCase() === prodName.toLowerCase()
                        );
                    }
                }

                if (activeBom && Array.isArray(activeBom.materials)) {
                    console.log(">>> DEFECTIVE FORM: LOADED BOM DATA:", activeBom);
                    setBomMaterials(activeBom.materials);
                } else {
                    console.warn("DefectiveForm: Could not find matching BOM with materials");
                    setBomMaterials([]);
                }
            } catch (error) {
                console.error("DefectiveForm Error:", error);
                setBomMaterials([]);
            } finally {
                setLoadingBOM(false);
            }
        };
        fetchBOMDetails();
    }, [request]);

    const handleAddItem = () => {
        setItems([...items, { itemName: "", quantity: "", reason: "", serialNumbers: "", partNo: "" }]);
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;

        // If Item Name is selected, auto-fill part number if found
        if (field === "itemName") {
            const material = bomMaterials.find(m => {
                const mName = (m.materialName || m.description || m.itemName || m.material || m.label || "").toString().trim();
                return mName === value;
            });
            if (material) {
                newItems[index].partNo = material.scanboPartNumber || material.scanboPartNo || material.partNo || material.partNumber || "";
            }
        }

        setItems(newItems);
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);

            // Construct payload for /rejected-goods
            // Based on previous structure: rejectionId, sourceType, sourceRef, goods, qty, date, reason, status
            const payload = items.map(item => ({
                rejectionId: `RET-${Math.floor(Math.random() * 10000)}`,
                sourceType: "Production Request",
                sourceRef: request.requestNo,
                product: request.productName || request.product,
                goods: item.itemName,
                qty: Number(item.quantity),
                date: returnDate,
                reason: item.reason,
                serialNumbers: item.serialNumbers,
                partNo: item.partNo, // Storing linked part number
                status: "total",
                severity: "medium"
            }));

            // Post each item (JSON Server typically handles array POSTs differently, but here we might need individual posts or an endpoint that handles it)
            // For simplicity and matching JSON Server expectations, we'll post individually or as a single record if the server supports it.
            // Usually, we create one record per return or one per line item.
            // Mockup shows RET-001 has specific items. Let's create individual entries.

            const requests = payload.map(p => axiosInstance.post("/defective-returns", p));
            await Promise.all(requests);

            alert("Defective return submitted successfully!");
            onClose(true);
        } catch (error) {
            console.error("Error submitting defective return:", error);
            alert("Failed to submit defective return.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: "#0f172a" }}>
                Defective Material
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 1, display: "block" }}>
                    Return Date
                </Typography>
                <TextField
                    fullWidth
                    size="small"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    sx={{ bgcolor: "#fff" }}
                />
            </Box>

            <Box sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                p: 2,
                mb: 4,
                position: "relative"
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#334155" }}>
                        Defective Items
                    </Typography>
                    <Button
                        size="small"
                        startIcon={<Add />}
                        onClick={handleAddItem}
                        sx={{ textTransform: "none", fontWeight: 600, border: "1px solid #e2e8f0", color: "#475569" }}
                    >
                        Add Items
                    </Button>
                </Box>

                {items.map((item, index) => (
                    <Box key={index} sx={{ mb: index !== items.length - 1 ? 4 : 0 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Item Name
                                </Typography>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={item.itemName}
                                        onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                                        displayEmpty
                                        disabled={loadingBOM}
                                    >
                                        <MenuItem value="" disabled>
                                            {loadingBOM ? "Loading items..." : "Select Item"}
                                        </MenuItem>
                                        {bomMaterials.length === 0 && !loadingBOM && (
                                            <MenuItem disabled>No items found for this BOM</MenuItem>
                                        )}
                                        {bomMaterials.map((mat, idx) => {
                                            const name = (mat.materialName || mat.description || mat.itemName || mat.material || mat.label || "Unnamed Item").toString().trim();
                                            const pNo = (mat.scanboPartNumber || mat.scanboPartNo || mat.partNo || mat.partNumber || "").toString().trim();
                                            return (
                                                <MenuItem key={idx} value={name}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{name}</Typography>
                                                        {pNo && (
                                                            <Typography variant="caption" sx={{ color: "#1172ba", ml: 2, fontWeight: 700, bgcolor: "#ecfeff", px: 1, borderRadius: 0.5 }}>
                                                                {pNo}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Defective Quantity
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Reason for Defect
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={item.reason}
                                    onChange={(e) => handleItemChange(index, "reason", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5, display: "block" }}>
                                    Serial Numbers
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Comma separated"
                                    value={item.serialNumbers}
                                    onChange={(e) => handleItemChange(index, "serialNumbers", e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {items.length > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                <IconButton color="error" size="small" onClick={() => handleRemoveItem(index)}>
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        {index !== items.length - 1 && <Divider sx={{ mt: 3 }} />}
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, px: 4, color: "#475569", borderColor: "#e2e8f0" }}
                >
                    cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#fff",
                        color: "#1e293b",
                        border: "1px solid #e2e8f0",
                        "&:hover": { bgcolor: "#f1f5f9" }
                    }}
                >
                    {submitting ? "Submitting..." : "Submit Defective Return"}
                </Button>
            </Box>
        </Box>
    );
}
