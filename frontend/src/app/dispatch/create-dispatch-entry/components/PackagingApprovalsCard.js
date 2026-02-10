"use client";
import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Chip,
} from "@mui/material";
import { Description, CloudUpload } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";

export default function PackagingApprovalsCard({ formik, uploadedFiles, handleFileUpload, removeFile }) {
    const { user } = useAuth();

    const handleCharacterOnlyChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
    };

    return (
        <Card sx={{ mb: 4, borderRadius: 2 }}>
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
                    Packaging & Approvals
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            name="packedBy"
                            label="Packed By"
                            multiline
                            rows={2}
                            placeholder="Name, Sign & Date"
                            value={formik.values.packedBy}
                            onChange={handleCharacterOnlyChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.packedBy && Boolean(formik.errors.packedBy)}
                            helperText={formik.touched.packedBy && formik.errors.packedBy}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                                }
                            }}
                        />
                    </Grid>
                    {user?.role === 'Admin' && (
                        <>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    name="approvedBy"
                                    label="Approved By"
                                    multiline
                                    rows={2}
                                    placeholder="Name, Sign & Date"
                                    value={formik.values.approvedBy}
                                    onChange={handleCharacterOnlyChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.approvedBy && Boolean(formik.errors.approvedBy)}
                                    helperText={formik.touched.approvedBy && formik.errors.approvedBy}
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    name="accountingBy"
                                    label="Accounting By"
                                    multiline
                                    rows={2}
                                    placeholder="Name, Sign & Date"
                                    value={formik.values.accountingBy}
                                    onChange={handleCharacterOnlyChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={formik.touched.accountingBy && Boolean(formik.errors.accountingBy)}
                                    helperText={formik.touched.accountingBy && formik.errors.accountingBy}
                                    sx={{ bgcolor: "white" }}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="caption" sx={{ color: "#64748b", mb: 1, display: "block", fontWeight: 600 }}>
                        Upload Evidence (Photos/Scan)
                    </Typography>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        startIcon={<CloudUpload />}
                        sx={{
                            py: 3,
                            borderStyle: "dashed",
                            borderColor: formik.touched.evidence && formik.errors.evidence ? "#d32f2f" : "#cbd5e1",
                            bgcolor: "white",
                            color: formik.touched.evidence && formik.errors.evidence ? "#d32f2f" : "inherit",
                            "&:hover": {
                                borderColor: formik.touched.evidence && formik.errors.evidence ? "#d32f2f" : "#1172ba",
                                bgcolor: "#f8fafc",
                            },
                            textTransform: "none",
                        }}
                    >
                        Click to Upload Files or Drag and Drop
                        <input type="file" hidden multiple onChange={handleFileUpload} />
                    </Button>

                    {formik.touched.evidence && formik.errors.evidence && (
                        <Typography variant="caption" sx={{ color: "#d32f2f", mt: 0.5, display: "block", fontWeight: 600 }}>
                            {formik.errors.evidence}
                        </Typography>
                    )}

                    {uploadedFiles.length > 0 && (
                        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {uploadedFiles.map((file, index) => (
                                <Chip
                                    key={index}
                                    label={file.name}
                                    onDelete={() => removeFile(index)}
                                    sx={{ bgcolor: "#e2e8f0" }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card >
    );
}
