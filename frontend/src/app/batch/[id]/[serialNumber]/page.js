"use client";
import React, { Suspense } from 'react';
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Container,
    Grid,
    Fade
} from '@mui/material';

import Loader from "@/components/ui/Loader";
import DeviceHeaderActions from "./components/DeviceHeaderActions";
import DeviceManifest from "./components/DeviceManifest";
import DeviceSidebar from "./components/DeviceSidebar";

function DeviceDetailsContent() {
    const params = useParams();
    const router = useRouter();
    const serialNumber = params?.serialNumber;

    if (!serialNumber) return <Loader fullPage message="Loading Device..." />;

    // Extract basic info from serial
    const modelCode = serialNumber.substring(0, 3);
    const dateCode = serialNumber.substring(3, 7);

    // Format manufacturing date from dateCode (YYMM format)
    const year = `20${dateCode.substring(0, 2)}`;
    const month = dateCode.substring(2, 4);
    const mfgDate = `${month}/${year}`;

    // Mock batch info
    const mockBatchNo = `BAT-${year}-${serialNumber.substring(7, 9)}${serialNumber.substring(9, 11)}`;

    // Mock customer data for demonstration
    const mockCustomer = {
        name: "TechGlobal Solutions Pvt Ltd",
        address: "Unit 402, Business Bay, Lower Parel, Mumbai, Maharashtra 400013",
        contactPerson: "Rahul Sharma",
        email: "procurement@techglobal.com",
        phone: "+91 98765 43210",
        dispatchDate: "12 Feb 2026",
        status: "Dispatched",
        awb: "AWB-88779900"
    };

    return (
        <Fade in>
            <Box sx={{ bgcolor: "var(--bg-body)", minHeight: "100vh" }}>
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, md: 1 } }}>
                    <DeviceHeaderActions
                        onBack={() => router.back()}
                        onPrint={() => window.print()}
                        serialNumber={serialNumber}
                    />

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 9 }}>
                            <DeviceManifest
                                serialNumber={serialNumber}
                                modelCode={modelCode}
                                batchNo={mockBatchNo}
                                mfgDate={mfgDate}
                                customer={mockCustomer}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 3 }}>
                            <DeviceSidebar customer={mockCustomer} />
                        </Grid>
                    </Grid>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            .no-print { display: none !important; }
                            body { background: white !important; }
                            .MuiContainer-root { max-width: 100% !important; padding: 0 !important; }
                            .MuiPaper-root { border: none !important; box-shadow: none !important; }
                            .MuiGrid-item.lg-3, .MuiGrid-grid-lg-3 { display: none !important; }
                            .MuiGrid-item.lg-9, .MuiGrid-grid-lg-9 { width: 100% !important; max-width: 100% !important; flex-basis: 100% !important; }
                        }
                    `}} />
                </Container>
            </Box>
        </Fade>
    );
}

export default function DeviceDetailsPage() {
    return (
        <Suspense fallback={<Loader fullPage message="Loading Device..." />}>
            <DeviceDetailsContent />
        </Suspense>
    );
}
