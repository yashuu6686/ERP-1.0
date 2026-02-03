import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Verified from "@mui/icons-material/Verified";
import { useAuth } from "@/context/AuthContext";

const SignaturesApprovalSection = ({ formData, onChange }) => {
    const { user } = useAuth();
    return (
        <Card
            elevation={0}
            sx={{
                p: 0,
                mb: 4,
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
                <Verified sx={{ color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Signatures & Approval
                </Typography>
            </Box>
            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            mb={2}
                            color="primary"
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                            Updated By
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Signature"
                                    size="small"
                                    sx={{
                                        "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    sx={{
                                        "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {user?.role === 'admin' && (
                        <Grid item xs={12} md={6} size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                mb={2}
                                color="primary"
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                Approved By
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Signature"
                                        size="small"
                                        value={formData?.approvedBy || ""}
                                        onChange={(e) => onChange?.("approvedBy", e.target.value)}
                                        sx={{
                                            "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} size={{ xs: 6, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Date"
                                        type="date"
                                        value={formData?.approvalDate || ""}
                                        onChange={(e) => onChange?.("approvalDate", e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                        sx={{
                                            "& .MuiOutlinedInput-root": { backgroundColor: "white" },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SignaturesApprovalSection;
