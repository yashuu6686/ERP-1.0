"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Fade, Typography, Button, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";

// Import modular components
import TransferSlipHeader from "./components/TransferSlipHeader";
import TransferSlipManifest from "./components/TransferSlipManifest";
import TransferSlipItems from "./components/TransferSlipItems";
import TransferSlipSidebar from "./components/TransferSlipSidebar";

function ViewTransferSlipContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [slip, setSlip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlipDetails = async () => {
            try {
                setLoading(true);
                // Mock data for demonstration - in production, fetch from API
                // const response = await axiosInstance.get(`/rejection-transfer-slips/${id}`);
                // setSlip(response.data);

                const mockSlip = {
                    id: id,
                    status: "Completed",
                    batchReceivedDate: "2026-02-13",
                    bmrNo: "BMR/2026/001",
                    batchNo: "BATCH-456",
                    serialNo: "SN-999",
                    productName: "Product A",
                    batchQty: 500,
                    mfgDate: "2026-01-01",
                    expiryDate: "2027-01-01",
                    reviewedBy: "John Doe",
                    approvedBy: "Jane Smith",
                    items: [
                        { description: "Raw Material X", batchNo: "RM-101", qtyIssued: 100, qtyReceived: 98, remarks: "2 units short" },
                        { description: "Packaging Material Y", batchNo: "PM-202", qtyIssued: 50, qtyReceived: 50, remarks: "All good" }
                    ]
                };

                setTimeout(() => {
                    setSlip(mockSlip);
                    setLoading(false);
                }, 500);

            } catch (error) {
                console.error("Fetch Error:", error);
                setSlip(null);
                setLoading(false);
            }
        };

        if (id) {
            fetchSlipDetails();
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) return <Loader fullPage message="Loading Transfer Slip Details..." />;

    if (!slip) {
        return (
            <Box sx={{ p: 4, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" color="error" fontWeight={600}>Transfer Slip Not Found</Typography>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.push("/rejection-transfer-slip")} sx={{ mt: 3, borderRadius: '12px', textTransform: 'none' }}>
                    Back to List
                </Button>
            </Box>
        );
    }

    return (
        <Fade in={!loading}>
            <Box >
                <TransferSlipHeader
                    id={id}
                    productName={slip.productName}
                    router={router}
                    onPrint={() => window.print()}
                />

                <Grid container spacing={2}>
                    {/* Main Content Area */}
                    <Grid item size={{ xs: 12, lg: 9 }}>
                        <TransferSlipManifest slip={slip} />
                        <TransferSlipItems items={slip.items} />
                    </Grid>

                    {/* Sidebar Area */}
                    <Grid item size={{ xs: 12, lg: 3 }}>
                        <TransferSlipSidebar slip={slip} />
                    </Grid>
                </Grid>

                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; margin: 0; padding: 0; }
                        .MuiContainer-root { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
                        .MuiPaper-root { border: none !important; box-shadow: none !important; }
                        .MuiGrid-container { display: block !important; }
                        .MuiGrid-item, [class*="MuiGrid-size"] { 
                            width: 100% !important; 
                            max-width: 100% !important; 
                            flex-basis: 100% !important;
                            margin-bottom: 20px !important;
                        }
                    }
                `}</style>
            </Box>
        </Fade>
    );
}

export default function ViewTransferSlipPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Fetching Transfer Slip..." />}>
            <ViewTransferSlipContent />
        </Suspense>
    );
}
