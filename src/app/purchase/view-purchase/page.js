"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import { ArrowBack } from "@mui/icons-material";
import Button from "@mui/material/Button";

import axiosInstance from "@/axios/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import NotificationService from "@/services/NotificationService";
import Loader from "@/components/ui/Loader";

// Extracted Components
import PurchaseViewHeader from "./components/PurchaseViewHeader";
import PurchaseDetails from "./components/PurchaseDetails";
import EntityInformation from "./components/EntityInformation";
import PurchaseItemsTable from "./components/PurchaseItemsTable";
import PurchaseSummarySidebar from "./components/PurchaseSummarySidebar";

function ViewPurchaseOrderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();



    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/purachase/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                alert(`Failed to fetch purchase order details.`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Securely Loading Order..." />;

    if (!order) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Purchase Order Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/purchase")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to List
                </Button>
            </Box>
        );
    }

    const { orderInfo, supplier, delivery, items, totals, status, shippingCharges, otherDiscount, taxRate, discount } = order;

    return (
        <Fade in={!loading}>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                {/* Header Actions */}
                <PurchaseViewHeader
                    router={router}
                    id={id}
                    status={status}
                    user={user}
                />

                <Grid container spacing={2}>
                    {/* Main Document Area */}
                    <Grid size={{ xs: 12, lg: 9 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                overflow: "hidden",
                                bgcolor: "#fff",
                                position: 'relative'
                            }}
                        >
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                <PurchaseDetails
                                    orderInfo={orderInfo}
                                    status={status}
                                />

                                <EntityInformation
                                    supplier={supplier}
                                    delivery={delivery}
                                />

                                <PurchaseItemsTable
                                    items={items}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Sidebar / Summary Area */}
                    <Grid size={{ xs: 12, lg: 3 }}>
                        <PurchaseSummarySidebar
                            totals={totals}
                            taxRate={taxRate}
                            discount={discount}
                            shippingCharges={shippingCharges}
                            otherDiscount={otherDiscount}
                            orderNumber={orderInfo.orderNumber}
                        />
                    </Grid>
                </Grid>

                {/* Print Context Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .MuiGrid-item.lg-3 { display: none !important; }
                        .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                    }
                `}</style>
            </Container>
        </Fade>
    );
}

export default function ViewPurchaseOrder() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Order Details..." />}>
            <ViewPurchaseOrderContent />
        </Suspense>
    );
}
