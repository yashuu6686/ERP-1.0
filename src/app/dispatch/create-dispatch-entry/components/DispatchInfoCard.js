import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Autocomplete,
} from "@mui/material";
import { Description, CalendarToday, LocalShipping } from "@mui/icons-material";

export default function DispatchInfoCard({ formik, orders, onOrderSelect }) {
    return (
        <Card
            sx={{
                mb: 4,
                border: "1px solid #e9ecef",
                borderRadius: 2,
            }}
        >
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
                <Description />
                <Typography variant="h6" color="white" fontWeight={600}>
                    Dispatch Information
                </Typography>
            </Box>
            <CardContent sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <Autocomplete
                            options={orders || []}
                            getOptionLabel={(option) => option.orderNo || option.orderId || option.orderNumber || option.id || ""}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    onOrderSelect?.(newValue);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Order No"
                                    placeholder="Search Order..."
                                    required
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="start">
                                                    <Description sx={{ color: "#1172ba" }} />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
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
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Dispatch No"
                            name="dispatchNo"
                            placeholder="DIS-001"
                            value={formik.values.dispatchNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.dispatchNo && Boolean(formik.errors.dispatchNo)}
                            helperText={formik.touched.dispatchNo && formik.errors.dispatchNo}
                            InputProps={{
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
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Dispatch Date"
                            name="dispatchDate"
                            value={formik.values.dispatchDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.dispatchDate && Boolean(formik.errors.dispatchDate)}
                            helperText={formik.touched.dispatchDate && formik.errors.dispatchDate}
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
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Tracking Number"
                            name="trackingNumber"
                            placeholder="TRK-889900"
                            value={formik.values.trackingNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.trackingNumber && Boolean(formik.errors.trackingNumber)}
                            helperText={formik.touched.trackingNumber && formik.errors.trackingNumber}
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
}
