import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Business from "@mui/icons-material/Business";
import { useFormikContext } from "formik";

const SupplierInformation = () => {
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
                <Business />
                <Typography variant="h6" fontWeight={600} color={"white"}>
                    Supplier Information
                </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                            label="Company Name"
                            placeholder="ABC Suppliers Pvt Ltd"
                            name="supplier.companyName"
                            value={values.supplier.companyName}
                            onChange={(e) => setFieldValue("supplier.companyName", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.supplier?.companyName && Boolean(errors.supplier?.companyName)}
                            helperText={touched.supplier?.companyName && errors.supplier?.companyName}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Supplier Representative Name"
                            placeholder="Full name of contact person"
                            name="supplier.contactPerson"
                            value={values.supplier.contactPerson}
                            onChange={(e) => setFieldValue("supplier.contactPerson", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.supplier?.contactPerson && Boolean(errors.supplier?.contactPerson)}
                            helperText={touched.supplier?.contactPerson && errors.supplier?.contactPerson}
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
                            label="Email"
                            placeholder="contact@supplier.com"
                            name="supplier.email"
                            value={values.supplier.email}
                            onChange={(e) => setFieldValue("supplier.email", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.supplier?.email && Boolean(errors.supplier?.email)}
                            helperText={touched.supplier?.email && errors.supplier?.email}
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
                            name="supplier.phone"
                            value={values.supplier.phone}
                            onChange={(e) => setFieldValue("supplier.phone", e.target.value)}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onBlur={handleBlur}
                            error={touched.supplier?.phone && Boolean(errors.supplier?.phone)}
                            helperText={touched.supplier?.phone && errors.supplier?.phone}
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
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="PAN Number"
                            name="supplier.pan"
                            value={values.supplier.pan}
                            onChange={(e) => setFieldValue("supplier.pan", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.supplier?.pan && Boolean(errors.supplier?.pan)}
                            helperText={touched.supplier?.pan && errors.supplier?.pan}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                }
                            }}
                            placeholder="ABCDE1234F"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="GSTIN"
                            placeholder="22ABCDE1234F1Z5"
                            name="supplier.gstin"
                            value={values.supplier.gstin}
                            onChange={(e) => setFieldValue("supplier.gstin", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.supplier?.gstin && Boolean(errors.supplier?.gstin)}
                            helperText={touched.supplier?.gstin && errors.supplier?.gstin}
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
                            label="Address"
                            placeholder="123 Business Street"
                            multiline
                            minRows={2}
                            name="supplier.address"
                            value={values.supplier.address}
                            onChange={(e) => setFieldValue("supplier.address", e.target.value)}
                            onBlur={handleBlur}
                            error={touched.supplier?.address && Boolean(errors.supplier?.address)}
                            helperText={touched.supplier?.address && errors.supplier?.address}
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

export default SupplierInformation;
