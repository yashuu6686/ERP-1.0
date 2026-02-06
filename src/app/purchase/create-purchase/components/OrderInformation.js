import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormikContext } from "formik";

import Description from "@mui/icons-material/Description";
import CalendarToday from "@mui/icons-material/CalendarToday";
import LocalShipping from "@mui/icons-material/LocalShipping";

const OrderInformation = () => {
    const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext();

    return (
        <Card
            sx={{
                mb: 4,
                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                border: "1px solid #e9ecef",
                borderRadius: 2,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 3, color: "#2d3748" }}
                >
                    Order Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="PO Number"
                            placeholder="2024001"
                            name="orderInfo.orderNumber"
                            value={values.orderInfo.orderNumber}
                            onChange={(e) => setFieldValue("orderInfo.orderNumber", e.target.value)}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onBlur={handleBlur}
                            error={touched.orderInfo?.orderNumber && Boolean(errors.orderInfo?.orderNumber)}
                            helperText={touched.orderInfo?.orderNumber && errors.orderInfo?.orderNumber}
                            InputProps={{
                                inputMode: 'numeric',
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Description sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "white",
                                    "&:hover": {
                                        "& > fieldset": { borderColor: "#1172ba" },
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Order Date"
                            name="orderInfo.orderDate"
                            value={values.orderInfo.orderDate}
                            onChange={(e) => setFieldValue("orderInfo.orderDate", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.orderInfo?.orderDate && Boolean(errors.orderInfo?.orderDate)}
                            helperText={touched.orderInfo?.orderDate && errors.orderInfo?.orderDate}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarToday sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Expected Delivery"
                            name="orderInfo.expectedDelivery"
                            value={values.orderInfo.expectedDelivery}
                            onChange={(e) => setFieldValue("orderInfo.expectedDelivery", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.orderInfo?.expectedDelivery && Boolean(errors.orderInfo?.expectedDelivery)}
                            helperText={touched.orderInfo?.expectedDelivery && errors.orderInfo?.expectedDelivery}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalShipping sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": { bgcolor: "white" },
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderInformation;
