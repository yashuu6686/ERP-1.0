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
    MenuItem,
} from "@mui/material";
import { Description, CalendarToday, LocalShipping, Business, Person, CardGiftcard, Repeat } from "@mui/icons-material";

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
                            value={orders?.find(o => (o.orderNo || o.orderId || o.orderNumber || o.id) === formik.values.referenceNo) || null}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    onOrderSelect?.(newValue);
                                }
                            }}
                            disabled={!!formik.values._isEdit}
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
                                            bgcolor: formik.values._isEdit ? "#f1f5f9" : "white",
                                            "&:hover": {
                                                "& > fieldset": { borderColor: "#1172ba" },
                                            },
                                        },
                                        "& .MuiInputBase-input.Mui-disabled": {
                                            color: "#475569",
                                            WebkitTextFillColor: "#475569",
                                            fontWeight: 600
                                        }
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
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            select
                            label="Shipping Type"
                            name="shipmentType"
                            value={formik.values.shipmentType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.shipmentType && Boolean(formik.errors.shipmentType)}
                            helperText={formik.touched.shipmentType && formik.errors.shipmentType}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalShipping sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "white",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        "& > fieldset": { borderColor: "#1172ba" },
                                        boxShadow: "0 4px 12px rgba(17, 114, 186, 0.08)",
                                    },
                                    "&.Mui-focused": {
                                        "& > fieldset": { borderWidth: "2px" },
                                    }
                                },
                            }}
                        >
                            <MenuItem value="Commercial">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Business sx={{ fontSize: 20, color: "#1172ba" }} />
                                    <Typography variant="body2" fontWeight={500}>Commercial</Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem value="Non-Commercial">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Person sx={{ fontSize: 20, color: "#1172ba" }} />
                                    <Typography variant="body2" fontWeight={500}>Non-Commercial</Typography>
                                </Box>
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Shipment Purpose"
                            name="shipmentPurpose"
                            placeholder="Mandatory for Non-Commercial"
                            value={formik.values.shipmentPurpose}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required={formik.values.shipmentType === "Non-Commercial"}
                            error={formik.touched.shipmentPurpose && Boolean(formik.errors.shipmentPurpose)}
                            helperText={formik.touched.shipmentPurpose && formik.errors.shipmentPurpose}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Description sx={{ color: "#1172ba" }} />
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
                            label="UDI"
                            name="udi"
                            placeholder="Unique Device Identifier"
                            value={formik.values.udi}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Description sx={{ color: "#1172ba" }} />
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
