import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LocalShipping from "@mui/icons-material/LocalShipping";
import { useFormikContext } from "formik";

const DeliveryInformation = () => {
    const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext();

    return (
        <Card
            sx={{
                height: "100%",
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
                <LocalShipping />
                <Typography variant="h6" fontWeight={600} color={"white"}>
                    Delivery Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Invoice To"
                            placeholder="Company Name"
                            name="delivery.invoiceTo"
                            value={values.delivery.invoiceTo}
                            onChange={(e) => setFieldValue("delivery.invoiceTo", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.delivery?.invoiceTo && Boolean(errors.delivery?.invoiceTo)}
                            helperText={touched.delivery?.invoiceTo && errors.delivery?.invoiceTo}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Deliver To"
                            placeholder="Warehouse/Site"
                            name="delivery.deliverTo"
                            value={values.delivery.deliverTo}
                            onChange={(e) => setFieldValue("delivery.deliverTo", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.delivery?.deliverTo && Boolean(errors.delivery?.deliverTo)}
                            helperText={touched.delivery?.deliverTo && errors.delivery?.deliverTo}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Recipient Name (At Delivery Site)"
                            placeholder="Full name of person receiving"
                            name="delivery.contactPerson"
                            value={values.delivery.contactPerson}
                            onChange={(e) => setFieldValue("delivery.contactPerson", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.delivery?.contactPerson && Boolean(errors.delivery?.contactPerson)}
                            helperText={touched.delivery?.contactPerson && errors.delivery?.contactPerson}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Phone"
                            placeholder="9876543210"
                            name="delivery.phone"
                            value={values.delivery.phone}
                            onChange={(e) => setFieldValue("delivery.phone", e.target.value)}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onBlur={handleBlur}
                            error={touched.delivery?.phone && Boolean(errors.delivery?.phone)}
                            helperText={touched.delivery?.phone && errors.delivery?.phone}
                            InputProps={{
                                inputMode: 'numeric'
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="delivery@company.com"
                            name="delivery.email"
                            value={values.delivery.email}
                            onChange={(e) => setFieldValue("delivery.email", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.delivery?.email && Boolean(errors.delivery?.email)}
                            helperText={touched.delivery?.email && errors.delivery?.email}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Delivery Address"
                            placeholder="456 Delivery Lane"
                            multiline
                            minRows={2}
                            name="delivery.deliveryAddress"
                            value={values.delivery.deliveryAddress}
                            onChange={(e) => setFieldValue("delivery.deliveryAddress", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.delivery?.deliveryAddress && Boolean(errors.delivery?.deliveryAddress)}
                            helperText={touched.delivery?.deliveryAddress && errors.delivery?.deliveryAddress}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DeliveryInformation;