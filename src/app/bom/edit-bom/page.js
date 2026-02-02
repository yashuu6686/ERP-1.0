"use client";
import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import { useRouter, useSearchParams } from "next/navigation";
import CommonCard from "../../../components/CommonCard";
import MaterialListSpecifications from "../create-bom/components/MaterialListSpecifications";
import BOMAuthorization from "../create-bom/components/BOMAuthorization";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "@/components/Loader";
import { TextField, Grid } from "@mui/material";

function EditBOMContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [auth, setAuth] = useState({
        reviewedBy: "",
        approvedBy: "",
    });
    const [materials, setMaterials] = useState([]);
    const [bomNumber, setBomNumber] = useState("");
    const [productName, setProductName] = useState("");

    useEffect(() => {
        const fetchBOM = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/bom/${id}`);
                const data = response.data;

                setBomNumber(data.number);
                setProductName(data.productName || "");
                setAuth({
                    reviewedBy: data.authorization?.reviewedBy || "",
                    approvedBy: data.authorization?.approvedBy || "",
                });

                // Map server format back to form format
                const mappedMaterials = (data.materials || []).map((m, idx) => ({
                    id: idx + 1,
                    scanboPartNumber: m.scanboPartNo || m.scanboPartNumber || "",
                    supplierPartNumber: m.oemPartNo || m.supplierPartNumber || "",
                    quantity: m.qty || m.quantity || "",
                    materialName: m.description || m.materialName || "",
                    manufacturerName: m.manufacturer || m.manufacturerName || m.oemSupplier || "",
                    technicalDetails: m.specs || m.technicalDetails || "",
                }));

                setMaterials(mappedMaterials.length > 0 ? mappedMaterials : [
                    {
                        id: 1,
                        scanboPartNumber: "",
                        supplierPartNumber: "",
                        quantity: "",
                        materialName: "",
                        manufacturerName: "",
                        technicalDetails: "",
                    }
                ]);
            } catch (error) {
                console.error("Error fetching BOM for edit:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBOM();
    }, [id]);

    const addMaterial = () => {
        setMaterials([
            ...materials,
            {
                id: materials.length + 1,
                scanboPartNumber: "",
                supplierPartNumber: "",
                quantity: "",
                materialName: "",
                manufacturerName: "",
                technicalDetails: "",
            },
        ]);
    };

    const deleteMaterial = (id) => {
        if (materials.length > 1) {
            setMaterials(materials.filter((m) => m.id !== id));
        }
    };

    const updateMaterial = (id, field, value) => {
        setMaterials(
            materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))
        );
    };

    const updateAuth = (field, value) => {
        setAuth({ ...auth, [field]: value });
    };

    const handleUpdate = async () => {
        try {
            setSaving(true);
            const payload = {
                number: bomNumber,
                productName: productName,
                date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
                approvedBy: auth.approvedBy,
                status: "Approved",
                materials: materials.map((m, idx) => ({
                    sNo: idx + 1,
                    oemSupplier: m.manufacturerName,
                    oemPartNo: m.supplierPartNumber,
                    qty: m.quantity,
                    description: m.materialName,
                    bubbleNo: "-",
                    manufacturer: m.manufacturerName,
                    scanboPartNo: m.scanboPartNumber,
                    specs: m.technicalDetails,
                })),
                authorization: {
                    reviewedBy: auth.reviewedBy,
                    reviewedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
                    approvedBy: auth.approvedBy,
                    approvedDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
                },
            };

            await axiosInstance.put(`/bom/${id}`, payload);
            alert("BOM updated successfully!");
            router.push("/bom");
        } catch (error) {
            console.error("Error updating BOM:", error);
            alert("Failed to update BOM on server.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader fullPage message="Fetching BOM Data..." />;

    return (
        <Box>
            <CommonCard title={`Edit BOM: ${bomNumber}`}>
                <Box sx={{ p: 0.25 }}>
                    <Box sx={{ mb: 3, px: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    placeholder="Enter dynamic product name (e.g. D8 Smart Device)"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    size="small"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            bgcolor: "white",
                                            "&:hover > fieldset": { borderColor: "#1172ba" },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <MaterialListSpecifications
                        materials={materials}
                        onAdd={addMaterial}
                        onDelete={deleteMaterial}
                        onUpdate={updateMaterial}
                    />

                    <BOMAuthorization
                        reviewedBy={auth.reviewedBy}
                        approvedBy={auth.approvedBy}
                        onUpdate={updateAuth}
                    />

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            disabled={saving}
                            onClick={() => router.push("/bom")}
                            sx={{
                                borderColor: "#1172ba",
                                color: "#1172ba",
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 500,
                                "&:hover": {
                                    borderColor: "#0d5a94",
                                    bgcolor: "#f0f7ff",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleUpdate}
                            disabled={saving}
                            sx={{
                                backgroundColor: "#1172ba",
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 500,
                                "&:hover": { backgroundColor: "#0d5a94" },
                            }}
                        >
                            {saving ? "Updating..." : "Update BOM"}
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
        </Box>
    );
}

export default function EditBOM() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Edit View..." />}>
            <EditBOMContent />
        </Suspense>
    );
}
