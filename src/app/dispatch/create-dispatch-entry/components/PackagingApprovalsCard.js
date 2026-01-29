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

export default function PackagingApprovalsCard({ formData, handleChange, errors, uploadedFiles, handleFileUpload, removeFile }) {
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
                <Typography variant="h6" fontWeight={600}>
                    Packaging & Approvals
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Packed By"
                            multiline
                            rows={2}
                            placeholder="Name, Sign & Date"
                            value={formData.packedBy}
                            onChange={(e) => handleChange("packedBy", e.target.value)}
                            required
                            error={errors.packedBy}
                            sx={{ bgcolor: "white" }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Approved By"
                            multiline
                            rows={2}
                            placeholder="Name, Sign & Date"
                            value={formData.approvedBy}
                            onChange={(e) => handleChange("approvedBy", e.target.value)}
                            required
                            error={errors.approvedBy}
                            sx={{ bgcolor: "white" }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Accounting By"
                            multiline
                            rows={2}
                            placeholder="Name, Sign & Date"
                            value={formData.accountingBy}
                            onChange={(e) => handleChange("accountingBy", e.target.value)}
                            required
                            error={errors.accountingBy}
                            sx={{ bgcolor: "white" }}
                        />
                    </Grid>
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
                            borderColor: "#cbd5e1",
                            bgcolor: "white",
                            "&:hover": {
                                borderColor: "#1172ba",
                                bgcolor: "#f8fafc",
                            },
                            textTransform: "none",
                        }}
                    >
                        Click to Upload Files or Drag and Drop
                        <input type="file" hidden multiple onChange={handleFileUpload} />
                    </Button>

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
