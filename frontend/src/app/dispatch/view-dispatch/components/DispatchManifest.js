"use client";
import React from "react";
import {
    Box,
    Paper,
    Stack,
    Typography,
    Chip,
    Divider,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import {
    Inventory,
    Category,
    Assignment,
    Fingerprint,
    Public,
    Apartment,
    AssignmentTurnedIn,
    LocalShipping,
    Schedule,
    Explore,
    Business,
    Map,
    Person,
    Phone,
    Mail
} from "@mui/icons-material";
import DispatchInfoItem from "./DispatchInfoItem";

export default function DispatchManifest({ shipmentInfo, customer, items, status, getStatusChip, packedBy, approvedBy, accountingBy }) {
    return (
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

            <Box sx={{ p: { xs: 3, md: 2 } }}>
                {/* Document Header */}
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 3 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800} sx={{ color: "#0f172a", letterSpacing: "-0.04em", mb: 1 }}>
                            DISPATCH MANIFEST
                        </Typography>
                        <Typography variant="h6" fontWeight={600} sx={{ color: "#64748b", mb: 2.5 }}>
                            Logistics & Shipment Details
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={shipmentInfo.trackingNumber}
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: "#f1f5f9",
                                    color: "#0f172a",
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    fontFamily: 'monospace'
                                }}
                            />
                            {getStatusChip(status)}
                        </Stack>
                    </Box>

                    <Stack spacing={2} sx={{ minWidth: 260 }}>
                        <DispatchInfoItem
                            icon={LocalShipping}
                            label="Carrier"
                            value={shipmentInfo.carrier}
                        />
                        <DispatchInfoItem
                            icon={Schedule}
                            label="Expected Delivery"
                            value={new Date(shipmentInfo.expectedDelivery).toLocaleDateString()}
                        />
                    </Stack>
                </Stack>

                <Divider sx={{ mb: 3, opacity: 0.6 }} />

                {/* Logistics & Destination */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    {/* Left Side: Logistics Info */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                <Explore sx={{ color: '#1172ba' }} /> LOGISTICS INFO
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack spacing={2.5}>
                                        <DispatchInfoItem icon={Business} label="Sales Platform" value={shipmentInfo.platform} />
                                        <DispatchInfoItem icon={Schedule} label="Ship Date" value={new Date(shipmentInfo.shippingDate).toLocaleDateString()} />
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Stack spacing={2.5}>
                                        <DispatchInfoItem icon={Assignment} label="Reference No" value={shipmentInfo.orderNumber} />
                                        <DispatchInfoItem icon={LocalShipping} label="Carrier" value={shipmentInfo.carrier} />
                                    </Stack>
                                </Grid>
                                <Grid size={{ md: 12 }}>
                                    <Box sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: '#f8fafc', border: '1px dashed #cbd5e1' }}>
                                        <Typography variant="caption" color="#64748b" fontWeight={700} sx={{ display: 'block', mb: 1 }}>TRACKING ID</Typography>
                                        <Typography variant="h6" fontWeight={700} color="#1172ba" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                                            {shipmentInfo.trackingNumber}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Right Side: Shipping Type & Destination Stacked */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2} sx={{ height: '100%' }}>
                            <Box sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff', flex: 1 }}>
                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                    <Category sx={{ color: '#1172ba' }} /> SHIPPING TYPE
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <DispatchInfoItem icon={Category} label="Type" value={shipmentInfo.shipmentType || "Commercial"} />
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <DispatchInfoItem icon={Fingerprint} label="UDI" value={shipmentInfo.udi} />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Stack direction="row" spacing={3}>
                                            <DispatchInfoItem icon={Public} label="Country/Market" value={shipmentInfo.countryMarket} />
                                            {shipmentInfo.shipmentType === "Non-Commercial" && (
                                                <DispatchInfoItem icon={Assignment} label="Purpose" value={shipmentInfo.shipmentPurpose} />
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#fff', flex: 1 }}>
                                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0f172a' }}>
                                    <Map sx={{ color: '#1172ba' }} /> DESTINATION
                                </Typography>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="body1" fontWeight={700} color="#1e293b">{customer.companyName}</Typography>
                                        <Typography variant="body2" color="#64748b" sx={{ lineHeight: 1.6 }}>{customer.address}</Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Person sx={{ fontSize: 16, color: '#1172ba' }} />
                                                <Box>
                                                    <Typography variant="caption" color="#64748b" fontWeight={700} sx={{ display: 'block' }}>CONTACT</Typography>
                                                    <Typography variant="body2" fontWeight={600}>{customer.contactPerson}</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Phone sx={{ fontSize: 16, color: '#1172ba' }} />
                                                <Box>
                                                    <Typography variant="caption" color="#64748b" fontWeight={700} sx={{ display: 'block' }}>PHONE</Typography>
                                                    <Typography variant="body2" fontWeight={600}>{customer.phone}</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Mail sx={{ fontSize: 16, color: '#1172ba' }} />
                                                <Box>
                                                    <Typography variant="caption" color="#64748b" fontWeight={700} sx={{ display: 'block' }}>EMAIL</Typography>
                                                    <Typography variant="body2" fontWeight={600}>{customer.email}</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Additional Info (Distributor / Canada) */}
                {(shipmentInfo.suppliedViaDistributor || shipmentInfo.shippedToCanadianSite) && (
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        {shipmentInfo.suppliedViaDistributor && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: 2, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Business sx={{ color: '#1172ba' }} />
                                        <Box>
                                            <Typography variant="caption" color="#64748b" fontWeight={700}>DISTRIBUTOR ID</Typography>
                                            <Typography variant="body1" fontWeight={700} color="#1e293b">{shipmentInfo.distributorId}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Grid>
                        )}
                        {shipmentInfo.shippedToCanadianSite && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: 2, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Apartment sx={{ color: '#1172ba' }} />
                                        <Box>
                                            <Typography variant="caption" color="#64748b" fontWeight={700}>CANADIAN SITE SHIPMENT DATE</Typography>
                                            <Typography variant="body1" fontWeight={700} color="#1e293b">{new Date(shipmentInfo.dateOfShipmentToCanadianSite).toLocaleDateString()}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )}

                {/* Items Table */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Inventory sx={{ color: '#1172ba' }} /> Shipment Contents
                        </Typography>
                    </Stack>

                    <TableContainer sx={{ borderRadius: 3, border: '1px solid #f1f5f9' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SR.NO</TableCell>
                                    <TableCell sx={{ fontWeight: 800, color: "#475569", py: 2 }}>ITEM DESCRIPTION</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>SERIAL NO</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>WEIGHT</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 2 }}>QTY</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, idx) => (
                                    <TableRow key={idx} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                        <TableCell sx={{ color: "#94a3b8", fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{item.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontFamily: 'monospace', color: "#64748b", fontWeight: 600 }}>
                                            {item.serialNo || "-"}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "#64748b", fontWeight: 600 }}>
                                            {item.weight || "-"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip label={item.qty} size="small" sx={{ fontWeight: 800, bgcolor: "#eff6ff", color: "#1172ba", borderRadius: '6px' }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!items || items.length === 0) && (
                                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8", fontStyle: "italic" }}>No items in shipment.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

                {/* Personnel Info */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <AssignmentTurnedIn sx={{ color: '#1172ba' }} /> Personnel & Approvals
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <DispatchInfoItem icon={Person} label="Packed By" value={packedBy} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <DispatchInfoItem icon={AssignmentTurnedIn} label="Approved By" value={approvedBy} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <DispatchInfoItem icon={Business} label="Accounting By" value={accountingBy} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    );
}
