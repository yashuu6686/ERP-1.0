import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Inventory from "@mui/icons-material/Inventory";

const ProductInformationSection = ({ formik }) => {
    const { values, handleChange, handleBlur, touched, errors } = formik;

    return (
        <Card
            elevation={0}
            sx={{
                marginBottom: 4,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    padding: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Inventory sx={{ color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Product Information
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3, backgroundColor: "#f8fafc" }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="productName"
                            size="small"
                            value={values.productName || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.productName && Boolean(errors.productName)}
                            helperText={touched.productName && errors.productName}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Inspection Std No."
                            name="inspectionStdNo"
                            size="small"
                            value={values.inspectionStdNo || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.inspectionStdNo && Boolean(errors.inspectionStdNo)}
                            helperText={touched.inspectionStdNo && errors.inspectionStdNo}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            type="number"
                            size="small"
                            value={values.quantity || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.quantity && Boolean(errors.quantity)}
                            helperText={touched.quantity && errors.quantity}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Check Date"
                            name="date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            value={values.date || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.date && Boolean(errors.date)}
                            helperText={touched.date && errors.date}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Inspection No."
                            name="inspectionNo"
                            size="small"
                            value={values.inspectionNo || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.inspectionNo && Boolean(errors.inspectionNo)}
                            helperText={touched.inspectionNo && errors.inspectionNo}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Serial From"
                            name="serialFrom"
                            size="small"
                            value={values.serialFrom || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.serialFrom && Boolean(errors.serialFrom)}
                            helperText={touched.serialFrom && errors.serialFrom}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Serial To"
                            name="serialTo"
                            size="small"
                            value={values.serialTo || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.serialTo && Boolean(errors.serialTo)}
                            helperText={touched.serialTo && errors.serialTo}
                            sx={{
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProductInformationSection;
