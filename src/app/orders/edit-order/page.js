"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Save from "@mui/icons-material/Save";
import Assignment from "@mui/icons-material/Assignment";
import Person from "@mui/icons-material/Person";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "../../../axios/axiosInstance";
import CommonCard from "../../../components/ui/CommonCard";
import OrderInformationSection from "../create-new-order/components/OrderInformationSection";
import FullKitSection from "../create-new-order/components/FullKitSection";
import SingleProductSection from "../create-new-order/components/SingleProductSection";
import FormReviewDialog from "@/components/ui/FormReviewDialog";
import { useNotification } from "@/context/NotificationContext";
import Loader from "@/components/ui/Loader";

const validationSchema = Yup.object({
    orderNo: Yup.string().required("Order Number is required"),
    customerName: Yup.string().required("Customer Name is required"),
    orderDate: Yup.date().required("Order Date is required"),
    contact: Yup.string().required("Contact Number is required"),
    address: Yup.string().required("Customer Address is required"),
    deliveryDate: Yup.date().required("Delivery Date is required"),
});

function EditOrderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const formik = useFormik({
        initialValues: {
            orderNo: "",
            customerName: "",
            orderDate: "",
            contact: "",
            address: "",
            deliveryDate: "",
            status: "Pending",
            reference: "",
            kitQty: 0,
            singleProducts: [],
        },
        validationSchema: validationSchema,
        onSubmit: async () => {
            setShowPreview(true);
        },
    });

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/orders/${id}`);
                const data = response.data;
                formik.setValues({
                    orderNo: data.orderNo || "",
                    customerName: data.customerName || "",
                    orderDate: data.orderDate || "",
                    contact: data.contact || "",
                    address: data.address || "",
                    deliveryDate: data.deliveryDate || "",
                    status: data.status || "Pending",
                    reference: data.reference || "",
                    kitQty: data.kitQty || 0,
                    singleProducts: data.singleProducts || [],
                });
            } catch (error) {
                console.error("Error fetching order:", error);
                showNotification("Failed to load order details", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleFinalUpdate = async () => {
        try {
            setSubmitting(true);
            setShowPreview(false);
            const values = formik.values;

            const updatedOrder = {
                ...values,
                products: values.singleProducts.length,
                singleProducts: values.singleProducts.filter(p => p.name || p.quantity),
                updatedAt: new Date().toISOString()
            };

            await axiosInstance.put(`/orders/${id}`, updatedOrder);

            showNotification("Order updated successfully!", "success");
            router.push("/orders");
        } catch (error) {
            console.error("Error updating order:", error);
            showNotification("Failed to update order", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loader fullPage message="Fetching Order Details..." />;

    return (
        <CommonCard title="Edit Order">
            <Box sx={{ p: 1 }}>
                <OrderInformationSection formik={formik} />

                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <FullKitSection formik={formik} />
                        </Grid>
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <SingleProductSection formik={formik} />
                        </Grid>
                    </Grid>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6, gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => router.back()}
                        sx={{
                            px: 4,
                            py: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: "none",
                            borderColor: "#e2e8f0",
                            color: "#64748b",
                            "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={formik.handleSubmit}
                        disabled={submitting}
                        sx={{
                            px: 6,
                            py: 1.2,
                            fontWeight: 500,
                            borderRadius: 2,
                            backgroundColor: "#1172ba",
                            textTransform: "none",
                        }}
                    >
                        {submitting ? "Updating..." : "Update Order"}
                    </Button>
                </Box>
            </Box>

            {/* Global Review Dialog */}
            <FormReviewDialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={handleFinalUpdate}
                title="Review Order Updates"
                icon={<Assignment />}
                headerInfo={{
                    label1: "ORDER NUMBER",
                    value1: `#${formik.values.orderNo}`,
                    label2: "ORDER DATE",
                    value2: formik.values.orderDate
                }}
                confirmLabel="Confirm & Update Order"
            >
                <Grid container spacing={3}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                <Person sx={{ fontSize: 18 }} />
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Details</Typography>
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)' }}>{formik.values.customerName}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Phone: {formik.values.contact}</Typography>
                                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5, lineHeight: 1.5, fontSize: '0.8125rem' }}>{formik.values.address}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', bgcolor: 'var(--bg-surface)' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'var(--brand-primary)' }}>
                                <ShoppingCart sx={{ fontSize: 18 }} />
                                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Order Date: <b>{formik.values.orderDate}</b></Typography>
                                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Delivery Date: <b style={{ color: 'var(--brand-primary)' }}>{formik.values.deliveryDate}</b></Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                        <Paper elevation={0} sx={{ borderRadius: 'var(--card-radius)', border: '1px solid var(--border-default)', overflow: 'hidden', bgcolor: 'var(--bg-surface)' }}>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: 'var(--bg-page)' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>COMPONENTS / PRODUCTS</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>CATEGORY</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 700, py: 2, color: 'var(--text-secondary)' }}>QUANTITY</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ whiteSpace: "pre-line", py: 2, fontWeight: 500 }}>Scanbo Full Kit (includes all standard components)</TableCell>
                                        <TableCell align="center" sx={{ color: 'var(--text-secondary)' }}>Full Kit</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 700 }}>{formik.values.kitQty}</TableCell>
                                    </TableRow>
                                    {formik.values.singleProducts.filter(p => p.name && p.quantity).map((p, idx) => (
                                        <TableRow key={idx} sx={{ '&:last-child td': { border: 0 } }}>
                                            <TableCell sx={{ py: 2, fontWeight: 500 }}>{p.name}</TableCell>
                                            <TableCell align="center" sx={{ color: 'var(--text-secondary)' }}>Additional</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700 }}>{p.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </FormReviewDialog>
        </CommonCard>
    );
}

export default function EditOrder() {
    return (
        <Suspense fallback={<Loader fullPage />}>
            <EditOrderContent />
        </Suspense>
    );
}
