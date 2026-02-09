"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Person from "@mui/icons-material/Person";
import ContactPhone from "@mui/icons-material/ContactPhone";
import Home from "@mui/icons-material/Home";
import Event from "@mui/icons-material/Event";
import LocalMall from "@mui/icons-material/LocalMall";
import Print from "@mui/icons-material/Print";
import Share from "@mui/icons-material/Share";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Analytics from "@mui/icons-material/Analytics";
import Receipt from "@mui/icons-material/Receipt";
import Description from "@mui/icons-material/Description";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Inventory from "@mui/icons-material/Inventory";
import Info from "@mui/icons-material/Info";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Edit from "@mui/icons-material/Edit";
import FactCheck from "@mui/icons-material/FactCheck";

import axiosInstance from "../../../axios/axiosInstance";
import Loader from "../../../components/ui/Loader";

const InfoItem = ({ icon: Icon, label, value, color = "#1e293b" }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            bgcolor: "rgba(17, 114, 186, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5
        }}>
            <Icon sx={{ color: "#1172ba", fontSize: 18 }} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color, fontWeight: 700, fontSize: "0.95rem" }}>
                {value || "-"}
            </Typography>
        </Box>
    </Stack>
);

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

    if (loading) return <Loader fullPage message="Accessing Order Document..." />;

    if (!data) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Order Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/orders")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Registry
                </Button>
            </Box>
        );
    }

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

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    {/* Header Actions */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} className="no-print">
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/orders")}
                            sx={{
                                color: "#64748b",
                                fontWeight: 600,
                                textTransform: "none",
                                bgcolor: "rgba(255,255,255,0.8)",
                                px: 2,
                                borderRadius: '12px',
                                backdropFilter: "blur(4px)",
                                border: '1px solid #e2e8f0',
                                "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                            }}
                        >
                            Back to Registry
                        </Button>

                        <Stack direction="row" spacing={1.5}>
                            <Tooltip title="Print Order">
                                <Button
                                    variant="outlined"
                                    startIcon={<Print />}
                                    onClick={() => window.print()}
                                    sx={{
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        color: "#475569",
                                        borderColor: "#e2e8f0",
                                        bgcolor: "white",
                                        "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                                    }}
                                >
                                    Print
                                </Button>
                            </Tooltip>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => {/* Handle modify action */ }}
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                                    boxShadow: "0 4px 12px rgba(17, 114, 186, 0.25)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #0d5a94 0%, #0a4571 100%)",
                                        boxShadow: "0 6px 16px rgba(17, 114, 186, 0.35)",
                                    },
                                }}
                            >
                                Modify Order
                            </Button>
                        </Stack>
                    </Stack>

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
                                {/* Decorative Header Gradient */}
                                <Box sx={{ height: 6, background: "linear-gradient(90deg, #1172ba 0%, #60a5fa 100%)" }} />

                                <Box sx={{ p: { xs: 3, md: 5 } }}>
                                    {/* Document Header */}
                                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={4} sx={{ mb: 6 }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={900} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                                                CUSTOMER ORDER
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                                                Sales & Dispatch Registry
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip
                                                    label={orderNo}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: "#f1f5f9",
                                                        color: "#0f172a",
                                                        borderRadius: '8px',
                                                        fontSize: '0.95rem'
                                                    }}
                                                />
                                                <Chip
                                                    label={status || "PENDING"}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: status === "Completed" ? "#dcfce7" : "#fff7ed",
                                                        color: status === "Completed" ? "#166534" : "#c2410c",
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Stack spacing={2} sx={{ minWidth: 280 }}>
                                            <InfoItem
                                                icon={Event}
                                                label="Order Date"
                                                value={orderDate}
                                            />
                                            <InfoItem
                                                icon={LocalMall}
                                                label="Delivery Target"
                                                value={deliveryDate}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ mb: 5, opacity: 0.6 }} />

                                    {/* Customer & Address Grid */}
                                    <Grid container spacing={3} sx={{ mb: 6 }}>
                                        <Grid size={{ xs: 6, sm: 4 }}>
                                            <InfoItem icon={Person} label="Attn. Customer" value={customerName} />
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 4 }}>
                                            <InfoItem icon={ContactPhone} label="Contact Point" value={contact} />
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 4 }}>
                                            <InfoItem icon={Home} label="Shipping Destination" value={address} />
                                        </Grid>
                                    </Grid>

                                    {/* Kit Components Section */}
                                    <Box sx={{ mb: 5 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Inventory sx={{ color: '#1172ba' }} /> Standard Kit Allocation (D8)
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>
                                                {kitQty} Kits Reserved
                                            </Typography>
                                        </Stack>
                                        <Box sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(200px, 1fr))' },
                                            gap: 2
                                        }}>
                                            {[
                                                "Scanbo D8 Device", "BP Cuffs", "Large BP Cuff",
                                                "Glucose Bottles", "Lancet Pouch", "Lancet Pen",
                                                "USB Cable", "Plastic Shield", "Scanbo Jute Bag"
                                            ].map((comp, idx) => (
                                                <Box key={idx} sx={{
                                                    p: 2,
                                                    borderRadius: 3,
                                                    border: '1px solid #f1f5f9',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                    bgcolor: '#f8fafc',
                                                    transition: 'all 0.2s',
                                                    "&:hover": {
                                                        borderColor: '#e2e8f0',
                                                        bgcolor: '#fff',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                                    }
                                                }}>
                                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#94a3b8' }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155", fontSize: '0.9rem' }}>{comp}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>

                                    {/* Additional Items Section */}
                                    {singleProducts.length > 0 && (
                                        <Box sx={{ mb: 2 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                                <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <ShoppingCart sx={{ color: '#1172ba' }} /> Additional Individual Items
                                                </Typography>
                                            </Stack>
                                            <Box sx={{
                                                display: 'grid',
                                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(250px, 1fr))' },
                                                gap: 2
                                            }}>
                                                {singleProducts.map((p, idx) => (
                                                    <Box key={idx} sx={{
                                                        p: 2.5,
                                                        borderRadius: 3,
                                                        border: '1px solid #e2e8f0',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        bgcolor: '#fff'
                                                    }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1172ba' }} />
                                                            <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b" }}>{p.name}</Typography>
                                                        </Box>
                                                        <Chip label={`${p.quantity} Units`} size="small" sx={{ fontWeight: 700, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px' }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Sidebar / Authorization Area */}
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <Stack spacing={3}>
                                {/* Summary Card */}
                                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Description sx={{ color: '#1172ba', fontSize: 20 }} /> Order Summary
                                    </Typography>

                                    <Stack spacing={3}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Total Items</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>{products || 0}</Typography>
                                        </Stack>
                                        <Divider borderStyle="dashed" />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="#64748b" fontWeight={600}>Total Kits</Typography>
                                            <Typography variant="h6" color="#0f172a" fontWeight={800}>{kitQty || 0}</Typography>
                                        </Stack>
                                        <Divider borderStyle="dashed" />
                                        <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px dashed #bbf7d0', mt: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                                <FactCheck sx={{ color: '#166534', fontSize: 18 }} />
                                                <Typography variant="caption" sx={{ color: "#166534", fontWeight: 800, textTransform: "uppercase" }}>Verification</Typography>
                                            </Stack>
                                            <Typography variant="caption" sx={{ color: "#166534", fontWeight: 600, fontStyle: "italic", lineHeight: 1.4, display: 'block' }}>
                                                &quot;Finalized registry. Order verified for dispatch.&quot;
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Button
                                        onClick={() => router.push(`/invoices/generate-invoice?orderId=${id}`)}
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<Receipt />}
                                        sx={{ mt: 3, borderRadius: '10px', textTransform: 'none', fontWeight: 700, borderColor: '#e2e8f0', color: '#475569' }}
                                    >
                                        Generate Invoice
                                    </Button>
                                </Paper>

                                {/* System Info */}
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VerifiedUser sx={{ color: '#1172ba', fontSize: 20 }} /> System Info
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Ref ID</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{reference || "N/A"}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="caption" fontWeight={700} color="#64748b">Order ID</Typography>
                                            <Typography variant="caption" fontWeight={900} color="#0f172a" sx={{ fontFamily: 'monospace' }}>{id ? id.substring(0, 8) : 'N/A'}</Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Print Context Styles */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-item.lg-3 { display: none !important; }
                            .MuiGrid-item.lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                        }
                    `}} />
                </Container>
            </Box>
        </Fade>
    );
}
