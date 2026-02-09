import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Assignment from "@mui/icons-material/Assignment";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Clear from "@mui/icons-material/Clear";

const ProductDetailsSection = ({ data, onChange, materialRequests = [], onRequestChange, isEdit = false, formik }) => {

    const handleKeyDown = (e, currentField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const fields = ['materialRequestNo', 'productName', 'qualityStandard', 'checkedQuantity', 'inspectionDate', 'checkNumber'];
            const currentIndex = fields.indexOf(currentField);
            if (currentIndex !== -1 && currentIndex < fields.length - 1) {
                const nextField = fields[currentIndex + 1];
                const nextInput = document.querySelector(`[name="${nextField}"]`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

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
                <Assignment sx={{ color: "#fff", fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600 }}>
                    Product Details
                </Typography>
            </Box>

            <CardContent sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <FormControl
                            fullWidth
                            size="small"
                            error={formik.touched.materialRequestNo && Boolean(formik.errors.materialRequestNo)}
                        >
                            <InputLabel>Material Request No.</InputLabel>
                            <Select
                                value={data.materialRequestNo || ""}
                                label="Material Request No."
                                onChange={(e) => onRequestChange(e.target.value)}
                                onBlur={formik.handleBlur}
                                name="materialRequestNo"
                                onKeyDown={(e) => handleKeyDown(e, 'materialRequestNo')}
                                disabled={isEdit}
                                endAdornment={
                                    data.materialRequestNo && !isEdit && (
                                        <InputAdornment position="end" sx={{ mr: 2 }}>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    // Prevent the select menu from opening
                                                    e.stopPropagation();
                                                    onRequestChange("");
                                                }}
                                                edge="end"
                                            >
                                                <Clear fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            >
                                {materialRequests.map((req) => (
                                    <MenuItem key={req.id} value={req.requestNo}>
                                        {req.requestNo}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            size="small"
                            name="productName"
                            value={data.productName}
                            onChange={(e) => onChange("productName", e.target.value)}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => handleKeyDown(e, 'productName')}
                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                            helperText={formik.touched.productName && formik.errors.productName}
                            disabled={!!data.materialRequestNo}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Quality Standard No."
                            variant="outlined"
                            size="small"
                            name="qualityStandard"
                            value={data.qualityStandard}
                            onChange={(e) => onChange("qualityStandard", e.target.value)}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => handleKeyDown(e, 'qualityStandard')}
                            error={formik.touched.qualityStandard && Boolean(formik.errors.qualityStandard)}
                            helperText={formik.touched.qualityStandard && formik.errors.qualityStandard}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Checked Quantity"
                            variant="outlined"
                            size="small"
                            type="number"
                            name="checkedQuantity"
                            value={data.checkedQuantity}
                            onChange={(e) => onChange("checkedQuantity", e.target.value)}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => handleKeyDown(e, 'checkedQuantity')}
                            error={formik.touched.checkedQuantity && Boolean(formik.errors.checkedQuantity)}
                            helperText={formik.touched.checkedQuantity && formik.errors.checkedQuantity}
                            disabled={!!data.materialRequestNo}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Inspection Date"
                            variant="outlined"
                            size="small"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            name="inspectionDate"
                            value={data.inspectionDate}
                            onChange={(e) => onChange("inspectionDate", e.target.value)}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => handleKeyDown(e, 'inspectionDate')}
                            error={formik.touched.inspectionDate && Boolean(formik.errors.inspectionDate)}
                            helperText={formik.touched.inspectionDate && formik.errors.inspectionDate}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <TextField
                            fullWidth
                            label="Check Number"
                            variant="outlined"
                            size="small"
                            name="checkNumber"
                            value={data.checkNumber}
                            onChange={(e) => onChange("checkNumber", e.target.value)}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => handleKeyDown(e, 'checkNumber')}
                            error={formik.touched.checkNumber && Boolean(formik.errors.checkNumber)}
                            helperText={formik.touched.checkNumber && formik.errors.checkNumber}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProductDetailsSection;
