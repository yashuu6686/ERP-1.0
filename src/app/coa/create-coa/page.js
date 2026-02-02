"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button } from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import CommonCard from "../../../components/CommonCard";
import CertificateDetailsCard from "../components/CertificateDetailsCard";
import ProductDetailsCard from "../components/ProductDetailsCard";
import TestResultsCard from "../components/TestResultsCard";
import AuthorizationCard from "../components/AuthorizationCard";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

function COAFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        coaNumber: "",
        productName: "",
        batchNo: "",
        issueDate: new Date().toISOString().split("T")[0],
        expiryDate: "",
        manufacturingDate: "",
        quantity: "",
        status: "Pending",
    });
    const [testRows, setTestRows] = useState([
        {
            id: 1,
            parameters: "",
            specification: "",
            method: "",
            result: "",
            status: "",
        },
    ]);

    useEffect(() => {
        if (id) {
            fetchCOA();
        }
    }, [id]);

    const fetchCOA = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/coa/${id}`);
            if (response.data) {
                setFormData(response.data);
                if (response.data.testResults) {
                    setTestRows(response.data.testResults);
                }
            }
        } catch (error) {
            console.error("Error fetching COA:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addTestRow = () => {
        const newId = testRows.length > 0 ? Math.max(...testRows.map((row) => row.id)) + 1 : 1;
        setTestRows([
            ...testRows,
            {
                id: newId,
                parameters: "",
                specification: "",
                method: "",
                result: "",
                status: "",
            },
        ]);
    };

    const deleteTestRow = (rowId) => {
        if (testRows.length > 1) {
            setTestRows(testRows.filter((row) => row.id !== rowId));
        }
    };

    const handleTestRowChange = (rowId, field, value) => {
        setTestRows(
            testRows.map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
        );
    };

    const handleSave = async () => {
        try {
            const payload = { ...formData, testResults: testRows };
            if (id) {
                await axiosInstance.put(`/coa/${id}`, payload);
            } else {
                payload.coaNumber = `COA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
                await axiosInstance.post("/coa", payload);
            }
            router.push("/coa");
        } catch (error) {
            console.error("Error saving COA:", error);
        }
    };

    if (loading) return <Loader fullPage message="Fetching COA Details..." />;

    return (
        <Box>
            <CommonCard title={id ? "Edit Certificate of Analysis" : "Create Certificate of Analysis"}>
                <CertificateDetailsCard formData={formData} onChange={handleInputChange} />
                <ProductDetailsCard formData={formData} onChange={handleInputChange} />
                <TestResultsCard
                    testRows={testRows}
                    addTestRow={addTestRow}
                    deleteTestRow={deleteTestRow}
                    handleTestRowChange={handleTestRowChange}
                />
                <AuthorizationCard formData={formData} onChange={handleInputChange} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => router.push("/coa")}
                        sx={{
                            borderColor: "#e2e8f0",
                            color: "#64748b",
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >
                        Back to List
                    </Button>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setFormData({
                                    coaNumber: "",
                                    productName: "",
                                    batchNo: "",
                                    issueDate: new Date().toISOString().split("T")[0],
                                    expiryDate: "",
                                    manufacturingDate: "",
                                    quantity: "",
                                    status: "Pending",
                                });
                                setTestRows([{ id: 1, parameters: "", specification: "", method: "", result: "", status: "" }]);
                            }}
                            sx={{
                                borderColor: "#1172ba",
                                color: "#1172ba",
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": {
                                    borderColor: "#0d5a94",
                                    bgcolor: "#f0f7ff",
                                },
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
                            sx={{
                                background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            {id ? "Update Certificate" : "Save Certificate"}
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
        </Box>
    );
}

export default function COAForm() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <COAFormContent />
        </Suspense>
    );
}
