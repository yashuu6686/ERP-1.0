import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import FactCheck from "@mui/icons-material/FactCheck";

const BOMAuthorization = ({ reviewedBy, approvedBy, onUpdate, errors = {}, touched = {}, onBlur }) => {
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "white",
            "&:hover": {
                "& > fieldset": { borderColor: "#1172ba" },
            },
        },
    };

    return (
        <Card
            sx={{
                mb: 2,
                border: "1px solid #e9ecef",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                <FactCheck />
                <Typography variant="h6" fontWeight={600} color="white">
                    BOM Authorization
                </Typography>
            </Box>
            <CardContent
                sx={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)", p: 3 }}
            >
                <Grid container spacing={3}>
                    <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Reviewed By"
                            placeholder="Enter reviewer name"
                            sx={textFieldStyle}
                            value={reviewedBy}
                            onChange={(e) => onUpdate("reviewedBy", e.target.value)}
                            onBlur={onBlur}
                            name="auth.reviewedBy"
                            error={touched.reviewedBy && Boolean(errors.reviewedBy)}
                            helperText={touched.reviewedBy && errors.reviewedBy}
                            required
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Approved By"
                            placeholder="Enter approver name"
                            sx={textFieldStyle}
                            value={approvedBy}
                            onChange={(e) => onUpdate("approvedBy", e.target.value)}
                            onBlur={onBlur}
                            name="auth.approvedBy"
                            error={touched.approvedBy && Boolean(errors.approvedBy)}
                            helperText={touched.approvedBy && errors.approvedBy}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BOMAuthorization;
