import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    InputAdornment,
} from "@mui/material";
import {
    Description,
    CalendarToday,
    LocalShipping,
} from "@mui/icons-material";

const OrderInformation = ({ data, onChange }) => {
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
                            label="PO Number"
                            placeholder="PO-2024-001"
                            value={data?.orderNumber || ""}
                            onChange={(e) => onChange("orderNumber", e.target.value)}
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
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Order Date"
                            value={data?.orderDate || ""}
                            onChange={(e) => onChange("orderDate", e.target.value)}
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
                            value={data?.expectedDelivery || ""}
                            onChange={(e) => onChange("expectedDelivery", e.target.value)}
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
