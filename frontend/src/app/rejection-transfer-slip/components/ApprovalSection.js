import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormikContext } from "formik";
import { Box } from "@mui/material";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Person from "@mui/icons-material/Person";

const ApprovalSection = () => {
    const { values, handleChange, handleBlur } = useFormikContext();

    return (
        <Card
            sx={{
                mt: 4,
                mb: 4,
                border: "1px solid #e9ecef",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
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
                <VerifiedUser />
                <Typography variant="h6" fontWeight={600} color="white">
                    Verification & Approval
                </Typography>
            </Box>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Reviewed By"
                            placeholder="Enter Name of Reviewer"
                            name="reviewedBy"
                            value={values.reviewedBy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: "#1172ba" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Approved By"
                            placeholder="Enter Name of Approver"
                            name="approvedBy"
                            value={values.approvedBy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: "#1172ba" }} />
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

export default ApprovalSection;
