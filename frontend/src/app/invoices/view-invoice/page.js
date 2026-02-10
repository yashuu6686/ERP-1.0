"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Schedule from "@mui/icons-material/Schedule";


import Loader from "../../../components/ui/Loader";
import axiosInstance from "@/axios/axiosInstance";
import InvoiceHeaderActions from "./components/InvoiceHeaderActions";
import InvoiceDocument from "./components/InvoiceDocument";
import InvoiceSidebar from "./components/InvoiceSidebar";

function ViewInvoiceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/invoices/${id}`);
                setInvoice(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvoiceDetails();
        }
    }, [id]);

    if (loading) {
        return <Loader fullPage message="Accessing Financial Ledger..." />;
    }

    if (!invoice) {
        return (
            <Box sx={{ p: 4, textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Invoice Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/invoices")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to Invoices
                </Button>
            </Box>
        );
    }

    const invoiceInfo = invoice.invoiceInfo || {};
    const customer = invoice.customer || {};
    const delivery = invoice.delivery || {};
    const notes = invoice.notes || {};

    // Support both 'items' and 'products' naming
    const rawItems = invoice.items || invoice.products || [];
    const items = rawItems.map(item => ({
        ...item,
        name: item.name || item.itemName || "Unnamed Item",
        qty: item.qty || item.quantity || 0,
        price: item.price || 0,
        taxPercent: item.taxPercent || 0,
        taxAmount: item.taxAmount || 0,
        total: item.total || item.amount || 0
    }));

    // Support both 'totals' and 'summary' naming
    const totals = {
        subtotal: invoice.totals?.subtotal ?? invoice.summary?.subtotal ?? 0,
        taxAmount: invoice.totals?.taxAmount ?? invoice.summary?.tax ?? 0,
        discountAmount: invoice.totals?.discountAmount ?? invoice.summary?.discount ?? 0,
        grandTotal: invoice.totals?.grandTotal ?? invoice.summary?.total ?? 0
    };

    const status = invoice.status || "Draft";
    const paymentStatus = invoice.paymentStatus || "Unpaid";

    const getPaymentChip = (pStatus) => {
        const configs = {
            Paid: { color: "#166534", bg: "#dcfce7", label: "PAID", icon: <CheckCircle sx={{ fontSize: '16px !important' }} /> },
            Partial: { color: "#b45309", bg: "#fef3c7", label: "PARTIAL", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
            Unpaid: { color: "#991b1b", bg: "#fee2e2", label: "UNPAID", icon: <Schedule sx={{ fontSize: '16px !important' }} /> },
        };
        const config = configs[pStatus] || configs.Unpaid;

        return (
            <Chip
                icon={config.icon}
                label={config.label}
                sx={{
                    fontWeight: 700,
                    bgcolor: config.bg,
                    color: config.color,
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    height: 28,
                    '& .MuiChip-icon': { color: 'inherit' }
                }}
            />
        );
    };

    return (
        <Fade in={!loading}>
            <Box>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 0 } }}>
                    <InvoiceHeaderActions
                        onBack={() => router.push("/invoices")}
                        onDownload={() => {/* Handle download */ }}
                        onPrint={() => window.print()}
                        onEdit={() => {/* Handle edit */ }}
                    />

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 9 }}>
                            <InvoiceDocument
                                invoice={invoice}
                                invoiceInfo={invoiceInfo}
                                customer={customer}
                                delivery={delivery}
                                items={items}
                                notes={notes}
                                getPaymentChip={getPaymentChip}
                                paymentStatus={paymentStatus}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <InvoiceSidebar
                                totals={totals}
                                invoiceInfo={invoiceInfo}
                                status={status}
                            />
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

export default function ViewInvoicePage() {
    return (
        <Suspense fallback={<Loader fullPage message="Accessing Financial Ledger..." />}>
            <ViewInvoiceContent />
        </Suspense>
    );
}
