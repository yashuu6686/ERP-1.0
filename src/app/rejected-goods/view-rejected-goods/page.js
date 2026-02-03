"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Grid, Fade, Typography, Button } from "@mui/material";
import { ArrowBack, Warning, Delete, Inventory, Description } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/Loader";

// Import modular components
import RejectionHeaderActions from "./components/RejectionHeaderActions";
import RejectionDocument from "./components/RejectionDocument";
import RejectionSidebar from "./components/RejectionSidebar";

function ViewRejectedGoodsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchRejectedGoods = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/rejected-goods/${id}`);
                const serverData = response.data;

                setData({
                    rejectionNo: serverData.rejectionId || serverData.rejectionNo,
                    date: serverData.date,
                    vendor: serverData.vendor || "-",
                    sourceRef: serverData.sourceRef,
                    sourceType: serverData.sourceType,
                    invoiceNo: serverData.sourceRef || serverData.invoiceNo,
                    inspectedBy: serverData.rejectedBy || serverData.inspectedBy,
                    department: serverData.department || "Quality Control",
                    status: serverData.status === "total" ? "Pending Disposal" :
                        serverData.status === "return" ? "Returned" :
                            serverData.status === "scrap" ? "Scrapped" : serverData.status,
                    totalRejectionCost: serverData.totalRejectionCost || "0.00",
                    items: serverData.items || [
                        {
                            name: serverData.goods,
                            batchNo: serverData.batchNo || "-",
                            qty: serverData.qty,
                            reason: serverData.reason,
                            action: serverData.status === "return" ? "Return to Vendor" : "Scrap"
                        }
                    ],
                    remarks: serverData.remarks || serverData.reason || ""
                });
            } catch (error) {
                console.error("Error fetching rejected goods:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRejectedGoods();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Rejection Report..." />;

    if (!data) return (
        <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="error" fontWeight={600}>Report Not Found</Typography>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/rejected-goods")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                Back to List
            </Button>
        </Box>
    );

    const getStatusParams = (status) => {
        switch (status) {
            case 'Pending Disposal': return { color: "#b45309", bg: "#fffbeb", label: "PENDING DISPOSAL", icon: <Warning sx={{ fontSize: 16 }} /> };
            case 'Scrapped': return { color: "#b91c1c", bg: "#fee2e2", label: "SCRAPPED", icon: <Delete sx={{ fontSize: 16 }} /> };
            case 'Returned': return { color: "#1d4ed8", bg: "#dbeafe", label: "RETURNED", icon: <Inventory sx={{ fontSize: 16 }} /> };
            default: return { color: "#374151", bg: "#f3f4f6", label: status, icon: <Description sx={{ fontSize: 16 }} /> };
        }
    }

    const statusParams = getStatusParams(data.status);

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    <RejectionHeaderActions
                        onBack={() => router.push("/rejected-goods")}
                        onPrint={() => window.print()}
                        onEdit={() => {/* Handle Edit */ }}
                    />

                    <Grid container spacing={2}>
                        <Grid item size={{ xs: 12, md: 9 }}>
                            <RejectionDocument data={data} statusParams={statusParams} />
                        </Grid>
                        <Grid item size={{ xs: 12, md: 3 }}>
                            <RejectionSidebar data={data} />
                        </Grid>
                    </Grid>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-item.md-3, .MuiGrid-grid-md-3 { display: none !important; }
                            .MuiGrid-item.md-9, .MuiGrid-grid-md-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                        }
                    `}} />
                </Container>
            </Box>
        </Fade>
    );
}

export default function ViewRejectedGoods() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading..." />}>
            <ViewRejectedGoodsContent />
        </Suspense>
    );
}
