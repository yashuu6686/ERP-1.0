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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent,
} from "@mui/material";
import { Save, ArrowBack, Description, Inventory, ReceiptLong, AssignmentTurnedIn } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "../../../components/Loader";

// Helper component for the internal gradient cards
const GradientCard = ({ title, icon: Icon, children }) => (
    <Card sx={{ height: "100%", borderRadius: 2 }}>
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
        inspectionStatus: "Pending",
    });

    useEffect(() => {
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

        fetchPendingPOs();
        if (isEditMode) {
            fetchGRNDetails();
        }
    }, [id, isEditMode]);



    const fetchPendingPOs = async () => {
        try {
            const response = await axiosInstance.get("/purachase");
            const pending = (response.data || []).filter(po => po.status === "Pending");
            setPendingPOs(pending);
        } catch (error) {
            console.error("Error fetching POs:", error);
        }
    };

    const handlePOChange = (event, newValue) => {
        setSelectedPO(newValue);
        if (newValue) {
            setFormData({
                ...formData,
                poNumber: newValue.orderInfo?.orderNumber || "",
                supplierName: newValue.supplier?.companyName || "",
                items: (newValue.items || []).map(item => ({
                    ...item,
                    orderedQty: item.qty,
                    receivedQty: item.qty,
                    remark: "",
                })),
            });
        } else {
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
                if (selectedPO) {
                    try {
                        await axiosInstance.put(`/purachase/${selectedPO.id}`, {
                            ...selectedPO,
                            status: "Completed",
                        });
                    } catch (poError) {
                        console.error("Failed to update PO status:", poError);
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

    const inputStyle = { background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", cursor: "pointer" };

    return (
        <Box>
            <CommonCard title={isEditMode ? "Edit Goods Receipt Note (GRN)" : "Create Goods Receipt Note (GRN)"}>
                <Box sx={{ p: 1 }}>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {/* GRN Details */}
                        <Grid item xs={12} md={8} size={{ xs: 12, md: 8 }}>
                            <GradientCard title="GRN Information" icon={ReceiptLong}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="GRN Number"
                                            value={formData.grnNumber}
                                            onChange={(e) => handleInputChange("grnNumber", e.target.value)}
                                            size="small"
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                        <Autocomplete
                                            options={pendingPOs}
                                            getOptionLabel={(option) => option.orderInfo?.orderNumber || ""}
                                            value={selectedPO}
                                            onChange={handlePOChange}
                                            sx={{ cursor: "pointer" }}
                                            renderInput={(params) => (
                                                <TextField

                                                    {...params}
                                                    label="Select PO Number"
                                                    placeholder="Search Pending POs..."
                                                    size="small"
                                                    sx={inputStyle}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Invoice Number"
                                            value={formData.invoiceNumber}
                                            onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                                            size="small"
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Received Date"
                                            value={formData.receivedDate}
                                            onChange={(e) => handleInputChange("receivedDate", e.target.value)}
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                </Grid>
                            </GradientCard>
                        </Grid>

                        {/* Supplier & Receiver Info */}
                        <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                            <GradientCard title="Parties Involved" icon={Description}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Supplier Name"
                                            value={formData.supplierName}
                                            onChange={(e) => handleInputChange("supplierName", e.target.value)}
                                            size="small"
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                    <Grid item xs={12} size={{ xs: 12, md: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Received By"
                                            value={formData.receivedBy}
                                            onChange={(e) => handleInputChange("receivedBy", e.target.value)}
                                            size="small"
                                            sx={inputStyle}
                                        />
                                    </Grid>
                                </Grid>
                            </GradientCard>
                        </Grid>
                    </Grid>

                    {/* Items Table */}
                    <Box sx={{ mb: 4 }}>
                        <GradientCard title="Materials Received" icon={Inventory}>
                            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: "#f8fafc" }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Item Name</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Ordered Qty</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Received Qty</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Unit</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Remark</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formData.items.length > 0 ? (
                                            formData.items.map((item, index) => (
                                                <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                                    <TableCell sx={{ fontWeight: 600, color: "#0f172a" }}>{item.name}</TableCell>
                                                    <TableCell align="center">{item.orderedQty}</TableCell>
                                                    <TableCell align="center">
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            value={item.receivedQty}
                                                            onChange={(e) => handleItemChange(index, "receivedQty", e.target.value)}
                                                            sx={{ width: 100, ...inputStyle }}
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
                                                            sx={inputStyle}
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
                        </GradientCard>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "end", alignItems: "end" }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/grn")}
                            sx={{ borderRadius: 2, px: 4, textTransform: "none" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
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
                            {isEditMode ? "Update GRN" : "Save GRN"}
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
        </Box>
    );
}
