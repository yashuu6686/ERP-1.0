import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormikContext } from "formik";
import { Box } from "@mui/material";
import Category from "@mui/icons-material/Category";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Equalizer from "@mui/icons-material/Equalizer";

const ProductDetailsInfo = () => {
    const { values, errors, touched, handleChange, handleBlur } = useFormikContext();

    return (
        <Card
            sx={{
                mb: 4,
                border: "1px solid #e9ecef",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "none"
            }}
            elevation={0}
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
                <Category />
                <Typography variant="h6" fontWeight={600} color="white">
                    Product Specifications
                </Typography>
            </Box>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Name Of Product"
                            placeholder="Enter Product Name"
                            name="productName"
                            value={values.productName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.productName && Boolean(errors.productName)}
                            helperText={touched.productName && errors.productName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Category sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Batch Qty"
                            type="number"
                            placeholder="0"
                            name="batchQty"
                            value={values.batchQty}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.batchQty && Boolean(errors.batchQty)}
                            helperText={touched.batchQty && errors.batchQty}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Equalizer sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Manufacturing Date"
                            name="mfgDate"
                            value={values.mfgDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.mfgDate && Boolean(errors.mfgDate)}
                            helperText={touched.mfgDate && errors.mfgDate}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarToday sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Expiry Date"
                            name="expiryDate"
                            value={values.expiryDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.expiryDate && Boolean(errors.expiryDate)}
                            helperText={touched.expiryDate && errors.expiryDate}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarToday sx={{ color: "#d32f2f" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProductDetailsInfo;
