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

export default function DispatchInfoCard({ formData, handleChange, errors, orders, onOrderSelect }) {
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
                            placeholder="DIS-001"
                            value={formData.dispatchNo}
                            onChange={(e) => handleChange("dispatchNo", e.target.value)}
                            required
                            error={errors.dispatchNo}
                            helperText={errors.dispatchNo && "This field is required"}
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
                            value={formData.dispatchDate}
                            onChange={(e) => handleChange("dispatchDate", e.target.value)}
                            required
                            error={errors.dispatchDate}
                            helperText={errors.dispatchDate && "This field is required"}
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
                            placeholder="TRK-889900"
                            value={formData.trackingNumber}
                            onChange={(e) => handleChange("trackingNumber", e.target.value)}
                            required
                            error={errors.trackingNumber}
                            helperText={errors.trackingNumber && "This field is required"}
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
