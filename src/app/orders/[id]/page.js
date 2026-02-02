"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    Chip,
    Divider,
    Button,
    Paper,
    Avatar,
    Stack,
} from "@mui/material";
import {
    ArrowBack,
    Assignment,
    Person,
    ContactPhone,
    Home,
    Event,
    LocalMall,
    Info,
    Print as PrintIcon,
    Share,
    ShoppingCart,
    Analytics,
    Receipt,
    Description
} from "@mui/icons-material";
import axiosInstance from "../../../axios/axiosInstance";
import Loader from "../../../components/Loader";

// Professional Corporate Palette
const COLORS = {
    primary: "#0f172a",    // deep slate
    secondary: "#64748b",  // muted slate
    accent: "#334155",     // medium slate
    border: "#e2e8f0",     // light gray border
    bg: "#f8fafc",         // off-white bg
    brand: "#1172ba",      // company blue
    status: {
        success: "#059669",// emerald 600
        warning: "#d97706",// amber 600
        error: "#dc2626",  // red 600
        neutral: "#475569" // slate 600
    }
};

const SectionHeader = ({ icon: Icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Icon sx={{ fontSize: 20, color: COLORS.accent }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: COLORS.primary, letterSpacing: -0.2 }}>
            {title}
        </Typography>
    </Box>
);

const LabelValue = ({ label, value, subValue, icon: Icon }) => (
    <Box sx={{ mb: 2.5, display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        {Icon && (
            <Box sx={{
                p: 0.75,
                bgcolor: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 1,
                display: "flex",
                mt: 0.5
            }}>
                <Icon sx={{ fontSize: 16, color: COLORS.secondary }} />
            </Box>
        )}
        <Box>
            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: COLORS.primary }}>
                {value || "—"}
            </Typography>
            {subValue && (
                <Typography variant="caption" sx={{ color: COLORS.secondary, display: "block" }}>
                    {subValue}
                </Typography>
            )}
        </Box>
    </Box>
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
    if (!data) return <Box sx={{ p: 4, textAlign: "center", color: COLORS.secondary }}>Secure Data Entry Not Found.</Box>;

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
        <Box sx={{ minHeight: "100vh", bgcolor: COLORS.bg, pb: 10 }}>
            {/* Minimalist Corporate Header */}
            <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${COLORS.border}`, py: 1.5, px: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.push("/orders")}
                            sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}
                        >
                            Registry
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: "center" }} />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.primary, lineHeight: 1 }}>
                                {orderNo}
                            </Typography>
                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 600 }}>
                                {customerName} • {orderDate}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button startIcon={<PrintIcon />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Print</Button>
                        <Button startIcon={<Share />} sx={{ color: COLORS.secondary, textTransform: "none", fontWeight: 600 }}>Share</Button>
                        <Button variant="contained" disableElevation sx={{ bgcolor: COLORS.primary, "&:hover": { bgcolor: COLORS.accent }, textTransform: "none", fontWeight: 700, px: 3 }}>
                            Modify Order
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ px: 4, mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Main Information Section */}
                    <Grid item xs={12}>
                        <Stack spacing={4}>
                            {/* Order & Customer Metadata */}
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}` }}>
                                <SectionHeader icon={Analytics} title="Order Specifications" />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Customer Name" value={customerName} icon={Person} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Contact Point" value={contact} icon={ContactPhone} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Reference ID" value={reference} icon={Receipt} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5 }}>Order Status</Typography>
                                            <Chip
                                                label={status || "PENDING"}
                                                size="small"
                                                sx={{
                                                    borderRadius: 1,
                                                    fontWeight: 800,
                                                    fontSize: "0.65rem",
                                                    bgcolor: status === "Completed" ? COLORS.status.success : COLORS.status.warning,
                                                    color: "#fff"
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Registry Date" value={orderDate} icon={Event} /></Grid>
                                    <Grid item xs={12} sm={6} md={3}><LabelValue label="Delivery Target" value={deliveryDate} icon={Event} /></Grid>
                                    <Grid item xs={12} sm={6} md={6}><LabelValue label="Shipment Address" value={address} icon={Home} /></Grid>
                                </Grid>
                            </Paper>

                            {/* Section: Kit Components & Summary Side-by-Side */}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={9}>
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: `1px solid ${COLORS.border}`, height: "100%" }}>
                                        <SectionHeader icon={LocalMall} title="Included Components (D8 Kit)" />
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700 }}>KIT ALLOCATION: {kitQty} UNITS</Typography>
                                        </Box>
                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 1.5 }}>
                                            {[
                                                "Scanbo D8 Device", "BP Cuffs", "Large BP Cuff",
                                                "Glucose Bottles", "Lancet Pouch", "Lancet Pen",
                                                "USB Cable", "Plastic Shield", "Scanbo Jute Bag"
                                            ].map((comp, idx) => (
                                                <Box key={idx} sx={{
                                                    width: "20rem",
                                                    p: 1.5,
                                                    borderRadius: 1,
                                                    border: `1px solid ${COLORS.border}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    bgcolor: COLORS.bg
                                                }}>
                                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: COLORS.secondary }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary }}>{comp}</Typography>
                                                </Box>
                                            ))}
                                        </Box>

                                        {singleProducts.length > 0 && (
                                            <>
                                                <Divider sx={{ my: 4 }} />
                                                <SectionHeader icon={ShoppingCart} title="Additional Individual Items" />
                                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 1.5 }}>
                                                    {singleProducts.map((p, idx) => (
                                                        <Box key={idx} sx={{
                                                            p: 1.5,
                                                            borderRadius: 1,
                                                            border: `1px solid ${COLORS.border}`,
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            bgcolor: COLORS.bg
                                                        }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: COLORS.brand }} />
                                                                <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary }}>{p.name}</Typography>
                                                            </Box>
                                                            <Typography variant="caption" sx={{ fontWeight: 800, color: COLORS.brand }}>{p.quantity} UNITS</Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </>
                                        )}
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 1, border: `1px solid ${COLORS.border}`, height: "100%", bgcolor: "#fff" }}>
                                        <SectionHeader icon={Description} title="Registry Summary" />
                                        <Stack spacing={2.5}>
                                            <Box sx={{ p: 2, bgcolor: COLORS.bg, borderLeft: `4px solid ${COLORS.brand}`, borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 0.5 }}>TOTAL ITEMS</Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.primary }}>{products || 0}</Typography>
                                            </Box>

                                            <Box sx={{ p: 2, bgcolor: COLORS.bg, borderLeft: `4px solid ${COLORS.accent}`, borderRadius: 1 }}>
                                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 0.5 }}>KIT QTY</Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.primary }}>{kitQty || 0}</Typography>
                                            </Box>

                                            <Divider />

                                            <Box>
                                                <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 700, display: "block", mb: 1 }}>NOTICE</Typography>
                                                <Typography variant="caption" sx={{ color: COLORS.primary, lineHeight: 1.5, fontWeight: 500, fontStyle: "italic", display: "block", bgcolor: COLORS.bg, p: 1.5, borderRadius: 1 }}>
                                                    "Finalized registry. Verified."
                                                </Typography>
                                            </Box>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                disableElevation
                                                sx={{ mt: 1, textTransform: "none", fontWeight: 700, bgcolor: COLORS.primary, "&:hover": { bgcolor: COLORS.accent }, fontSize: "0.8rem" }}
                                            >
                                                Get Invoice
                                            </Button>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
