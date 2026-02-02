"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import {
    ArrowBack,
    Assignment,
    Person,
    ContactPhone,
    Home,
    Event,
    LocalMall,
    Info
} from "@mui/icons-material";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "../../../components/Loader";

export default function OrderDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/orders/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Order Details..." />;
    if (!data) return <Box sx={{ p: 4, textAlign: "center" }}>Order not found</Box>;

    const {
        orderNo,
        customerName,
        orderDate,
        contact,
        address,
        deliveryDate,
        status,
        reference,
        products,
        kitQty,
        singleProducts = []
    } = data;

    const InfoItem = ({ icon: Icon, label, value }) => (
        <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{
                    p: 1,
                    bgcolor: 'rgba(17, 114, 186, 0.08)',
                    borderRadius: 2,
                    color: '#1172ba',
                    display: 'flex'
                }}>
                    <Icon fontSize="small" />
                </Box>
                <Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, display: 'block' }}>
                        {label}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} color="#1e293b">
                        {value || "N/A"}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.back()}
                        sx={{
                            color: "#64748b",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            "&:hover": { bgcolor: "#f1f5f9" }
                        }}
                    >
                        Back to Orders
                    </Button>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
                        Order Detail: {orderNo}
                    </Typography>
                </Box>
                <Chip
                    label={status || "Pending"}
                    color={status === "Completed" ? "success" : "warning"}
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                />
            </Box>

            <Grid container spacing={4}>
                {/* Customer & Order Info */}
                <Grid item xs={12} md={8}>
                    <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                        <Box sx={{ p: 2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Assignment sx={{ color: "#1172ba" }} />
                            <Typography variant="subtitle1" fontWeight={700}>Order Information</Typography>
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={1}>
                                <InfoItem icon={Assignment} label="Order Number" value={orderNo} />
                                <InfoItem icon={Person} label="Customer Name" value={customerName} />
                                <InfoItem icon={ContactPhone} label="Contact" value={contact} />
                                <InfoItem icon={Event} label="Order Date" value={orderDate} />
                                <InfoItem icon={Event} label="Delivery Date" value={deliveryDate} />
                                <InfoItem icon={Info} label="Reference" value={reference} />
                                <InfoItem icon={Home} label="Address" value={address} />
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", mt: 4 }}>
                        <Box sx={{ p: 2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocalMall sx={{ color: "#1172ba" }} />
                            <Typography variant="subtitle1" fontWeight={700}>Included Components (D8 Kit)</Typography>
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                Total Kits: <strong>{kitQty || 0}</strong>
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                {[
                                    "Scanbo D8 Device", "BP Cuffs", "Large BP Cuff",
                                    "Glucose Bottles", "Lancet Pouch", "Lancet Pen",
                                    "USB Cable", "Plastic Shield", "Scanbo Jute Bag"
                                ].map((comp, idx) => (
                                    <Paper key={idx} variant="outlined" sx={{ p: 1.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff' }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1172ba' }} />
                                        <Typography variant="body2" fontWeight={600}>{comp}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {singleProducts.length > 0 && (
                        <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", mt: 4 }}>
                            <Box sx={{ p: 2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalMall sx={{ color: "#1172ba" }} />
                                <Typography variant="subtitle1" fontWeight={700}>Additional Single Products</Typography>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                    {singleProducts.map((p, idx) => (
                                        <Paper key={p.id || idx} variant="outlined" sx={{ p: 1.5, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fff' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0891b2' }} />
                                                <Typography variant="body2" fontWeight={600}>{p.name}</Typography>
                                            </Box>
                                            <Typography variant="body2" color="primary" fontWeight={700}>{p.quantity} units</Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                </Grid>

                {/* Summary / Sidebar */}
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 4, overflow: "hidden", mb: 4 }}>
                        <Box sx={{ p: 2, bgcolor: "#f1f5f9", display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Info sx={{ color: "#475569" }} />
                            <Typography variant="subtitle1" fontWeight={700}>Order Summary</Typography>
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="textSecondary">Status</Typography>
                                <Typography fontWeight={700} color={status === "Completed" ? "success.main" : "warning.main"}>
                                    {status || "Pending"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="textSecondary">Total Products</Typography>
                                <Typography fontWeight={700}>{products || 0}</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={700}>Kit Quantity</Typography>
                                <Typography variant="h5" fontWeight={800} color="#1172ba">
                                    {kitQty || 0}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.5,
                            borderRadius: 3,
                            bgcolor: '#1172ba',
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(17, 114, 186, 0.2)',
                            '&:hover': { bgcolor: '#0d5a94' }
                        }}
                    >
                        Download Invoice
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
