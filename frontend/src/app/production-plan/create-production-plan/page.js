"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    Divider,
    Chip,
    Card,
    CardContent,
    Autocomplete,
} from "@mui/material";
import {
    Save,
    Inventory,
    Numbers,
    Description,
    CalendarToday,
    VerifiedUser,
} from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Loader from "@/components/ui/Loader";
import CommonCard from "@/components/ui/CommonCard";
import { useNotification } from "@/context/NotificationContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductionPlanPreviewDialog from "./components/ProductionPlanPreviewDialog";

const FormSectionHeader = ({ icon, title }) => (
    <Box
        sx={{
            p: 2,
            background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
        }}
    >
        {React.cloneElement(icon, { sx: { color: "#fff", fontSize: 20 } })}
        <Typography color="white" variant="subtitle1" fontWeight={600}>
            {title}
        </Typography>
    </Box>
);

const StyledCard = ({ children, icon, title }) => (
    <Card
        elevation={0}
        sx={{
            // height: "100%",
            borderRadius: 2,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            mb: 3,
        }}
    >
        <FormSectionHeader icon={icon} title={title} />
        <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
            {children}
        </CardContent>
    </Card>
);

export default function CreateProductionPlan() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [boms, setBoms] = useState([]);

    const initialValues = {
        productName: "",
        bomNo: "",
        quantity: "",
        serialNoFrom: "",
        serialNoTo: "",
        finalAssyName: "",
        plannedQty: "",
        startDate: new Date().toISOString().split('T')[0],
        targetDate: "",
        remarks: "",
        reviewedBy: "",
        approvedBy: "",
        status: "Pending",
    };

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required("Product Name is required"),
        bomNo: Yup.string().required("BOM Number is required"),
        quantity: Yup.number().typeError("Must be a number").required("Qty is required"),
        serialNoFrom: Yup.string().required("Serial No From is required"),
        serialNoTo: Yup.string().required("Serial No To is required"),
        finalAssyName: Yup.string().required("Final Assy Name is required"),
        plannedQty: Yup.number().typeError("Must be a number").required("Planned Qty is required"),
        startDate: Yup.date().required("Start Date is required"),
        targetDate: Yup.date().required("Target Date is required"),
        reviewedBy: Yup.string().required("Reviewed By is required"),
        approvedBy: Yup.string().required("Approved By is required"),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                if (id) {
                    await axiosInstance.put(`/productionPlans/${id}`, values);
                    showNotification("Production Plan updated successfully!", "success");
                } else {
                    await axiosInstance.post("/productionPlans", values);
                    showNotification("Production Plan created successfully!", "success");
                }
                router.push("/production-plan");
            } catch (error) {
                console.error("Error saving production plan:", error);
                showNotification("Failed to save production plan.", "error");
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        const fetchBOMs = async () => {
            try {
                const response = await axiosInstance.get("/bom");
                setBoms(response.data || []);
            } catch (error) {
                console.error("Error fetching BOMs:", error);
            }
        };
        fetchBOMs();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchPlan = async () => {
                try {
                    setFetching(true);
                    const response = await axiosInstance.get(`/production-plans/${id}`);
                    formik.setValues(response.data);
                } catch (error) {
                    console.error("Failed to fetch plan:", error);
                    showNotification("Failed to load plan details.", "error");
                } finally {
                    setFetching(false);
                }
            };
            fetchPlan();
        }
    }, [id]);

    if (fetching) return <Loader message="Fetching plan details..." />;

    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "white",
            "&:hover > fieldset": { borderColor: "#1172ba" },
        }
    };

    return (
        <Box >
            <CommonCard
                title={id ? "Edit Production Plan" : "New Production Plan"}
            >
                <Box sx={{ mt: 2, p: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} size={{ xs: 12, md: 7.4, lg: 7.4, xl: 7.4 }}>
                            <StyledCard icon={<Inventory />} title="Production Details">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8} size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
                                        <Autocomplete
                                            fullWidth
                                            options={boms}
                                            getOptionLabel={(option) => option.productName || ""}
                                            value={boms.find(b => b.productName === formik.values.productName) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("productName", newValue ? newValue.productName : "");
                                                formik.setFieldValue("bomNo", newValue ? newValue.number : "");
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Product Name"
                                                    required
                                                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                                                    helperText={formik.touched.productName && formik.errors.productName}
                                                    sx={inputStyles}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="BOM Number"
                                            name="bomNo"
                                            value={formik.values.bomNo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.bomNo && Boolean(formik.errors.bomNo)}
                                            helperText={formik.touched.bomNo && formik.errors.bomNo}
                                            required
                                            slotProps={{ input: { readOnly: true } }}
                                            placeholder="Select product to auto-fill"
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Quantity"
                                            name="quantity"
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                            helperText={formik.touched.quantity && formik.errors.quantity}
                                            required
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Planned Qty"
                                            name="plannedQty"
                                            value={formik.values.plannedQty}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.plannedQty && Boolean(formik.errors.plannedQty)}
                                            helperText={formik.touched.plannedQty && formik.errors.plannedQty}
                                            required
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                </Grid>
                            </StyledCard>

                            <StyledCard icon={<Numbers />} title="Serial Number Tracking">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Serial No From"
                                            name="serialNoFrom"
                                            value={formik.values.serialNoFrom}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.serialNoFrom && Boolean(formik.errors.serialNoFrom)}
                                            helperText={formik.touched.serialNoFrom && formik.errors.serialNoFrom}
                                            required
                                            placeholder="e.g. SN001"
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Serial No To"
                                            name="serialNoTo"
                                            value={formik.values.serialNoTo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.serialNoTo && Boolean(formik.errors.serialNoTo)}
                                            helperText={formik.touched.serialNoTo && formik.errors.serialNoTo}
                                            required
                                            placeholder="e.g. SN050"
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                </Grid>
                            </StyledCard>

                            <StyledCard icon={<Description />} title="Remarks & Extra Info">
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Plan Remarks"
                                    name="remarks"
                                    value={formik.values.remarks}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Add any specific instructions or notes for the production team..."
                                    sx={inputStyles}
                                />
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={4} size={{ xs: 12, md: 4.6, lg: 4.6, xl: 4.6 }}>
                            <StyledCard icon={<CalendarToday />} title="Timeline">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} size={{ xs: 12, md: 12, lg: 12, xl: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Final Assy Name"
                                            name="finalAssyName"
                                            value={formik.values.finalAssyName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.finalAssyName && Boolean(formik.errors.finalAssyName)}
                                            helperText={formik.touched.finalAssyName && formik.errors.finalAssyName}
                                            required
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Start Date"
                                            name="startDate"
                                            value={formik.values.startDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                            helperText={formik.touched.startDate && formik.errors.startDate}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Target Date"
                                            name="targetDate"
                                            value={formik.values.targetDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.targetDate && Boolean(formik.errors.targetDate)}
                                            helperText={formik.touched.targetDate && formik.errors.targetDate}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                            sx={inputStyles}
                                        />
                                    </Grid>

                                </Grid>
                            </StyledCard>

                            <StyledCard icon={<VerifiedUser />} title="Approvals">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Reviewed By"
                                            name="reviewedBy"
                                            value={formik.values.reviewedBy}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.reviewedBy && Boolean(formik.errors.reviewedBy)}
                                            helperText={formik.touched.reviewedBy && formik.errors.reviewedBy}
                                            required
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid item xs={12} size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Approved By"
                                            name="approvedBy"
                                            value={formik.values.approvedBy}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.approvedBy && Boolean(formik.errors.approvedBy)}
                                            helperText={formik.touched.approvedBy && formik.errors.approvedBy}
                                            required
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                </Grid>
                            </StyledCard>


                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/production-plan")}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                borderColor: "#e2e8f0",
                                color: "#64748b",
                                px: 3,
                                "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={() => {
                                formik.validateForm().then((errors) => {
                                    if (Object.keys(errors).length === 0) {
                                        setPreviewOpen(true);
                                    } else {
                                        formik.handleSubmit(); // Trigger validation messages
                                    }
                                });
                            }}
                            disabled={loading}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "#1172ba",
                                px: 4,
                                "&:hover": { bgcolor: "#0d5a94" }
                            }}
                        >
                            {loading ? "Saving..." : id ? "Update Plan" : "Review & Save"}
                        </Button>
                    </Box>
                </Box>
            </CommonCard>
            <ProductionPlanPreviewDialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                onConfirm={formik.handleSubmit}
                values={formik.values}
                loading={loading}
            />
        </Box>
    );
}
