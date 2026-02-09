import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Edit from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";

import CloudUpload from "@mui/icons-material/CloudUpload";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

const ActionChecklistSection = ({ formik }) => {
    const { values, setFieldValue, touched, errors } = formik;

    const handleChecklistChange = (field) => {
        setFieldValue(`checklist.${field}`, !values.checklist?.[field]);
        formik.setFieldTouched(`checklist.${field}`, true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue("qualityFile", file);
        }
    };

    const removeFile = () => {
        setFieldValue("qualityFile", null);
    };

    const handleKeyDown = (e, nextField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextInput = document.querySelector(`[name="${nextField}"]`);
            if (nextInput) nextInput.focus();
        }
    };

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        height: "100%",
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
                        <Edit sx={{ color: "#fff" }} />
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                            Action Items {(values.problemReport === "yes" || values.aqd === "yes") && <span style={{ color: 'white' }}>*</span>}
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        <TextField
                            fullWidth
                            label="Action Items Description"
                            name="actionItemsDescription"
                            multiline
                            rows={3}
                            size="small"
                            value={values.actionItemsDescription || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onKeyDown={(e) => handleKeyDown(e, "actionItemsFinishDate")}
                            error={touched.actionItemsDescription && Boolean(errors.actionItemsDescription)}
                            helperText={touched.actionItemsDescription && errors.actionItemsDescription}
                            required={values.problemReport === "yes" || values.aqd === "yes"}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Finish Date"
                            name="actionItemsFinishDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            value={values.actionItemsFinishDate || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={touched.actionItemsFinishDate && Boolean(errors.actionItemsFinishDate)}
                            helperText={touched.actionItemsFinishDate && errors.actionItemsFinishDate}
                            required={values.problemReport === "yes" || values.aqd === "yes"}
                            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        height: "100%",
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
                        <CheckCircle sx={{ color: "#fff" }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#fff", fontWeight: 600 }}
                        >
                            Final Product Check
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                        <Box sx={{ display: "grid", gap: 1, mb: 3 }}>
                            {[
                                { label: "Label attached?", field: "labelAttached" },
                                { label: "Packaging proof attached?", field: "packagingProof" },
                                { label: "Final test done?", field: "finalTestDone" },
                            ].map((item, idx) => (
                                <Paper
                                    key={idx}
                                    elevation={0}
                                    sx={{
                                        p: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        bgcolor: "white",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: 2,
                                        "&:hover": { bgcolor: "#f1f5f9" },
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                color="primary"
                                                name={`checklist.${item.field}`}
                                                checked={!!values.checklist?.[item.field]}
                                                onChange={() => handleChecklistChange(item.field)}
                                                onBlur={formik.handleBlur}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ color: touched.checklist?.[item.field] && errors.checklist?.[item.field] ? 'error.main' : 'inherit' }}>
                                                {item.label}
                                            </Typography>
                                        }
                                        sx={{ width: "100%", m: 0 }}
                                    />
                                </Paper>
                            ))}
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                                Quality Proof / File Upload <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <Box
                                sx={{
                                    p: 2,
                                    border: "2px dashed #e2e8f0",
                                    borderRadius: 2,
                                    textAlign: "center",
                                    bgcolor: touched.qualityFile && errors.qualityFile ? "#fff5f5" : "white",
                                    borderColor: touched.qualityFile && errors.qualityFile ? "error.main" : "#e2e8f0",
                                    transition: "all 0.2s",
                                }}
                            >
                                {values.qualityFile ? (
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {typeof values.qualityFile === "string" ? "Current File" : values.qualityFile.name}
                                            </Typography>
                                        </Box>
                                        <IconButton size="small" color="error" onClick={removeFile}>
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Button
                                        component="label"
                                        variant="text"
                                        startIcon={<CloudUpload />}
                                        sx={{ textTransform: "none" }}
                                    >
                                        Upload Proof
                                        <input type="file" hidden onChange={handleFileChange} />
                                    </Button>
                                )}
                            </Box>
                            {touched.qualityFile && errors.qualityFile && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                                    {errors.qualityFile}
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ActionChecklistSection;
